package server

import (
	"net/http"

	"github.com/miketonks/swag/endpoint"
	"github.com/miketonks/swag/swagger"

	"autoshop/api/controllers"
	"autoshop/api/types"
)

func enquiriesAPI() []*swagger.Endpoint {
	getEnquiries := endpoint.New("GET", "/enquiries", "Get enquries",
		endpoint.Handler(controllers.GetEnquiries),
		endpoint.Response(http.StatusOK, types.GetEnquiriesResponse{}, "Successful"),
		endpoint.QueryMap(map[string]swagger.Parameter{
			"per_page": {
				Type:        "integer",
				Description: "Records per page",
				Default:     "10",
				Minimum:     &[]int64{1}[0], // fugly but that's the only way to take temporary address
			},
			"page_number": {
				Type:        "integer",
				Description: "Page Number",
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
			"customer_id": {
				Type:        "string",
				Format:      "uuid",
				Description: "Enquiried by",
			},
			"employee_id": {
				Type:        "string",
				Format:      "uuid",
				Description: "Resolved by",
			},
		}),
		endpoint.Tags("Enquiries"),
	)

	getEnquiry := endpoint.New("GET", "/enquiries/{enquiry_id}", "Get enquiry",
		endpoint.Handler(controllers.GetEnquiry),
		endpoint.Response(http.StatusOK, types.Enquiry{}, "Successful"),
		endpoint.Path("enquiry_id", "string", "uuid", "UUID of an enquiry"),
		endpoint.Tags("Enquiries"),
	)

	createEnquiry := endpoint.New("POST", "/enquiries", "Create enquiry",
		endpoint.Handler(controllers.CreateEnquiry),
		endpoint.Response(http.StatusCreated, types.Enquiry{}, "Successful"),
		endpoint.Body(types.EnquiryPost{}, "Customer payload", true),
		endpoint.Tags("Enquiries"),
	)

	markEnquiryResolved := endpoint.New("POST", "/enquiries/{enquiry_id}/resolved", "Mark enquiry resolved",
		endpoint.Handler(controllers.MarkEnquiryResolved),
		endpoint.Response(http.StatusNoContent, "", "Successful"),
		endpoint.Path("enquiry_id", "string", "uuid", "UUID of an enquiry"),
		endpoint.Body(types.MarkEnquiryResolved{}, "Body not allowed", false),
		endpoint.Tags("Enquiries"),
	)

	deleteEnquiry := endpoint.New("DELETE", "/enquiries/{enquiry_id}", "Delete enquiry",
		endpoint.Handler(controllers.DeleteEnquiry),
		endpoint.Response(http.StatusNoContent, "", "Successful"),
		endpoint.Path("enquiry_id", "string", "uuid", "UUID of an enquiry"),
		endpoint.Tags("Enquiries"),
	)

	return []*swagger.Endpoint{
		getEnquiries,
		getEnquiry,
		createEnquiry,
		markEnquiryResolved,
		deleteEnquiry,
	}
}
