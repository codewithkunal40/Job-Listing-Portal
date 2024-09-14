import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";
import Navbar from "../components/Navbar";
import Footerr from "../components/SmallFooter";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    location: "India",
    phoneNumber: "",
    role: "job seeker",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/auth/register", formData);
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error during registration", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="register-wrapper">
        <div className="register-form-container">
          <h2 className="register-title">Register</h2>
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-item">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-item">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-item">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-item">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-item">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-item">
              <label className="form-label">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-select"
              >
                <option value="job seeker">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>
            </div>
            <button type="submit" className="register-btn-primary">
              Register
            </button>
          </form>
          <div className="login-link-container">
            <p>Already have an account?</p>
            <button
              className="register-btn-secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <Footerr />
    </div>
  );
};

export default Register;
