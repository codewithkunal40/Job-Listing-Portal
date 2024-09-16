import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

function UploadResume() {
  const [resume, setResume] = useState(null);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", resume);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/v1/user/upload-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Display success notification
      toast.success("Resume uploaded successfully!");
      console.log("Resume uploaded successfully", response.data);
    } catch (error) {
      // Display error notification
      toast.error("Error uploading resume. Please try again.");
      console.error("Error uploading resume", error);
    }
  };

  return (
    <div>
      <h2>Upload Resume</h2>
      {/* Toast container */}
      <Toaster />
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadResume;
