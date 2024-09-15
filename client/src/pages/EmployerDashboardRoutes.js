// pages/EmployerDashboardRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import CreateJob from "./CreateJob";
import Settings from "./Settings";
import JobList from "./JobList";
import JobStats from "./JobStats";
import Logout from "./Logout";
import EmployerDashboard from "./EmployerDashboard";
import ViewApplications from "./ViewApplications";

const EmployerDashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployerDashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-job" element={<CreateJob />} />
      <Route path="/job-list" element={<JobList />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/job-stats" element={<JobStats />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/applicants" element={<ViewApplications />} />
    </Routes>
  );
};

export default EmployerDashboardRoutes;
