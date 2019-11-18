package server

import (
	"net/http"

	"github.com/miketonks/swag/endpoint"
	"github.com/miketonks/swag/swagger"

	"autoshop/api/controllers"
	"autoshop/api/types"
)

func accountsAPI() []*swagger.Endpoint {
	getAccount := endpoint.New("GET", "/accounts/{account_id}", "Returns account",
		endpoint.Handler(controllers.GetAccountByID),
		endpoint.Response(http.StatusOK, types.Account{}, "Success"),
		endpoint.Path("account_id", "string", "uuid", "Account uuid"),
		endpoint.Tags("Accounts"),
	)

	getCurrentAccount := endpoint.New("GET", "/accounts/me", "Returns currently logged in account",
		endpoint.Handler(controllers.GetCurrentAccount),
		endpoint.Response(http.StatusOK, types.Account{}, "Success"),
		endpoint.Tags("Accounts"),
	)

	changePassword := endpoint.New("POST", "/accounts/{account_id}/password", "Changes password",
		endpoint.Handler(controllers.ChangePassword),
		endpoint.Path("account_id", "string", "uuid", "Account uuid"),
		endpoint.Body(types.PasswordChangePost{}, "Password change payload", true),
		endpoint.Response(http.StatusNoContent, "", "Success"),
		endpoint.Tags("Accounts"),
	)

	return []*swagger.Endpoint{
		getAccount,
		getCurrentAccount,
		changePassword,
	}
}
