import React from "react";
import useForm from "react-hook-form";
import * as yup from "yup";
import { fileToBase64 } from '../../utils.js'
import { useAlert } from "react-alert";
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

  const alert = useAlert();
  const onSubmit = async data => {
    let values  = getValues()

    let file = await fileToBase64(values.image[0]);
    file = file.split(',')[1];

    data.image = file;

    const response = await fetch("/autoshop/api/vehicles/makes", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const resp = await response.json();
    if (!response.ok) {
      alert.error(JSON.stringify(resp));
      return
    }

    alert.success("Success");
  };

  return (
    <div>
      <form className="custom-form" onSubmit={handleSubmit(onSubmit)} style={{
        maxWidth: "400px",
        margin: "20px auto 20px auto"
      }}>
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