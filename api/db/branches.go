package db

import (
	"database/sql"

	"github.com/jmoiron/sqlx"

	"autoshop/api/types"
)

// GetBranches returns branches
func (c *Client) GetBranches() ([]types.Branch, *types.Error) {
	query := `SELECT * FROM %s_branches`
	query = c.applyView(query)

	branches := []types.Branch{}
	err := c.db.Select(&branches, query)
	if err != nil {
		return nil, c.transformError(err)
	}

	return branches, nil
}

// GetBranchByID returns branch from db
func (c *Client) GetBranchByID(id string) (*types.Branch, *types.Error) {
	query := `SELECT * FROM %s_branches WHERE id=?`
	query = c.applyView(query)

	var branch types.Branch
	err := c.db.Get(&branch, query, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, c.transformError(err)
	}

	return &branch, nil
}

// CreateBranch creates a new branch in the db
func (c *Client) CreateBranch(p types.BranchPost) (*types.Branch, *types.Error) {
	query := `INSERT INTO %s_branches (id, name, address, manager_id)
		VALUES (:id, :name, :address, :manager_id)`
	query = c.applyView(query)

	query, args, err := sqlx.Named(query, p)
	if err != nil {
		return nil, c.transformError(err)
	}

	_, err = c.ex.Exec(query, args...)
	if err != nil {
		return nil, c.transformError(err)
	}

	// Get the branch back
	branch, dbErr := c.GetBranchByID(p.ID)
	if dbErr != nil {
		return nil, dbErr
	}

	return branch, nil
}

// UpdateBranch updates branch in the db
func (c *Client) UpdateBranch(p types.BranchPut) (*types.Branch, *types.Error) {
	query := `UPDATE %s_branches set id=:id, name=:name, address=:address, manager_id=:manager_id`
	query = c.applyView(query)

	query, args, err := sqlx.Named(query, p)
	if err != nil {
		return nil, c.transformError(err)
	}

	_, err = c.ex.Exec(query, args...)
	if err != nil {
		return nil, c.transformError(err)
	}

	// Get the branch back
	branch, dbErr := c.GetBranchByID(p.ID)
	if dbErr != nil {
		return nil, dbErr
	}

	return branch, nil
}

// DeleteBranch deletes branch from DB
func (c *Client) DeleteBranch(id string) (*types.Branch, *types.Error) {
	query := `DELETE FROM %s_branches WHERE id=?`
	query = c.applyView(query)

	_, err := c.ex.Exec(query, id)
	if err != nil {
		return nil, c.transformError(err)
	}

	// Get the branch back
	branch, dbErr := c.GetBranchByID(id)
	if dbErr != nil {
		return nil, dbErr
	}

	return branch, nil
}
