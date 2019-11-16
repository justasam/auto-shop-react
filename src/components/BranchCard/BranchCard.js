import React,  { useState, useEffect} from 'react';
import './index.css';

const BranchCard = ({branch_id}) => {
  const [branchDetails, setBranchDetails] = useState({})
  useEffect(() => {
      async function getBranch() {
        const branchResp = await fetch(
            "/autoshop/api/branches/"+branch_id, {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json"
                }
            }
        )             
        if (branchResp.status !== 200) {
            alert("Failed to load branch data: " + branchResp.statusText)
        }
        let branch = await branchResp.json()
        console.log(branch)
        setBranchDetails(branch)
        
      }
      getBranch();
  }, {});

  return (
    <div>
      <table class="inner-table" style={{width:"100%"}}>
        <tr>
            <td>ID:</td><td>{branchDetails.id}</td>
        </tr>
        <tr>
            <td>Name:</td><td>{branchDetails.name}</td>
        </tr>
        <tr>
            <td>Address:</td><td>{branchDetails.address}</td>
        </tr>
        <tr>
            <td>Manager ID:</td><td>{branchDetails.manager_id}</td>
        </tr>
        <tr>
            <td>Manager Name:</td><td>{branchDetails.manager_name}</td>
        </tr>
        <tr>
            <td>Manager Surname:</td><td>{branchDetails.manager_surname}</td>
        </tr>
        <tr>
            <td>Manager Phone:</td><td>{branchDetails.manager_phone}</td>
        </tr>
        <tr>
            <td>Manager Email:</td><td>{branchDetails.manager_email}</td>
        </tr>
      </table>
    </div>
  )
}

export default BranchCard;
