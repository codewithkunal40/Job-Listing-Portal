import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/apllicants.css"; // Ensure this file is created for styling

const ViewApplications = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    lastname: "",
    location: "",
    phoneNumber: "",
    role: "",
  });

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

  const handleEdit = (user) => {
    setEditingUser(user);
    setUpdatedUser({
      name: user.name,
      email: user.email,
      lastname: user.lastname,
      location: user.location,
      phoneNumber: user.phoneNumber,
      role: user.role,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/v1/user/update-user`,
        updatedUser, // Send only the updated fields, user ID is managed by the server
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(
        users.map((user) =>
          user._id === editingUser._id ? { ...user, ...updatedUser } : user
        )
      );
      setEditingUser(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/v1/user/delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="loading">Loading users...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="view-applications">
      <h1 className="heading">Applicants List</h1>
      {users.length === 0 ? (
        <p className="no-applicants">No applicants found</p>
      ) : (
        <div className="user-list">
          {users.map((user) => (
            <div className="user-card" key={user._id}>
              <div className="user-info">
                <p className="user-name">Name: {user.name}</p>
                <p className="user-email">Email: {user.email}</p>
                <p className="user-location">Location: {user.location}</p>
                <p className="user-phone">Phone: {user.phoneNumber}</p>
                <p className="user-role">Role: {user.role}</p>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingUser && (
        <form className="edit-form" onSubmit={handleUpdate}>
          <h2>Edit User</h2>
          <label>
            Name:
            <input
              type="text"
              value={updatedUser.name}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, name: e.target.value })
              }
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={updatedUser.email}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, email: e.target.value })
              }
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={updatedUser.lastname}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, lastname: e.target.value })
              }
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              value={updatedUser.location}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, location: e.target.value })
              }
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              value={updatedUser.phoneNumber}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, phoneNumber: e.target.value })
              }
            />
          </label>
          <label>
            Role:
            <input
              type="text"
              value={updatedUser.role}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, role: e.target.value })
              }
            />
          </label>
          <button type="submit">Update User</button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => setEditingUser(null)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default ViewApplications;
