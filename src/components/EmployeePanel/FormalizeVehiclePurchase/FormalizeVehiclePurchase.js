
import React, {useState, useEffect} from 'react';
import { Input, Dropdown, TextArea, Button } from '../../../components/Inputs';
import { fileToBase64 } from '../../../utils.js'
import './index.css';

const FormalizeVehiclePurchase = () => {
    const [customers, setCustomers] = useState([])
    const [makes, setMakes] = useState([])
    useEffect(() => {
        async function getCustomers() {
            const response = await fetch(
                "/autoshop/api/customers?is_deleted=false",
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
                "/autoshop/api/vehicles/makes",
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
    }, []);


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
    let boughtFor = React.createRef();

    let [validatePrice, setValidatePrice] = useState(["isntEMPTY"]); 
    let [validateModel, setValidateModel] = useState(["isntEMPTY"]); 
    let [validateYear, setValidateYear] = useState(["isntEMPTY"]); 
    let [validateMilage, setValidateMilage] = useState(["isntEMPTY"]); 
    let [validateBodyType, setValidateBodyType] = useState(["isntEMPTY"]); 
    let [validateFuelType, setValidateFuelType] = useState(["isntEMPTY"]); 
    let [validateDoors, setValidateDoors] = useState(["isntEMPTY"]); 
    let [validateGearbox, setValidateGearbox] = useState(["isntEMPTY"]); 
    let [validateSeats, setValidateSeats] = useState(["isntEMPTY"]); 
    let [validateFuelConsumption, setValidateFuelConsumption] = useState(["isntEMPTY"]); 
    let [validateColour, setValidateColour] = useState(["isntEMPTY"]); 
    let [validateEngine, setValidateEngine] = useState(["isntEMPTY"]); 
    let [validateDescription, setValidateDescription] = useState(["isntEMPTY"]); 
    let [validateDrivetrain, setValidateDrivetrain] = useState(["isntEMPTY"]); 
    let [validateSpecification, setValidateSpecification] = useState(["isntEMPTY"]); 
    let [validateBoughtFor, setValidateBoughtFor] = useState(["isntEMPTY"]); 

    return (
        <div className="vehicle-purchases-form">
            <h2>Formalise Vehicle Purchase</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr'
            }}>
                <div>
                    <h4>Customer the vehicle was bought from</h4>
                    <Dropdown ref={customerID} options={customers} width="300px"/>
                    <h4>Vehicle Make</h4>
                    <Dropdown ref={make} options={makes} width="300px"/>
                    <h4>Bought For</h4>
                    <Input type="text" ref={boughtFor} validate={validateBoughtFor} width="300px"
                        onBlur={() => setValidateBoughtFor(["isntEMPTY", "isINT"])}
                        onFocus={() => setValidateBoughtFor([])}
                    />
                    <h4>Vehicle Model</h4>
                    <Input type="text" ref={model} validate={validateModel} width="300px"
                        onBlur={() => setValidateModel(["isntEMPTY"])}
                        onFocus={() => setValidateModel([])}
                    />
                    <h4>Vehicle Year</h4>
                    <Input type="text" ref={year} validate={validateYear} width="300px"
                        onBlur={() => setValidateYear(["isntEMPTY", "isINT"])}
                        onFocus={() => setValidateYear([])}
                    />
                    <h4>Vehicle Price</h4>
                    <Input type="text" ref={price} validate={validatePrice} width="300px"
                        onBlur={() => setValidatePrice(["isntEMPTY", "isFLOAT"])}
                        onFocus={() => setValidatePrice([])}
                    />
                    <h4>Vehicle Milage</h4>
                    <Input type="text" ref={milage} validate={validateMilage} width="300px"
                        onBlur={() => setValidateMilage(["isntEMPTY", "isINT"])}
                        onFocus={() => setValidateMilage([])}
                    />
                    <h4>Vehicle Body Type</h4>
                    <Input type="text" ref={bodyType} validate={validateBodyType} width="300px"
                        onBlur={() => setValidateBodyType(["isntEMPTY"])}
                        onFocus={() => setValidateBodyType([])}
                    />
                    <h4>Vehicle Fuel Type</h4>
                    <Input type="text" ref={fuelType} validate={validateFuelType} width="300px"
                        onBlur={() => setValidateFuelType(["isntEMPTY"])}
                        onFocus={() => setValidateFuelType([])}
                    />
                </div>
                <div>
                    <h4>Vehicle Doors</h4>
                    <Input type="text" ref={doors} validate={validateDoors}  width="300px"
                        onBlur={() => setValidateDoors(["isntEMPTY", "isINT"])}
                        onFocus={() => setValidateDoors([])}
                    />
                    <h4>Vehicle Gearbox</h4>
                    <Input type="text" ref={gearbox} validate={validateGearbox} width="300px"
                        onBlur={() => setValidateGearbox(["isntEMPTY"])}
                        onFocus={() => setValidateGearbox([])}
                    />
                    <h4>Vehicle Seats</h4>
                    <Input type="text" ref={seats} validate={validateSeats} width="300px"
                        onBlur={() => setValidateSeats(["isntEMPTY", "isINT"])}
                        onFocus={() => setValidateSeats([])}
                    />
                    <h4>Vehicle Fuel Consumption</h4>
                    <Input type="text" ref={fuelConsumption} validate={validateFuelConsumption} width="300px"
                        onBlur={() => setValidateFuelConsumption(["isntEMPTY", "isINT"])}
                        onFocus={() => setValidateFuelConsumption([])}
                    />
                    <h4>Vehicle Colour</h4>
                    <Input type="text" ref={colour} validate={validateColour} width="300px"
                        onBlur={() => setValidateColour(["isntEMPTY"])}
                        onFocus={() => setValidateColour([])}
                    />
                    <h4>Vehicle Engine</h4>
                    <Input type="text" ref={engine} validate={validateEngine} width="300px"
                        onBlur={() => setValidateEngine(["isntEMPTY", "isINT"])}
                        onFocus={() => setValidateEngine([])}
                    />
                    <h4>Vehicle Drivetrain</h4>
                    <Input type="text" ref={drivetrain} validate={validateDrivetrain}width="300px"
                        onBlur={() => setValidateDrivetrain(["isntEMPTY"])}
                        onFocus={() => setValidateDrivetrain([])}
                    />
                    <h4>Vehicle Description</h4>
                    <TextArea type="text" ref={description} validate={validateDescription} width="300px"
                        onBlur={() => setValidateDescription(["isntEMPTY"])}
                        onFocus={() => setValidateDescription([])}
                    />
                </div>
                <div>
                    <h4>Vehicle specification</h4>
                    <TextArea className="vehicle-spec" type="text" rows="40" cols="5000" ref={specification} validate={validateSpecification} 
                        onBlur={() => setValidateSpecification(["isntEMPTY", "isJSON"])}
                        onFocus={() => setValidateSpecification([])}
                    />
                    <h4>Vehicle images</h4>
                    <Input type="file" ref={images} accept="image/jpeg" width="300px" multiple/>
                    <Button name="CREATE" width="100px" onClick={async () => {
                        
                        let base64files = [];
                        for (let file of images.current.files) {
                            file = await fileToBase64(file);
                            file = file.split(',')[1];
                            base64files.push(file);
                        }

                        const data = { 
                            bought_for: parseFloat(boughtFor.current.value),
                            body_type: bodyType.current.value,
                            fuel_type: fuelType.current.value,
                            fuel_consumption: parseFloat(fuelConsumption.current.value),
                            make: make.current.value,
                            model: model.current.value, 
                            year: year.current.value,
                            price: parseInt(price.current.value),
                            milage: parseInt(milage.current.value),
                            doors: parseInt(doors.current.value), 
                            gearbox: gearbox.current.value,
                            seats: parseInt(seats.current.value),
                            colour: colour.current.value,
                            engine: parseFloat(engine.current.value),
                            description: description.current.value,
                            drivetrain: drivetrain.current.value,
                            specification: specification.current.value,
                            images: base64files,
                            customer_id: customerID.current.value
                        }

                        const response = await fetch("/autoshop/api/vehicles/purchase", {
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

export default FormalizeVehiclePurchase;