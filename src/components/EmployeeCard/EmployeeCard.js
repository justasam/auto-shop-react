import React,  { useState, useEffect} from 'react';
import './index.css';

const EmployeeCard = ({employee_id}) => {
  const [employeeDetails, setEmployeeDetails] = useState({})
  useEffect(() => {
      async function getEmployee() {
        const employeeResp = await fetch(
            "/autoshop/api/employees/"+employee_id, {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json"
                }
            }
        )             
        if (employeeResp.status !== 200) {
            return (
                <div>Failed to retrieve Customer</div>
            )
        }
        let employee = await employeeResp.json()
        console.log(employee)
        setEmployeeDetails(employee)
        
      }
      getEmployee();
  }, {});

  return (
    <div>
      <table class="inner-table" style={{width:"100%"}}>
        <tr>
            <td>ID:</td><td>{employeeDetails.id}</td>
        </tr>
        <tr>
            <td>Name:</td><td>{employeeDetails.name}</td>
        </tr>
        <tr>
            <td>Surname:</td><td>{employeeDetails.surname}</td>
        </tr>
        <tr>
            <td>Poistion:</td><td>{employeeDetails.position}</td>
        </tr>
        <tr>
            <td>Email:</td><td>{employeeDetails.email}</td>
        </tr>
        <tr>
            <td>Phone Number:</td><td>{employeeDetails.phone_number}</td>
        </tr>
        <tr>
            <td>Address:</td><td>{employeeDetails.address}</td>
        </tr>
        <tr>
            <td>Branch ID:</td><td>{employeeDetails.branch_id}</td>
        </tr>
        <tr>
            <td>Account ID:</td><td>{employeeDetails.account_id}</td>
        </tr>
      </table>
    </div>
  )
}

export default EmployeeCard;
