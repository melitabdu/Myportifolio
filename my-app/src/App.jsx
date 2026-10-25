import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider } from "./context/AdminAuthContext";

import AdminLogin from "./pages/AdminLogin";
import AdminDashbord from "./pages/AdminDashbord";
import SidebarLayout from "./components/SidebarLayout";
import AdminRoute from "./components/AdminRoutes";

import Skills from "./pages/skill";
import Projects from "./pages/project";
import Insights from "./pages/Insight";

const App = () => {
  const token = localStorage.getItem("adminToken");

  return (
    <Routes>
      {/* Public route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected admin routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminAuthProvider>
              <SidebarLayout />
            </AdminAuthProvider>
          </AdminRoute>
        }
      >
        {/* Default admin page */}
        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        {/* Dashboard */}
        <Route
          path="dashboard"
          element={<AdminDashbord />}
        />

        {/* Portfolio management */}
        <Route
          path="skills"
          element={<Skills />}
        />

        <Route
          path="projects"
          element={<Projects />}
        />

        <Route
          path="insights"
          element={<Insights />}
        />

        {/* Unknown admin routes */}
        <Route
          path="*"
          element={<Navigate to="dashboard" replace />}
        />
      </Route>

      {/* Global fallback */}
      <Route
        path="*"
        element={
          <Navigate
            to={token ? "/admin/dashboard" : "/admin/login"}
            replace
          />
        }
      />
    </Routes>
  );
};

export default App;