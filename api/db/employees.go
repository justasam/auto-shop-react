package db

import (
	"database/sql"
	"fmt"
	"strings"

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

// GetEmployees returns employee from DB
func (c *Client) GetEmployees(filter *types.GetEmployeesFilter, pageNumber,
	perPage int) ([]types.Employee, int, *types.Error) {
	queryf := `SELECT %s FROM %%s_employees `
	queryf, namedParams := applyEmployeeFilter(queryf, *filter)

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

	var employees []types.Employee
	err = nstmt.Select(&employees, namedParams)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, 0, nil
		}
		return nil, 0, c.transformError(err)
	}

	return employees, total, nil
}

// GetEmployeeByID returns employee from DB
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

// UpdateEmployee updates employee
func (c *Client) UpdateEmployee(id string, p types.EmployeePut) (*types.Employee, *types.Error) {
	query := `UPDATE %s_employees 
		SET name=:name, surname=:surname, position=:position, address=:address, 
		phone_number=:phonenumber, email=:email, branch_id=:branchid, 
		date_of_birth=:dateofbirth, account_id=:account_id
		WHERE id=:id`
	query = c.applyView(query)

	_, err := c.ex.Exec(query, p)
	if err != nil {
		return nil, c.transformError(err)
	}

	// Get the employee back
	employee, dbErr := c.GetEmployeeByID(id)
	if dbErr != nil {
		return nil, dbErr
	}

	return employee, nil
}

// DeleteEmployee deletes employee
func (c *Client) DeleteEmployee(id string) *types.Error {
	query := `UPDATE %s_employees SET is_deleted=true, account_id='' WHERE id=?`
	query = c.applyView(query)

	var err error
	c, err = c.Begin()
	if err != nil {
		return c.transformError(err)
	}
	defer c.End()

	_, err = c.ex.Exec(query, id)
	if err != nil {
		return c.transformError(err)
	}

	// Also delete employee's account
	dbErr := c.DeleteOwnerAccount(id)
	if dbErr != nil {
		return dbErr
	}

	err = c.Commit()
	if err != nil {
		return c.transformError(err)
	}

	return nil
}

// GetEmployeesSales returns all employee sales
func (c *Client) GetEmployeesSales() ([]types.EmployeeSale, *types.Error) {
	query := `SELECT * FROM %s_vehicle_sales`
	query = c.applyView(query)

	var sales []types.EmployeeSale
	err := c.db.Select(&sales, query)
	if err != nil {
		return nil, c.transformError(err)
	}

	return sales, nil
}

// GetEmployeeSales returns employee sales
func (c *Client) GetEmployeeSales(id string) ([]types.EmployeeSale, *types.Error) {
	query := `SELECT * FROM %s_vehicle_sales where sold_by_employee_id=?`
	query = c.applyView(query)

	var sales []types.EmployeeSale
	err := c.db.Select(&sales, query, id)
	if err != nil {
		return nil, c.transformError(err)
	}

	return sales, nil
}

// GetEmployeePurchases returns employee purchases
func (c *Client) GetEmployeePurchases(id string) ([]types.EmployeePurchase, *types.Error) {
	query := `SELECT * FROM %s_vehicle_purchases where purchased_by_employee_id=?`
	query = c.applyView(query)

	var purchases []types.EmployeePurchase
	err := c.db.Select(&purchases, query, id)
	if err != nil {
		return nil, c.transformError(err)
	}

	return purchases, nil
}

// GetEmployeesPurchases returns all employee purchases
func (c *Client) GetEmployeesPurchases() ([]types.EmployeePurchase, *types.Error) {
	query := `SELECT * FROM %s_vehicle_purchases`
	query = c.applyView(query)

	var purchases []types.EmployeePurchase
	err := c.db.Select(&purchases, query)
	if err != nil {
		return nil, c.transformError(err)
	}

	return purchases, nil
}

// SellVehicle marks vehicle as sold and enters a sale entry
func (c *Client) SellVehicle(p types.VehicleSalePost) *types.Error {
	query := `INSERT INTO %s_vehicle_sales (id, customer_id, sold_for, sold_by_employee_id, vehicle_id)
		VALUES(?, ?, ?, ?, ?)`
	var err error
	c, err = c.Begin()
	if err != nil {
		return c.transformError(err)
	}
	defer c.End()

	_, err = c.ex.Exec(query, p.ID, p.SoldToCustomerID, p.SoldFor, p.EmployeeID, p.VehicleID)
	if err != nil {
		return c.transformError(err)
	}

	query = `UPDATE %s_vehicles SET is_sold=true WHERE id=?`
	_, err = c.ex.Exec(query, p.VehicleID)
	if err != nil {
		return c.transformError(err)
	}

	err = c.Commit()
	if err != nil {
		return c.transformError(err)
	}

	return nil
}

func applyEmployeeFilter(query string, filter types.GetEmployeesFilter) (string, map[string]interface{}) {
	namedParams := map[string]interface{}{}
	subQuery := ""
	if filter.Position != nil {
		namedParams["position"] = *filter.Position
		subQuery += "AND position=:position"
	}

	if filter.BranchID != nil {
		namedParams["branch_id"] = *filter.BranchID
		subQuery += "AND branch_id=:branch_id"
	}

	if len(subQuery) > 0 {
		subQuery = strings.TrimPrefix(subQuery, "AND")
		query += "WHERE " + subQuery
	}

	return query, namedParams
}
