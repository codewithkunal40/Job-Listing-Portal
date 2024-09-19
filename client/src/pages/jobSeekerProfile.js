import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/jobSeekerProfile.css";

const JobSeekerProfile = () => {
  const { id } = useParams(); // Get the user ID from the route parameters
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [user, setUser] = useState(null); // State for user profile data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchJobSeekerProfile = async () => {
      try {
        // Check if ID is valid before making the request
        if (!id) {
          throw new Error("Invalid user ID");
        }

        const response = await axios.get(`/api/v1/user/job-seeker/${id}`);
        setUser(response.data.data); // Use response.data.data based on your API structure
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch the profile");
        setLoading(false);
      }
    };

    fetchJobSeekerProfile();
  }, [id]);

  const handleUpdate = async () => {
    // Logic for updating the user profile
    try {
      const updatedUser = await axios.put(
        `/api/v1/user/job-seeker/${id}`,
        user
      );
      setUser(updatedUser.data.data);
      alert("Profile updated successfully!");
    } catch (err) {
      setError(err.message || "Failed to update the profile");
    }
  };

  const handleDelete = async () => {
    // Logic for deleting the user profile
    try {
      await axios.delete(`/api/v1/user/job-seeker/${id}`);
      alert("Profile deleted successfully!");
      navigate("/"); // Redirect to another page after deletion
    } catch (err) {
      setError(err.message || "Failed to delete the profile");
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-details">
          <h1>
            {user.name} {user.lastname}
          </h1>
          <p>Email: {user.email}</p>
          <p>Location: {user.location}</p>
          <p>Phone: {user.phoneNumber}</p>
          <p>Role: {user.role}</p>
          <button className="btn update-btn" onClick={handleUpdate}>
            Update Profile
          </button>
          <button className="btn delete-btn" onClick={handleDelete}>
            Delete Profile
          </button>
        </div>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
};

export default JobSeekerProfile;
