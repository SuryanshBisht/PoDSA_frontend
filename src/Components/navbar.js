import React from 'react';
import './navbar.css';

import {Link} from 'react-router-dom'


const Navbar = () => {

  return (
    <div className="dummy">
    <div className = 'Navbar-wrapper'>
	   	<div className = 'group'>Group 20</div>
	   	<Link className="labelname"  to="/">HOME</Link>
	   	{/* <Link className="labelname"  to="/theory">THEORY</Link> */}
	   	<Link className="labelname"  to="/contributors">CONTRIBUTORS</Link>
    </div>
    </div>
  );
}

export default Navbar;
