import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/jobseekerlist.css"; // Ensure this file is created for styling

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/api/v1/job/get-all-jobs");

        setJobs(response.data.jobs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="job-list-container">
      <h2>Job List</h2>
      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        <div className="job-list">
          {jobs.map((job) => (
            <div className="job-card" key={job._id}>
              <h3>{job.position}</h3>
              <p>Company: {job.company}</p>
              <p>Location: {job.workLocation}</p>
              <p>Salary: {job.salary}</p>
              <p>Qualification: {job.qualification}</p>
              <p>Description: {job.description}</p>
              <p>Type: {job.workType}</p>
              <p>Status: {job.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
