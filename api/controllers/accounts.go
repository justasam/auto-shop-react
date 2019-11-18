package controllers

import (
	"autoshop/api/db"
	"autoshop/api/types"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
)

// GetAccountByID returns account
func GetAccountByID(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	accountID := c.Get("account_id").(string)

	if accountType != types.EmployeeAccount && accountType != types.AdminAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	account, dbErr := db.GetAccountByID(accountID)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusOK, account)
}

// GetCurrentAccount returns the account of currently logged in person
func GetCurrentAccount(c echo.Context) error {
	accountID := c.Get("account_id").(string)

	if accountID == "" {
		return echo.NewHTTPError(http.StatusNotFound)
	}

	db, err := db.Connect(types.AdminAccount)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	account, dbErr := db.GetAccountByID(accountID)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusOK, account)
}

// ChangePassword changes password
func ChangePassword(c echo.Context) error {
	accountID := c.Get("account_id").(string)
	requestedAccountID := c.Param("account_id")
	accountType := c.Get("account_type").(string)

	if accountType != types.AdminAccount && requestedAccountID != accountID {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	var payload types.PasswordChangePost
	err := c.Bind(&payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, validatorError(err))
	}

	db, err := db.Connect(types.AdminAccount)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	account, dbErr := db.GetAccountByID(accountID)
	if dbErr != nil {
		return dbErr
	}

	if account == nil {
		return echo.NewHTTPError(http.StatusNotFound)
	}

	dbErr = db.ChangePassword(requestedAccountID, payload.Password)
	if dbErr != nil {
		return dbErr
	}

	return c.NoContent(http.StatusNoContent)
}
