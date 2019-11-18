import React,  { useState, useEffect} from 'react';
import useForm from "react-hook-form";
import * as yup from "yup";
import { useAlert } from "react-alert";
import './index.css';

const BranchUpdateSchema = yup.object().shape({
  name: yup.string().required("Branch name is required"),
  address: yup.string().required("Adress is required"),
  manager_id: yup.string().required("Manager ID is required"),
});

const BranchUpdateCard = ({branch, setBranchData}) => {
  const { register, errors, handleSubmit, setValue } = useForm({
    validationSchema: BranchUpdateSchema
  });

  const alert = useAlert();
  const onSubmit = async data => {
    console.log(JSON.stringify(data));
    const response = await fetch("/autoshop/api/branches/" + branch.id, {
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

    setBranchData(resp);

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

      for(let key in branch) {
        setValue(key, branch[key]);
      }
  }, {});

  return (
    <div>
      <form className="custom-form" onSubmit={handleSubmit(onSubmit)} style={{maxWidth:"650px"}}>
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
            <label>Address</label>
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
  )
}

export default BranchUpdateCard;
