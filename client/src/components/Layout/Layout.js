import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../../css/Layout.css"; // Assuming you're putting styles in this CSS file
import logo from "../../assets/images/image.png";

const Layout = ({ children }) => {
  const [name, setName] = useState("");
  const { id } = useParams();

  // Access route parameter here

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/v1/user/get-user/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Adjust based on the structure of your response
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
              <Link to="/job-dashboard" className="menu-item">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/job-dashboard/jobseeker-profile" className="menu-item">
                Profile
              </Link>
            </li>

            <li>
              <Link to="/job-dashboard/job-seeker-list" className="menu-item">
                Job List
              </Link>
            </li>
            <li>
              <Link to="/job-dashboard/job-stats" className="menu-item">
                Job Stats
              </Link>
            </li>
            <li>
              <Link to="/job-dashboard/search" className="menu-item">
                SearchJobs
              </Link>
            </li>
            <li>
              <Link
                to="/job-dashboard/resume-seeker-upload"
                className="menu-item"
              >
                Uplaod resume
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

      <main className="main-content">
        <div className="heading text-center">
          <h1>Welcome to the job-portal, {name || "User"}</h1>
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
