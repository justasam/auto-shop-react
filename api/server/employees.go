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

	getEmployees := endpoint.New("GET", "/employees", "Get employees",
		endpoint.Handler(controllers.GetEmployees),
		endpoint.Response(http.StatusOK, types.GetEmployeesResponse{}, "Successful"),
		endpoint.QueryMap(map[string]swagger.Parameter{
			"per_page": {
				Type:        "integer",
				Description: "Records per page",
				Default:     "10",
				Minimum:     &[]int64{1}[0], // fugly but that's the only way to take temporary address
			},
			"page_number": {
				Type:        "integer",
				Description: "Records per page",
				Default:     "1",
				Minimum:     &[]int64{1}[0], // fugly but that's the only way to take temporary address
			},
		}),
		endpoint.Tags("Employees"),
	)

	getEmployee := endpoint.New("GET", "/employees/{employee_id}", "Get employee",
		endpoint.Handler(controllers.GetEmployee),
		endpoint.Response(http.StatusOK, types.Employee{}, "Successful"),
		endpoint.Path("employee_id", "string", "uuid", "UUID of an employee"),
		endpoint.Tags("Employees"),
	)

	getEmployeesPositions := endpoint.New("GET", "/employees/positions", "Get employees positions",
		endpoint.Handler(controllers.GetEmployeesPositions),
		endpoint.Response(http.StatusOK, []types.EmployeePosition{}, "Successful"),
		endpoint.Tags("Employees"),
	)

	updateEmployee := endpoint.New("PUT", "/employees/{employee_id}", "Update employee",
		endpoint.Handler(controllers.UpdateEmployee),
		endpoint.Response(http.StatusOK, types.Employee{}, "Successful"),
		endpoint.Path("employee_id", "string", "uuid", "UUID of an employee"),
		endpoint.Body(types.EmployeePut{}, "Employee update payload", true),
		endpoint.Tags("Employees"),
	)

	deleteEmployee := endpoint.New("DELETE", "/employees/{employee_id}", "Delete employee",
		endpoint.Handler(controllers.DeleteEmployee),
		endpoint.Response(http.StatusNoContent, types.Employee{}, "Successful"),
		endpoint.Path("employee_id", "string", "uuid", "UUID of an employee"),
		endpoint.Tags("Employees"),
	)

	getEmployeeSales := endpoint.New("GET", "/employees/{employee_id}/sales", "Get employee's sales",
		endpoint.Handler(controllers.GetEmployeeSales),
		endpoint.Response(http.StatusOK, []types.EmployeeSale{}, "Successful"),
		endpoint.Path("employee_id", "string", "uuid", "UUID of an employee"),
		endpoint.Tags("Employees"),
	)

	getEmployeesSales := endpoint.New("GET", "/employees/sales", "Get employees sales",
		endpoint.Handler(controllers.GetEmployeesSales),
		endpoint.Response(http.StatusOK, []types.EmployeeSale{}, "Successful"),
		endpoint.Tags("Employees"),
	)

	getEmployeePurchases := endpoint.New("GET", "/employees/{employee_id}/purchases", "Get employee's purchases",
		endpoint.Handler(controllers.GetEmployeePurchases),
		endpoint.Response(http.StatusOK, []types.EmployeePurchase{}, "Successful"),
		endpoint.Path("employee_id", "string", "uuid", "UUID of an employee"),
		endpoint.Tags("Employees"),
	)

	getEmployeesPurchases := endpoint.New("GET", "/employees/purchases", "Get employees purchases",
		endpoint.Handler(controllers.GetEmployeesPurchases),
		endpoint.Response(http.StatusOK, []types.EmployeePurchase{}, "Successful"),
		endpoint.Tags("Employees"),
	)

	return []*swagger.Endpoint{
		createEmployee,
		getEmployees,
		getEmployee,
		updateEmployee,
		deleteEmployee,
		getEmployeeSales,
		getEmployeesSales,
		getEmployeesPurchases,
		getEmployeePurchases,
		getEmployeesPositions,
	}
}
