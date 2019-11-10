package server

import (
	"net/http"

	"github.com/miketonks/swag/endpoint"
	"github.com/miketonks/swag/swagger"

	"autoshop/api/controllers"
	"autoshop/api/types"
)

func authAPI() []*swagger.Endpoint {
	login := endpoint.New("POST", "/auth/login", "Login",
		endpoint.Handler(controllers.Login),
		endpoint.Response(http.StatusOK, types.Account{}, "Successful login"),
		endpoint.Body(types.LoginPost{}, "Login payload", true),
		endpoint.Tags("Auth"),
	)

	currentEntity := endpoint.New("GET", "/auth/user",
		"Get currently logged user (either customer or employee)",
		endpoint.Handler(controllers.GetLoggedInUser),
		endpoint.Response(http.StatusOK, map[string]interface{}{}, "Success"),
		endpoint.Tags("Auth"),
	)

	return []*swagger.Endpoint{
		login,
		currentEntity,
	}
}
