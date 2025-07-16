import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css"; // Import the CSS

const Sidebar = () => {
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
        <NavLink to="/dashboard/courses" className={linkClass}>
          Courses
        </NavLink>
        <NavLink to="/dashboard/faculty" className={linkClass}>
          Faculty
        </NavLink>
        <NavLink to="/dashboard/gallery" className={linkClass}>
          Gallery
        </NavLink>
        <NavLink to="/dashboard/examform" className={linkClass}>
          Exam Forms
        </NavLink>
         <NavLink to="/dashboard/addresult" className={linkClass}>
          Add Result
        </NavLink>
           <NavLink to="/dashboard/addroutine" className={linkClass}>
          Add Routine
        </NavLink>
        <NavLink to="/login" className={linkClass}>
          Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
