import React, {useEffect, useState} from "react";
import useForm from "react-hook-form";
import * as yup from "yup";
import { useAlert } from "react-alert";
import HashLoader from 'react-spinners/HashLoader'
import "./index.css";

const VehicleSaleSchema = yup.object().shape({
  vehicle_id: yup.string().required("Vehicle is required"),
  sold_to: yup.string().required("Customer is required"),
  sold_for: yup.
    number("Sold for must be a number").
    required("Sold for is required").
    positive("Sold for must be positive")
});


const VehicleSaleFormalizationForm = () =>{
  const { register, errors, handleSubmit, getValues } = useForm({
    validationSchema: VehicleSaleSchema
  });

  const alert = useAlert();
  const onSubmit = async data => {
    let payload = {
      sold_to: data.sold_to,
      sold_for: data.sold_for
    }

    const response = await fetch("/autoshop/api/vehicles/"+data.vehicle_id+"/sold", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const resp = await response.json();
    if (!response.ok) {
      alert.error(JSON.stringify(resp));
      return
    }

    alert.success("Success");
  };

  const [customers, setCustomers] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
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
      setLoading(false);
  }, []);

  return (
    <div style={{height: "100%"}}>
      {
        loading ?
          <HashLoader
            sizeUnit={"px"}
            size={150}
            css={{height: "100%", margin: "0 auto"}}
            color={'#394263'} 
            loading={loading}
          />
        :
      <form className="custom-form" onSubmit={handleSubmit(onSubmit)} 
      style={{
        maxWidth: "400px",
        margin:"20px auto 20px auto"
        }}>
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
            <select name="sold_to" ref={register}>
              {customers.map((val) => {
                return <option value={val.value}>{val.name}</option>
              })}
            </select>
            {errors.sold_to && <p>{errors.sold_to.message}</p>}
          </div>
          <div>
            <label>Sold For</label>
            <input type="text" name="sold_for" ref={register} />
            {errors.sold_for && <p>{errors.sold_for.message}</p>}
          </div>
        </div>
        <input type="submit" />
      </form>
      }
    </div>
  );
}

export default VehicleSaleFormalizationForm;