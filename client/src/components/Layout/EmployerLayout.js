import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../../css/EmployerLayout.css"; // Ensure this CSS file exists and contains necessary styles
import logo from "../../assets/images/image.png";

const EmployerLayout = ({ children }) => {
  const [name, setName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/v1/user/get-user/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setName(response.data.data.name);
        } else {
          console.error("Failed to fetch user data:", response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, [id]); // Add id as dependency to refetch if id changes

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">
          <img src={logo} alt="Logo" />
        </h2>
        <nav className="menu">
          <ul>
            <li>
              <Link to="/employer-dashboard" className="menu-item">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/employer-dashboard/profile" className="menu-item">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/employer-dashboard/settings" className="menu-item">
                Settings
              </Link>
            </li>
            <li>
              <Link to="/employer-dashboard/create-job" className="menu-item">
                Create Job
              </Link>
            </li>
            <li>
              <Link to="/employer-dashboard/job-list" className="menu-item">
                Job List
              </Link>
            </li>
            <li>
              <Link to="/employer-dashboard/job-stats" className="menu-item">
                Job Stats
              </Link>
            </li>
            <li>
              <Link to="/employer-dashboard/logout" className="menu-item">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <div className="heading text-center">
          <h1>Welcome to the Employer Dashboard, {name || "User"}</h1>
        </div>
        {children}
      </main>
    </div>
  );
};

export default EmployerLayout;
