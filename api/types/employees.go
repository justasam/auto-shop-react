package types

// EmployeePost employee creation payload
type EmployeePost struct {
	Name        string `json:"name" binding:"required"`
	Surname     string `json:"surname" binding:"required"`
	DateOfBirth string `json:"date_of_birth" binding:"required"`
	Address     string `json:"address" binding:"required"`
	Position    string `json:"position" binding:"required"`
	Email       string `json:"email" binding:"required"`
	PhoneNumber string `json:"phone_number" binding:"required"`
	BranchID    string `json:"branch_id" binding:"required"`
	Username    string `json:"username" binding:"required"`
	Password    string `json:"password" binding:"password"`

	// Not allowed to set by the user
	AccountID string `json:"-"`
	ID        string `json:"-"`
}

// Employee represents employee
type Employee struct {
	ID          string `db:"id" json:"id"`
	Name        string `db:"name" json:"name"`
	Surname     string `db:"surname" json:"surname"`
	DateOfBirth string `db:"date_of_birth" json:"date_of_birth"`
	Address     string `db:"address" json:"address"`
	Position    string `db:"position" json:"position"`
	Email       string `db:"email" json:"email"`
	PhoneNumber string `db:"phone_number" json:"phone_number"`
	BranchID    string `db:"branch_id" json:"branch_id"`
	AccountID   string `db:"account_id" json:"account_id"`
}
