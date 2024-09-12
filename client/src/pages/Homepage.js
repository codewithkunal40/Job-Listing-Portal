import React from "react";
import "../css/Homepage.css";
import Navbar from "../components/Navbar";
import Home from "./Home";
const Homepage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="homepage">
        <Home />
      </div>
    </div>
  );
};

export default Homepage;
