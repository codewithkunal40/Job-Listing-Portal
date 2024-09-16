import React from "react";
// import "../css/Homepage.css";
import Navbar from "../components/Navbar";
import Home from "./Home";

import Footerr from "../components/SmallFooter";
const Homepage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="homepage">
        <Home />
        <Footerr />
      </div>
    </div>
  );
};

export default Homepage;
