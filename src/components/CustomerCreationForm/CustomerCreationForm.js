import React from "react";
import useForm from "react-hook-form";
import forge from 'node-forge';
import { useAlert } from "react-alert";
import * as yup from "yup";
import "./index.css";

const sha256 = (pwd) => {
  const md = forge.md.sha256.create();
  md.update(pwd);
  return md.digest().toHex();
}

const CustomerCreationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
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
  address: yup.string().required("Address is required"),
  email: yup.string().required("Email is required"),
  phone_number: yup
  .string()
  .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 
  "Phone  number requires country code and must be at least 5 digits long (country code exlucded)"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const CustomerCreationForm = () =>{
  const { register, errors, handleSubmit} = useForm({
    validationSchema: CustomerCreationSchema
  });

  const alert = useAlert();
  const onSubmit = async data => {
    data.password = sha256(data.password);
    const response = await fetch("/autoshop/api/customers", {
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
    return null;
  };

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
            <input type="text" name="phone_number" ref={register} />
            {errors.phone_number && <p>{errors.phone_number.message}</p>}
          </div>
          <div>
            <label>Username</label>
            <input type="text" name="username" ref={register} />
            {errors.username && <p>{errors.username.message}</p>}
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" ref={register} />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default CustomerCreationForm;