import React from "react";
import "../css/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="hero-content">
        <h1 className="hero-title">Find Your Dream Job</h1>
        <p className="hero-description">
          Discover a world of opportunities with thousands of job listings.
          Connect with top employers and find your next career move today.
        </p>
        <div className="hero-buttons">
          <Link to="/jobs" className="btn-primary">
            Browse Jobs
          </Link>
          <Link to="/register" className="btn-secondary">
            Get Started
          </Link>
        </div>
      </div>
      <div className="cards-container">
        <div className="card">
          <h2 className="card-title">Apply for Jobs</h2>
          <p className="card-description">
            Streamline your application process and apply to the best job
            opportunities. Quickly and easily get noticed by top employers.
          </p>
          <Link to="/apply" className="card-link">
            Apply Now
          </Link>
        </div>
        <div className="card">
          <h2 className="card-title">Search with Filters</h2>
          <p className="card-description">
            Use advanced filters to refine your job search by location,
            industry, and job type. Find exactly what you’re looking for with
            precision.
          </p>
          <Link to="/search" className="card-link">
            Search Jobs
          </Link>
        </div>
        <div className="card">
          <h2 className="card-title">Sort Jobs</h2>
          <p className="card-description">
            Sort job listings based on your preferences like date posted,
            salary, and relevance to see the most relevant opportunities first.
          </p>
          <Link to="/sort" className="card-link">
            Sort Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
