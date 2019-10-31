package server

import (
	"net/http"

	"github.com/miketonks/swag/endpoint"
	"github.com/miketonks/swag/swagger"

	"autoshop/controllers"
	"autoshop/types"
)

func customerAPI() []*swagger.Endpoint {
	login := endpoint.New("POST", "/customers", "Create customer",
		endpoint.Handler(controllers.CreateCustomer),
		endpoint.Response(http.StatusCreated, types.Customer{}, "Successful login"),
		endpoint.Body(types.CustomerPost{}, "Customer payload", true),
		endpoint.Tags("Customers"),
	)

	return []*swagger.Endpoint{
		login,
	}
}
