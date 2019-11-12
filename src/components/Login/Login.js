import React from 'react';
import { Input, Button } from '../Inputs';
import forge from 'node-forge';
import './index.css';

const sha256 = (pwd) => {
  const md = forge.md.sha256.create();
  md.update(pwd);
  return md.digest().toHex();
}

const Login = ({hidden, toggleHidden}) => {
  let uname = React.createRef();
  let pwd = React.createRef();

  return (
    <div className={`login_form shadow ${hidden ? 'hidden' : ''}`}>
      <h3>Login</h3>
      <Input type="text" ref={uname} placeholder="Username" width="200px" />
      <Input type="password" ref={pwd} placeholder="Password" width="200px" />
      <Button name="SIGN IN" width="200px" onClick={async () => {
        // TODO: validate form
        let username = uname.current.value;
        let password = sha256(pwd.current.value);

        const data = { username, password };

        try {
          const res = await fetch('autoshop/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const jsonRes = await res.json();
          toggleHidden(!hidden);
        }
        catch (error) {
          console.error('Error:', error)
          toggleHidden(!hidden);
        }

      }}></Button>
    </div>
  )
}

export default Login;
