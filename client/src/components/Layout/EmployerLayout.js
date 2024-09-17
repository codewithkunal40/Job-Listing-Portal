import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../../css/EmployerLayout.css"; // Ensure this CSS file exists and contains necessary styles
import logo from "../../assets/images/image.png";

const EmployerLayout = ({ children }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const { id } = useParams();

  useEffect(() => {
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
          setError("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        setError("An error occurred while fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="layout-container">
      <aside className={`sidebar ${!isSidebarVisible ? "collapsed" : ""}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isSidebarVisible ? "☰" : "✕"}
        </button>
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
              <Link
                to={`/employer-dashboard/profile/${id}`}
                className="menu-item"
              >
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
              <Link to="/employer-dashboard/applicants" className="menu-item">
                Job Applicants
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
              <Link
                to="/employer-dashboard/upload-resume"
                className="menu-item"
              >
                Upload Resume
              </Link>
            </li>
            <li>
              <Link
                to={`/employer-dashboard/resume-display/${id}`}
                className="menu-item"
              >
                Display Resume
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
          {loading ? (
            <p>Loading user data...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <h1>Welcome to the Employer Dashboard, {name || "User"}</h1>
          )}
        </div>
        {children}
      </main>
    </div>
  );
};

export default EmployerLayout;
