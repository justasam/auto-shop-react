package controllers

import (
	"autoshop/api/db"
	"autoshop/api/types"
	"fmt"
	"net/http"

	"github.com/davecgh/go-spew/spew"
	"github.com/labstack/echo/v4"
	uuid "github.com/satori/go.uuid"
)

// GetBranches returns all thes branches
func GetBranches(c echo.Context) error {
	accountType := c.Get("account_type").(string)

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	branches, dbErr := db.GetBranches()
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusOK, branches)
}

// GetBranchByID returns a specific branch
func GetBranchByID(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	branchID := c.Param("branch_id")

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	branch, dbErr := db.GetBranchByID(branchID)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusOK, branch)
}

// CreateBranch creates a new branch
func CreateBranch(c echo.Context) error {
	accountType := c.Get("account_type").(string)

	if accountType != types.AdminAccount {
		return echo.NewHTTPError(http.StatusForbidden, "Branch can only be created by an admin")
	}

	var payload types.BranchPost
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

	payload.ID = uuid.NewV4().String()

	branch, dbErr := db.CreateBranch(payload)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusCreated, branch)
}

// UpdateBranch updates branch
func UpdateBranch(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	branchID := c.Param("branch_id")

	if accountType != types.AdminAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	var payload types.BranchPut
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

	branch, dbErr := db.GetBranchByID(branchID)
	if dbErr != nil {
		return dbErr
	}

	if branch == nil {
		return echo.NewHTTPError(http.StatusNotFound)
	}

	payload.ID = branchID
	branch, dbErr = db.UpdateBranch(payload)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusOK, branch)
}

// DeleteBranch deletes branch from the db
func DeleteBranch(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	branchID := c.Param("branch_id")

	if accountType != types.AdminAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	// Establish admin connection
	db, err := db.Connect(types.AdminAccount)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	branch, dbErr := db.GetBranchByID(branchID)
	if dbErr != nil {
		return dbErr
	}

	spew.Dump((branch))

	if branch == nil {
		return echo.NewHTTPError(http.StatusNotFound)
	}

	branch, dbErr = db.DeleteBranch(branchID)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusOK, branch)
}
