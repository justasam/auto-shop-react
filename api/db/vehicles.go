package db

import (
	"database/sql"
	"fmt"
	"strings"

	uuid "github.com/satori/go.uuid"

	"autoshop/api/types"
)

// GetVehicles returns vehicles
func (c *Client) GetVehicles(filter *types.GetVehiclesFilter, pageNumber, perPage int) ([]types.Vehicle, int, *types.Error) {
	queryf := `SELECT %s FROM %%s_vehicles v 
		JOIN %%s_vehicle_pictures vp ON vp.vehicle_id = v.id `
	queryf, namedParams := applyVehicleFilter(queryf, filter)

	// Select total for pagination
	query := fmt.Sprintf(queryf, "count(*)")
	query = c.applyView(query)

	nstmt, err := c.db.PrepareNamed(query)
	if err != nil {
		return nil, 0, c.transformError(err)
	}

	var total int
	err = nstmt.Get(&total, namedParams)
	if err != nil {
		return nil, 0, c.transformError(err)
	}

	query = fmt.Sprintf(queryf, "v.*, GROUP_CONCAT(vp.file_name) AS vehicle_pictures")
	query = c.applyView(query)
	query += " GROUP BY id LIMIT :offset, :limit"

	namedParams["offset"] = (pageNumber - 1) * perPage
	namedParams["limit"] = perPage

	nstmt, err = c.db.PrepareNamed(query)
	if err != nil {
		return nil, 0, c.transformError(err)
	}

	vehicles := []types.Vehicle{}
	err = nstmt.Select(&vehicles, namedParams)
	if err != nil {
		return nil, 0, c.transformError(err)
	}

	return vehicles, total, nil
}

// GetVehicle returns specified vehicle
func (c *Client) GetVehicle(id string) (*types.Vehicle, *types.Error) {
	query := `SELECT v.*, GROUP_CONCAT(vp.file_name) AS vehicle_pictures
		FROM %s_vehicles v
		JOIN %s_vehicle_pictures vp ON vp.vehicle_id = v.id
		WHERE v.id=? GROUP BY v.id`
	query = c.applyView(query)

	var vehicle types.Vehicle
	err := c.db.Get(&vehicle, query, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, c.transformError(err)
	}

	vehicle.Images = strings.Split(vehicle.UnsplitImagePaths, ",")

	return &vehicle, nil
}

