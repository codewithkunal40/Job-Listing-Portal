import React from "react";
import { Link } from "react-router-dom";
import "../css/NotFound.css"; // Make sure this CSS file is created

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-message">Page Not Found</h2>
        <p className="error-description">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link className="btn-home" to="/">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
