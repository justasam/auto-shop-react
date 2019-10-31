package types

const (
	// GuestAccount ...
	GuestAccount = "guest"

	// CustomerAccount ...
	CustomerAccount = "customer"

	// EmployeeAccount ...
	EmployeeAccount = "employee"

	// AdminAccount ...
	AdminAccount = "admin"
)

// LoginPost login payload
type LoginPost struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// Account represents account
type Account struct {
	ID       string `db:"id" json:"id"`
	Username string `db:"username" json:"username"`
	Password string `db:"password" json:"password"`
	Type     string `db:"type" json:"type"`
	OwnerID  string `db:"owner_id" json:"owner_id"`
}
