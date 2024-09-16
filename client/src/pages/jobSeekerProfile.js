import React, { useState, useEffect } from "react";

import axios from "axios";

const JobSeekerProfile = () => {
  return (
    <div classNameName="profile-container">
      <header className="profile-header">
        <h1>unknow</h1>
        <p>Software Engineer</p>
        <p>unknown@example.com | (123) 456-7890</p>
      </header>

      <div className="profile-image">
        <img src="profile-picture.jpg" alt="Profile Picture" />
      </div>

      <section className="profile-section">
        <h2>About Me</h2>
        <p>
          Passionate software engineer with 5 years of experience in developing
          scalable applications. Proficient in JavaScript, Python, and React.
          Adept at collaborating with cross-functional teams to deliver high-quality
          software solutions.
        </p>
      </section>

      {/* <!-- Skills Section --> */}
      <section className="profile-section">
        <h2>Skills</h2>
        <ul className="skills-list">
          <li>JavaScript</li>
          <li>Python</li>
          <li>React</li>
          <li>Node.js</li>
        </ul>
      </section>

      

    

      <section className="profile-section">
        <h2>Resume</h2>
        <a
          href="resume.pdf"
          className="resume-button"
          download
        >
          Download Resume
        </a>
      </section>
    </div>
  );
};

export default JobSeekerProfile;