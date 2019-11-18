package controllers

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"reflect"
	"strconv"

	"github.com/labstack/echo/v4"
	uuid "github.com/satori/go.uuid"

	"autoshop/api/db"
	"autoshop/api/types"
)

// GetVehicles returns vehicles
func GetVehicles(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	min := getOptionalBool("min", c)

	var payload types.GetVehiclesFilter
	err := c.Bind(&payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, validatorError(err))
	}

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	perPage := 10
	pageNumb := 1
	if payload.PerPage > 0 {
		perPage = payload.PerPage
	}
	if payload.PageNumber > 0 {
		pageNumb = payload.PageNumber
	}

	vehicles, total, dbErr := db.GetVehicles(&payload, pageNumb, perPage)
	if dbErr != nil {
		return dbErr
	}

	if min != nil && *min == true {
		objects := map[string]interface{}{
			"objects":     []interface{}{},
			"per_page":    perPage,
			"page_number": pageNumb,
			"total":       total,
		}

		for _, vehicle := range vehicles {
			objects["objects"] = append(objects["objects"].([]interface{}),
				map[string]string{
					"id":    vehicle.ID,
					"make":  vehicle.Make,
					"model": vehicle.Model,
					"year":  vehicle.Year,
				},
			)
		}
		return c.JSON(http.StatusOK, objects)
	}

	return c.JSON(http.StatusOK, types.GetVehiclesResponse{
		Objects:    vehicles,
		PerPage:    perPage,
		PageNumber: pageNumb,
		Total:      total,
	})
}

// GetVehicle returns vehicle
func GetVehicle(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	vehicleID := c.Param("vehicle_id")

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	vehicle, dbErr := db.GetVehicle(vehicleID)
	if dbErr != nil {
		return dbErr
	}

	if !vehicle.Listed {
		if accountType != types.AdminAccount && accountType != types.EmployeeAccount {
			return echo.NewHTTPError(http.StatusNotFound)
		}
	}

	return c.JSON(http.StatusOK, vehicle)
}

// DeListVehicle delists a vehicle
func DeListVehicle(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	vehicleID := c.Param("vehicle_id")

	if accountType != types.AdminAccount && accountType != types.EmployeeAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	// Check if the vehicle exists
	vehicle, dbErr := db.GetVehicle(vehicleID)
	if dbErr != nil {
		return dbErr
	}

	if vehicle == nil {
		return echo.NewHTTPError(http.StatusNotFound)
	}

	vehicle, dbErr = db.DeListVehicle(vehicleID)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusOK, vehicle)
}

// ListVehicle delists a vehicle
func ListVehicle(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	vehicleID := c.Param("vehicle_id")

	if accountType != types.AdminAccount && accountType != types.EmployeeAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	// Check if the vehicle exists
	vehicle, dbErr := db.GetVehicle(vehicleID)
	if dbErr != nil {
		return dbErr
	}

	if vehicle == nil {
		return echo.NewHTTPError(http.StatusNotFound)
	}

	vehicle, dbErr = db.ListVehicle(vehicleID)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusOK, vehicle)
}

// GetBestSellingMakes returns best selling makes
func GetBestSellingMakes(c echo.Context) error {
	limit, _ := strconv.Atoi(c.QueryParam("limit"))
	accountType := c.Get("account_type").(string)

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	makes, dbErr := db.GetBestSellingMakes(limit)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusOK, makes)
}

// CreateVehicleMake creates a new make
func CreateVehicleMake(c echo.Context) error {
	vpmp := c.Get("vehicleMakePicturesPath").(string)
	accountType := c.Get("account_type").(string)

	if accountType != types.AdminAccount && accountType != types.EmployeeAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	var payload types.VehicleMakePost
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

	// Check if the make already exists, if so don't let overwrite
	make, dbErr := db.GetVehicleMakeByName(payload.Name)
	if dbErr != nil {
		return dbErr
	}

	if make != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Make already exsists")
	}

	// Create image on disk first
	// Create folder for vehicle photos
	err = os.Mkdir(vpmp+"/"+payload.Name, os.ModePerm)
	if err != nil && !os.IsExist(err) {
		return fmt.Errorf("Failed to create folder to store images: %s", err)
	}
	path := fmt.Sprintf("%s/%s/base.png", vpmp, payload.Name)
	payload.ImagePath = path

	bytes, err := base64.StdEncoding.DecodeString(payload.Image)
	if err != nil {
		return fmt.Errorf("Failed to decode image: %s", err)
	}

	file, err := os.Create(payload.ImagePath)
	if err != nil {
		return fmt.Errorf("Failed to create image file: %s", err)
	}
	defer file.Close()

	_, err = file.Write(bytes)
	if err != nil {
		return fmt.Errorf("Failed to write image to file: %s", err)
	}

	make, dbErr = db.CreateVehicleMake(payload)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusCreated, make)
}

// DeleteVehicleMake deletes vehicle make
func DeleteVehicleMake(c echo.Context) error {
	makeName := c.Param("make_name")
	// If not an employee shoo away
	_, found := getSessionByType(types.EmployeeAccount, c)
	if !found {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	db, err := db.Connect(types.EmployeeAccount)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	// Check if the vehicle make exists
	make, dbErr := db.GetVehicleMakeByName(makeName)
	if dbErr != nil {
		return dbErr
	}

	// If make is not found return 404
	if make == nil {
		return echo.NewHTTPError(http.StatusNotFound, "Make not found")
	}

	dbErr = db.DeleteVehicleMake(makeName)
	if dbErr != nil {
		return dbErr
	}

	// Delete photo
	_, err = os.Stat(make.ImgPath)
	if err != nil && !os.IsNotExist(err) {
		return fmt.Errorf("Failed to find vehicle make image: %s", err)
	}

	err = os.Remove(make.ImgPath)
	if err != nil && !os.IsNotExist(err) {
		return fmt.Errorf("Failed to delete vehicle make image: %s", err)
	}

	return c.JSON(http.StatusNoContent, nil)
}

// GetRecentlyListedVehicles returns recently listed vehicles
func GetRecentlyListedVehicles(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	to := c.QueryParam("to")
	count := getQueryParam(reflect.Int, "count", c).(int)

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	isListed := true
	recent, _, dbErr := db.GetVehicles(
		&types.GetVehiclesFilter{
			ListedAtLatest: &to,
			Listed:         &isListed,
		}, 1, count)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusOK, recent)
}

