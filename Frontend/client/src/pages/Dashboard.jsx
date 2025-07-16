import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "../components/Sidebar" // Assuming Sidebar is in the same components directory
import "./Dashboard.css" // Import the external CSS file

export default function Dashboard() {
  const location = useLocation()
  const isRootDashboard = location.pathname === "/dashboard"

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main-content">
        {isRootDashboard ? (
          <div className="dashboard-welcome-section">
            <h2>Welcome to Admin Dashboard</h2>
            <p>Use the sidebar to manage college data like notices, events, courses, faculty, and gallery.</p>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  )
}
