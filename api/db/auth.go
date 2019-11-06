package db

import (
	"database/sql"

	"autoshop/api/types"
)

// GetAccountByUsername returns account by username
func (c *Client) GetAccountByUsername(username string) (*types.Account, *types.Error) {
	query := "SELECT * FROM %s_accounts WHERE username=?"
	query = c.applyView(query)

	var account types.Account
	err := c.db.Get(&account, query, username)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}

		return nil, c.transformError(err)
	}

	return &account, nil
}

// GetAccountByID returns account by username
func (c *Client) GetAccountByID(id string) (*types.Account, *types.Error) {
	query := "SELECT * FROM %s_accounts WHERE id=?"
	query = c.applyView(query)

	var account types.Account
	err := c.db.Get(&account, query, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}

		return nil, c.transformError(err)
	}

	return &account, nil
}

// CreateAccount creates an account
func (c *Client) CreateAccount(p types.Account) (*types.Account, *types.Error) {
	query := `INSERT INTO %s_accounts 
			(id, username, password, type, owner_id)
			VALUES (?, ?, ?, ?, ?)`
	query = c.applyView(query)

	_, err := c.ex.Exec(query, p.ID, p.Username, p.Password, p.Type, p.OwnerID)
	if err != nil {
		return nil, c.transformError(err)
	}

	// Get the account back
	account, dbErr := c.GetAccountByID(p.ID)
	if dbErr != nil {
		return nil, dbErr
	}

	return account, nil
}
