// DashboardHome.js
import React from "react";
// Add your banner image path
import "../css/newDashboard.css";

const DashboardHome = () => {
  return (
    <div className="job-dashboard">
      {/* Banner Section */}
      <div className="dashboard-banner">
        <div className="banner-content">
          <h1>Your Career Starts Here</h1>
          <p>
            Find the job that's perfect for you. Explore thousands of job
            opportunities!
          </p>
          <button className="banner-button">Get Started</button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="dashboard-hero">
        <h1>Welcome to Your Job Dashboard</h1>
        <p>Manage your jobs, applications, and resumes all in one place!</p>

        {/* Info Cards Section */}
        <div className="dashboard-cards">
          {/* Card 1: View Jobs */}
          <div className="card">
            <h2>View Jobs</h2>
            <p>
              Browse through available job listings and find the right one for
              you.
            </p>
            <button className="card-button">View Jobs</button>
          </div>

          {/* Card 2: Apply for Jobs */}
          <div className="card">
            <h2>Apply for Jobs</h2>
            <p>
              Submit applications to your preferred jobs easily and quickly.
            </p>
            <button className="card-button">Apply Now</button>
          </div>

          {/* Card 3: Apply for Resume */}
          <div className="card">
            <h2>Upload Resume</h2>
            <p>Create or upload your resume to apply for jobs in seconds.</p>
            <button className="card-button">Upload Resume</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
