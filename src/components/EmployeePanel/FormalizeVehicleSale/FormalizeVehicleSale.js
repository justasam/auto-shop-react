
import React, {useState, useEffect} from 'react';
import { Input, Dropdown, Button } from '../../../components/Inputs';
import './index.css';

const FormalizeVehicleSale = () => {
    const [customers, setCustomers] = useState([])
    const [vehicles, setVehicles] = useState([])
    useEffect(() => {
        async function getCustomers() {
            const response = await fetch(
                "/autoshop/api/customers?is_deleted=false&per_page=1000",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )

            let data = await response.json();
            data = data.objects.map(function (item, index) {
                let name = item.name[0].toUpperCase() + item.name.slice(1);
                let surname = item.surname[0].toUpperCase() + item.surname.slice(1);
                return {
                    value: item.id,
                    name: name + " " + surname 
                }
            });

            setCustomers(data);
        }

        async function getVehicles() {
            const response = await fetch(
                "/autoshop/api/vehicles/query?min=true",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({per_page: 10000})
                }
            )

            let data = await response.json();
            data = data.objects.map(function (val, index) {
                let name = val.make + " " + val.model + " " + val.year 
                return {
                    name: "id:" + val.id + " | " + name,
                    value: val.id
                }
            });

            setVehicles(data);
        }

        getCustomers();
        getVehicles();
    }, []);


    let vehicleID = React.createRef();
    let customerID = React.createRef();
    let soldFor = React.createRef();

    let [validateSoldFor, setValidateSoldFor] = useState([]); 

    return (
        <div className="vehicle-sale-form">
            <h2>Formalise Vehicle Sale</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr'
            }}>
                <div>
                    <h4>Vehicle to be sold</h4>
                    <Dropdown ref={vehicleID} options={vehicles} width="300px"/>
                    <h4>Customer the vehicle is being sold to</h4>
                    <Dropdown ref={customerID} options={customers} width="300px"/>
                    <h4>Vehicle bought for</h4>
                    <Input type="text" ref={soldFor} validate={validateSoldFor} width="300px"
                        onBlur={() => setValidateSoldFor(["isntEMPTY", "isFLOAT"])}
                        onFocus={() => setValidateSoldFor([])}
                    />
                    <Button name="SELL" width="100px" onClick={async () => {
                        const data = { 
                            vehicle_id: vehicleID,
                            customer_id: customerID,
                            sold_for: soldFor
                        }

                        let url = "/autoshop/api/vehicles/"+vehicleID+"/sold"
                        const response = await fetch("/autoshop/api/vehicles/p", {
                            method: "POST",
                            body: JSON.stringify(data),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });
                        const resp = await response.json();
                        console.log(resp)
                    }}></Button>
                </div>
            </div>
        </div>
    )
}

export default FormalizeVehicleSale;