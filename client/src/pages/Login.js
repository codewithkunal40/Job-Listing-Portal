import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import Navbar from "../components/Navbar";
import SmallFooter from "../components/SmallFooter";
import "../css/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/auth/login", formData);
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success("Login successful!");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role); // Save user role
        // Navigate based on role
        if (res.data.user.role === "employer") {
          navigate("/employer-dashboard");
        } else {
          navigate("/job-dashboard");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
      </div>
      <SmallFooter />
      <footer />
    </div>
  );
};

export default Login;
