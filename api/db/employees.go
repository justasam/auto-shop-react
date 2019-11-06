package db

import (
	"database/sql"

	"autoshop/api/types"
)

// CreateEmployee creates a new employee in the db
func (c *Client) CreateEmployee(p types.EmployeePost) (*types.Employee, *types.Error) {

	var err error
	c, err = c.Begin()
	if err != nil {
		return nil, c.transformError(err)
	}
	defer c.End()

	// First create account
	_, dbErr := c.CreateAccount(types.Account{
		ID:       p.AccountID,
		Username: p.Username,
		Password: p.Password,
		Type:     types.EmployeeAccount,
		OwnerID:  p.ID,
	})
	if dbErr != nil {
		return nil, dbErr
	}

	// Then create the customer
	query := `INSERT INTO %s_employees 
			(id, name, surname, date_of_birth, address, email, phone_number, account_id, position, branch_id)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	query = c.applyView(query)

	_, err = c.ex.Exec(query, p.ID, p.Name, p.Surname, p.DateOfBirth,
		p.Address, p.Email, p.PhoneNumber, p.AccountID, p.Position, p.BranchID)
	if err != nil {
		return nil, c.transformError(err)
	}

	err = c.Commit()
	if err != nil {
		return nil, c.transformError(err)
	}

	// Get the customer back
	employee, dbErr := c.GetEmployeeByID(p.ID)
	if dbErr != nil {
		return nil, dbErr
	}

	return employee, nil
}

// GetEmployeeByID returns  from DB
func (c *Client) GetEmployeeByID(id string) (*types.Employee, *types.Error) {
	query := `SELECT * FROM %s_employees WHERE id=?`
	query = c.applyView(query)

	var employee types.Employee
	err := c.db.Get(&employee, query, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, c.transformError(err)
	}

	return &employee, nil
}
