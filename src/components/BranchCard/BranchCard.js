import React,  { useState, useEffect} from 'react';
import { useAlert } from "react-alert";
import HashLoader from 'react-spinners/HashLoader'
import './index.css';

const BranchCard = ({branch_id}) => {
  const [branchDetails, setBranchDetails] = useState({})
  const alert = useAlert();
  const [loading, setLoading] = useState(true)
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
        console.log(branch)
        setLoading(false);
        setBranchDetails(branch)
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
      </table>
      }
    </div>
  )
}

export default BranchCard;
