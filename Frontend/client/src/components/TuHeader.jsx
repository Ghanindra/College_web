

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "./TUHeader.css";
import logo from "../assets/tu.png";

import ExamForm from "../pages/ExamForm";
import ResultSearch from "../pages/ResultSearch";
import ExamRoutineGallery from "../pages/ExamRoutineGallery";

export default function TUHeader() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [openExamSection, setOpenExamSection] = useState(null);

  const { user, logout } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Notices", path: "/news" },
    {
      name: "Faculty",
      children: [
        { name: "Institute of Engineering", path: "https://ioe.tu.edu.np/", external: true },
        { name: "Institute of Medicine", path: "https://iom.edu.np", external: true },
        { name: "Institute of Science and Technology", path: "https://iost.tu.edu.np", external: true },
        { name: "Institute of Forestry", path: "https://iof.edu.np", external: true },
        { name: "Faculty of Management", path: "https://fomecd.edu.np", external: true },
        { name: "Faculty of Law", path: "https://fol.tu.edu.np", external: true },
      ],
    },
    {
      name: "Campuses",
      children: [
        { name: "Amrit Science Campus", path: "https://amritcampus.edu.np", external: true },
        { name: "Tri-Chandra Campus", path: "https://trichandracampus.edu.np", external: true },
        { name: "Ratna Rajya Laxmi Campus", path: "https://www.collegesnepal.com/ratna-rajya-laxmi-campus/", external: true },
        { name: "Patan Multiple Campus", path: "https://pmc.tu.edu.np", external: true },
        { name: "Saraswoti Multiple Campus", path: "https://smc.edu.np", external: true },
        { name: "Mahendra Ratna Campus", path: "https://mrc.tu.edu.np", external: true },
        { name: "Padma Kanya Multiple Campus", path: "https://edusanjal.com/college/padma-kanya-campus/", external: true },
      ],
    },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    {
      name: "Exam Schedule",
      children: [
        { name: "Exam Routine" },
        { name: "Result" },
        { name: "Exam Form" },
      ],
    },
  ];

  const linkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <header className="header">
      <div className="container">

        {/* LOGO */}
        <NavLink to="/" className="logo-link">
          <img src={logo} alt="TU Logo" className="logo" />
          <span className="logo-text">Tribhuvan University</span>
        </NavLink>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="nav-desktop">
          {navItems.map((item, i) =>
            item.children ? (
              <div
                key={i}
                className="nav-dropdown"
                onMouseEnter={() => setDropdown(item.name)}
                onMouseLeave={() => setDropdown(null)}
              >
                <span className="nav-dropdown-label">
                  {item.name}
                </span>

                <div className={`nav-dropdown-menu ${dropdown === item.name ? "active" : ""}`}>
                  {item.name === "Exam Schedule"
                    ? item.children.map((child, idx) => (
                        <button
                          key={idx}
                          className="nav-dropdown-item"
                          onClick={() => {
                            setOpenExamSection(child.name.toLowerCase().replace(/\s+/g, "-"));
                            setDropdown(null);
                          }}
                        >
                          {child.name}
                        </button>
                      ))
                    : item.children.map((child, idx) =>
                        child.external ? (
                          <a
                            key={idx}
                            href={child.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-dropdown-item"
                          >
                            {child.name}
                          </a>
                        ) : (
                          <NavLink key={idx} to={child.path} className="nav-dropdown-item">
                            {child.name}
                          </NavLink>
                        )
                      )}
                </div>
              </div>
            ) : (
              <NavLink key={i} to={item.path} className={linkClass}>
                {item.name}
              </NavLink>
            )
          )}

          {/* AUTH BUTTONS (DESKTOP) */}
          <div className="auth-actions">
            {!user ? (
              <>
                <NavLink to="/login" className="nav-link">Login</NavLink>
                {/* <NavLink to="/register" className="nav-link register-btn">Register</NavLink> */}
              </>
            ) : (
              <>
                {user.role === "admin" && (
                  <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                )}
                {user.role === "student" && (
                  <NavLink to="/student" className="nav-link">My Dashboard</NavLink>
                )}
                <button onClick={logout} className="nav-link logout-btn">Logout</button>
              </>
            )}
          </div>
        </nav>

        {/* ================= MOBILE MENU ================= */}
        <button className="mobile-menu-button" onClick={() => setOpen(!open)}>
          ☰
        </button>

        <nav className={`nav-mobile ${open ? "active" : ""}`}>
          <div className="nav-mobile-content">
            {navItems.map((item, i) =>
              item.children ? (
                <div key={i} className="nav-mobile-dropdown">
                  <div className="nav-mobile-dropdown-label">{item.name}</div>
                  <div className="nav-mobile-dropdown-content">
                    {item.name === "Exam Schedule"
                      ? item.children.map((child, idx) => (
                          <button
                            key={idx}
                            className="nav-mobile-dropdown-item"
                            onClick={() => {
                              setOpenExamSection(child.name.toLowerCase().replace(/\s+/g, "-"));
                              setOpen(false);
                            }}
                          >
                            {child.name}
                          </button>
                        ))
                      : item.children.map((child, idx) =>
                          child.external ? (
                            <a
                              key={idx}
                              href={child.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="nav-mobile-dropdown-item"
                            >
                              {child.name}
                            </a>
                          ) : (
                            <NavLink
                              key={idx}
                              to={child.path}
                              className="nav-mobile-dropdown-item"
                              onClick={() => setOpen(false)}
                            >
                              {child.name}
                            </NavLink>
                          )
                        )}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={i}
                  to={item.path}
                  className="nav-mobile-link"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </NavLink>
              )
            )}

            {/* AUTH BUTTONS (MOBILE) */}
            {!user ? (
              <>
                <NavLink to="/login" className="nav-mobile-link" onClick={() => setOpen(false)}>Login</NavLink>
                <NavLink to="/register" className="nav-mobile-link" onClick={() => setOpen(false)}>Register</NavLink>
              </>
            ) : (
              <>
                {user.role === "admin" && (
                  <NavLink to="/dashboard" className="nav-mobile-link">Dashboard</NavLink>
                )}
                {user.role === "student" && (
                  <NavLink to="/student" className="nav-mobile-link">My Dashboard</NavLink>
                )}
                <button onClick={logout} className="nav-mobile-link logout-btn">Logout</button>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* ================= EXAM MODAL ================= */}
      {openExamSection && (
        <div className="modal-overlay" onClick={() => setOpenExamSection(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setOpenExamSection(null)}>&times;</button>

            {openExamSection === "exam-form" && <ExamForm />}
            {openExamSection === "exam-routine" && <ExamRoutineGallery />}
            {openExamSection === "result" && <ResultSearch />}
          </div>
        </div>
      )}
    </header>
  );
}
