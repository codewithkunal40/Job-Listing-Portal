import React from "react";

const Profile = () => {
  return (
    <div class="profile-container">
      <header class="profile-header">
        <h1>unknow</h1>
        <p>Software Engineer</p>
        <p>unknown@example.com | (123) 456-7890</p>
      </header>

      <div class="profile-image">
        <img src="profile-picture.jpg" alt="Profile Picture" />
      </div>

      <section class="profile-section">
        <h2>About Me</h2>
        <p>
          Passionate software engineer with 5 years of experience in developing
          scalable applications. Proficient in JavaScript, Python, and React.
          Adept at collaborating with cross-functional teams to deliver high-quality
          software solutions.
        </p>
      </section>

      {/* <!-- Skills Section --> */}
      <section class="profile-section">
        <h2>Skills</h2>
        <ul class="skills-list">
          <li>JavaScript</li>
          <li>Python</li>
          <li>React</li>
          <li>Node.js</li>
        </ul>
      </section>

      

    

      <section class="profile-section">
        <h2>Resume</h2>
        <a
          href="resume.pdf"
          class="resume-button"
          download
        >
          Download Resume
        </a>
      </section>
    </div>
  );
};

export default Profile;