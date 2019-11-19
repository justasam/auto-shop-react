import React,  { useState, useEffect} from 'react';
import useForm from "react-hook-form";
import * as yup from "yup";
import { useAlert } from "react-alert";
import './index.css';

const CustomerUpdateSchema = yup.object().shape({
  name: yup.string().required("Employee name is required"),
  surname: yup.string().required("Employee surname is required"),
  date_of_birth: yup.
    string().
    required("Date of birth is required").
    test("validRange", "Date or birth must be of the format YYYY-MM-DD and must be between 1920-01-01 and 2020-12-30", function(value){
      console.log(value)
      let data = Date.parse(value)
      if (!data) {
        return false
      }
      return (data >= Date.parse("1920-01-01") && data <= Date.parse("2020-12-30"))
    }),
  address: yup.string().required("Employee address is required"),
  email: yup.string().required("Employee email is required").email(),
  phone_number: yup
  .string()
  .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 
  "Phone  number requires country code and must be at least 5 digits long (country code exlucded)"),
});

const CustomerUpdateCard = ({customer, setCustomerData}) => {
  const { register, errors, handleSubmit, setValue } = useForm({
    validationSchema: CustomerUpdateSchema
  });

  const alert = useAlert();
  const onSubmit = async data => {
    const response = await fetch("/autoshop/api/customers/" + customer.id, {
        method: "PUT",
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

    setCustomerData(resp);

    alert.success("Success");
  };

  useEffect(() => {
      for(let key in customer) {
        setValue(key, customer[key]);
      }
  }, {});

  return (
    <div>
      <form className="custom-form" onSubmit={handleSubmit(onSubmit)} style={{
        maxWidth:"650px",
        margin: "20px auto 20px auto"
        }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridColumnGap: '10px',
        }}>
          <div>
            <label>Name</label>
            <input type="text" name="name" ref={register} />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div>
            <label>Surname</label>
            <input type="text" name="surname" ref={register} />
            {errors.surname && <p>{errors.surname.message}</p>}
          </div>
          <div>
            <label>Date Of Birth</label>
            <input type="text" name="date_of_birth" ref={register} />
            {errors.date_of_birth && <p>{errors.date_of_birth.message}</p>}
          </div>
          <div>
            <label>Address</label>
            <input type="text" name="address" ref={register} />
            {errors.address && <p>{errors.address.message}</p>}
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" ref={register} />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <label>Phone Number</label>
            <input type="input" name="phone_number" ref={register} />
            {errors.phone_number && <p>{errors.phone_number.message}</p>}
          </div>
        </div>
        <input type="submit" />
      </form>
    </div>
  )
}

export default CustomerUpdateCard;
