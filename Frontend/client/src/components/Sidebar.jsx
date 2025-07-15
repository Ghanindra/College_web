import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link";

  return (
    <div className="sidebar" style={{ width: 220, padding: 20, background: "#222", height: "100vh", color: "#fff" }}>
      <h2 style={{ color: "white", marginBottom: 30 }}>Admin Dashboard</h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        <NavLink to="/dashboard/notices" className={linkClass}>
          Notices
        </NavLink>
        <NavLink to="/dashboard/events" className={linkClass}>
          Events
        </NavLink>
        <NavLink to="/dashboard/courses" className={linkClass}>
          Courses
        </NavLink>
        <NavLink to="/dashboard/faculty" className={linkClass}>
          Faculty
        </NavLink>
        <NavLink to="/dashboard/gallery" className={linkClass}>
          Gallery
        </NavLink>
        <NavLink to="/login" className={linkClass}>
          Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
