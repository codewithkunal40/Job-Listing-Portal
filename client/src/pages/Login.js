import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../css/Login.css";
import Navbar from "../components/Navbar";
import Footer from "../components/SmallFooter";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { loading } = useSelector((state) => state.alertSlice);
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
        navigate("/job-dashboard");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // Check for specific error messages from the backend
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message ||
            "Invalid email or password. Please try again."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
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
      <Footer />
    </div>
  );
};

export default Login;
