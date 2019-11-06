package controllers

import (
	"encoding/base64"
	"fmt"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
	uuid "github.com/satori/go.uuid"

	"autoshop/api/db"
	"autoshop/api/types"
)

// GetVehicles returns vehicles
func GetVehicles(c echo.Context) error {
	return nil

}

// GetBestSellingMakes returns best selling makes
func GetBestSellingMakes(e echo.Context) error {

	return nil
}

// PurchaseVehicle creates a vehicle and its acquisition record
func PurchaseVehicle(c echo.Context) error {
	var payload types.VehiclePost
	err := c.Bind(&payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, validatorError(err))
	}

	sess, found := getSessionByType(types.EmployeeAccount, c)
	if !found {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	db, err := db.Connect(types.EmployeeAccount)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	payload.ID = uuid.NewV4().String()
	payload.EmployeeID = sess.Values["owner_id"].(string)

	if payload.Specificaction == nil {
		empty := "{}"
		payload.Specificaction = &empty
	}

	// Create folder for vehicle photos
	err = os.Mkdir("static/vehicle_pictures/"+payload.ID, os.ModePerm)
	if err != nil {
		return fmt.Errorf("Failed to create folder to store images: %s", err)
	}

	// Create image paths for vehicle
	for i := 0; i < len(payload.Images); i++ {
		path := fmt.Sprintf("static/vehicle_pictures/%s/%d.jpg", payload.ID, i)
		payload.ImagePaths = append(payload.ImagePaths, path)
	}

	vehicle, dbErr := db.PurchaseVehicle(payload)
	if dbErr != nil {
		return fmt.Errorf("Failed to create vehicle: %s", dbErr)
	}

	// Decode and create images on disk
	for i, image := range payload.Images {
		bytes, err := base64.StdEncoding.DecodeString(image)
		if err != nil {
			return fmt.Errorf("Failed to decode image: %s", err)
		}

		file, err := os.Create(payload.ImagePaths[i])
		if err != nil {
			return fmt.Errorf("Failed to create image file: %s", err)
		}
		defer file.Close()

		_, err = file.Write(bytes)
		if err != nil {
			return fmt.Errorf("Failed to write image to file: %s", err)
		}
	}

	return c.JSON(http.StatusCreated, vehicle)
}
