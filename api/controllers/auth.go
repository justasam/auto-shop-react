package controllers

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	validator "gopkg.in/go-playground/validator.v8"

	"autoshop/api/db"
	"autoshop/api/types"
)

// Login handles login
func Login(c echo.Context) error {
	var payload types.LoginPost
	err := c.Bind(&payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, validatorError(err))
	}

	// Establish admin connection
	db, err := db.Connect(types.AdminAccount)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	// Find the account by username
	account, dbErr := db.GetAccountByUsername(payload.Username)
	if dbErr != nil {
		return dbErr
	}

	// Do not differentiate between found and not found
	if account == nil {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid username or password")
	}

	if payload.Password != account.Password {
		return echo.NewHTTPError(http.StatusUnauthorized, "Invalid username or password")
	}

	// Set the session
	sess, err := session.Get("session", c)
	if err != nil {
		return err
	}

	sess.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   86400 * 7,
		HttpOnly: true,
	}

	sess.Values["account_type"] = account.Type
	sess.Values["account_id"] = account.ID
	sess.Values["owner_id"] = account.OwnerID
	sess.Values["username"] = account.Username

	err = sess.Save(c.Request(), c.Response())
	if err != nil {
		return fmt.Errorf("Error saving session: %s", err)
	}

	c.Response().Header().Set("X-Autoshop-Account-Type", account.Type)
	c.Response().Header().Set("X-Autoshop-Account-ID", account.ID)
	c.Response().Header().Set("X-Autoshop-Account-Owner-ID", account.OwnerID)
	c.Response().Header().Set("X-Autoshop-Account-Username", sess.Values["username"].(string))

	return c.JSON(http.StatusOK, account)
}

// LogOut deletes sessions
func LogOut(c echo.Context) error {
	sess, _ := session.Get("session", c)

	sess.Options.MaxAge = -1
	err := sess.Save(c.Request(), c.Response())
	if err != nil {
		return fmt.Errorf("Failed to save session: %s", err)
	}

	return c.NoContent(http.StatusOK)
}

// GetLoggedInUser returns currently logged in user or employee
func GetLoggedInUser(c echo.Context) error {
	accountID := c.Get("account_id").(string)
	ownerID := c.Get("owner_id").(string)
	accountType := c.Get("account_type").(string)

	if accountID == "" || ownerID == "" || accountType == types.GuestAccount {
		return echo.NewHTTPError(http.StatusNotFound)
	}

	// Establish admin connection
	db, err := db.Connect(types.AdminAccount)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	var dbErr *types.Error
	entity := map[string]interface{}{}

	if accountType == types.EmployeeAccount || accountType == types.AdminAccount {
		entity["employee"], dbErr = db.GetEmployeeByID(ownerID)
	} else {
		entity["customer"], dbErr = db.GetCustomerByID(ownerID)
	}

	if dbErr != nil {
		return dbErr
	}

	// This should not happen
	if len(entity) == 0 {
		return echo.NewHTTPError(http.StatusNotFound)
	}

	return c.JSON(http.StatusOK, entity)
}

func validatorError(err error) types.ErrorResponse {
	ve := err.(validator.ValidationErrors)
	details := map[string]string{}
	for _, err := range ve {
		field := strings.ToLower(err.Name)
		details[field] = fmt.Sprintf("Invalid value for '%s': '%s'", field, err.Value)
	}
	return types.ErrorResponse{Message: "Validation error", Details: details}
}
