import React, { useState } from "react";
import axios from "axios";
import "../css/SearchJobs.css";
const SearchJobs = () => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/v1/job/search`, {
        params: { company, position },
      });
      if (response.data.success) {
        setJobs(response.data.jobs);
        setError(""); // Clear previous errors
      } else {
        setError(response.data.message);
        setJobs([]);
      }
    } catch (error) {
      setError("An error occurred while searching for jobs.");
      setJobs([]);
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="job-results">
        {jobs.map((job) => (
          <div key={job._id} className="job-card">
            <h3>{job.position}</h3>
            <p>
              <strong>Company:</strong> {job.company}
            </p>
            <p>
              <strong>Status:</strong> {job.status}
            </p>
            <p>
              <strong>Work Type:</strong> {job.workType}
            </p>
            <p>
              <strong>Location:</strong> {job.workLocation}
            </p>
            <p>
              <strong>Qualification:</strong> {job.qualification}
            </p>
            <p>
              <strong>Salary:</strong> ${job.salary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchJobs;
