
import React, {useState, useEffect} from 'react';
import {
  AutoField,
  AutoForm,
  ErrorField,
  SubmitField
} from 'uniforms-semantic';
import './index.css';
import VehicleMakeSchema from './schema.js';

const CreateVehicleMakeForm = ({onSubmit}) => {
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

    let [validateName, setValidateName] = useState(["isntEMPTY"]); 
  return (
    <AutoForm schema={VehicleMakeSchema} onSubmit={onSubmit}>
      <h4>IT meeting guest questionnaire</h4>
      <AutoField name="vehicleMakeName" />
      <ErrorField name="vehicleMakeName">
        <span>You have to provide your last name!</span>
      </ErrorField>
      <AutoField name="pictureUrl" />
      <SubmitField />
    </AutoForm>
  );
}

export default CreateVehicleMakeForm;