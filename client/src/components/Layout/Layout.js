import React from "react";
import { Link } from "react-router-dom";
import "../../css/Layout.css"; // Assuming you're putting styles in this CSS file
import logo from "../../assets/images/image.png";
import Navbar from "../Navbar";
const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">
          <img src={logo} />
        </h2>
        <nav className="menu">
          <ul>
            <li>
              <Link to="/job-dashboard" className="menu-item">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/job-dashboard/profile" className="menu-item">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/job-dashboard/settings" className="menu-item">
                Settings
              </Link>
            </li>
            <li>
              <Link to="/job-dashboard/create-job" className="menu-item">
                Create Job
              </Link>
            </li>
            <li>
              <Link to="/job-dashboard/job-list" className="menu-item">
                Job List
              </Link>
            </li>
            <li>
              <Link to="/job-dashboard/job-stats" className="menu-item">
                Job Stats
              </Link>
            </li>
            <li>
              <Link to="/job-dashboard/logout" className="menu-item">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
