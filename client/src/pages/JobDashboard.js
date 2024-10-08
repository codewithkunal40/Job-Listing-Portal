import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import DashboardHome from "./DashboardHome";
import JobSeekerProfile from "./jobSeekerProfile";

import JobStats from "./JobStats";
import Settings from "./Settings";
import Logout from "./Logout";
import Contactform from "./Contactform";
import JobSekkerList from "./JobSekkerList";
import ResumeUploadSeeker from "./resumeUplaodSeeker";
import SearchJobs from "./SearchJobs";
// Assuming you have a Sidebar component

const JobDashboard = () => {
  return (
    <Layout>
      <div className="dashboard-container">
        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route
              path="/jobseeker-profile/:id"
              element={<JobSeekerProfile />}
            />
            <Route path="/job-seeker-list" element={<JobSekkerList />} />
            <Route path="/search" element={<SearchJobs />} />
            <Route path="/job-stats" element={<JobStats />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/resume-seeker-upload"
              element={<ResumeUploadSeeker />}
            />
            <Route path="/contact" element={<Contactform />} />
          </Routes>
        </div>
      </div>
    </Layout>
  );
};

export default JobDashboard;
