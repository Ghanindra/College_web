// src/pages/Dashboard.jsx
import { Outlet, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Base_Url from '../api/Base_Url'

export default function Dashboard() {
  const location = useLocation();
  const isRootDashboard = location.pathname === "/dashboard";

  const [stats, setStats] = useState({
    noticeCount: 0,
    eventCount: 0,
    formCount: 0,
  });

  useEffect(() => {
    axios
      .get(`${Base_Url}/stats/dashboard-stats`)
      .then((res) => setStats(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] text-[#212529] font-[Segoe_UI] w-[98vw]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
     <main
  className="
    flex-grow
    min-h-screen
    bg-white
    box-border
    overflow-y-auto
    px-10
    py-8

    md:px-8
    md:py-6

    lg:ml-[250px]   /* only apply left margin on large screens */
    sm:ml-0
    sm:px-4
    sm:py-6
  "
>
        {isRootDashboard ? (
  <div
    className="
      w-full
      max-w-[720px]   /* max width for larger screens */
      mx-auto
      bg-[#e9ecef]
      rounded-xl
      shadow-md
      text-center
      px-6
      py-8

      sm:px-4
      sm:py-6
      sm:max-w-full
    "
  >
    <h2 className="text-[2rem] sm:text-[1.5rem] font-bold mb-4 text-[#212529]">
      Welcome to Admin Dashboard
    </h2>

    {/* Stats */}
    <div
      className="
        flex
        gap-4
        my-6
        flex-wrap
        justify-center
      "
    >
      <div className="flex-1 min-w-[120px] bg-white rounded-lg px-4 py-4 shadow text-center">
        <h3 className="text-[2rem] sm:text-[1.5rem] text-[#007bff] font-bold">
          {stats.noticeCount}
        </h3>
        <p>Total Notices</p>
      </div>

      <div className="flex-1 min-w-[120px] bg-white rounded-lg px-4 py-4 shadow text-center">
        <h3 className="text-[2rem] sm:text-[1.5rem] text-[#007bff] font-bold">
          {stats.eventCount}
        </h3>
        <p>Total Events</p>
      </div>

      <div className="flex-1 min-w-[120px] bg-white rounded-lg px-4 py-4 shadow text-center">
        <h3 className="text-[2rem] sm:text-[1.5rem] text-[#007bff] font-bold">
          {stats.formCount}
        </h3>
        <p>Total Exam Forms</p>
      </div>
    </div>

    <p className="text-[1rem] leading-relaxed text-[#495057]">
      Use the sidebar to manage college data.
    </p>
  </div>
) : (
  <Outlet />
)}
      </main>
    </div>
  );
}