package db

import (
	"autoshop/api/types"
	"database/sql"
	"fmt"
	"strings"
	"time"
)

// GetEnquiries returns enquiries
func (c *Client) GetEnquiries(filter *types.GetEnquiriesFilter, pageNumber, perPage int) ([]types.Enquiry, int, *types.Error) {
	queryf := `SELECT %s FROM %%s_enquiries `
	queryf, namedParams := applyEnquiryFilter(queryf, *filter)

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

	enquiries := []types.Enquiry{}
	err = nstmt.Select(&enquiries, namedParams)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, 0, nil
		}
		return nil, 0, c.transformError(err)
	}

	return enquiries, total, nil
}

// GetEnquiryByID returns enquiry from DB
func (c *Client) GetEnquiryByID(id string) (*types.Enquiry, *types.Error) {
	query := `SELECT * FROM %s_enquiries WHERE id=?`
	query = c.applyView(query)

	var enquiry types.Enquiry
	err := c.db.Get(&enquiry, query, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, c.transformError(err)
	}

	return &enquiry, nil
}

// CreateEnquiry creates a new enquiry
func (c *Client) CreateEnquiry(p types.EnquiryPost) (*types.Enquiry, *types.Error) {
	query := `INSERT INTO %s_enquiries (id, type, description, customer_id)
		VALUES(?, ?, ?, ?)`
	query = c.applyView(query)

	_, err := c.ex.Exec(query, p.ID, p.Type, p.Description, p.CustomerID)
	if err != nil {
		return nil, c.transformError(err)
	}

	// Ge the enquiry back
	enquiry, dbErr := c.GetEnquiryByID(p.ID)
	if dbErr != nil {
		return nil, dbErr
	}

	return enquiry, nil
}

// MarkEnquiryResolved marks the enquiry as resolved
func (c *Client) MarkEnquiryResolved(enquiryID, employeeID string) *types.Error {
	query := `UPDATE %s_enquiries SET resolved=true, resolved_by=? resolved_at=? WHERE id=?`
	query = c.applyView(query)

	_, err := c.ex.Exec(query, employeeID, enquiryID, time.Now().Format("2006-01-02"))
	if err != nil {
		return c.transformError(err)
	}

	return nil
}

// DeleteEnquiry deletes enquiry from DB
func (c *Client) DeleteEnquiry(id string) *types.Error {
	query := `DELETE FROM %s_enquiries WHERE id=?`
	query = c.applyView(query)

	_, err := c.ex.Exec(query, id)
	if err != nil {
		return c.transformError(err)
	}

	return nil
}

func applyEnquiryFilter(query string, filter types.GetEnquiriesFilter) (string, map[string]interface{}) {
	namedParams := map[string]interface{}{}
	subQuery := ""
	if filter.Resolved != nil {
		namedParams["resolved"] = *filter.Resolved
		subQuery += "AND resolved=:resolved"
	}

	if filter.CustomerID != nil {
		namedParams["customer_id"] = *filter.CustomerID
		subQuery += "AND customer_id=:customer_id"
	}

	if filter.EmployeeID != nil {
		namedParams["employee_id"] = *filter.EmployeeID
		subQuery += "AND employee_id=:employee_id"
	}

	if filter.Type != nil {
		namedParams["type"] = *filter.Type
		subQuery += "AND type=:type"
	}

	if len(subQuery) > 0 {
		subQuery = strings.TrimPrefix(subQuery, "AND")
		query += "WHERE " + subQuery
	}

	return query, namedParams
}
