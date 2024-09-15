import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewApplications = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/v1/user/get-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.data);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Applicants List</h1>
      {users.length === 0 ? (
        <p>No applicants found</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              {/* Add other user details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewApplications;
