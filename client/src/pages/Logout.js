import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the local storage
    localStorage.clear();
    // Optionally, you can also clear Redux state or perform other cleanup tasks here

    // Navigate to the login page
    navigate("/login");
  }, [navigate]);

  return <div>Logging out...</div>; // Optional: You can show a loading message or spinner here
};

export default Logout;
