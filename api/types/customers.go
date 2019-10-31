package types

// CustomerPost customer creation payload
type CustomerPost struct {
	Name        string `json:"name" binding:"required"`
	Surname     string `json:"surname" binding:"required"`
	DateOfBirth string `json:"date_of_birth" binding:"required"`
	Address     string `json:"address" json:"address" binding:"required"`
	Email       string `json:"email" binding:"required"`
	PhoneNumber string `json:"phone_number" binding:"required"`
	Username    string `json:"username" binding:"required"`
	Password    string `json:"password" binding:"password"`

	// Not allowed to set by the user
	AccountID string `json:"-"`
	ID        string `json:"-"`
}

// Customer represents customer
type Customer struct {
	ID          string `db:"id" json:"id"`
	Name        string `db:"name" json:"name"`
	Surname     string `db:"surname" json:"surname"`
	LastSeenAt  string `db:"last_seen_at" json:"last_seen_at"`
	DateOfBirth string `db:"date_of_birth" json:"date_of_birth"`
	Address     string `db:"address" json:"address"`
	Email       string `db:"email" json:"email"`
	PhoneNumber string `db:"phone_number" json:"phone_number"`
	AccountID   string `db:"account_id" json:"account_id"`
}
