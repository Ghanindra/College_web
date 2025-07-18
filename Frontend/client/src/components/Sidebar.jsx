import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css"; // Import the CSS

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link";

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Dashboard</h2>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard/notices" className={linkClass}>
          Notices
        </NavLink>
        <NavLink to="/dashboard/events" className={linkClass}>
          Events
        </NavLink>
      
        <NavLink to="/dashboard/gallery" className={linkClass}>
          Gallery
        </NavLink>
        <NavLink to="/dashboard/examform" className={linkClass}>
          Exam Forms
        </NavLink>
        <NavLink to="/dashboard/formconfig" className={linkClass}>
         Allow Exam Form
        </NavLink>
        <NavLink to="/dashboard/addresult" className={linkClass}>
          Add Result
        </NavLink>
        <NavLink to="/dashboard/addroutine" className={linkClass}>
          Add Routine
        </NavLink>
        <NavLink to="/dashboard/register" className={linkClass}>
          Register
        </NavLink>

        {/* Logout Button */}
        <button onClick={handleLogout} className="sidebar-link logout-button">
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
