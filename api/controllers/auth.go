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

	err = sess.Save(c.Request(), c.Response())
	if err != nil {
		return fmt.Errorf("Error saving session: %s", err)
	}

	return c.JSON(http.StatusOK, nil)
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
