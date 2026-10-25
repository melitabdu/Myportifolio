import React from "react";
import "./Sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: "📊",
    },
    {
      label: "Manage Skills",
      path: "/admin/skills",
      icon: "🛠️",
    },
    {
      label: "Manage Projects",
      path: "/admin/projects",
      icon: "💻",
    },
    {
      label: "Manage Insights",
      path: "/admin/insights",
      icon: "📝",
    },
  ];

  return (
    <aside className="sidebar">
      <h2 className="logo">Portfolio Admin</h2>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.path}
            type="button"
            onClick={() => navigate(item.path)}
            className={`sidebar-btn ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;