// src/pages/Dashboard.jsx
import { Outlet, useLocation } from "react-router-dom";
import React,{ useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

export default function Dashboard() {
  const location = useLocation();
  const isRootDashboard = location.pathname === "/dashboard";

  const [stats, setStats] = useState({
    noticeCount: 0,
    eventCount: 0,
    formCount: 0,
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/stats/dashboard-stats")
         .then(res => setStats(res.data))
         .catch(console.error);
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main-content">
        {isRootDashboard ? (
          <div className="dashboard-welcome-section">
            <h2>Welcome to Admin Dashboard</h2>

            {/* 👇 dynamic counters */}
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{stats.noticeCount}</h3>
                <p>Total Notices</p>
              </div>
              <div className="stat-card">
                <h3>{stats.eventCount}</h3>
                <p>Total Events</p>
              </div>
              <div className="stat-card">
                <h3>{stats.formCount}</h3>
                <p>Total Exam Forms</p>
              </div>
            </div>

            <p>Use the sidebar to manage college data.</p>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}