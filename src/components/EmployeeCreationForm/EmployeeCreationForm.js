import React, {useEffect, useState} from "react";
import useForm from "react-hook-form";
import forge from 'node-forge';
import * as yup from "yup";
import { useAlert } from "react-alert";
import HashLoader from 'react-spinners/HashLoader'
import "./index.css";

const sha256 = (pwd) => {
  const md = forge.md.sha256.create();
  md.update(pwd);
  return md.digest().toHex();
}

const EmployeeCreationSchema = yup.object().shape({
  name: yup.string().required("Employee name is required"),
  surname: yup.string().required("Employee surname is required"),
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
  address: yup.string().required("Employee address is required"),
  position: yup.string().required("Employee position is required"),
  email: yup.string().required("Employee email is required"),
  phone_number: yup.string().required("Employee phone_number is required"),
  branch_id: yup.string().required("Branch ID is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const EmployeeCreationForm = () =>{
  const { register, errors, handleSubmit} = useForm({
    validationSchema: EmployeeCreationSchema
  });

  const alert = useAlert();
  const onSubmit = async data => {
    data.password = sha256(data.password);
    const response = await fetch("/autoshop/api/employees", {
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

  const [branches, setBranches] = useState([])
  const [positions, setPositions] = useState([])
  const [loadingBranches, setLoadingBranches] = useState(true)
  const [loadingPositions, setLoadingPositions] = useState(true)
  useEffect(() => {
      async function getBranches() {
          const response = await fetch(
              "/autoshop/api/branches",
              {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )

          let data = await response.json();
          console.log(data)
          data = data.map(function (item, index) {
              return {
                  value: item.id,
                  name: item.name
              }
          });

          setLoadingBranches(false);
          setBranches(data);
      }
      getBranches();

      async function getPositions() {
          const response = await fetch(
              "/autoshop/api/employees/positions",
              {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )

          let data = await response.json();
          console.log(data)
          data = data.map(function (val, index) {
              return {
                  name: val.name,
                  value: val.name
              }
          });

          setLoadingPositions(false);
          setPositions(data);
      }
      getPositions();
  }, {});

  return (
    <div style={{height: "100%"}}>
      {
        loadingBranches || loadingPositions ?
          <HashLoader
            sizeUnit={"px"}
            size={150}
            css={{height: "100%", margin: "0 auto"}}
            color={'#394263'} 
            loading={loadingBranches || loadingPositions}
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
          <div style={{ marginBottom: 10 }}>
            <label>Position</label>
            <select name="position" ref={register}>
              {positions.map((val) => {
                return <option value={val.value}>{val.name}</option>
              })}
            </select>
            {errors.position && <p>{errors.position.message}</p>}
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Branch</label>
            <select name="branch_id" ref={register}>
              {branches.map((val) => {
                return <option value={val.value}>{val.name}</option>
              })}
            </select>
            {errors.branch_id && <p>{errors.branch_id.message}</p>}
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
          <input type="submit" />
        </div>
      </form>
      }
    </div>
  );
}

export default EmployeeCreationForm;