// CreateVehicle creates a new vehicle entry in the db
func (c *Client) CreateVehicle(p types.VehiclePost) (*types.Vehicle, *types.Error) {
	query := `INSERT INTO %s_vehicles (id, make, model, year, price, milage,
		body_type, fuel_type, doors, gearbox, seats, fuel_consumption, 
		colour, engine, description, specification, drivetrain) 
		VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

	query = c.applyView(query)

	_, err := c.ex.Exec(query, p.ID, p.Make, p.Model, p.Year, p.Price,
		p.Milage, p.BodyType, p.FuelType, p.Doors, p.Gearbox, p.Seats,
		p.FuelConsumption, p.Colour, p.Engine, p.Description, p.Specificaction,
		p.Drivetrain)
	if err != nil {
		return nil, c.transformError(err)
	}

	// Get the vehicle back
	vehicle, dbErr := c.GetVehicle(p.ID)
	if dbErr != nil {
		return nil, dbErr
	}

	return vehicle, nil
}

// CreateVehiclePhotoEntries inserts vehicles photo paths to the db
func (c *Client) CreateVehiclePhotoEntries(vehicleID string, paths []string) *types.Error {
	valueStrings := []string{}
	valueArgs := []interface{}{}

	for _, p := range paths {
		valueStrings = append(valueStrings, "(?, ?)")
		valueArgs = append(valueArgs, vehicleID)
		valueArgs = append(valueArgs, p)
	}

	query := fmt.Sprintf(`INSERT INTO %%s_vehicle_pictures (vehicle_id, file_name) VALUES %s`,
		strings.Join(valueStrings, ","))
	query = c.applyView(query)

	_, err := c.ex.Exec(query, valueArgs...)
	if err != nil {
		return c.transformError(err)
	}

	return nil
}

// GetVehiclePurchaseEntry returns vehicle purchase entry based on id
func (c *Client) GetVehiclePurchaseEntry(vehicleID string) (*types.VehiclePurchaseEntry, *types.Error) {
	query := `SELECT * FROM %s_vehicle_purchases where vehicle_id=?`
	query = c.applyView(query)

	var purchase types.VehiclePurchaseEntry
	err := c.db.Get(&purchase, query, vehicleID)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, c.transformError(err)
	}

	return &purchase, nil
}

// CreateVehiclePurchaseEntry creates a new vehicle purchase entry
func (c *Client) CreateVehiclePurchaseEntry(p *types.VehiclePurchaseEntryPost) (*types.VehiclePurchaseEntry, *types.Error) {
	query := `INSERT INTO %s_vehicle_purchases 
		(id, purchased_from_customer_id, bought_for, vehicle_id, purchased_by_employee_id)
		VALUES (?, ?, ?, ?, ?)`
	query = c.applyView(query)

	_, err := c.ex.Exec(query, p.ID, p.PruchasedFromCustomerID,
		p.BoughtFor, p.VehicleID, p.PurchasedByEmployeeID)
	if err != nil {
		return nil, c.transformError(err)
	}

	// Get the entry back
	purchase, dbErr := c.GetVehiclePurchaseEntry(p.VehicleID)
	if dbErr != nil {
		return nil, dbErr
	}

	return purchase, nil
}

// PurchaseVehicle creates a new vehicle, inserts photo paths and creates a new purchase record
func (c *Client) PurchaseVehicle(p types.VehiclePost) (*types.Vehicle, *types.Error) {
	var err error
	c, err = c.Begin()
	if err != nil {
		return nil, c.transformError(err)
	}
	defer c.End()

	// Insert vehicle first
	_, dbErr := c.CreateVehicle(p)
	if dbErr != nil {
		return nil, dbErr
	}

	// Insert vehicle photo data
	dbErr = c.CreateVehiclePhotoEntries(p.ID, p.ImagePaths)
	if dbErr != nil {
		return nil, dbErr
	}

	entry := &types.VehiclePurchaseEntryPost{
		ID:                      uuid.NewV4().String(),
		VehicleID:               p.ID,
		BoughtFor:               p.BoughtFor,
		PruchasedFromCustomerID: p.CustomerID,
		PurchasedByEmployeeID:   p.EmployeeID,
	}

	// Create purchase record
	_, dbErr = c.CreateVehiclePurchaseEntry(entry)
	if dbErr != nil {
		return nil, dbErr
	}

	err = c.Commit()
	if err != nil {
		return nil, c.transformError(err)
	}

	vehicle, dbErr := c.GetVehicle(p.ID)
	if dbErr != nil {
		return nil, dbErr
	}

	return vehicle, nil
}

// GetBestSellingMakes returns best selling vehicle makes
func (c *Client) GetBestSellingMakes(limit int) ([]types.VehicleMake, *types.Error) {
	query := `SELECT m.id, m.name, m.image_path, count(vs.id) as cnt 
		FROM %s_vehicle_sales vs 
		JOIN %s_vehicles v on v.id=vs.vehicle_id 
		JOIN %s_vehicle_makes m on m.name=v.make 
		GROUP BY m.id, m.name, m.image_path
		ORDER BY cnt LIMIT ?`
	query = c.applyView(query)

	if limit == 0 {
		limit = 10
	}

	var makes []types.VehicleMake
	err := c.db.Select(&makes, query, limit)
	if err != nil {
		return nil, c.transformError(err)
	}

	return makes, nil
}

// GetVehicleMakeByName returns specified vehicle make from the db
func (c *Client) GetVehicleMakeByName(name string) (*types.VehicleMake, *types.Error) {
	query := `SELECT * FROM %s_vehicle_makes WHERE name=?`
	query = c.applyView(query)

	var make types.VehicleMake
	err := c.db.Get(&make, query, name)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, c.transformError(err)
	}

	return &make, nil
}

// CreateVehicleMake inserts a new make into the db
func (c *Client) CreateVehicleMake(p types.VehicleMakePost) (*types.VehicleMake, *types.Error) {
	query := `INSERT INTO %s_vehicle_makes (id, name, image_path)
		VALUES (? , ? , ?)`
	query = c.applyView(query)

	_, err := c.ex.Exec(query, p.ID, p.Name, p.ImagePath)
	if err != nil {
		return nil, c.transformError(err)
	}

	// Get the make back
	make, dbErr := c.GetVehicleMakeByName(p.Name)
	if dbErr != nil {
		return nil, dbErr
	}

	return make, nil
}

// DeleteVehicleMake deletes vehcile make from db
func (c *Client) DeleteVehicleMake(name string) *types.Error {
	query := `DELETE FROM %s_vehicle_makes where name=?`
	query = c.applyView(query)

	_, err := c.ex.Exec(query, name)
	if err != nil {
		return c.transformError(err)
	}

	return nil
}

func applyVehicleFilter(query string, filter *types.GetVehiclesFilter) (string, map[string]interface{}) {
	namedParams := map[string]interface{}{}
	subQuery := ""
	if filter.Make != nil {
		namedParams["make"] = *filter.Make
		subQuery += "AND make=:make"
	}

	if filter.Model != nil {
		namedParams["model"] = *filter.Model
		subQuery += "AND model=:model"
	}

	if filter.YearFrom != nil {
		namedParams["year_from"] = *filter.YearFrom
		subQuery += "AND year >= :year_from"
	}

	if filter.YearTo != nil {
		namedParams["year_to"] = *filter.YearTo
		subQuery += "AND year <= :year_to"
	}

	if filter.PriceFrom != nil {
		namedParams["price_from"] = *filter.PriceFrom
		subQuery += "AND price >= :price_from"
	}

	if filter.PriceTo != nil {
		namedParams["price_to"] = *filter.PriceTo
		subQuery += "AND price <= :price_to"
	}

	if filter.MilageFrom != nil {
		namedParams["milage_from"] = *filter.MilageFrom
		subQuery += "AND mileage <= :milage_from"
	}

	if filter.MilageTo != nil {
		namedParams["milage_to"] = *filter.MilageFrom
		subQuery += "AND mileage <= :milage_to"
	}

	if len(filter.BodyTypes) > 0 {
		bodyTypes := strings.Join(filter.BodyTypes, "','")
		namedParams["body_types"] = bodyTypes
		subQuery += "AND body_type IN (':body_types')"
	}

	if len(filter.FuelTypes) > 0 {
		fuelTypes := strings.Join(filter.FuelTypes, "','")
		namedParams["fuel_types"] = fuelTypes
		subQuery += "AND fuel_type IN (':fuel_types')"
	}

	if filter.Doors != nil {
		namedParams["doors"] = *filter.Doors
		subQuery += "AND doors=:doors"
	}

	if filter.Gearbox != nil {
		namedParams["gearbox"] = *filter.Gearbox
		subQuery += "AND gearbox=:gearbox"
	}

	if filter.Drivetrain != nil {
		namedParams["drivetrain"] = *filter.Drivetrain
		subQuery += "AND drivetrain=:drivetrain"
	}

	if filter.SeatsFrom != nil {
		namedParams["seats_from"] = *filter.SeatsFrom
		subQuery += "AND seats >= :seats_from"
	}

	if filter.SeatsTo != nil {
		namedParams["seats_to"] = *filter.SeatsTo
		subQuery += "AND seats <= :seats_to"
	}

	if filter.FuelConsumption != nil {
		namedParams["fuel_consumption"] = *filter.FuelConsumption
		subQuery += "AND fuel_consumption <= :fuel_consumption"
	}

	if len(filter.Colours) > 0 {
		colours := strings.Join(filter.Colours, "','")
		namedParams["colours"] = colours
		subQuery += "AND colour in (':colours')"
	}

	if filter.EngineFrom != nil {
		namedParams["engine_from"] = *filter.EngineFrom
		subQuery += "AND engine >= :engine_from"
	}

	if filter.EngineTo != nil {
		namedParams["engine_to"] = *filter.EngineTo
		subQuery += "AND engine <= :engine_to"
	}

	if filter.ListedAtLatest != nil {
		namedParams["created_at"] = *filter.ListedAtLatest
		subQuery += "AND create_at >= :created_at"
	}

	if len(subQuery) > 0 {
		subQuery = strings.TrimPrefix(subQuery, "AND")
		query += "WHERE " + subQuery
	}

	return query, namedParams
}
