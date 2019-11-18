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

// LogOutPost Dummy payload for log out
type LogOutPost struct{}

// PasswordChangePost represents password change payload
type PasswordChangePost struct {
	Password string `db:"password" json:"password" binding:"required"`
	ID       string `db:"id" json:"-"`
	Username string `db:"username" json:"-"`
	Type     string `db:"type" json:"-"`
	OwnerID  string `db:"owner_id" json:"-"`
}

// LoggedUser returns currentlt logged in user
type LoggedUser struct {
	Employee *Employee `json:"employee,omitempty"`
	Customer *Customer `json:"customer,omitempty"`
}

// Account represents account
type Account struct {
	ID       string `db:"id" json:"id"`
	Username string `db:"username" json:"username"`
	Password string `db:"password" json:"password"`
	Type     string `db:"type" json:"type"`
	OwnerID  string `db:"owner_id" json:"owner_id"`
}

// GetAccountsResponse represents GET ALL accounts
type GetAccountsResponse struct {
	Objects    []Customer `json:"objects"`
	Total      int        `json:"total"`
	PerPage    int        `json:"per_page"`
	PageNumber int        `json:"page_number"`
}
