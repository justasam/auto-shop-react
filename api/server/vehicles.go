package server

import (
	"net/http"

	"github.com/miketonks/swag/endpoint"
	"github.com/miketonks/swag/swagger"

	"autoshop/api/controllers"
	"autoshop/api/types"
)

func vehiclesAPI() []*swagger.Endpoint {
	getVehicles := endpoint.New("POST", "/vehicles/query", "Get Vehicles",
		endpoint.Handler(controllers.GetVehicles),
		endpoint.Response(http.StatusOK, types.GetVehiclesResponse{}, "Success"),
		endpoint.Body(types.GetVehiclesFilter{}, "Fields to filter vehicles by", true),
		endpoint.Tags("Vehicles"),
	)

	vehiclePurchase := endpoint.New("POST", "/vehicles/purchase", "Vehicle Purchase",
		endpoint.Handler(controllers.PurchaseVehicle),
		endpoint.Response(http.StatusCreated, types.Vehicle{}, "Success"),
		endpoint.Body(types.VehiclePost{}, "Vehicle  Purchase payload", true),
		endpoint.Tags("Vehicles"),
	)

	bestSellingMakes := endpoint.New("GET", "/vehicles/makes/best-selling", "Best selling makes",
		endpoint.Handler(controllers.GetBestSellingMakes),
		endpoint.Response(http.StatusOK, []types.VehicleMake{}, "Success"),
		endpoint.QueryMap(map[string]swagger.Parameter{
			"limit": {
				Type:        "integer",
				Description: "Amount to return",
				Default:     "10",
				Minimum:     &[]int64{1}[0], // fugly but that's the only way to take temporary address
			},
		}),
		endpoint.Tags("vehicles"),
	)

	createVehicleMake := endpoint.New("POST", "/vehicles/makes", "Vehicle make creation",
		endpoint.Handler(controllers.CreateVehicleMake),
		endpoint.Response(http.StatusCreated, types.VehicleMake{}, "Success"),
		endpoint.Body(types.VehicleMakePost{}, "Vehicle make payload", true),
		endpoint.Tags("Vehicles"),
	)

	deleteVehicleMake := endpoint.New("DELETE", "/vehicles/makes/{make_name}", "Vehicle make deletion",
		endpoint.Handler(controllers.DeleteVehicleMake),
		endpoint.Response(http.StatusNoContent, "", "Success"),
		endpoint.Path("make_name", "string", "string", "Name of the vehicle make"),
		endpoint.Tags("Vehicles"),
	)

	return []*swagger.Endpoint{
		getVehicles,
		vehiclePurchase,
		bestSellingMakes,
		createVehicleMake,
		deleteVehicleMake,
	}
}
