package controllers

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	uuid "github.com/satori/go.uuid"

	"autoshop/db"
	"autoshop/types"
)

// CreateCustomer creates customer
func CreateCustomer(c echo.Context) error {
	var payload types.CustomerPost
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

	// Set id and account id
	payload.ID = uuid.NewV4().String()
	payload.AccountID = uuid.NewV4().String()

	customer, dbErr := db.CreateCustomer(payload)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusCreated, customer)
}
