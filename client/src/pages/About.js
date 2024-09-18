import react from "react";
import "../css/About.css";
import Navbar from "../components/Navbar";
const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <Navbar />
        <h1>About Us</h1>
      </div>
      <div className="about-content">
        <p>
          Welcome to <strong>Job Listing Portal</strong>, your number one source
          for all things career-related. We're dedicated to giving you the very
          best job listings, with a focus on quality, reliability, and ease of
          access.
        </p>
        <p>
          Founded in 2024 by a passionate team,{" "}
          <strong>Job Listing Portal</strong> has come a long way from its
          beginnings as a simple job posting board. Our aim is to empower job
          seekers by providing a platform that connects them to their dream
          opportunities, whether they're looking for full-time, part-time, or
          freelance positions.
        </p>
        <p>
          We strive to make the process of job searching easier and more
          effective, while also offering businesses a user-friendly portal to
          list their openings and find top-tier candidates. We now serve users
          all over the country and are thrilled to turn our passion into this
          online platform.
        </p>
        <p>
          We hope you enjoy using <strong>Job Listing Portal</strong> as much as
          we enjoy offering it to you. If you have any questions or comments,
          please don't hesitate to contact us.
        </p>
        <p>
          <em>
            Sincerely,
            <br />
            The Job Listing Portal Team
          </em>
        </p>
        <div className="teaminfo">
          <p>Pratik Jojode FULL STACK DEVELOPMENT 
            <a href="https://www.linkedin.com/in/pratik-jojode-95319726b/">LinkedIn</a>
          </p>
          <p>Kunal Raj Pandey FULL STACK DEVELOPMENT
            <a href="https://www.linkedin.com/in/kunal-raj-pandey-6912a6265?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">LinkedIn</a>
          </p>
          <p>Atik Khan FRONTEND DEVELOPMENT
            <a href="https://www.linkedin.com/in/atik-khan-ba0a6031b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">LinkedIn</a>
          </p>
          <p>Joyabrata Dewan FRONTEND DEVELOPMENT
            <a href="https://www.linkedin.com/in/joyabrata-dewan-920567248">LinkedIn</a>
          </p>
          <p>Karan Roy FRONTEND DEVELOPMENT 
            <a href="https://www.linkedin.com/in/karanroy?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">LinkedIn</a>
          </p>
          <p>S Balakrishnan FRONTEND DEVELOPMENT
            <a href="https://www.linkedin.com/in/s-balakrishnan-09bbbb219/">LinkedIn</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
