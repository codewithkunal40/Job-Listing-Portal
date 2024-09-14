import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    if (localStorage.getItem("token")) {
      // Navigate to job-dashboard if user is authenticated
      navigate("/job-dashboard");
    }
  }, [navigate]);

  // Render children only if the user is not authenticated
  return !localStorage.getItem("token") ? children : null;
};

export default PublicRoute;
