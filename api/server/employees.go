package server

import (
	"net/http"

	"github.com/miketonks/swag/endpoint"
	"github.com/miketonks/swag/swagger"

	"autoshop/api/controllers"
	"autoshop/api/types"
)

func employeeAPI() []*swagger.Endpoint {
	createEmployee := endpoint.New("POST", "/employees", "Create employee",
		endpoint.Handler(controllers.CreateEmployee),
		endpoint.Response(http.StatusCreated, types.Employee{}, "Successful"),
		endpoint.Body(types.EmployeePost{}, "Employee payload", true),
		endpoint.Tags("Employees"),
	)

	return []*swagger.Endpoint{
		createEmployee,
	}
}
