import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { CustomerCreationForm } from '../../components/CustomerCreationForm';
import { Login } from '../Login';
import Popup from "reactjs-popup";
import './index.css';

const NavBar = () => {
  const [ hidden, setHidden ] = useState(true);
  const [accountType, setAccountType] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
      async function GetUser() {
          const response = await fetch("/autoshop/api/accounts/me", {
              method: "GET",
              headers: {
                  "Content-Type": "application/json"
              }
          });

          const resp = await response.json();
          if (response.status == 404) {
              setAccountType("guest");
              return
          }

          if (response.status >= 500) {
              return
          }

          let accType = response.headers.get("X-Autoshop-Account-Type");
          setAccountType(accType)
          setUser(resp)
      }
      GetUser();
  },[]);

  if(!accountType) {
      return null
  }

  console.log(accountType)

  let personalPageRoute;
  switch(accountType) {
    case "customer":
      personalPageRoute ="/CustomerPanel";
      break;
    case "employee": 
      personalPageRoute = "/EmployeePanel";
      break;
    case "admin": 
      personalPageRoute = "/EmployeePanel";
      break;
    default:
      personalPageRoute = "/Home";
  }

  return (
    <div className="navbar">
      <NavLink to="/Home" className="navbar_logo">
        <span className="bigtext">Old Volks Home | </span>
        <span className="mediumtext">SHOP</span>
      </NavLink>
      <ul className="navbar_links_main mediumtext transformcenter">
        <li className="navbar_link"><NavLink activeClassName="is-active" to="/Home">VEHICLES</NavLink></li>
        <li className="navbar_link"><NavLink activeClassName="is-active" to="/Parts">PARTS</NavLink></li>
        <li className="navbar_link"><NavLink activeClassName="is-active" to="/Branches">BRANCHES</NavLink></li>
      </ul>
      <ul className="navbar_links_sep mediumtext">
        <Popup 
            trigger={<li className="navbar_link" style={{float:"left", cursor:"pointer"}}>SIGN UP</li>} position="right center"
            modal
            closeOnDocumentClick
        >
            <div className="modal">
                <div className="header"><h3>Customer Sign Up Form</h3></div>
                <CustomerCreationForm/>
            </div>
        </Popup>
      {(() => {
          console.log(user);
        if(!user) {
          return (<li onClick={() => setHidden(!hidden)} className="navbar_link" style={{float: 'left', cursor: 'pointer'}}>SIGN IN</li>)
        } else {
          console.log(user);
          return (
            <li className="navbar_link">
              <NavLink activeClassName="is-active" to={personalPageRoute}>WELCOME {user.username.toUpperCase()}</NavLink>
            </li>
          )
        }
      })()}
      </ul>
      <Login hidden={hidden} toggleHidden={setHidden} />
    </div>
  )
}

export default NavBar;