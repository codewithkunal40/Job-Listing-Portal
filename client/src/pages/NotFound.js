import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Page not Found</h1>
      <Link className="btn btn-primary" to="/">
        Go to Login
      </Link>
    </div>
  );
};

export default NotFound;
