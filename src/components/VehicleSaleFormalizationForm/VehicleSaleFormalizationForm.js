import React, {useEffect, useState} from "react";
import useForm from "react-hook-form";
import * as yup from "yup";
import "./index.css";

const VehicleSaleSchema = yup.object().shape({
  vehicle_id: yup.string().required("Vehicle is required"),
  customer_id: yup.string().required("Customer is required"),
  sold_for: yup.
    number("Sold for must be a number").
    required("Sold for is required").
    positive("Sold for must be positive")
});


const VehicleSaleFormalizationForm = () =>{
  const { register, errors, handleSubmit, getValues } = useForm({
    validationSchema: VehicleSaleSchema
  });

  const onSubmit = async data => {
    let values  = getValues()

    const response = await fetch("/autoshop/api/vehicles/purchase", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
      alert(response.error);
      return
    }

    const resp = await response.json();
    alert("Success");
  };

  const [customers, setCustomers] = useState([])
  const [vehicles, setVehicles] = useState([])
  useEffect(() => {
      async function getCustomers() {
          const response = await fetch(
              "/autoshop/api/customers?is_deleted=false&per_page=1000",
              {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )

          let data = await response.json();
          data = data.objects.map(function (item, index) {
              let name = item.name[0].toUpperCase() + item.name.slice(1);
              let surname = item.surname[0].toUpperCase() + item.surname.slice(1);
              return {
                  value: item.id,
                  name: name + " " + surname 
              }
          });

          setCustomers(data);
      }

      async function getVehicles() {
          const response = await fetch(
              "/autoshop/api/vehicles/query?min=true",
              {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({per_page: 10000})
              }
          )

          let data = await response.json();
          data = data.objects.map(function (val, index) {
              let name = val.make + " " + val.model + " " + val.year 
              return {
                  name: "id:" + val.id + " | " + name,
                  value: val.id
              }
          });
          setVehicles(data);
      }

      getCustomers();
      getVehicles();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridColumnGap: '10px',
        }}>
          <div style={{ marginBottom: 10 }}>
            <label>Vehicle to be sold</label>
            <select name="vehicle_id" ref={register}>
              {vehicles.map((val) => {
                return <option value={val.value}>{val.name}</option>
              })}
            </select>
            {errors.vehicle_id && <p>{errors.vehicle_id.message}</p>}
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Customer the vehicle is being sold to</label>
            <select name="customer_id" ref={register}>
              {customers.map((val) => {
                return <option value={val.value}>{val.name}</option>
              })}
            </select>
            {errors.customer_id && <p>{errors.customer_id.message}</p>}
          </div>
          <div>
            <label>Sold For</label>
            <input type="text" name="sold_for" ref={register} />
            {errors.sold_for && <p>{errors.sold_for.message}</p>}
          </div>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default VehicleSaleFormalizationForm;