// PurchaseVehicle creates a vehicle and its acquisition record
func PurchaseVehicle(c echo.Context) error {
	vpp := c.Get("vehiclePicturesPath").(string)
	accountType := c.Get("account_type").(string)
	accountOwnerID := c.Get("owner_id").(string)

	if accountType != types.AdminAccount && accountType != types.EmployeeAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	var payload types.VehiclePost
	err := c.Bind(&payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, validatorError(err))
	}

	// If spec is present, try to parse it
	if payload.Specification != nil {
		var validJSON json.RawMessage
		err := json.Unmarshal([]byte(*payload.Specification), &validJSON)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, "Invalid specification")
		}

		str := string(validJSON)
		payload.Specification = &str
	} else {
		empty := "{}"
		payload.Specification = &empty
	}

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	payload.ID = uuid.NewV4().String()
	payload.EmployeeID = accountOwnerID

	// Create image paths for vehicle
	for i := 0; i < len(payload.Images); i++ {
		path := fmt.Sprintf("%s/%s/%d.jpg", vpp, payload.ID, i)
		payload.ImagePaths = append(payload.ImagePaths, path)
	}

	vehicle, dbErr := db.PurchaseVehicle(payload)
	if dbErr != nil {
		return fmt.Errorf("Failed to create vehicle: %s", dbErr)
	}

	// Create folder for vehicle photos
	err = os.Mkdir(vpp+"/"+payload.ID, os.ModePerm)
	if err != nil && !os.IsExist(err) {
		return fmt.Errorf("Failed to create folder to store images: %s", err)
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

// SellVehicle marks vehicle as sold and adds new sales entry
func SellVehicle(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	accountOwnerID := c.Get("owner_id").(string)
	vehicleID := c.Param("vehicle_id")

	if accountType != types.EmployeeAccount && accountType != types.AdminAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	var payload types.VehicleSalePost
	err := c.Bind(&payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, validatorError(err))
	}

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	// Check if the vehicle exists
	vehicle, dbErr := db.GetVehicle(vehicleID)
	if dbErr != nil {
		return dbErr
	}

	if vehicle == nil {
		return echo.NewHTTPError(http.StatusNotFound)
	}

	payload.ID = uuid.NewV4().String()
	payload.EmployeeID = accountOwnerID
	payload.VehicleID = vehicleID

	dbErr = db.SellVehicle(payload)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusOK, "success")
}

// UpdateVehicle updates a vehicle
func UpdateVehicle(c echo.Context) error {
	accountType := c.Get("account_type").(string)
	vehicleID := c.Param("vehicle_id")

	if accountType != types.EmployeeAccount && accountType != types.AdminAccount {
		return echo.NewHTTPError(http.StatusForbidden)
	}

	var payload types.VehiclePut
	err := c.Bind(&payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, validatorError(err))
	}

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	// Get the vehicle to check if it exists
	vehicle, dbErr := db.GetVehicle(vehicleID)
	if dbErr != nil {
		return dbErr
	}

	if vehicle == nil {
		return echo.NewHTTPError(http.StatusNotFound)
	}

	payload.ID = vehicle.ID
	vehicle, dbErr = db.UpdateVehicle(payload)
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusOK, vehicle)
}

// GetVehicleMakes returns vehicle makes
func GetVehicleMakes(c echo.Context) error {
	accountType := c.Get("account_type").(string)

	db, err := db.Connect(accountType)
	if err != nil {
		return fmt.Errorf("Error connecting to the database: %s", err)
	}
	defer db.Close()

	makes, dbErr := db.GetVehicleMakes()
	if dbErr != nil {
		return dbErr
	}

	return c.JSON(http.StatusOK, makes)
}

// // DeleteVehiclePicture deletes picture
// func DeleteVehiclePicture(c echo.Context) error {
// 	accountType := c.Get("account_type").(string)
// 	vehicleID := c.Param("vehicle_id")
// 	image := c.QueryParam("image")

// 	if accountType != types.AdminAccount && accountType != types.EmployeeAccount {
// 		return echo.NewHTTPError(http.StatusForbidden)
// 	}

// 	db, err := db.Connect(accountType)
// 	if err != nil {
// 		return fmt.Errorf("Error connecting to the database: %s", err)
// 	}
// 	defer db.Close()

// 	// Get the vehicle to check if it exists
// 	vehicle, dbErr := db.GetVehicle(vehicleID)
// 	if dbErr != nil {
// 		return dbErr
// 	}

// 	if vehicle == nil {
// 		return echo.NewHTTPError(http.StatusNotFound)
// 	}

// 	images := vehicle.Images
// }

func getQueryParam(t reflect.Kind, param string, c echo.Context) interface{} {
	p := c.QueryParam(param)
	switch t {
	case reflect.Int:
		r, _ := strconv.Atoi(p)
		return r
	case reflect.String:
		return p
	case reflect.Bool:
		if p == "true" {
			return true
		}
		return false
	default:
		return fmt.Errorf("Unsupported type %s", t)
	}
}
