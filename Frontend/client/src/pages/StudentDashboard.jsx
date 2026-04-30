
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import ExamForm from "../pages/ExamForm";
import SidebarItem from "../components/SidebarItem";
import DashboardOverview from "../components/DashboardOverview";
import FormDetails from "../components/FormDetails";
import ResultSearch from "../pages/ResultSearch";
import { useNavigate } from "react-router-dom";
import Base_Url from '../api/Base_Url'

const API_URL = `${Base_Url}`;

export default function StudentDashboard() {
  const {  logout, token } = useAuth();

  const [activePage, setActivePage] = useState("dashboard");
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();

const handleLogout = () => {
  logout();
  setTimeout(() => {
    navigate("/", { replace: true });
  }, 0);
};
  // ================= FETCH STUDENT FORM =================
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/forms/student/my-form`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
console.log("form data",res.data.form);

        setFormData(res.data.form || null);
      } catch (err) {
        console.error("Error fetching form:", err);
        setFormData(null);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchForm();
  }, [token]);

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f6f9" }}>
      
      {/* ================= SIDEBAR ================= */}
      <div
        style={{
          width: "250px",
          background: "#1e293b",
          color: "white",
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>Student Panel</h2>

        <SidebarItem
          label="Dashboard"
          active={activePage === "dashboard"}
          onClick={() => setActivePage("dashboard")}
        />

        <SidebarItem
          label="Fill Exam Form"
          active={activePage === "form"}
          onClick={() => setActivePage("form")}
        />

        <SidebarItem
          label="My Form Details"
          active={activePage === "details"}
          onClick={() => setActivePage("details")}
        />

        <SidebarItem
          label="Search Result"
          active={activePage === "result"}
          onClick={() => setActivePage("result")}
        />

        <button
          onClick={handleLogout}
          style={{
            marginTop: "40px",
            background: "#dc2626",
            border: "none",
            padding: "10px",
            width: "100%",
            color: "white",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Logout
        </button>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div style={{ flex: 1, padding: "40px" }}>
        
        {activePage === "dashboard" && (
          <DashboardOverview formData={formData} token={token}/>
        )}

        {activePage === "form" && <ExamForm />}

        {activePage === "details" && (
          formData ? (
            <FormDetails form={formData} token={token} />
          ) : (
            <p>You have not submitted any form yet.</p>
          )
        )}

        {activePage === "result" && <ResultSearch />}

      </div>
    </div>
  );
}
