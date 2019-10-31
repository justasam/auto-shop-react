package server

import (
	"net/http"

	"github.com/miketonks/swag/endpoint"
	"github.com/miketonks/swag/swagger"

	"autoshop/controllers"
	"autoshop/types"
)

func authAPI() []*swagger.Endpoint {
	login := endpoint.New("POST", "/login", "Login",
		endpoint.Handler(controllers.Login),
		endpoint.Response(http.StatusOK, "", "Successful login"),
		endpoint.Body(types.LoginPost{}, "Login payload", true),
		endpoint.Tags("Auth"),
	)

	return []*swagger.Endpoint{
		login,
	}
}
