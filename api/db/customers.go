package db

import (
	"database/sql"
	"fmt"
	"strings"
	"time"

	"github.com/jmoiron/sqlx"

	"autoshop/api/types"
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
	_, dbErr := c.CreateAccount(types.Account{
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
		p.Address, p.Email, p.PhoneNumber, p.AccountID, time.Now().Format("2006-01-02 15:04:05"))
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

// GetCustomers returns customers
func (c *Client) GetCustomers(filter *types.GetCustomersFilter, perPage,
	pageNumber int) ([]types.Customer, int, *types.Error) {
	queryf := `SELECT %s FROM %%s_customers `
	queryf, namedParams := applyCustomerFilter(queryf, *filter)

	query := fmt.Sprintf(queryf, "count(*)")
	query = c.applyView(query)

	nstmt, err := c.db.PrepareNamed(query)
	if err != nil {
		return nil, 0, c.transformError(err)
	}

	var total int
	err = nstmt.Get(&total, namedParams)
	if err != nil {
		return nil, 0, c.transformError(err)
	}

	query = fmt.Sprintf(queryf, "*")
	query = c.applyView(query)
	query += " LIMIT :offset, :limit"

	namedParams["offset"] = (pageNumber - 1) * perPage
	namedParams["limit"] = perPage

	nstmt, err = c.db.PrepareNamed(query)
	if err != nil {
		return nil, 0, c.transformError(err)
	}

	var customers []types.Customer
	err = nstmt.Select(&customers, namedParams)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, 0, nil
		}
		return nil, 0, c.transformError(err)
	}

	return customers, total, nil
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

// DeleteCustomer deletes customer from db
func (c *Client) DeleteCustomer(id string) (*types.Customer, *types.Error) {
	query := `UPDATE %s_customers SET is_deleted=true, account_id='' WHERE id=?`
	query = c.applyView(query)

	var err error
	c, err = c.Begin()
	if err != nil {
		return nil, c.transformError(err)
	}
	defer c.End()

	_, err = c.ex.Exec(query, id)
	if err != nil {
		return nil, c.transformError(err)
	}

	// Also delete customers account
	dbErr := c.DeleteOwnerAccount(id)
	if dbErr != nil {
		return nil, dbErr
	}

	err = c.Commit()
	if err != nil {
		return nil, c.transformError(err)
	}

	// Get the employee back
	customer, dbErr := c.GetCustomerByID(id)
	if dbErr != nil {
		return nil, dbErr
	}

	return customer, nil
}

// UpdateCustomer updates customer
func (c *Client) UpdateCustomer(id string, p types.CustomerPut) (*types.Customer, *types.Error) {
	query := `UPDATE %s_customers 
		SET name=:name, surname=:surname, address=:address, 
		phone_number=:phonenumber, email=:email, 
		date_of_birth=:dateofbirth, account_id=:accountid
		WHERE id=:id`
	query = c.applyView(query)
	query, args, err := sqlx.Named(query, p)
	if err != nil {
		return nil, c.transformError(err)
	}

	_, err = c.ex.Exec(query, args...)
	if err != nil {
		return nil, c.transformError(err)
	}

	// Get the employee back
	customer, dbErr := c.GetCustomerByID(id)
	if dbErr != nil {
		return nil, dbErr
	}

	return customer, nil
}

// GetCustomerSales returns all customer sales
func (c *Client) GetCustomerSales(id string) ([]types.EmployeePurchase, *types.Error) {
	query := `SELECT * FROM %s_vehicle_purchases where purchased_from_customer_id=?`
	query = c.applyView(query)

	sales := []types.EmployeePurchase{}
	err := c.db.Select(&sales, query, id)
	if err != nil {
		return nil, c.transformError(err)
	}

	return sales, nil
}

// GetCustomerPurchases returns employee purchases
func (c *Client) GetCustomerPurchases(id string) ([]types.EmployeeSale, *types.Error) {
	query := `SELECT * FROM %s_vehicle_sales where customer_id=?`
	query = c.applyView(query)

	purchases := []types.EmployeeSale{}
	err := c.db.Select(&purchases, query, id)
	if err != nil {
		return nil, c.transformError(err)
	}

	return purchases, nil
}

func applyCustomerFilter(query string, filter types.GetCustomersFilter) (string, map[string]interface{}) {
	namedParams := map[string]interface{}{}
	subQuery := ""
	if filter.IsDeleted != nil {
		namedParams["is_deleted"] = *filter.IsDeleted
		subQuery += "AND is_deleted=:is_deleted"
	}

	if len(subQuery) > 0 {
		subQuery = strings.TrimPrefix(subQuery, "AND")
		query += "WHERE " + subQuery
	}

	return query, namedParams
}
