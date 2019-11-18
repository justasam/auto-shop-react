import React,  { useState, useEffect} from 'react';
import HashLoader from 'react-spinners/HashLoader'
import './index.css';

const CustomerCard = ({customer_id}) => {
  const [customerDetails, setCustomerDetails] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
      async function getCustomer() {
        const customerResp = await fetch(
            "/autoshop/api/customers/"+customer_id, {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json"
                }
            }
        )             
        if (customerResp.status !== 200) {
            return (
                <div>Failed to retrieve Customer</div>
            )
        }
        let customer = await customerResp.json()
        console.log(customer)
        setLoading(false);
        setCustomerDetails(customer)
      }
      getCustomer();
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
            <td>ID:</td><td>{customerDetails.id}</td>
        </tr>
        <tr>
            <td>Name:</td><td>{customerDetails.name}</td>
        </tr>
        <tr>
            <td>Surname:</td><td>{customerDetails.surname}</td>
        </tr>
        <tr>
            <td>Address:</td><td>{customerDetails.address}</td>
        </tr>
        <tr>
            <td>Email:</td><td>{customerDetails.email}</td>
        </tr>
        <tr>
            <td>Phone Number:</td><td>{customerDetails.phone_number}</td>
        </tr>
        <tr>
            <td>Account ID:</td><td>{customerDetails.account_id}</td>
        </tr>
      </table>
      }
    </div>
  )
}

export default CustomerCard;
