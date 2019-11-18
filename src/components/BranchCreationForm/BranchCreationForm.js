import React, {useState, useEffect } from "react";
import useForm from "react-hook-form";
import * as yup from "yup";
import { useAlert } from "react-alert";
import "./index.css";

const BranchSchema = yup.object().shape({
  name: yup.string().required("Branch name is required"),
  address: yup.string().required("Branch address is required"),
  manager_id: yup.string().required("Manager is required"),
});


const BranchCreationForm = () =>{
  const { register, errors, handleSubmit } = useForm({
    validationSchema: BranchSchema
  });

  const alert = useAlert();
  const onSubmit = async data => {
    const response = await fetch("/autoshop/api/branches", {
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

  const [employees, setEmployees] = useState([])
  useEffect(() => {
      async function getEmployees() {
          const response = await fetch(
              "/autoshop/api/employees?per_page=1000",
              {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json"
                  }
              }
          )

          let data = await response.json();
          console.log(data)
          data = data.objects.map(function (item, index) {
              return {
                  value: item.id,
                  name: item.name + " " + item.surname
              }
          });

          setEmployees(data);
      }
      getEmployees();
  }, {});

  return (
    <div>
      <form className="custom-form" onSubmit={handleSubmit(onSubmit)} style={{
        maxWidth: "400px",
        margin: "20px auto 20px auto"
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridColumnGap: '10px',
        }}>
          <div>
            <label>Branch Name</label>
            <input type="text" name="name" ref={register} />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div>
            <label>Branch Address</label>
            <input type="text" name="address" ref={register} />
            {errors.address && <p>{errors.address.message}</p>}
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Manager</label>
            <select name="manager_id" ref={register}>
              {employees.map((val) => {
                return <option value={val.value}>{val.name}</option>
              })}
            </select>
            {errors.manager_id && <p>{errors.manager_id.message}</p>}
          </div>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default BranchCreationForm;