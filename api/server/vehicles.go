package server

import (
	"autoshop/controllers"
	"autoshop/types"
	"net/http"

	"github.com/miketonks/swag/endpoint"
	"github.com/miketonks/swag/swagger"
)

func vehiclesAPI() []*swagger.Endpoint {
	vehiclePurchase := endpoint.New("POST", "/vehicle-purchase", "Vehicle Purchase",
		endpoint.Handler(controllers.PurchaseVehicle),
		endpoint.Response(http.StatusCreated, types.Vehicle{}, "Success"),
		endpoint.Body(types.VehiclePost{}, "Vehicle  Purchase payload", true),
		endpoint.Tags("Vehicles"),
	)

	return []*swagger.Endpoint{
		vehiclePurchase,
	}
}
