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

// CreateEmployee creates employee
func CreateEmployee(c echo.Context) error {
	accountType := c.Get("account_type").(string)

	if accountType != types.AdminAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

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

// GetEmployees returns a list of employees
func GetEmployees(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	perPage := getQueryParam(reflect.Int, "per_page", c).(int)
	pageNumber := getQueryParam(reflect.Int, "page_number", c).(int)

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	employees, total, dbErr := db.GetEmployees(&types.GetEmployeesFilter{}, pageNumber, perPage)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusOK, types.GetEmployeesResponse{
		Objects:    employees,
		Total:      total,
		PerPage:    perPage,
		PageNumber: pageNumber,
	})
}

// GetEmployee returns employee
func GetEmployee(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	employeeID := c.Param("employee_id")

	if accountType != types.AdminAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	// Establish admin connection
	db, err := db.Connect(types.AdminAccount)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	employee, dbErr := db.GetEmployeeByID(employeeID)
	if dbErr != nil {
		return dbErr
	}

	if employee == nil {
		return echo.NewHTTPError(http.StatusNotFound)
	}

	return c.JSON(http.StatusOK, employee)
}

// DeleteEmployee deletes employee from the db
func DeleteEmployee(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	accountOwnerID := c.Get("owner_id").(string)
	employeeID := c.Param("employee_id")

	if accountType != types.AdminAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	// Establish admin connection
	db, err := db.Connect(types.AdminAccount)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	employee, dbErr := db.GetEmployeeByID(employeeID)
	if dbErr != nil {
		return dbErr
	}

	// Cannot delete yourself
	if employee.ID == accountOwnerID {
		return echo.NewHTTPError(http.StatusForbidden, "Cannot delete yourself :)")
	}

	if employee == nil {
		return echo.NewHTTPError(http.StatusNotFound)
	}

	if employee.IsDeleted {
		return echo.NewHTTPError(http.StatusBadRequest, "Employee already deleted")
	}

	dbErr = db.DeleteEmployee(employeeID)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusNoContent, "")
}

// UpdateEmployee updates employee
func UpdateEmployee(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	accountOwnerID := c.Get("owner_id").(string)
	employeeID := c.Param("employee_id")

	if accountType != types.AdminAccount || employeeID != accountOwnerID {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	var payload types.EmployeePut
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

	employee, dbErr := db.GetEmployeeByID(employeeID)
	if dbErr != nil {
		return dbErr
	}

	if employee == nil {
		return echo.NewHTTPError(http.StatusNotFound)
	}

	// Branch and position can be updated only by the admins
	// Otherwise keep them the same
	if payload.BranchID != nil {
		if accountType != types.AdminAccount {
			return echo.NewHTTPError(http.StatusForbidden, "Branch can be updated only by an admin")
		}
	} else {
		payload.BranchID = &employee.BranchID
	}

	if payload.Position != nil {
		if accountType != types.AdminAccount {
			return echo.NewHTTPError(http.StatusForbidden, "Position can be updated only by an admin")
		}
	} else {
		payload.Position = &employee.Position
	}

	employee, dbErr = db.UpdateEmployee(employeeID, payload)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusOK, employee)
}

// GetEmployeeSales returns employee sales
func GetEmployeeSales(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	employeeID := c.Param("employee_id")

	if accountType != types.EmployeeAccount && accountType != types.AdminAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	sales, dbErr := db.GetEmployeeSales(employeeID)
	if dbErr != nil {
		return dbErr
	}

	total := 0.0
	for _, s := range sales {
		total += s.SoldFor
	}

	return c.JSON(http.StatusOK, types.EmployeeSales{
		Sales: sales,
		Total: total,
	})
}

// GetEmployeesSales returns employee sales
func GetEmployeesSales(c echo.Context) error {
	accountType := c.Get("account_type").(string)

	if accountType != types.EmployeeAccount && accountType != types.AdminAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	sales, dbErr := db.GetEmployeesSales()
	if dbErr != nil {
		return dbErr
	}

	total := 0.0
	for _, s := range sales {
		total += s.SoldFor
	}

	return c.JSON(http.StatusOK, types.EmployeeSales{
		Sales: sales,
		Total: total,
	})
}

// GetEmployeePurchases returns purchases made by employee
func GetEmployeePurchases(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	employeeID := c.Param("employee_id")

	if accountType != types.AdminAccount && accountType != types.EmployeeAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	purchases, dbErr := db.GetEmployeePurchases(employeeID)
	if dbErr != nil {
		return dbErr
	}

	total := 0.0
	for _, p := range purchases {
		total += p.PurchasedFor
	}

	return c.JSON(http.StatusOK, types.EmployeePurchases{
		Total:     total,
		Purchases: purchases,
	})
}

// GetEmployeesPurchases returns purchases made by employees
func GetEmployeesPurchases(c echo.Context) error {
	accountType := c.Get("account_type").(string)

	if accountType != types.AdminAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	purchases, dbErr := db.GetEmployeesPurchases()
	if dbErr != nil {
		return dbErr
	}

	total := 0.0
	for _, p := range purchases {
		total += p.PurchasedFor
	}

	return c.JSON(http.StatusOK, types.EmployeePurchases{
		Total:     total,
		Purchases: purchases,
	})
}
