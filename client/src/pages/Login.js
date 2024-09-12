import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const res = await axios.post("/api/v1/auth/login", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        toast.success("Login successful!");
        localStorage.setItem("token", res.data.token);
        navigate("/job-dashboard");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error during login", error);
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          
          <div class="form-group">

          <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          
            </div>
            
          </div>
          <div>
          <div class="form-group">
          <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            
          
        </div>
        <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
