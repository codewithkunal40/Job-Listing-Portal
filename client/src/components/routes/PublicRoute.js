import React from "react";
import { useNavigate } from "react-router-dom";
const PublicRoute = ({ children }) => {
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    return navigate("/job-dashboard");
  }
};

export default PublicRoute;
