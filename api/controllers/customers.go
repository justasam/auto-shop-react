package controllers

import (
	"fmt"
	"net/http"
	"reflect"

	"github.com/labstack/echo/v4"
	uuid "github.com/satori/go.uuid"

	"autoshop/api/db"
	"autoshop/api/types"
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

// GetCustomers returns a list of customers
func GetCustomers(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	perPage := getQueryParam(reflect.Int, "per_page", c).(int)
	pageNumber := getQueryParam(reflect.Int, "page_number", c).(int)

	if accountType != types.EmployeeAccount && accountType != types.AdminAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	// Establish admin connection
	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	customers, total, dbErr := db.GetCustomers(&types.GetCustomersFilter{}, perPage, pageNumber)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusOK, types.GetCustomersResponse{
		Objects:    customers,
		Total:      total,
		PerPage:    perPage,
		PageNumber: pageNumber,
	})
}

// GetCustomer returns customer
func GetCustomer(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	customerID := c.Param("customer_id")

	if accountType != types.EmployeeAccount && accountType != types.AdminAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	customer, dbErr := db.GetCustomerByID(customerID)
	if dbErr != nil {
		return dbErr
	}

	if customer == nil {
		return echo.NewHTTPError(http.StatusNotFound)
	}

	return c.JSON(http.StatusOK, customer)
}

// DeleteCustomer deletes customer
func DeleteCustomer(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	customerID := c.Param("customer_id")

	if accountType != types.AdminAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	// Establish admin connection
	db, err := db.Connect(types.AdminAccount)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	customer, dbErr := db.GetCustomerByID(customerID)
	if dbErr != nil {
		return dbErr
	}

	if customer == nil {
		return echo.NewHTTPError(http.StatusNotFound)
	}

	if customer.IsDeleted {
		return echo.NewHTTPError(http.StatusBadRequest, "Customer already deleted")
	}

	dbErr = db.DeleteCustomer(customerID)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusNoContent, "")
}

// UpdateCustomer updates customer
func UpdateCustomer(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	accountOwnerID := c.Get("owner_id").(string)
	customerID := c.Param("customer_id")

	// Customer can only be updated by an admin or the customer itself
	if accountType != types.AdminAccount && customerID != accountOwnerID {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	var payload types.CustomerPut
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

	customer, dbErr := db.GetCustomerByID(customerID)
	if dbErr != nil {
		return dbErr
	}

	if customer == nil {
		return echo.NewHTTPError(http.StatusNotFound)
	}

	payload.ID = customer.ID
	payload.AccountID = customer.AccountID

	customer, dbErr = db.UpdateCustomer(customerID, payload)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusOK, customer)
}
