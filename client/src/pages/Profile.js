import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // This hook helps in getting the dynamic ID from the URL
import "../css/Profile.css"; // Ensure you create this CSS file for styling

const Profile = () => {
  const { id } = useParams(); // Extract the dynamic user ID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/v1/user/get-user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchUserProfile(); // Only fetch the profile if an ID exists
    }
  }, [id]);

  if (loading) return <p className="loading">Loading profile...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-details">
          <h2 className="profile-name">
            {user?.name} {user?.lastname}
          </h2>
          <p className="profile-email">Email: {user?.email}</p>
          <p className="profile-location">Location: {user?.location}</p>
          <p className="profile-phone">Phone: {user?.phoneNumber}</p>
          <p className="profile-phone">Role: {user?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
