package types

import (
	"encoding/json"
	"time"
)

// EmployeePost employee creation payload
type EmployeePost struct {
	Name        string `json:"name" binding:"required"`
	Surname     string `json:"surname" binding:"required"`
	DateOfBirth string `json:"date_of_birth" binding:"required"`
	Address     string `json:"address" binding:"required"`
	Position    string `json:"position" binding:"required"`
	Email       string `json:"email" binding:"required"`
	PhoneNumber string `json:"phone_number" binding:"required"`
	BranchID    string `json:"branch_id" binding:"required" format:"uuid"`
	Username    string `json:"username" binding:"required"`
	Password    string `json:"password" binding:"password"`

	// Not allowed to set by the user
	AccountID string `json:"-"`
	ID        string `json:"-"`
}

// GetEmployeesFilter to filter employees by
type GetEmployeesFilter struct {
	Position *string `db:"position"`
	BranchID *string `db:"branch_id"`
	Address  *string `db:"address"`
}

// EmployeePut represents payload for updating employee
type EmployeePut struct {
	ID          string  `json:"-"`
	Name        string  `json:"name" binding:"required"`
	Surname     string  `json:"surname" binding:"required"`
	DateOfBirth string  `json:"date_of_birth" binding:"required"`
	Address     string  `json:"address" binding:"required"`
	Position    *string `json:"position,omitempty"`
	Email       string  `json:"email" binding:"required"`
	PhoneNumber string  `json:"phone_number" binding:"required"`
	BranchID    *string `json:"branch_id,omitempty" format:"uuid"`
	AccountID   string  `db:"account_id" json:"-"`
}

// Employee represents employee
type Employee struct {
	ID          string `db:"id" json:"id,omitempty"`
	Name        string `db:"name" json:"name"`
	Surname     string `db:"surname" json:"surname"`
	DateOfBirth string `db:"date_of_birth" json:"date_of_birth,omitempty"`
	Address     string `db:"address" json:"address,omitempty"`
	Position    string `db:"position" json:"position,omitempty"`
	Email       string `db:"email" json:"email,omitempty"`
	PhoneNumber string `db:"phone_number" json:"phone_number,omitempty"`
	BranchID    string `db:"branch_id" json:"branch_id,omitempty"`
	AccountID   string `db:"account_id" json:"account_id,omitempty"`
	IsDeleted   bool   `db:"is_deleted" json:"is_deleted"`
}

// MarshalJSON implements json.Marshaler
func (s Employee) MarshalJSON() ([]byte, error) {
	type Alias Employee
	if s.DateOfBirth != "" {
		t, _ := time.Parse("2006-01-02T15:04:05Z", s.DateOfBirth)
		s.DateOfBirth = t.Format("2006-01-02")
	}
	return json.Marshal(struct {
		Alias
	}{
		Alias: (Alias)(s),
	})
}

// GetEmployeesResponse represents GET ALL employees
type GetEmployeesResponse struct {
	Objects    []Employee `json:"objects"`
	Total      int        `json:"total"`
	PerPage    int        `json:"per_page"`
	PageNumber int        `json:"page_number"`
}

// EmployeeSale represents employee sale
type EmployeeSale struct {
	ID               string  `db:"id" json:"id"`
	SoldFor          float64 `db:"sold_for" json:"sold_for"`
	SoldToCustomerID string  `db:"customer_id" json:"sold_to_customer_id"`
	VehicleID        string  `db:"vehicle_id" json:"vehicle_id"`
	SoldByEmployeeID string  `db:"sold_by_employee_id" json:"sold_by_employee_id"`
	CustomerName     string  `db:"customer_name" json:"customer_name,omitempty"`
	CustomerSurname  string  `db:"customer_surname" json:"customer_surname,omitempty"`
	VehicleMake      string  `db:"vehicle_make" json:"vehicle_make,omitempty"`
	VehicleModel     string  `db:"vehicle_model" json:"vehicle_model,omitempty"`
	VehicleYear      int     `db:"vehicle_year" json:"vehicle_year,omitempty"`
}

// EmployeePurchase represents employee purchase
type EmployeePurchase struct {
	ID                      string  `db:"id" json:"id"`
	PurchasedFor            float64 `db:"purchased_for" json:"purchased_for"`
	PurchasedFromCustomerID string  `db:"purchased_from_customer_id" json:"purchased_from_customer_id"`
	VehicleID               string  `db:"vehicle_id" json:"vehicle_id"`
	PurchasedByEmployeeID   string  `db:"purchased_by_employee_id" json:"purchased_by_employee_id"`
	CustomerName            string  `db:"customer_name" json:"customer_name,omitempty"`
	CustomerSurname         string  `db:"customer_surname" json:"customer_surname,omitempty"`
	VehicleMake             string  `db:"vehicle_make" json:"vehicle_make,omitempty"`
	VehicleModel            string  `db:"vehicle_model" json:"vehicle_model,omitempty"`
	VehicleYear             int     `db:"vehicle_year" json:"vehicle_year,omitempty"`
}

// EmployeePosition represents employee position
type EmployeePosition struct {
	ID   string `db:"id" json:"id"`
	Name string `db:"name" json:"name"`
}
