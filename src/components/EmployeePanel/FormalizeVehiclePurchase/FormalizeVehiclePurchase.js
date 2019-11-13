
import React, {useState, useEffect} from 'react';
import { Input, Dropdown, TextArea } from '../../../components/Inputs';
import './index.css';

const FormalizeVehiclePurchase = () => {
    const [customers, setCustomers] = useState([])
    const [makes, setMakes] = useState([])
    useEffect(() => {
        async function getCustomers() {
            const response = await fetch(
                "/autoshop/api/customers",
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

        async function getMakes() {
            const response = await fetch(
                "/autoshop/vehicles/makes",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )

            let data = await response.json();
            data = data.map(function (val, index) {
                return {
                    name: val.name,
                    value: val.name
                }
            });

            setMakes(data);
        }

        getCustomers();
        getMakes();
    });


    let make = React.createRef();
    let model = React.createRef();
    let year = React.createRef();
    let price = React.createRef();
    let milage = React.createRef();
    let bodyType = React.createRef();
    let fuelType = React.createRef();
    let doors = React.createRef();
    let gearbox = React.createRef();
    let seats = React.createRef();
    let fuelConsumption = React.createRef();
    let colour = React.createRef();
    let engine = React.createRef();
    let description = React.createRef();
    let drivetrain = React.createRef();
    let specification = React.createRef();
    let images = React.createRef();
    let customerID = React.createRef();

    return (
        <div className="vehicle-purchases-form">
            <h2>Formalise Vehicle Purchase</h2>
            <div className="wrapper" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr'
            }}>
                <div>
                    <h4>Customer the vehicle was bought from</h4>
                    <Dropdown ref={customerID} options={customers} validate={["isntEMPTY"]} width="300px"/>
                    <h4>Vehicle Make</h4>
                    <Dropdown ref={make} options={makes} width="300px"/>
                    <h4>Vehicle Model</h4>
                    <Input type="text" ref={model} width="300px"/>
                    <h4>Vehicle Year</h4>
                    <Input type="text" ref={year} width="300px"/>
                    <h4>Vehicle Price</h4>
                    <Input type="text" ref={price} width="300px"/>
                    <h4>Vehicle Milage</h4>
                    <Input type="text" ref={milage} width="300px"/>
                    <h4>Vehicle Body Type</h4>
                    <Input type="text" ref={bodyType} width="300px"/>
                    <h4>Vehicle Fuel Type</h4>
                    <Input type="text" ref={fuelType} width="300px"/>
                    <h4>Vehicle Doors</h4>
                    <Input type="text" ref={doors} width="300px"/>
                </div>
                <div>
                    <h4>Vehicle Gearbox</h4>
                    <Input type="text" ref={gearbox} width="300px"/>
                    <h4>Vehicle Seats</h4>
                    <Input type="text" ref={seats} width="300px"/>
                    <h4>Vehicle Fuel Consumption</h4>
                    <Input type="text" ref={fuelConsumption} width="300px"/>
                    <h4>Vehicle Colour</h4>
                    <Input type="text" ref={colour} width="300px"/>
                    <h4>Vehicle Engine</h4>
                    <Input type="text" ref={engine} width="300px"/>
                    <h4>Vehicle Description</h4>
                    <Input type="text" ref={description} width="300px"/>
                    <h4>Vehicle Drivetrain</h4>
                    <TextArea type="text" ref={drivetrain} width="300px"/>
                    <h4>Vehicle specification</h4>
                    <Input type="text" ref={specification} width="300px"/>
                    <h4>Vehicle images</h4>
                    <Input type="file" ref={images} accept="image/jpeg" width="300px" multiple/>
                </div>
            </div>
        </div>
    )
}

export default FormalizeVehiclePurchase;