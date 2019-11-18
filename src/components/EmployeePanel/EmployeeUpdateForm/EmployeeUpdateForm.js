import React,  { useState, useEffect} from 'react';
import useForm from "react-hook-form";
import {useAlert} from "react-alert";
import * as yup from "yup";
import './index.css';

const EmployeeUpdateSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  date_of_birth: yup.
    string().
    required("Date of birth is required").
    test("validRange", "Date or birth cannot be negative and must be between 1920-2000", function(value){
      console.log(value)
      let data = Date.parse(value)
      if (!data) {
        return false
      }
      return (data >= Date.parse("1920-01-01") && data <= Date.parse("2020-12-30"))
    }),
  address: yup.string().required("Address is required"),
  email: yup.string().required("Email is required").email(),
  phone_number: yup.string().required("Phone number is required"),
});

const EmployeeUpdateForm = ({employee_id}) => {
  const { register, errors, handleSubmit, setValue } = useForm({
    validationSchema: EmployeeUpdateSchema
  });
  const alert = useAlert();

  const onSubmit = async data => {
    const response = await fetch("/autoshop/api/employees/" + employee_id, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const resp = await response.json();
    console.log(response)
    if (!response.ok) {
      alert.error(JSON.stringify(resp));
      return
    }

    alert.success("Success");
  };


  useEffect(() => {
    async function getEmployee(){
      const response = await fetch("/autoshop/api/employees/" + employee_id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
      });

      let employee = await response.json();
      console.log(response)
      if (!response.ok) {
        alert.error(JSON.stringify(employee));
        return
      }

      for(let key in employee) {
          setValue(key, employee[key]);
      }
    }
    getEmployee();
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

export default EmployeeUpdateForm;
