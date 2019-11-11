import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCart } from 'react-feather';
import { Login } from '../Login';
import './index.css';

const NavBar = () => {
  const [ hidden, setHidden ] = useState(true);

  return (
    <div className="navbar">
      <NavLink to="/Home" className="navbar_logo">
        <span className="bigtext">Old Volks Home | </span>
        <span className="mediumtext">SHOP</span>
      </NavLink>
      <ul className="navbar_links_main mediumtext transformcenter">
        <li className="navbar_link"><NavLink activeClassName="is-active" to="/Home">VEHICLES</NavLink></li>
        <li className="navbar_link"><NavLink activeClassName="is-active" to="/Parts">PARTS</NavLink></li>
        <li className="navbar_link"><NavLink activeClassName="is-active" to="/Services">SERVICES</NavLink></li>
        <li className="navbar_link"><NavLink activeClassName="is-active" to="/Branches">BRANCHES</NavLink></li>
        <li className="navbar_link"><NavLink activeClassName="is-active" to="/Resources">RESOURCES</NavLink></li>
      </ul>
      <ul className="navbar_links_sep mediumtext">
        <li onClick={() => setHidden(!hidden)} className="navbar_link" style={{float: 'left', cursor: 'pointer'}}>SIGN IN</li>
        <li className="navbar_link"><NavLink activeClassName="is-active" to="/Cart"><ShoppingCart height={52} /></NavLink></li>
      </ul>
      <Login hidden={hidden} />
    </div>
  )
}

export default NavBar;