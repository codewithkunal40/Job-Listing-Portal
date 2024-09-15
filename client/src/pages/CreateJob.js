import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import "../css/CreateJob.css";
const CreateJob = () => {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    qualification: "",
    salary: "",
    workLocation: "Mumbai", // Default location
    workType: "full-time", // Default work type
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { company, position, qualification, salary, workLocation, workType } =
      formData;

    if (
      !company ||
      !position ||
      !qualification ||
      !salary ||
      !workLocation ||
      !workType
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/job/create-job", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());

      if (data.success) {
        toast.success("Job created successfully");
        navigate("/employer-dashboard"); // Redirect to job dashboard
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Failed to create job, please try again later");
    }
  };

  return (
    <div className="create-job-container">
      <h2>Create a Job</h2>
      <form className="create-job-form" onSubmit={handleSubmit}>
        {[
          {
            label: "Company",
            name: "company",
            type: "text",
            placeholder: "Enter company name",
          },
          {
            label: "Position",
            name: "position",
            type: "text",
            placeholder: "Enter job position",
          },
          {
            label: "Qualification",
            name: "qualification",
            type: "text",
            placeholder: "Enter required qualifications",
          },
          {
            label: "Salary",
            name: "salary",
            type: "number",
            placeholder: "Enter salary",
          },
          {
            label: "Work Location",
            name: "workLocation",
            type: "text",
            placeholder: "Enter work location",
          },
        ].map(({ label, name, type, placeholder }) => (
          <div className="form-group" key={name}>
            <label>{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              required
            />
          </div>
        ))}
        <div className="form-group">
          <label>Work Type</label>
          <select
            name="workType"
            value={formData.workType}
            onChange={handleChange}
          >
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
