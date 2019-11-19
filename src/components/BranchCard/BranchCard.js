import React,  { useState, useEffect} from 'react';
import { useAlert } from "react-alert";
import HashLoader from 'react-spinners/HashLoader'
import Popup from "reactjs-popup";
import { EmployeeCard } from '../EmployeeCard'
import './index.css';

const BranchCard = ({branch_id}) => {
  const [branchDetails, setBranchDetails] = useState({})
  const alert = useAlert();
  const [loading, setLoading] = useState(true)
  const [accountType, setAccountType] = useState("guest")
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

        let branch = await branchResp.json()
        if (!branchResp.ok) {
            alert.error(JSON.stringify(branch));
            return
        }

        let accountType = branchResp.headers.get("X-Autoshop-Account-Type");

        console.log(branch)
        setLoading(false);
        setBranchDetails(branch)
        setAccountType(accountType)
      }
      getBranch();
  }, {});

  return (
    <div style={{height: "100%"}}>
      {
        loading ?
          <HashLoader
            sizeUnit={"px"}
            size={150}
            css={{height: "100%", margin: "0 auto"}}
            color={'#394263'} 
            loading={loading}
          />
        :
      <table class="inner-table" style={{width:"100%"}}>
        {accountType !== "guest" && accountType !== "customer" ?
            <tr>
                <td>ID:</td><td>{branchDetails.id}</td>
            </tr>
        : null}
        <tr>
            <td>Name:</td><td>{branchDetails.name}</td>
        </tr>
        <tr>
            <td>Address:</td><td>{branchDetails.address}</td>
        </tr>
        {accountType === "admin" ?
        <tr>
            <td>Manager ID:</td>
            <td>
              <Popup
                trigger={<span style={{
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline"
                }}>{branchDetails.manager_id}</span>} position="right center"
                modal
                closeOnDocumentClick
              >
                <div className="modal">
                  <div className="header"><h3>Manager Details</h3></div>
                  <EmployeeCard employee_id={branchDetails.manager_id} />
                </div>
              </Popup>
            </td>
        </tr>
        :null}
        {branchDetails.manager_name &&
        <tr>
            <td>Manager Name:</td><td>{branchDetails.manager_name}</td>
        </tr>
        }
        {branchDetails.manager_surname &&
        <tr>
            <td>Manager Surname:</td><td>{branchDetails.manager_surname}</td>
        </tr>
        }
        {branchDetails.manager_email &&
        <tr>
            <td>Manager Email:</td><td>{branchDetails.manager_email}</td>
        </tr>
        }
        {branchDetails.manager_phone &&
        <tr>
            <td>Manager phone:</td><td>{branchDetails.manager_phone}</td>
        </tr>
        }
      </table>
      }
    </div>
  )
}

export default BranchCard;
