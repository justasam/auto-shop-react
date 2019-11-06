package controllers

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	uuid "github.com/satori/go.uuid"

	"autoshop/api/db"
	"autoshop/api/types"
)

// CreateEmployee creates employee
func CreateEmployee(c echo.Context) error {
	var payload types.EmployeePost
	err := c.Bind(&payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, validatorError(err))
	}

	_, found := getSessionByType(types.AdminAccount, c)
	if !found {
		return echo.NewHTTPError(http.StatusForbidden)
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

	employee, dbErr := db.CreateEmployee(payload)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusCreated, employee)
}
