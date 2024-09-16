import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import DashboardHome from "./DashboardHome";
import Profile from "./Profile";
import JobList from "./JobList";
import JobStats from "./JobStats";
import Settings from "./Settings";
import Logout from "./Logout";
import Contactform from "./Contactform";
// Assuming you have a Sidebar component

const JobDashboard = () => {
  return (
    <Layout>
      <div className="dashboard-container">
        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/job-list" element={<JobList />} />
            <Route path="/job-stats" element={<JobStats />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/contact" element={<Contactform />} />
          </Routes>
        </div>
      </div>
    </Layout>
  );
};

export default JobDashboard;
