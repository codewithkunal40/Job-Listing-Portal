// ResourcesPage.js
import React from "react";
import "../css/Resources.css"; 

const ResourcesPage = () => {
  const resources = [
    {
      title: "Resume Building Tips",
      description: "Learn how to craft a resume that stands out to employers.",
      link: "https://resume.io/",
    },
    {
      title: "Interview Preparation",
      description:
        "Common interview questions and how to answer them effectively.",
      link: "https://www.simplilearn.com/web-development-interview-questions-article",
    },
    {
      title: "Job Market Insights",
      description:
        "Stay up-to-date with the latest trends in the job market.",
      link: "https://www.linkedin.com/",
    },
    {
      title: "Networking Strategies",
      description: "Best practices for building and leveraging your network.",
      link: "https://www.forbes.com/sites/andrewfennell/2023/05/16/5-winning-networking-strategies-for-2023/",
    },
  ];

  return (
    <div className="resources-container">
      <h1>Job Search Resources</h1>
      <p>Here are some helpful resources to assist you in your job search journey.</p>
      
      <div className="resources-list">
        {resources.map((resource, index) => (
          <div className="resource-card" key={index}>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <a href={resource.link} target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
