package types

import "encoding/json"

// GetVehiclesFilter used for fitlering vehicles
type GetVehiclesFilter struct {
	Make            *string  `json:"make"`
	Model           *string  `json:"model"`
	YearFrom        *string  `json:"year_from"`
	YearTo          *string  `json:"year_to"`
	PriceFrom       *string  `json:"price_from"`
	PriceTo         *string  `json:"price_to"`
	MilageFrom      *string  `json:"milage_from"`
	MilageTo        *string  `json:"milage_to"`
	BodyTypes       []string `json:"body_types"`
	FuelTypes       []string `json:"fuel_types"`
	Doors           *int     `json:"doors"`
	Transmission    *string  `json:"transmission"`
	Gearbox         *string  `json:"gearbox"`
	Drivetrain      *string  `json:"drivetrain"`
	SeatsFrom       *int     `json:"seats_from"`
	SeatsTo         *int     `json:"seats_to"`
	FuelConsumption *string  `json:"fuel_consumption"`
	Colours         []string `json:"colours"`
	EngineFrom      *string  `json:"engine_from"`
	EngineTo        *string  `json:"engine_to"`
	MOT             *string  `json:"mot"`
}

// Vehicle represents a vehicle
type Vehicle struct {
	ID              string          `db:"id" json:"id"`
	Make            string          `db:"make" json:"make"`
	Model           string          `db:"model" json:"model"`
	Year            string          `db:"year" json:"year"`
	Price           string          `db:"price" json:"price"`
	Milage          string          `db:"milage" json:"milage"`
	BodyType        string          `db:"body_type" json:"body_type"`
	FuelType        string          `db:"fuel_type" json:"fuel_type"`
	Doors           int             `db:"doors" json:"doors"`
	Transmission    string          `db:"transmission" json:"transmission"`
	Gearbox         string          `db:"gearbox" json:"gearbox"`
	Seats           int             `db:"seats" json:"seats"`
	FuelConsumption string          `db:"fuel_consumption" json:"fuel_consumption"`
	Colour          string          `db:"colour" json:"colour"`
	Engine          string          `db:"engine" json:"engine"`
	Description     string          `db:"description" json:"description"`
	Specificaction  json.RawMessage `db:"specificaction" json:"specificaction"`
	MOT             *string         `db:"mot" json:"mot"`
}
