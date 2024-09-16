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

      <div className="dashboard-cards">
        <div className="card">
          <h2>Total Users</h2>
          <p>{users.length}</p> {/* Display total number of users */}
        </div>

        <div className="card">
          <h2>Total Jobs</h2>
          <p>{jobs.length}</p> {/* Display total number of jobs */}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
