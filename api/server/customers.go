package server

import (
	"net/http"

	"github.com/miketonks/swag/endpoint"
	"github.com/miketonks/swag/swagger"

	"autoshop/api/controllers"
	"autoshop/api/types"
)

func customerAPI() []*swagger.Endpoint {
	createCustomer := endpoint.New("POST", "/customers", "Create customer",
		endpoint.Handler(controllers.CreateCustomer),
		endpoint.Response(http.StatusCreated, types.Customer{}, "Successful"),
		endpoint.Body(types.CustomerPost{}, "Customer payload", true),
		endpoint.Tags("Customers"),
	)

	getCustomers := endpoint.New("GET", "/customers", "Get customers",
		endpoint.Handler(controllers.GetCustomers),
		endpoint.Response(http.StatusOK, types.GetEmployeesResponse{}, "Successful"),
		endpoint.QueryMap(map[string]swagger.Parameter{
			"per_page": {
				Type:        "integer",
				Description: "Records per page",
				Default:     "10",
				Minimum:     &[]int64{1}[0], // fugly but that's the only way to take temporary address
			},
			"page": {
				Type:        "integer",
				Description: "Page number",
				Default:     "1",
				Minimum:     &[]int64{1}[0], // fugly but that's the only way to take temporary address
			},
			"is_deleted": {
				Type:        "boolean",
				Description: "Customer state",
			},
		}),
		endpoint.Tags("Customers"),
	)

	getCustomer := endpoint.New("GET", "/customers/{customer_id}", "Get customer",
		endpoint.Handler(controllers.GetCustomer),
		endpoint.Response(http.StatusOK, types.Customer{}, "Successful"),
		endpoint.Path("customer_id", "string", "uuid", "UUID of a customer"),
		endpoint.Tags("Customers"),
	)

	updateCustomer := endpoint.New("PUT", "/customers/{customer_id}", "Update customer",
		endpoint.Handler(controllers.UpdateCustomer),
		endpoint.Response(http.StatusOK, types.Customer{}, "Successful"),
		endpoint.Path("customer_id", "string", "uuid", "UUID of a customer"),
		endpoint.Body(types.CustomerPut{}, "Customer update payload", true),
		endpoint.Tags("Customers"),
	)

	deleteCustomer := endpoint.New("DELETE", "/customers/{customer_id}", "Delete customer",
		endpoint.Handler(controllers.DeleteCustomer),
		endpoint.Response(http.StatusOK, types.Customer{}, "Successful"),
		endpoint.Path("customer_id", "string", "uuid", "UUID of a customer"),
		endpoint.Tags("Customers"),
	)

	getCustomerEnquiries := endpoint.New("GET", "/customers/{customer_id}/enquiries", "Get customer enquiries",
		endpoint.Handler(controllers.GetCustomerEnquiries),
		endpoint.Response(http.StatusOK, types.GetEnquiriesResponse{}, "Successful"),
		endpoint.Path("customer_id", "string", "uuid", "UUID of a customer"),
		endpoint.QueryMap(map[string]swagger.Parameter{
			"per_page": {
				Type:        "integer",
				Description: "Records per page",
				Default:     "10",
				Minimum:     &[]int64{1}[0], // fugly but that's the only way to take temporary address
			},
			"page": {
				Type:        "integer",
				Description: "Page number",
				Default:     "1",
				Minimum:     &[]int64{1}[0], // fugly but that's the only way to take temporary address
			},
			"resolved": {
				Type:        "boolean",
				Description: "Equiry resolution",
			},
			"type": {
				Type:        "string",
				Enum:        []string{"vehicle-purchase", "vehicle-sale", "service"},
				Description: "Type of the enquiry",
			},
		}),
		endpoint.Tags("Customers"),
	)

	return []*swagger.Endpoint{
		createCustomer,
		getCustomers,
		getCustomer,
		updateCustomer,
		deleteCustomer,
		getCustomerEnquiries,
	}
}
