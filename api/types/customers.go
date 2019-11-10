package types

import (
	"encoding/json"
	"time"
)

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
	LastSeenAt  string `db:"last_seen_at" json:"last_seen_at,omitempty"`
	DateOfBirth string `db:"date_of_birth" json:"date_of_birth,omitempty"`
	Address     string `db:"address" json:"address"`
	Email       string `db:"email" json:"email"`
	PhoneNumber string `db:"phone_number" json:"phone_number"`
	AccountID   string `db:"account_id" json:"account_id"`
	IsDeleted   bool   `db:"is_deleted" json:"is_deleted,omitempty"`
}

// MarshalJSON implements json.Marshaler
func (s Customer) MarshalJSON() ([]byte, error) {
	type Alias Customer
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

// GetCustomersFilter customers filter
type GetCustomersFilter struct{}

// GetCustomersResponse represents GET ALL customers
type GetCustomersResponse struct {
	Objects    []Customer `json:"objects"`
	Total      int        `json:"total"`
	PerPage    int        `json:"per_page"`
	PageNumber int        `json:"page_number"`
}

// CustomerPut represents payload for updating customer
type CustomerPut struct {
	ID          string
	Name        string `json:"name" binding:"required"`
	Surname     string `json:"surname" binding:"required"`
	DateOfBirth string `json:"date_of_birth" binding:"required"`
	Address     string `json:"address" binding:"required"`
	Email       string `json:"email" binding:"required"`
	PhoneNumber string `json:"phone_number" binding:"required"`
	AccountID   string
}
