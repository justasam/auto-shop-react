import React, {useEffect, useState} from "react";
import useForm from "react-hook-form";
import { fileToBase64 } from '../../utils.js'
import VehiclePurchaseSchema from "./schema.js"
import { useAlert } from "react-alert";
import HashLoader from 'react-spinners/HashLoader'
import "./index.css";


const VehiclePurchaseFormalizationForm = () =>{
  const { register, errors, handleSubmit, getValues } = useForm({
    validationSchema: VehiclePurchaseSchema
  });

  const alert = useAlert();
  const onSubmit = async data => {
    let values  = getValues()
    let base64files = [];
    for (let file of values.images) {
        file = await fileToBase64(file);
        file = file.split(',')[1];
        base64files.push(file);
    }
    data.images = base64files;

    const response = await fetch("/autoshop/api/vehicles/purchase", {
        method: "POST",
        body: JSON.stringify(data),
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
  const [makes, setMakes] = useState([])
  const [loadingCust, setLoadingCust] = useState(true)
  const [loadingMakes, setLoadingMakes] = useState(true)
  useEffect(() => {
      async function getCustomers() {
          const response = await fetch(
              "/autoshop/api/customers?is_deleted=false",
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

          setLoadingCust(false);
          setCustomers(data);
      }

      async function getMakes() {
          const response = await fetch(
              "/autoshop/api/vehicles/makes",
              {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )

          let data = await response.json();
          data = data.map(function (val, index) {
              return {
                  name: val.name,
                  value: val.name
              }
          });

          setLoadingMakes(false);
          setMakes(data);
      }

      getCustomers();
      getMakes();
  }, []);

  return (
    <div style={{height: "100%"}}>
      {
        loadingMakes || loadingCust ?
          <HashLoader
            sizeUnit={"px"}
            size={150}
            css={{height: "100%", margin: "0 auto"}}
            color={'#394263'} 
            loading={loadingMakes || loadingCust}
          />
        :
      <form className="custom-form" onSubmit={handleSubmit(onSubmit)} style={{
        maxWidth:"650px",
        margin: "20px auto 20px auto"
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridColumnGap: '10px',
        }}>
          <div style={{ marginBottom: 10 }}>
            <label>Make</label>
            <select name="make" ref={register}>
              {makes.map((val) => {
                return <option value={val.value}>{val.name}</option>
              })}
            </select>
            {errors.make && <p>{errors.make.message}</p>}
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Bought From Customer</label>
            <select name="customer_id" ref={register}>
              {customers.map((val) => {
                return <option value={val.value}>{val.name}</option>
              })}
            </select>
            {errors.customer_id && <p>{errors.customer_id.message}</p>}
          </div>
          <div>
            <label>Bought For</label>
            <input type="text" name="bought_for" ref={register} />
            {errors.bought_for && <p>{errors.bought_for.message}</p>}
          </div>
          <div>
            <label>Price</label>
            <input type="text" name="price" ref={register} />
            {errors.price && <p>{errors.price.message}</p>}
          </div>
          <div>
            <label>Model</label>
            <input type="text" name="model" ref={register} />
            {errors.model && <p>{errors.model.message}</p>}
          </div>
          <div>
            <label>Year</label>
            <input type="text" name="year" ref={register} />
            {errors.year && <p>{errors.year.message}</p>}
          </div>
          <div>
            <label>Mileage</label>
            <input type="text" name="milage" ref={register} />
            {errors.milage && <p>{errors.milage.message}</p>}
          </div>
          <div>
            <label>Body Type</label>
            <input type="text" name="body_type" ref={register} />
            {errors.body_type && <p>{errors.body_type.message}</p>}
          </div>
          <div>
            <label>Fuel Type</label>
            <input type="text" name="fuel_type" ref={register} />
            {errors.fuel_type && <p>{errors.fuel_type.message}</p>}
          </div>
          <div>
            <label>Doors</label>
            <input type="text" name="doors" ref={register} />
            {errors.doors && <p>{errors.doors.message}</p>}
          </div>
          <div>
            <label>Gearbox</label>
            <input type="text" name="gearbox" ref={register} />
            {errors.gearbox && <p>{errors.gearbox.message}</p>}
          </div>
          <div>
            <label>Seats</label>
            <input type="text" name="seats" ref={register} />
            {errors.seats && <p>{errors.seats.message}</p>}
          </div>
          <div>
            <label>Fuel Consumption</label>
            <input type="text" name="fuel_consumption" ref={register} />
            {errors.fuel_consumption && <p>{errors.fuel_consumption.message}</p>}
          </div>
          <div>
            <label>Colour</label>
            <input type="text" name="colour" ref={register} />
            {errors.colour && <p>{errors.colour.message}</p>}
          </div>
          <div>
            <label>Engine</label>
            <input type="text" name="engine" ref={register} />
            {errors.engine && <p>{errors.engine.message}</p>}
          </div>
          <div>
            <label>Drivetrain</label>
            <input type="text" name="drivetrain" ref={register} />
            {errors.drivetrain && <p>{errors.drivetrain.message}</p>}
          </div>
          <div>
            <label>Description</label>
            <textarea name="description" rows="40" cols="5000" ref={register} style={{width: "100%", boxSizing: "border-box"}}/>
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <div>
            <label>Specification</label>
            <textarea name="specification" rows="40" cols="5000" ref={register} style={{width: "100%", boxSizing: "border-box"}}/>
            {errors.specification && <p>{errors.specification.message}</p>}
          </div>
          <div>
            <label>Images</label>
            <input type="file" name="images" multiple accept="image/jpg" ref={register} />
            {errors.images && <p>{errors.images.message}</p>}
          </div>
        </div>
        <input type="submit" />
      </form>
      }
    </div>
  );
}

export default VehiclePurchaseFormalizationForm;