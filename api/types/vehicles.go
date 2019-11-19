package types

import (
	"time"
)

// GetVehiclesFilter used for fitlering vehicles
type GetVehiclesFilter struct {
	Make            *string  `json:"make,omitempty"`
	Model           *string  `json:"model,omitempty"`
	YearFrom        *string  `json:"year_from,omitempty"`
	YearTo          *string  `json:"year_to,omitempty"`
	PriceFrom       *float64 `json:"price_from,omitempty"`
	PriceTo         *float64 `json:"price_to,omitempty"`
	MilageFrom      *int     `json:"milage_from,omitempty"`
	MilageTo        *int     `json:"milage_to,omitempty"`
	BodyType        *string  `json:"body_type,omitempty"`
	FuelType        *string  `json:"fuel_type,omitempty"`
	Doors           *int     `json:"doors,omitempty"`
	Gearbox         *string  `json:"gearbox,omitempty"`
	Drivetrain      *string  `json:"drivetrain,omitempty"`
	SeatsFrom       *int     `json:"seats_from,omitempty"`
	SeatsTo         *int     `json:"seats_to,omitempty"`
	FuelConsumption *float64 `json:"fuel_consumption,omitempty"`
	Colour          *string  `json:"colour,omitempty"`
	EngineFrom      *float64 `json:"engine_from,omitempty"`
	EngineTo        *float64 `json:"engine_to,omitempty"`
	PerPage         int      `json:"per_page" minimum:"1" default:"10"`
	PageNumber      int      `json:"page_number" minimum:"1" default:"1"`
	Listed          *bool    `json:"-"`

	ListedAtLatest *string
}

// GetVehiclesResponse represents response of GET ALL
type GetVehiclesResponse struct {
	Objects    []Vehicle `json:"objects"`
	Total      int       `json:"total"`
	PerPage    int       `json:"per_page"`
	PageNumber int       `json:"page_number"`
}

// Vehicle represents a vehicle
type Vehicle struct {
	ID              string    `db:"id" json:"id"`
	Make            string    `db:"make" json:"make"`
	Model           string    `db:"model" json:"model"`
	Year            string    `db:"year" json:"year"`
	Price           float64   `db:"price" json:"price"`
	Milage          int       `db:"milage" json:"milage"`
	BodyType        string    `db:"body_type" json:"body_type"`
	FuelType        string    `db:"fuel_type" json:"fuel_type"`
	Doors           int       `db:"doors" json:"doors"`
	Gearbox         string    `db:"gearbox" json:"gearbox"`
	Drivetrain      string    `db:"drivetrain" json:"drivetrain"`
	Seats           int       `db:"seats" json:"seats"`
	FuelConsumption float64   `db:"fuel_consumption" json:"fuel_consumption"`
	Colour          string    `db:"colour" json:"colour"`
	Engine          float64   `db:"engine" json:"engine"`
	Description     string    `db:"description" json:"description"`
	Specificaction  string    `db:"specification" json:"specification"`
	Listed          bool      `db:"listed" json:"listed"`
	IsSold          bool      `db:"is_sold" json:"is_sold"`
	Images          []string  `json:"images"`
	CreatedAt       time.Time `db:"created_at" json:"created_at"`

	// Since MYSQL has no arrays, the paths have to be aggregated
	UnsplitImagePaths string `db:"vehicle_pictures" json:"-"`
}

// VehiclePost represents the vehicle creation payload
// When vehicle is posted, it is assumed that it has been purchased from a customer
type VehiclePost struct {
	ID              string  `db:"id" json:"-"`
	Make            string  `db:"make" json:"make" binding:"required" min_length:"1"`
	Model           string  `db:"model" json:"model" binding:"required" min_length:"1"`
	Year            string  `db:"year" json:"year" binding:"required" pattern:"^\\d{4}$"`
	Price           float64 `db:"price" json:"price" binding:"required" minimum:"1"`
	Milage          int     `db:"milage" json:"milage" binding:"required"`
	BodyType        string  `db:"body_type" json:"body_type" binding:"required" min_length:"1"`
	FuelType        string  `db:"fuel_type" json:"fuel_type" binding:"required" min_length:"1"`
	Doors           int     `db:"doors" json:"doors" binding:"required" minimum:"1"`
	Gearbox         string  `db:"gearbox" json:"gearbox" binding:"required" min_length:"1"`
	Seats           int     `db:"seats" json:"seats" binding:"required" minimum:"1"`
	FuelConsumption float64 `db:"fuel_consumption" json:"fuel_consumption" binding:"required" minimum:"0"`
	Colour          string  `db:"colour" json:"colour" binding:"required" min_length:"1"`
	Engine          float64 `db:"engine" json:"engine" binding:"required" minimum:"0"`
	Description     string  `db:"description" json:"description" binding:"required"`
	Drivetrain      string  `db:"drivetrain" json:"drivetrain" binding:"required" min_length:"1"`
	Specification   *string `db:"specification" json:"specification,omitempty"`

	Images     []string `json:"images" binding:"required" min_items:"1"`
	CustomerID string   `json:"customer_id" binding:"required"`
	EmployeeID string   `json:"-"`
	BoughtFor  float64  `json:"bought_for" binding:"required"`
	ImagePaths []string `json:"-"`
}

