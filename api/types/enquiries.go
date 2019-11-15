package types

// GetEnquiriesFilter represents enquiries filter
type GetEnquiriesFilter struct {
	Resolved   *bool
	CustomerID *string
	EmployeeID *string
	Type       *string
}

// EnquiryPost represents enquiry post payload
type EnquiryPost struct {
	ID          string `db:"id" json:"-"`
	Type        string `db:"type" json:"type" enum:"vehicle-purchase,vehicle-sale,service" binding:"required"`
	Description string `db:"description" json:"description" min_length:"1" binding:"required"`
	CustomerID  string `db:"customer_id" json:"customer_id,omitempty" format:"uuid"`
	VehicleID   string `db:"vehicle_id" json:"vehicle_id,omitempty" format:"uuid"`
	ServiceID   string `db:"service_id" json:"service_id,omitempty" format:"uuid"`
}

// Enquiry represents enquriy
type Enquiry struct {
	ID              string  `db:"id" json:"id"`
	Type            string  `db:"type" json:"type"`
	Desription      string  `db:"description" json:"description"`
	Resolved        bool    `db:"resolved" json:"resolved"`
	CustomerID      string  `db:"customer_id" json:"customer_id"`
	CustomerName    *string `db:"customer_name" json:"customer_name,omitempty"`
	CustomerSurname *string `db:"customer_surname" json:"customer_surname,omitempty"`
	CustomerEmail   *string `db:"customer_email" json:"customer_email,omitempty"`
	ResolvedBy      *string `db:"resolved_by" json:"resolved_by,omitempty"`
	EmployeeName    *string `db:"employee_name" json:"employee_name,omitempty"`
	EmployeeSurname *string `db:"employee_surname" json:"employee_surname,omitempty"`
	EmployeeEmail   *string `db:"employee_email" json:"employee_email,omitempty"`
	VehicleID       *string `db:"vehicle_id" json:"vehicle_id,omitempty"`
	ServiceID       *string `db:"service_id" json:"service_id,omitempty"`
	CreatedAt       string  `db:"created_at" json:"created_at"`
	ResolvedAt      *string `db:"resolved_at" json:"resolved_at,omitempty"`
}

// GetEnquiriesResponse represents enquiries GET ALL resp
type GetEnquiriesResponse struct {
	Objects    []Enquiry `json:"objects"`
	Total      int       `json:"total"`
	PerPage    int       `json:"per_page"`
	PageNumber int       `json:"page_number"`
}

// MarkEnquiryResolved is a dummy struct to bypass POST body required
type MarkEnquiryResolved struct{}
