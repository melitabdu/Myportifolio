import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./SidebarLayout.css";

const SidebarLayout = () => {
  const location = useLocation();

  const pageTitles = {
    "/admin/dashboard": "Dashboard",
    "/admin/skills": "Manage Skills",
    "/admin/projects": "Manage Projects",
    "/admin/insights": "Manage Insights",
  };

  const currentTitle =
    pageTitles[location.pathname] || "Portfolio Admin";

  return (
    <div className="admin-layout">
      <Sidebar />

      <main className="main-content">
        <header className="admin-header">
          <h1>{currentTitle}</h1>
        </header>

        <section className="admin-page-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default SidebarLayout;