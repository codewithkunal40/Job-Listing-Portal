import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
// Updated import
import JobDashboard from "./pages/JobDashboard";
import EmployerDashboardRoutes from "./pages/EmployerDashboardRoutes";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import EmployerLayout from "./components/Layout/EmployerLayout";
import About from "./pages/About";

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          element={
            <PublicRoute>
              <Homepage />
            </PublicRoute>
          }
        />
        <Route
          path="/About"
          element={
            <PublicRoute>
              <About />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        {/* Role-based routing */}
        <Route
          path="/employer-dashboard/*"
          element={
            <PrivateRoute>
              <EmployerLayout>
                <EmployerDashboardRoutes />
              </EmployerLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/job-dashboard/*"
          element={
            <PrivateRoute>
              <JobDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
