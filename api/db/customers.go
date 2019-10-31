package db

import (
	"autoshop/types"
	"database/sql"
	"time"
)

// CreateCustomer creates a new customer in the db
func (c *Client) CreateCustomer(p types.CustomerPost) (*types.Customer, *types.Error) {

	var err error
	c, err = c.Begin()
	if err != nil {
		return nil, types.DatabaseError(err)
	}
	defer c.End()

	// First create account
	account, dbErr := c.CreateAccount(types.Account{
		ID:       p.AccountID,
		Username: p.Username,
		Password: p.Password,
		Type:     types.CustomerAccount,
		OwnerID:  p.ID,
	})
	if dbErr != nil {
		return nil, dbErr
	}

	// Then create the customer
	query := `INSERT INTO %s_customers 
			(id, name, surname, date_of_birth, address, email, phone_number, account_id, last_seen_at)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

	query = c.applyView(query)

	_, err = c.ex.Exec(query, p.ID, p.Name, p.Surname, p.DateOfBirth,
		p.Address, p.Email, p.PhoneNumber, account.ID, time.Now().Format("2006-01-02 15:04:05"))
	if err != nil {
		return nil, c.transformError(err)
	}

	err = c.Commit()
	if err != nil {
		return nil, c.transformError(err)
	}

	// Get the customer back
	customer, dbErr := c.GetCustomerByID(p.ID)
	if dbErr != nil {
		return nil, dbErr
	}

	return customer, nil
}

// GetCustomerByID returns customer from DB
func (c *Client) GetCustomerByID(id string) (*types.Customer, *types.Error) {
	query := `SELECT * FROM %s_customers WHERE id=?`
	query = c.applyView(query)

	var customer types.Customer
	err := c.db.Get(&customer, query, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, c.transformError(err)
	}

	return &customer, nil
}
