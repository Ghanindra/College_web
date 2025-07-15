import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const location = useLocation();
  const isRootDashboard = location.pathname === "/dashboard";

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: 20, minHeight: "100vh", background: "#f0f0f0" }}>
        {isRootDashboard ? (
          <div>
            <h2>Welcome to Admin Dashboard</h2>
            <p>
              Use the sidebar to manage college data like notices, events, courses, faculty, and gallery.
            </p>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}
