// pages/EmployerDashboard.js
import React from "react";

import { Outlet } from "react-router-dom";
import "../css/EmployerDashboard.css"; // Ensure this CSS file exists and contains necessary styles
import EmployerSidebar from "./EmployerSidebar";

const EmployerDashboard = () => {
  return (
    <div className="dashboard-container">
      <EmployerSidebar />
      <div className="main-content">
        <h1>Employer Dashboard</h1>
        <Outlet />
        {/* This will render the nested routes from EmployerDashboardRoutes */}
      </div>
    </div>
  );
};

export default EmployerDashboard;
