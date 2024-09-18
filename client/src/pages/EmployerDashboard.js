import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/EmployerDashboard.css"; // Add a CSS file for styling

const EmployerDashboard = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch Users
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/v1/user/get-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    // Fetch Jobs
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/v1/job/get-job", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setJobs(response.data.jobs);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchUsers();
    fetchJobs();
  }, []);

  return (
    <div className="employer-dashboard-container">
      <h1>Welcome to the Employer Dashboard</h1>

      {/* Overview Cards */}
      <div className="dashboard-cards">
        <div className="card">
          <h2>Total Users</h2>
          <p>{users.length}</p> {/* Display total number of users */}
        </div>

        <div className="card">
          <h2>Total Jobs</h2>
          <p>{jobs.length}</p> {/* Display total number of jobs */}
        </div>

        <div className="card">
          <h2>Total Applications</h2>
          <p>{/* Placeholder for applications count */}100</p>
        </div>
      </div>

      {/* Latest Users Section */}
      <div className="latest-section">
        <h2>Latest Users</h2>
        <div className="latest-cards">
          {users.slice(0, 3).map((user, index) => (
            <div key={index} className="card">
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Jobs Section */}
      <div className="latest-section">
        <h2>Recent Jobs Posted</h2>
        <div className="latest-cards">
          {jobs.slice(0, 3).map((job, index) => (
            <div key={index} className="card">
              <h3>{job.title}</h3>
              <p>Company: {job.company}</p>
              <p>Location: {job.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="additional-info">
        <h2>Dashboard Insights</h2>
        <div className="insight-cards">
          <div className="card">
            <h3>Active Jobs</h3>
            <p>{jobs.filter((job) => job.status === "active").length}</p>
          </div>

          <div className="card">
            <h3>Pending Applications</h3>
            <p>{/* Placeholder for pending applications */}50</p>
          </div>

          <div className="card">
            <h3>Employers Registered</h3>
            <p>{/* Placeholder for employers count */}30</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
