package server

import (
	"fmt"
	"net/http"
	"sort"
	"time"

	"github.com/fvbock/endless"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	log "github.com/sirupsen/logrus"

	"autoshop/db"
	"autoshop/types"
)

// ContextParams stores context parameters for server initialization
type ContextParams struct {
	DB *db.Client
}

// ContextObjects attaches backend clients to the API context
func ContextObjects(contextParams ContextParams) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Set("db", contextParams.DB)
			return next(c)
		}
	}
}

// CreateRouter creates the router.
func CreateRouter(params ContextParams) *echo.Echo {
	r := echo.New()
	r.HTTPErrorHandler = errorHandler

	r.Use(
		ContextObjects(params),
	)

	r.Use(middleware.Logger())
	r.Use(middleware.Recover())

	// Set static asset base directory
	r.Static("/", "../build")

	// Homepage
	r.File("/", "../build/index.html")

	var routes []string
	for _, route := range r.Routes() {
		if route.Path != "." && route.Path != "/*" {
			routes = append(routes, route.Method+" "+route.Path)
		}
	}
	sort.Strings(routes)
	for _, route := range routes {
		log.Debug(route)
	}

	return r
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
