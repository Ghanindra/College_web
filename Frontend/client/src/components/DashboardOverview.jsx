// DashboardOverview.jsx
import React, { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import axios from "axios";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .anim-0 { animation: fadeUp .45s .00s ease both; }
  .anim-1 { animation: fadeUp .45s .07s ease both; }
  .anim-2 { animation: fadeUp .45s .14s ease both; }
  .anim-3 { animation: fadeUp .45s .21s ease both; }
`;

export default function DashboardOverview({ formData, token }) {
  const [totalForms, setTotalForms] = useState(0);

  /* ── LOGIC UNCHANGED ── */
  const Form_status = formData?.approvalStatus || "Not Submitted";

  useEffect(() => {
    const fetchTotalForms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/forms/student/my-form", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotalForms(res.data.totalForms);
      } catch (err) {
        console.error("Failed to fetch total forms", err);
      }
    };
    if (formData) fetchTotalForms();
  }, [formData, token]);

  const hour  = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  return (
    <>
      <style>{STYLES}</style>

      <div
        className="min-h-screen bg-slate-50 pt-16 lg:pt-0 px-4 sm:px-6 lg:px-8 py-8"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* ── Page header ── */}
        <div className="anim-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
              <span>🎓</span>
              <span>/</span>
              <span>Student</span>
              <span>/</span>
              <span className="text-slate-600 font-semibold">Overview</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
              Dashboard
            </h1>
          </div>
          {/* Date pill */}
          <div
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white text-xs text-slate-500 font-medium self-start sm:self-auto"
            style={{ border: "1px solid #e8edf2", boxShadow: "0 1px 3px rgba(0,0,0,.05)" }}
          >
            <span>📅</span>
            {today}
          </div>
        </div>

        {/* ── Welcome banner ── */}
        <div
          className="anim-1 relative overflow-hidden rounded-2xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
          style={{
            background: "linear-gradient(130deg, #0a1628 0%, #163354 100%)",
            boxShadow: "0 4px 24px rgba(10,22,40,.18)",
          }}
        >
          {/* Decorative circle */}
          <div
            className="absolute -right-10 -top-10 w-52 h-52 rounded-full opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #c9a84c, transparent 70%)" }}
          />
          <div
            className="absolute right-24 bottom-0 w-32 h-32 rounded-full opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, #fff, transparent 70%)" }}
          />

          {/* Left: greeting */}
          <div className="relative z-10">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-1"
              style={{ color: "rgba(201,168,76,.8)" }}
            >
              {greet}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
              {formData?.fullName || "Student"}
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,.5)" }}>
              Welcome to your academic dashboard
            </p>
          </div>

          {/* Right: TU badge */}
          <div
            className="relative z-10 flex items-center gap-3 px-4 py-3 rounded-xl self-start sm:self-auto flex-shrink-0"
            style={{
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.12)",
            }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(201,168,76,.15)" }}
            >
              <span className="text-base">🎓</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-tight">
                Tribhuvan <span style={{ color: "#c9a84c" }}>University</span>
              </p>
              <p className="text-[10px] font-medium" style={{ color: "rgba(201,168,76,.6)", letterSpacing: ".1em" }}>
                EST. 1959
              </p>
            </div>
          </div>
        </div>

        {/* ── Section label ── */}
        <div className="anim-2 flex items-center gap-3 mb-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 whitespace-nowrap">
            Your Overview
          </p>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* ── Stat cards ── */}
        <div className="anim-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <StatCard
            title="Total Forms"
            value={totalForms}
            icon="📄"
            delay={0}
          />
          <StatCard
            title="Form Status"
            value={Form_status}
            icon="✅"
            delay={0.06}
          />

          {/* Info card */}
          <div
            className="bg-white rounded-2xl p-5 flex flex-col gap-3"
            style={{
              border: "1px solid #e8edf2",
              boxShadow: "0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.05)",
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: "#f1f5f9" }}
              >
                🏫
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                Quick Info
              </span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex flex-col gap-2.5">
              {[
                { label: "University", val: "Tribhuvan University" },
                { label: "Portal",     val: "Academic · Est. 1959" },
              ].map(({ label, val }) => (
                <div key={label} className="flex items-center justify-between gap-4">
                  <span className="text-xs text-slate-400 font-medium">{label}</span>
                  <span className="text-xs font-semibold text-slate-700 text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}