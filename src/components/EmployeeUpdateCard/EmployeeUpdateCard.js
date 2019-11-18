import React,  { useState, useEffect} from 'react';
import useForm from "react-hook-form";
import * as yup from "yup";
import { useAlert } from "react-alert";
import './index.css';

const EmployeeUpdateSchema = yup.object().shape({
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
});

const EmployeeUpdateCard = ({employee, setEmployeeData}) => {
  const { register, errors, handleSubmit, setValue } = useForm({
    validationSchema: EmployeeUpdateSchema
  });

  const alert = useAlert();
  const onSubmit = async data => {
    const response = await fetch("/autoshop/api/employees/" + employee.id, {
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

    setEmployeeData(resp);

    alert.success("Success");
  };

  const [branches, setBranches] = useState([])
  const [positions, setPositions] = useState([])
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

          setPositions(data);
      }
      getPositions();
      
      for(let key in employee) {
        setValue(key, employee[key]);
      }
  }, {});


  return (
    <div>
      <form className="custom-form"  onSubmit={handleSubmit(onSubmit)} style={{maxWidth:"650px"}}>
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
        </div>
        <input type="submit" />
      </form>
    </div>
  )
}

export default EmployeeUpdateCard;
