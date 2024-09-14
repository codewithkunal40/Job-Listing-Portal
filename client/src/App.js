import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import JobDashboard from "./pages/JobDashboard";

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/job-dashboard" element={<JobDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
