import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/JobList.css"; // Ensure this file is created for styling

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [updatedJob, setUpdatedJob] = useState({
    position: "",
    company: "",
    workLocation: "",
    salary: "",
    qualification: "",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("/api/v1/job/get-job", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJobs(response.data.jobs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleEdit = (job) => {
    setEditingJob(job);
    setUpdatedJob({
      position: job.position,
      company: job.company,
      workLocation: job.workLocation,
      salary: job.salary,
      qualification: job.qualification,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `/api/v1/job/update-job/${editingJob._id}`,
        updatedJob,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJobs(
        jobs.map((job) =>
          job._id === editingJob._id ? { ...job, ...updatedJob } : job
        )
      );
      setEditingJob(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/v1/job/delete-job/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

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
              <button onClick={() => handleEdit(job)}>Edit</button>
              <button onClick={() => handleDelete(job._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {editingJob && (
        <form className="edit-form" onSubmit={handleUpdate}>
          <h2>Edit Job</h2>
          <label>
            Position:
            <input
              type="text"
              value={updatedJob.position}
              onChange={(e) =>
                setUpdatedJob({ ...updatedJob, position: e.target.value })
              }
            />
          </label>
          <label>
            Company:
            <input
              type="text"
              value={updatedJob.company}
              onChange={(e) =>
                setUpdatedJob({ ...updatedJob, company: e.target.value })
              }
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              value={updatedJob.workLocation}
              onChange={(e) =>
                setUpdatedJob({ ...updatedJob, workLocation: e.target.value })
              }
            />
          </label>
          <label>
            Salary:
            <input
              type="text"
              value={updatedJob.salary}
              onChange={(e) =>
                setUpdatedJob({ ...updatedJob, salary: e.target.value })
              }
            />
          </label>
          <label>
            Qualification:
            <input
              type="text"
              value={updatedJob.qualification}
              onChange={(e) =>
                setUpdatedJob({ ...updatedJob, qualification: e.target.value })
              }
            />
          </label>
          <button type="submit">Update Job</button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => setEditingJob(null)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default JobList;
