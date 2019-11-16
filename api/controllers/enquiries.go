package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
	uuid "github.com/satori/go.uuid"

	"autoshop/api/db"
	"autoshop/api/types"
)

// GetEnquiries returns enquiries
func GetEnquiries(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	perPage := c.Get("per_page").(int)
	pageNumber := c.Get("page_number").(int)

	if accountType != types.AdminAccount && accountType != types.EmployeeAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	filter := &types.GetEnquiriesFilter{
		Resolved:   getOptionalBool("resolved", c),
		CustomerID: getOptionalString("customer_id", c),
		EmployeeID: getOptionalString("employee_id", c),
		Type:       getOptionalString("type", c),
	}

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	enquiries, total, dbErr := db.GetEnquiries(filter, pageNumber, perPage)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusOK, types.GetEnquiriesResponse{
		Objects:    enquiries,
		Total:      total,
		PerPage:    perPage,
		PageNumber: pageNumber,
	})
}

// GetEnquiry returns enquiry
func GetEnquiry(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	enquiryID := c.Param("enquiry_id")
	ownerID := c.Get("owner_id").(string)

	if accountType == types.GuestAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	enquiry, dbErr := db.GetEnquiryByID(enquiryID)
	if dbErr != nil {
		return dbErr
	}

	// If not employee or admin and the customer id does not match give not found
	if accountType != types.AdminAccount && accountType != types.EmployeeAccount &&
		enquiry.CustomerID != ownerID {
		return echo.NewHTTPError(http.StatusNotFound)
	}

	return c.JSON(http.StatusOK, enquiry)
}

// CreateEnquiry creates a new enquiry
func CreateEnquiry(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	ownerID := c.Get("owner_id").(string)

	if accountType == types.GuestAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	var payload types.EnquiryPost
	err := c.Bind(&payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, validatorError(err))
	}

	// Add ID
	payload.ID = uuid.NewV4().String()

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	// If account type is not a customer, require customerID to be set
	if accountType != types.CustomerAccount {
		if payload.CustomerID == "" {
			return echo.NewHTTPError(http.StatusBadRequest,
				"Enquiry created by a non-customer requires cusotmer ID to be set")
		}

		// Check if the customer exists
		customer, dbErr := db.GetCustomerByID(payload.CustomerID)
		if dbErr != nil {
			return dbErr
		}

		if customer == nil {
			return echo.NewHTTPError(http.StatusNotFound, "Provided customer does not exist")
		}

		if customer.IsDeleted {
			return echo.NewHTTPError(http.StatusBadRequest, "Provided customer is deleted")
		}

	} else {
		payload.CustomerID = ownerID
	}

	if payload.Type == "vehicle-sale" {
		if payload.VehicleID == "" {
			return echo.NewHTTPError(http.StatusBadRequest, "Vehicle type enquiries require vehicle ID")
		}

		vehicle, dbErr := db.GetVehicle(payload.VehicleID)
		if dbErr != nil {
			return dbErr
		}

		if vehicle == nil {
			return echo.NewHTTPError(http.StatusNotFound, "Vehicle not found")
		}

	} else if payload.Type == "service" {
		if payload.ServiceID == "" {
			return echo.NewHTTPError(http.StatusBadRequest, "Service type enquries require service ID")
		}

		// service, dbErr := db.GetService(payload.ServiceID)
		// if dbErr != nil {
		// 	return dbErr
		// }

		// if service == nil {
		// 	return echo.NewHTTPError(http.StatusNotFound, "Service not foun")
		// }
	}

	enquiry, dbErr := db.CreateEnquiry(payload)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusCreated, enquiry)
}

// MarkEnquiryResolved marks the enquiry resolved
func MarkEnquiryResolved(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	ownerID := c.Get("owner_id").(string)
	enquiryID := c.Param("enquiry_id")

	if accountType != types.AdminAccount && accountType != types.EmployeeAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	enquiry, dbErr := db.MarkEnquiryResolved(enquiryID, ownerID)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusOK, enquiry)
}

// DeleteEnquiry deletes enquiry from the db
func DeleteEnquiry(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	enquiryID := c.Param("enquiry_id")

	if accountType != types.AdminAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	// Establish admin connection
	db, err := db.Connect(types.AdminAccount)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	enquiry, dbErr := db.GetEnquiryByID(enquiryID)
	if dbErr != nil {
		return dbErr
	}

	if enquiry == nil {
		return echo.NewHTTPError(http.StatusNotFound)
	}

	dbErr = db.DeleteEnquiry(enquiryID)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusNoContent, "")
}

func getOptionalBool(param string, c echo.Context) *bool {
	p := c.QueryParam(param)
	v, err := strconv.ParseBool(p)
	if err != nil {
		log.Warnf("Failed to parse bool: %s", err)
		return nil
	}

	return &v
}

func getOptionalString(param string, c echo.Context) *string {
	p := c.QueryParam(param)
	if p == "" {
		return nil
	}

	return &p
}
