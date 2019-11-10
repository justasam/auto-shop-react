package server

import (
	"fmt"
	"net/http"
	"sort"
	"time"

	sv "github.com/Rekfuki/swag-validator"
	"github.com/fvbock/endless"
	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/miketonks/swag"
	"github.com/miketonks/swag/swagger"
	log "github.com/sirupsen/logrus"

	"autoshop/api/controllers"
	"autoshop/api/db"
	"autoshop/api/types"
)

// ContextParams stores context parameters for server initialization
type ContextParams struct {
	VehiclePicturesPath     string
	VehicleMakePicturesPath string
	DBConf                  db.Config
}

// ContextObjects attaches backend clients to the API context
func ContextObjects(contextParams ContextParams) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Set("dbconf", contextParams.DBConf)
			c.Set("vehiclePicturesPath", contextParams.VehiclePicturesPath)
			c.Set("vehicleMakePicturesPath", contextParams.VehicleMakePicturesPath)
			return next(c)
		}
	}
}

// DefaultContentType sets default content type
func DefaultContentType() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			t := c.Request().Header.Get("Content-Type")
			if t == "" {
				c.Request().Header.Set("Content-Type", "application/json; charset=UTF-8")
			}

			return next(c)
		}
	}
}

// CheckSession sets session details to context
func CheckSession() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			sess, _ := session.Get("session", c)

			// If account type is not set assume it's a guest
			if _, found := sess.Values["account_type"]; !found {
				sess.Values["account_type"] = types.GuestAccount
				sess.Values["account_id"] = ""
				sess.Values["owner_id"] = ""
				c.Set("account_type", types.GuestAccount)
				c.Set("account_id", "")
				c.Set("owner_id", "")
			}

			if sess.Values["account_type"] != types.GuestAccount {
				// Check if the account still exists
				db, err := db.Connect(types.AdminAccount)
				if err != nil {
					return fmt.Errorf("Error connecting to the database: %s", err)
				}
				defer db.Close()

				accountID := sess.Values["account_id"].(string)
				account, dbErr := db.GetAccountByID(accountID)
				if dbErr != nil {
					return dbErr
				}

				// If account is not found, wipe session.
				if account == nil {
					sess.Options.MaxAge = -1
					err = sess.Save(c.Request(), c.Response())
					if err != nil {
						return fmt.Errorf("Failed to save session: %s", err)
					}
				} else {
					c.Set("owner_id", account.OwnerID)
					c.Set("account_type", account.Type)
					c.Set("account_id", account.ID)
				}
			}

			// Set the headers
			c.Response().Header().Set("Autoshop-Account-Type", sess.Values["account_type"].(string))
			c.Response().Header().Set("Autoshop-Account-ID", sess.Values["account_id"].(string))
			c.Response().Header().Set("Autoshop-Account-Owner-ID", sess.Values["owner_id"].(string))

			return next(c)
		}
	}
}

// CreateRouter creates the router.
func CreateRouter(params ContextParams) *echo.Echo {
	r := echo.New()
	r.Debug = true
	r.HTTPErrorHandler = errorHandler

	r.Use(
		ContextObjects(params),
		middleware.Logger(),
		middleware.Recover(),
		middleware.Secure(),
		middleware.CORS(),
		session.Middleware(sessions.NewCookieStore([]byte("supersecret"))),
		CheckSession(),
	)

	r.GET("/ping", controllers.Ping)

	autoshopAPI := CreateSwaggerAPI()

	// Swagger UI
	r.GET("/autoshop/api/json", echo.WrapHandler(autoshopAPI.Handler(true)))

	api := r.Group("", sv.SwaggerValidatorEcho(autoshopAPI), DefaultContentType(), CheckSession())
	autoshopAPI.Walk(func(path string, endpoint *swagger.Endpoint) {
		h := endpoint.Handler.(func(c echo.Context) error)
		path = swag.ColonPath(path)
		api.Add(endpoint.Method, path, h)
	})

	var routes []string
	for _, route := range r.Routes() {
		if route.Path != "." && route.Path != "/*" {
			routes = append(routes, route.Method+" "+route.Path)
		}
	}
	sort.Strings(routes)
	for _, route := range routes {
		log.Print(route)
	}

	return r
}

// CreateSwaggerAPI creates all swagger endpoints.
func CreateSwaggerAPI() *swagger.API {
	api := swag.New(
		swag.Title("Autoshop API"),
		swag.BasePath("/autoshop/api"),
		swag.Endpoints(
			aggregateEndpoints(
				authAPI(),
				customerAPI(),
				vehiclesAPI(),
				employeeAPI(),
				accountsAPI(),
			)...,
		),
	)
	return api
}

func aggregateEndpoints(endpoints ...[]*swagger.Endpoint) []*swagger.Endpoint {
	res := []*swagger.Endpoint{}
	for _, v := range endpoints {
		res = append(res, v...)
	}
	return res
}

// Run runs the server
func Run(params ContextParams) {
	r := CreateRouter(params)

	endless.DefaultHammerTime = 10 * time.Second
	endless.DefaultReadTimeOut = 295 * time.Second
	if err := endless.ListenAndServe(":5009", r); err != nil {
		log.Infof("Server stopped: %s", err)
	}
}

func errorHandler(err error, c echo.Context) {
	code := http.StatusInternalServerError
	message := err.Error()
	if he, ok := err.(*echo.HTTPError); ok {
		code = he.Code
		message = fmt.Sprintf("%v", he.Message)
	} else if te, ok := err.(*types.Error); ok {
		switch te.Type {
		case types.ErrTypeValidationError:
			code = http.StatusBadRequest
		case types.ErrTypeDuplicateError:
			code = http.StatusConflict
		case types.ErrTypeNotFoundError:
			code = http.StatusNotFound
		}
	}
	log.Error(fmt.Sprintf("%d %s", code, message))
	err2 := c.JSON(code, types.ErrorResponse{Message: message})
	if err2 != nil {
		log.Errorf("failed to handle error: %s", err2)
	}
}
