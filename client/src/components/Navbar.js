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
            <li onClick={toggleMobileMenu}>Home</li>
            <li onClick={toggleMobileMenu}>About</li>
            <li onClick={toggleMobileMenu}>Features</li>
            <li onClick={toggleMobileMenu}>Resources</li>
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
