import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // import your CSS here

export default function Footer() {
  return (
    <footer className="page-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Tribhuvan University</h3>
          <p className="footer-description">
            Nepal's premier institution of higher education, committed to excellence in teaching, research, and service.
          </p>
        </div>
        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/about">About TU</Link></li>
            <li><Link to="/admissions">Admissions</Link></li>
            <li><Link to="/research">Research</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4 className="footer-subtitle">Contact Info</h4>
          <div className="contact-info">
            <p> Kirtipur, Kathmandu, Nepal</p>
            <p>📞 +977-1-4330433</p>
            <p>✉️ info@tu.edu.np</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Tribhuvan University © {new Date().getFullYear()} | All Rights Reserved</p>
      </div>
    </footer>
  );
}
