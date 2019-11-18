import React, {useState} from 'react';
import { Input, Button, TextArea } from '../Inputs';
import forge from 'node-forge';
import { useAlert } from "react-alert";
import './index.css';

const sha256 = (pwd) => {
  const md = forge.md.sha256.create();
  md.update(pwd);
  return md.digest().toHex();
}

const Login = ({hidden, toggleHidden}) => {
  let [ validateUname, setValidateUname ] = useState([]);
  let [ validatePwd, setValidatePwd ] = useState([]);

  let uname = React.createRef();
  let pwd = React.createRef();

  const alert = useAlert();
  return (
    <div className={`login_form shadow ${hidden ? 'hidden' : ''}`}>
      <h3>Login</h3>
      <Input type="text" ref={uname} placeholder="Username" width="200px" 
        validate={validateUname}
        onBlur={() => setValidateUname(['isntEMPTY'])} 
        onFocus={() => setValidateUname([])}
      />
      <Input type="password" ref={pwd} placeholder="Password" width="200px"
        validate={validatePwd} 
        onBlur={() => setValidatePwd(['isntEMPTY'])} 
        onFocus={() => setValidatePwd([])}
      />
      <Button name="SIGN IN" width="200px" onClick={async () => {
        // TODO: validate form
        let username = uname.current.value;
        let password = pwd.current.value;

        console.log(password)
        if (!username || !password) {
          return;
        }

        password = sha256(password);

        console.log(password);
        const data = { username, password };

          const res = await fetch('autoshop/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const jsonRes = await res.json();
          if(res.status == 401) {
            alert.info("Invalid Username or Password")
            return
          }

          if(!res.ok) {
            alert.error(jsonRes)
            return
          }

          window.location.reload();
          toggleHidden(!hidden);

      }}></Button>
    </div>
  )
}

export default Login;
