import React from 'react';
import "../css/Features.css";

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="container">
        <h2 className="section-title">Our Features</h2>
        <p className="section-subtitle">
          Explore a wide range of features designed to make job searching and hiring easier for both applicants and employers.
        </p>
        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-item">
            <div className="feature-icon">
              <i className="fas fa-briefcase"></i>
            </div>
            <h3 className="feature-title">Apply for Jobs</h3>
            <p className="feature-description">
              Browse through thousands of job listings and apply directly with a few clicks. Our intuitive platform allows you to find your dream job easily.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-item">
            <div className="feature-icon">
              <i className="fas fa-upload"></i>
            </div>
            <h3 className="feature-title">Upload Resumes</h3>
            <p className="feature-description">
              Upload your resume in seconds and get discovered by top employers. Our system makes it easy for you to showcase your skills.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-item">
            <div className="feature-icon">
              <i className="fas fa-user-tie"></i>
            </div>
            <h3 className="feature-title">Employers Add Jobs</h3>
            <p className="feature-description">
              Employers can easily post job openings and manage applicants. Find the perfect candidate with our advanced search and filtering options.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="feature-item">
            <div className="feature-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3 className="feature-title">Check Job Status</h3>
            <p className="feature-description">
              Keep track of the jobs you've applied for. Know the status of your application with real-time updates from employers.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="feature-item">
            <div className="feature-icon">
              <i className="fas fa-user-circle"></i>
            </div>
            <h3 className="feature-title">Profile Management</h3>
            <p className="feature-description">
              Manage your profile and keep your information up to date. Your profile helps you get noticed by potential employers.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="feature-item">
            <div className="feature-icon">
              <i className="fas fa-tools"></i>
            </div>
            <h3 className="feature-title">Robust Features</h3>
            <p className="feature-description">
              Enjoy a feature-rich platform designed to simplify job searching and hiring. Our tools help both applicants and employers streamline the process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
