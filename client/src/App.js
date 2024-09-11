import React from "react";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashBoard from "./pages/DashBoard";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/job-dashboard" element={<DashBoard />} />
      </Routes>
    </div>
  );
};

export default App;
