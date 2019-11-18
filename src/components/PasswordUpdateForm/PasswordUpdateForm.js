import React, {useState, useEffect } from "react";
import useForm from "react-hook-form";
import * as yup from "yup";
import { useAlert } from "react-alert";
import forge from 'node-forge';
import "./index.css";

const sha256 = (pwd) => {
  const md = forge.md.sha256.create();
  md.update(pwd);
  return md.digest().toHex();
}

const PasswordUpdateForm = ({account_id, old_password}) =>{
  const PasswordUpdateSchema = yup.object().shape({
    old_password: yup
    .string()
    .required("Old password is required")
    .test("matchesOld", "Old password does not match", function(value){
      console.log(old_password)
      console.log(sha256(value))
      return old_password === sha256(value)
    }),
    new_password: yup.string().required("New Password is required"),
  });

  const { register, errors, handleSubmit } = useForm({
    validationSchema: PasswordUpdateSchema
  });

  const alert = useAlert();
  const onSubmit = async data => {
    const response = await fetch("/autoshop/api/accounts/" + account_id + "/password", {
        method: "POST",
        body: JSON.stringify({password: sha256(data.new_password)}),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
      const resp = await response.json();
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
            <label>Old password</label>
            <input type="password" name="old_password" ref={register} />
            {errors.old_password && <p>{errors.old_password.message}</p>}
          </div>
          <div>
            <label>New Password</label>
            <input type="password" name="new_password" ref={register} />
            {errors.new_password && <p>{errors.new_password.message}</p>}
          </div>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default PasswordUpdateForm;