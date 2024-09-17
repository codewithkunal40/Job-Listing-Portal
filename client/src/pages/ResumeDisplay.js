import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ResumeDisplay() {
  const [resumeUrl, setResumeUrl] = useState("");
  const { id } = useParams(); // Extract the ID from the URL parameters

  useEffect(() => {
    const fetchResume = async () => {
      if (!id) {
        console.error("User ID is undefined or not found");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/v1/user/get-resume/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // Ensure correct response type
        });

        const url = URL.createObjectURL(response.data);
        setResumeUrl(url);
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };

    fetchResume();
  }, [id]);

  return (
    <div>
      <h2>Resume</h2>
      {resumeUrl ? (
        <a href={resumeUrl} download="resume.pdf">
          Download Resume
        </a>
      ) : (
        <p>Loading resume...</p>
      )}
    </div>
  );
}

export default ResumeDisplay;
