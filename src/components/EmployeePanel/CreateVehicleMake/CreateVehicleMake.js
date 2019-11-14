
import React, {useState, useEffect} from 'react';
import { Input, Button } from '../../../components/Inputs';
import './index.css';

const CreateVehicleMake = () => {
    const [makes, setMakes] = useState([])
    useEffect(() => {
        async function getMakes() {
            const response = await fetch(
                "/autoshop/api/vehicles/makes",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            let data = await response.json();
            setMakes(data);
        }
        getMakes();
    }, []);

    let name = React.createRef();
    let image = React.createRef();

    let [validateName, setValidateName] = useState([]); 

    return (
        <div className="vehicle-make-form">
            <h2>Create New Vehicle Make</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr'
            }}>
                <div>
                    <h4>Make name</h4>
                    <Input type="text" ref={name} validate={validateName} width="300px"
                        onBlur={() => setValidateName(["isntEMPTY"])}
                        onFocus={() => setValidateName([])}
                    />
                    <h4>Make Image</h4>
                    <Input type="file" ref={image} accept="image/png" width="300px"/>
                    <Button name="SELL" width="100px" onClick={async () => {
                        const data = { 
                            name,
                            image
                        }

                        const response = await fetch("/autoshop/api/vehicles/makes", {
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

export default CreateVehicleMake;