import React, { useState } from "react";
import axios from "axios";
import "../css/resumeUploadSeeker.css"; // Add the path to your CSS file

const ResumeUploadSeeker = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  // Handle file input change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      setUploadStatus("Uploading...");
      // Sending the request to the API
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/v1/user/upload-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      );

      if (response.status === 200) {
        setUploadStatus("Resume uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      setUploadStatus("Error uploading resume. Please try again.");
    }
  };

  return (
    <div className="resume-upload-container">
      <h1 className="resume-upload-title">Upload Your Resume</h1>
      <form onSubmit={handleSubmit}>
        <div className="file-input">
          <label htmlFor="file-upload" className="file-label">
            Choose a file:
          </label>
          <input
            type="file"
            id="file-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="file-input-field"
          />
        </div>
        <button type="submit" className="upload-button">
          Upload Resume
        </button>
      </form>

      {/* Display upload status */}
      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
    </div>
  );
};

export default ResumeUploadSeeker;
