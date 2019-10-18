import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'react-feather';
import './index.css';

const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/Home" className="navbar_logo">
        <span className="bigtext">Old Volks Home | </span>
        <span className="mediumtext">SHOP</span>
      </Link>
      <ul className="navbar_links_main mediumtext transformcenter">
        <li className="navbar_link"><Link to="/Home">VEHICLES</Link></li>
        <li className="navbar_link"><Link to="/Home">PARTS</Link></li>
        <li className="navbar_link"><Link to="/Home">SERVICES</Link></li>
        <li className="navbar_link"><Link to="/Home">BRANCHES</Link></li>
        <li className="navbar_link"><Link to="/Home">RESOURCES</Link></li>
      </ul>
      <ul className="navbar_links_sep mediumtext">
        <li className="navbar_link" style={{float: 'left'}}><Link to="/Home">SIGN IN</Link></li>
        <li className="navbar_link"><Link to="/Home"><ShoppingCart height={52} /></Link></li>
      </ul>
    </div>
  )
}

export default NavBar;