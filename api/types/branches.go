package types

// BranchPost represents branch creation payload
type BranchPost struct {
	ID        string `db:"id" json:"-"`
	Name      string `db:"name" json:"name" binding:"required" min_length:"1"`
	Address   string `db:"address" json:"address" binding:"required" min_length:"1"`
	ManagerID string `db:"manager_id" json:"branch_id" binding:"required" format:"uuid"`
}

// Branch represents a branch
type Branch struct {
	ID             string  `db:"id" json:"id"`
	Name           string  `db:"name" json:"name"`
	Address        string  `db:"address" json:"address"`
	ManagerID      *string `db:"manager_id" json:"manager_id,omitempty"`
	ManagerSurname *string `db:"manager_surname" json:"manager_surname,omitempty"`
	ManagerName    *string `db:"manager_name" json:"manager_name,omitempty"`
	ManagerPhone   *string `db:"manager_phone" json:"manager_phone,omitempty"`
	ManagerEmail   *string `db:"manager_email" json:"manager_email,omitempty"`
}
