import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Profile from "./Profile"; // Assume these components exist
import Settings from "./Settings";
import DashboardHome from "./DashboardHome"; // Dashboard home content
import CreateJob from "./CreateJob";
import JobList from "./JobList";
import JobStats from "./JobStats";
// Placeholder for logout logic

const JobDashboard = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/job-list" element={<JobList />} />
        <Route path="/job-stats" element={<JobStats />} />
      </Routes>
    </Layout>
  );
};

export default JobDashboard;
