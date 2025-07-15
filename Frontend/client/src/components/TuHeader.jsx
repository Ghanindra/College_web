

import { useState } from "react"
import { NavLink } from "react-router-dom"
import "./TUHeader.css"
import logo from "../assets/tu.png"

export default function TUHeader() {
  const [open, setOpen] = useState(false)
  const [dropdown, setDropdown] = useState(null)

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Notices", path: "/news" },
    {
      name: "Courses",
      children: ["BSc CSIT", "BBA", "BBS", "B.Ed", "BCA", "B.Sc"],
    },
    {
      name: "Faculties",
      children: ["Science", "Management", "Education", "Humanities", "Law", "Engineering"],
    },
    { name: "Events", path: "/dashboard/events" },
    { name: "Gallery", path: "/dashboard/gallery" },
    { name: "Downloads", path: "/downloads" },
  ]

  const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link")

  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <NavLink to="/" className="logo-link">
          <img src={logo} alt="TU Logo" className="logo" />
          <span  className="logo-text">Tribhuvan University</span>
        </NavLink>

        {/* Desktop Nav */}
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
                  <svg className="dropdown-arrow" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div className={`nav-dropdown-menu ${dropdown === item.name ? "active" : ""}`}>
                  {item.children.map((child, index) => (
                    <NavLink
                      key={index}
                      to={`/${item.name.toLowerCase()}/${child.toLowerCase().replace(/\s+/g, "-")}`}
                      className="nav-dropdown-item"
                      onClick={() => setDropdown(null)}
                    >
                      {child}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink key={i} to={item.path} className={linkClass}>
                {item.name}
              </NavLink>
            ),
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="mobile-menu-toggle">
          <button onClick={() => setOpen(!open)} className="mobile-menu-button" aria-label="Toggle mobile menu">
            <svg className="mobile-menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          {/* Mobile Navigation */}
          <nav className={`nav-mobile ${open ? "active" : ""}`}>
            <div className="nav-mobile-content">
              {navItems.map((item, i) =>
                item.children ? (
                  <div key={i} className="nav-mobile-dropdown">
                    <div className="nav-mobile-dropdown-label">
                      {item.name}
                      <svg className="dropdown-arrow-mobile" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="nav-mobile-dropdown-content">
                      {item.children.map((child, index) => (
                        <NavLink
                          key={index}
                          to={`/${item.name.toLowerCase()}/${child.toLowerCase().replace(/\s+/g, "-")}`}
                          className="nav-mobile-dropdown-item"
                          onClick={() => setOpen(false)}
                        >
                          {child}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NavLink key={i} to={item.path} className="nav-mobile-link" onClick={() => setOpen(false)}>
                    {item.name}
                  </NavLink>
                ),
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
