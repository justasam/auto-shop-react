import React from "react";
import useForm from "react-hook-form";
import * as yup from "yup";
import { fileToBase64 } from '../../utils.js'
import "./index.css";

const VehicleMakeSchema = yup.object().shape({
  name: yup.string().required("Vehicle make is required"),
  image: yup
    .mixed()
    .test("fileType", "Images are required", function(value) {
      return value.length > 0;
    })
});


const VehicleMakeCreationForm = () =>{
  const { register, errors, handleSubmit, getValues } = useForm({
    validationSchema: VehicleMakeSchema
  });

  const onSubmit = async data => {
    let values  = getValues()
    let base64files = [];
    for (let file of values.images) {
        file = await fileToBase64(file);
        file = file.split(',')[1];
        base64files.push(file);
    }
    data.images = base64files;

    const response = await fetch("/autoshop/api/vehicles/makes", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
      alert(response.statusText);
      return
    }

    const resp = await response.json();
    alert("Success");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} style={{maxWidth: "400px"}}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridColumnGap: '10px',
        }}>
          <div>
            <label>Vehicle Make Name</label>
            <input type="text" name="name" ref={register} />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div>
            <label>Make logo</label>
            <input type="file" name="image" multiple accept="image/png" ref={register} />
            {errors.image && <p>{errors.image.message}</p>}
          </div>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default VehicleMakeCreationForm;