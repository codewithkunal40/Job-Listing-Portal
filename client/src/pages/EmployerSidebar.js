// components/EmployerSidebar.js
import React from "react";
import { Link } from "react-router-dom";

const EmployerSidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/employer-dashboard">Dashboard Home</Link>
        </li>
        <li>
          <Link to="/employer-dashboard/profile">Profile</Link>
        </li>
        <li>
          <Link to="/employer-dashboard/create-job">Create Job</Link>
        </li>
        <li>
          <Link to="/employer-dashboard/applicants">Job applicants</Link>
        </li>
        <li>
          <Link to="/employer-dashboard/job-list">Job List</Link>
        </li>
        <li>
          <Link to="/employer-dashboard/settings">Settings</Link>
        </li>
        <li>
          <Link to="/employer-dashboard/job-stats">Job Stats</Link>
        </li>

        <li>
          <Link to="/employer-dashboard/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default EmployerSidebar;
