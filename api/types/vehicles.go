package types

// GetVehiclesFilter used for fitlering vehicles
type GetVehiclesFilter struct {
	Make            *string  `json:"make"`
	Model           *string  `json:"model"`
	YearFrom        *string  `json:"year_from"`
	YearTo          *string  `json:"year_to"`
	PriceFrom       *float64 `json:"price_from"`
	PriceTo         *float64 `json:"price_to"`
	MilageFrom      *int     `json:"milage_from"`
	MilageTo        *int     `json:"milage_to"`
	BodyTypes       []string `json:"body_types"`
	FuelTypes       []string `json:"fuel_types"`
	Doors           *int     `json:"doors"`
	Gearbox         *string  `json:"gearbox"`
	Drivetrain      *string  `json:"drivetrain"`
	SeatsFrom       *int     `json:"seats_from"`
	SeatsTo         *int     `json:"seats_to"`
	FuelConsumption *float64 `json:"fuel_consumption"`
	Colours         []string `json:"colours"`
	EngineFrom      *float64 `json:"engine_from"`
	EngineTo        *float64 `json:"engine_to"`
}

// Vehicle represents a vehicle
type Vehicle struct {
	ID              string   `db:"id" json:"id"`
	Make            string   `db:"make" json:"make"`
	Model           string   `db:"model" json:"model"`
	Year            string   `db:"year" json:"year"`
	Price           float64  `db:"price" json:"price"`
	Milage          int      `db:"milage" json:"milage"`
	BodyType        string   `db:"body_type" json:"body_type"`
	FuelType        string   `db:"fuel_type" json:"fuel_type"`
	Doors           int      `db:"doors" json:"doors"`
	Gearbox         string   `db:"gearbox" json:"gearbox"`
	Drivetrain      string   `db:"drivetrain" json:"drivetrain"`
	Seats           int      `db:"seats" json:"seats"`
	FuelConsumption float64  `db:"fuel_consumption" json:"fuel_consumption"`
	Colour          string   `db:"colour" json:"colour"`
	Engine          float64  `db:"engine" json:"engine"`
	Description     string   `db:"description" json:"description"`
	Specificaction  string   `db:"specification" json:"specificaction"`
	Listed          bool     `db:"listed" json:"listed"`
	Images          []string `json:"images"`

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
	Specificaction  *string `db:"specificaction" json:"specificaction,omitempty"`

	Images     []string `json:"images" binding:"required" min_items:"1"`
	CustomerID string   `json:"customer_id" binding:"required"`
	BoughtFor  float64  `json:"bought_for" binding:"required"`
	EmployeeID string
	ImagePaths []string
}

// VehiclePurchaseEntryPost payload for creating vehicle purchase record
type VehiclePurchaseEntryPost struct {
	ID                      string  `db:"id"`
	VehicleID               string  `db:"vehicle_id" json:"vehicle_id" format:"uuid" binding:"required"`
	BoughtFor               float64 `db:"bought_for" json:"bought_for" minimum:"0" binding:"required"`
	PruchasedFromCustomerID string  `db:"purchased_from_customer_id" json:"purchased_from_customer_id" format:"uuid" binding:"required"`
	PurchasedByEmployeeID   string  `db:"purchased_by_employee_id"`
}

// VehiclePurchaseEntry represents listing after vehicle has been purchased
type VehiclePurchaseEntry struct {
	ID                      string  `db:"id" json:"id"`
	VehicleID               string  `db:"vehicle_id" json:"vehicle_id"`
	BoughtFor               float64 `db:"bought_for" json:"bought_for"`
	PruchasedFromCustomerID string  `db:"purchased_from_customer_id" json:"purchased_from_customer_id"`
	PurchasedByEmployeeID   string  `db:"purchased_by_employee_id" json:"purchased_by_employee_id"`
}

// Make represents make of vehicle
type Make struct {
	Name   string `json:"name"`
	ImgSrc string `json:"src"`
}
