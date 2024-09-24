import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/ResumeDisplay.css";

function ResumeDisplay() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get("/api/v1/user/get-all-resume");
        const resumeData = response.data.data; 
        setResumes(resumeData);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div className="resume-display">
      <h2>Applicant Resumes</h2>
      {resumes.length > 0 ? (
        <div className="resume-card-container text-center">
          {resumes.map((user) => (
            <div className="resume-card" key={user._id}>
              <div className="resume-card-header">
                <h3>
                  {user.name} {user.lastname}
                </h3>
                <h2 className="resume-role">{user.role}</h2>
              </div>
              <div className="resume-card-body">
                {user.resume ? (
                  <a
                    href={`/${user.resume}`}
                    download
                    className="resume-download-link"
                  >
                    Download Resume
                  </a>
                ) : (
                  <p>No resume uploaded</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading resumes...</p>
      )}
    </div>
  );
}

export default ResumeDisplay;
