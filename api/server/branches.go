package server

import (
	"net/http"

	"github.com/miketonks/swag/endpoint"
	"github.com/miketonks/swag/swagger"

	"autoshop/api/controllers"
	"autoshop/api/types"
)

func branchesAPI() []*swagger.Endpoint {
	getBranches := endpoint.New("GET", "/branches", "Returns branches",
		endpoint.Handler(controllers.GetBranches),
		endpoint.Response(http.StatusOK, []types.Branch{}, "Success"),
		endpoint.Tags("Branches"),
	)

	getCurrentAccount := endpoint.New("GET", "/branches/{branch_id}", "Returns a branch",
		endpoint.Handler(controllers.GetBranchByID),
		endpoint.Response(http.StatusOK, types.Branch{}, "Success"),
		endpoint.Path("branch_id", "string", "uuid", "id of a branch"),
		endpoint.Tags("Branches"),
	)

	createBranch := endpoint.New("POST", "/branches", "Creates a branch",
		endpoint.Handler(controllers.CreateBranch),
		endpoint.Response(http.StatusOK, types.Branch{}, "Success"),
		endpoint.Body(types.BranchPost{}, "Branch payload", true),
		endpoint.Tags("Branches"),
	)

	return []*swagger.Endpoint{
		getBranches,
		getCurrentAccount,
		createBranch,
	}
}
