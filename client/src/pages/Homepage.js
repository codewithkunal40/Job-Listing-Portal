import React from "react";
import "../css/Homepage.css";
import Navbar from "../components/Navbar";
import Home from "./Home";
import Footer from "../components/Footer";
const Homepage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="homepage">
        <Home />
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
