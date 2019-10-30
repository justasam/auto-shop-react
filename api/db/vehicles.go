package db

import (
	"fmt"
	"strings"

	"autoshop/types"
)

// GetVehicles returns vehicles
func (c *Client) GetVehicles(filter *types.GetVehiclesFilter, pageNumber, perPage int) ([]types.Vehicle, int, *types.Error) {
	queryf := "SELECT %s FROM guest.vehicles "
	query, namedParams := applyVehicleFilter(queryf, filter)

	// Select total for pagination
	query = fmt.Sprintf(query, "count(*)")

	var total int
	err := c.db.Select(&total, query, namedParams)
	if err != nil {
		return nil, 0, types.DatabaseError(err)
	}

	query = fmt.Sprintf(query, "*")
	query += "OFFSET ? LIMIT ?"
	vehicles := []types.Vehicle{}
	err = c.db.Select(&vehicles, query, namedParams, pageNumber*perPage, perPage)
	if err != nil {
		return nil, 0, types.DatabaseError(err)
	}

	return vehicles, total, nil
}

// GetVehicle returns specified vehicle
func (c *Client) GetVehicle(id string) (*types.Vehicle, error) {
	query := "SELECT * FROM guest.vehicles WHERE id=?"

	var vehicle types.Vehicle
	err := c.db.Get(&vehicle, query, id)
	if err != nil {
		return nil, types.DatabaseError(err)
	}

	return &vehicle, nil
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

	if filter.Transmission != nil {
		namedParams["transmission"] = *filter.Transmission
		subQuery += "AND transmission=:transmission"
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

	if filter.MOT != nil {
		namedParams["mot"] = *filter.MOT
		subQuery += "AND mot <= :mot"
	}

	if len(subQuery) > 0 {
		subQuery = strings.TrimPrefix("AND", subQuery)
		query += subQuery
	}

	return query, namedParams
}
