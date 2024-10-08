import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Profile.css"; // Ensure you have the correct CSS file for styling

const Profile = () => {
  const { id } = useParams(); // Extract the dynamic user ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false); // State to toggle edit mode
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    location: "",
    phoneNumber: "",
    role: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!id) {
          setError("User ID is missing or invalid");
          setLoading(false);
          return;
        }

        console.log("Fetching user profile for ID:", id);

        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/v1/user/get-user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUser(response.data.data);
          setFormData({
            name: response.data.data.name,
            lastname: response.data.data.lastname,
            email: response.data.data.email,
            location: response.data.data.location,
            phoneNumber: response.data.data.phoneNumber,
            role: response.data.data.role,
          });
        } else {
          setError("Failed to fetch user data: " + response.data.message);
        }
      } catch (err) {
        setError("Error fetching user data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/v1/user/update-user/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("User updated successfully");
      setEditMode(false); // Exit edit mode after successful update
    } catch (err) {
      alert("Error updating user: " + err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/v1/user/delete-user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("User deleted successfully");
        navigate("/"); // Redirect to home or another page
      } catch (err) {
        alert("Error deleting user: " + err.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) return <p className="loading">Loading profile...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        {!editMode ? (
          <div className="profile-details">
            <h2 className="profile-name">
              Name: {user?.name} {user?.lastname}
            </h2>
            <p className="profile-email">Email: {user?.email}</p>
            <p className="profile-location">Location: {user?.location}</p>
            <p className="profile-phone">Phone: {user?.phoneNumber}</p>
            <p className="profile-role">Role: {user?.role}</p>
            <div className="profile-buttons">
              <button className="edit-button" onClick={() => setEditMode(true)}>
                Edit
              </button>
              <button className="delete-button" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        ) : (
          <form className="update-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name:</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone:</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="button"
              className="update-button"
              onClick={handleUpdate}
            >
              Save Changes
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