// VehiclePut represents the vehicle update payload
type VehiclePut struct {
	Make            string  `db:"make" json:"make" binding:"required" min_length:"1"`
	Model           string  `db:"model" json:"model" binding:"required" min_length:"1"`
	Year            string  `db:"year" json:"year" binding:"required" pattern:"^\\d{4}$"`
	Price           float64 `db:"price" json:"price" binding:"required" minimum:"1"`
	Milage          int     `db:"milage" json:"milage" binding:"required"`
	BodyType        string  `db:"body_type" json:"body_type" binding:"required" min_length:"1"`
	FuelType        string  `db:"fuel_type" json:"fuel_type" binding:"required" min_length:"1"`
	Doors           int     `db:"doors" json:"doors" binding:"required" minimum:"1"`
	Gearbox         string  `db:"gearbox" json:"gearbox" binding:"required" min_length:"1"`
	Seats           int     `db:"seats" json:"seats" binding:"required" minimum:"1"`
	FuelConsumption float64 `db:"fuel_consumption" json:"fuel_consumption" binding:"required" minimum:"0"`
	Colour          string  `db:"colour" json:"colour" binding:"required" min_length:"1"`
	Engine          float64 `db:"engine" json:"engine" binding:"required" minimum:"0"`
	Description     string  `db:"description" json:"description" binding:"required"`
	Drivetrain      string  `db:"drivetrain" json:"drivetrain" binding:"required" min_length:"1"`
	Specificaction  *string `db:"specification" json:"specification,omitempty"`

	ID string `db:"id" json:"-"`
}

// VehiclePurchaseEntryPost payload for creating vehicle purchase record
type VehiclePurchaseEntryPost struct {
	ID                      string  `db:"id"`
	VehicleID               string  `db:"vehicle_id" json:"vehicle_id" format:"uuid" binding:"required"`
	PurchasedFor            float64 `db:"purchased_for" json:"purchased_for" minimum:"0" binding:"required"`
	PruchasedFromCustomerID string  `db:"purchased_from_customer_id" json:"purchased_from_customer_id" format:"uuid" binding:"required"`
	PurchasedByEmployeeID   string  `db:"purchased_by_employee_id"`
}

// VehiclePurchaseEntry represents listing after vehicle has been purchased
type VehiclePurchaseEntry struct {
	ID                      string    `db:"id" json:"id"`
	VehicleID               string    `db:"vehicle_id" json:"vehicle_id"`
	PurchasedFor            float64   `db:"purchased_for" json:"purchased_for"`
	PruchasedFromCustomerID string    `db:"purchased_from_customer_id" json:"purchased_from_customer_id"`
	PurchasedByEmployeeID   string    `db:"purchased_by_employee_id" json:"purchased_by_employee_id"`
	CustomerName            string    `db:"customer_name" json:"customer_name,omitempty"`
	CustomerSurname         string    `db:"customer_surname" json:"customer_surname,omitempty"`
	VehicleMake             string    `db:"vehicle_make" json:"vehicle_make,omitempty"`
	VehicleModel            string    `db:"vehicle_model" json:"vehicle_model,omitempty"`
	VehicleYear             int       `db:"vehicle_year" json:"vehicle_year,omitempty"`
	CreatedAt               time.Time `db:"created_at" json:"created_at"`
	BranchID                string    `db:"branch_id" json:"branch_id,omitempty"`
}

// VehicleMakePost payload for make creation
type VehicleMakePost struct {
	ID        string `db:"string" json:"-"`
	Name      string `db:"name" json:"name" min_length:"1" binding:"required"`
	Image     string `json:"image" binding:"required"`
	ImagePath string `db:"image_path" json:"-"`
}

// VehicleMake represents make of vehicle
type VehicleMake struct {
	ID      string `db:"id" json:"id"`
	Name    string `db:"name" json:"name"`
	ImgPath string `db:"image_path" json:"image_path"`
	Count   string `db:"cnt" json:"count"`
}

// VehicleSalePost represents post payload for vehicle sale
type VehicleSalePost struct {
	SoldFor          float64 `json:"sold_for" binding:"required"`
	SoldToCustomerID string  `json:"sold_to" format:"uuid" binding:"required"`

	ID         string `json:"-"`
	EmployeeID string `json:"-"`
	VehicleID  string `json:"-"`
}

// VehicleListPost dummy payload
type VehicleListPost struct{}
