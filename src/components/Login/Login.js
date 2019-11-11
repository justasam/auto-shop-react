import React from 'react';
import { Input, Button } from '../Inputs';
import './index.css';

const Login = ({hidden}) => {
  return (
    <div className={`login_form shadow ${hidden ? 'hidden' : ''}`}>
      <h3>Login</h3>
      <Input type="text" placeholder="Username" width="200px" />
      <Input type="password" placeholder="Password" width="200px" />
      <Button name="SIGN IN" width="200px" onClick={async () => {
        console.log('clicked');
      }}></Button>
    </div>
  )
}

export default Login;
