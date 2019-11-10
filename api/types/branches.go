package types

// BranchPost represents branch creation payload
type BranchPost struct {
	ID      string  `db:"id"`
	Name    string  `db:"name" json:"name" binding:"required" min_length:"1"`
	Address string  `db:"address" json:"address" binding:"required" min_length:"1"`
	Manager *string `db:"manager" json:"manager" format:"uuid"`
}

// Branch represents a branch
type Branch struct {
	ID      string  `db:"id" json:"id"`
	Name    string  `db:"name" json:"name"`
	Address string  `db:"address" json:"address"`
	Manager *string `db:"manager" json:"manager"`
}
