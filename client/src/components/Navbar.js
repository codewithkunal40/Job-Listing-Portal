import React, { useState } from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../src/assets/images/image.png";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className={`tags ${isMobileMenuOpen ? "active" : ""}`}>
        <nav>
          <ul>
            <Link to="/">
              <li onClick={toggleMobileMenu}>Home</li>
            </Link>
            <Link to="/About"><li onClick={toggleMobileMenu}>About</li></Link>
            
           <Link to="/Features"><li onClick={toggleMobileMenu}>Features</li></Link>
            <Link to="/Resources"><li onClick={toggleMobileMenu}>Resources</li></Link>
          </ul>
        </nav>
      </div>
      <div className="login-sighn">
        <Link to="/login">
          <button className="login">Login</button>
        </Link>
        <Link to="/register">
          <button className="register">Register</button>
        </Link>
      </div>
      <div className="hamburger" onClick={toggleMobileMenu}>
        &#9776; {/* Hamburger Icon */}
      </div>
    </div>
  );
};

export default Navbar;
