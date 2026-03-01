// StatCard.jsx
import React from "react";

const STATUS_MAP = {
  "approved":      { bg: "#f0fdf4", text: "#16a34a", border: "#bbf7d0", dot: "#22c55e" },
  "pending":       { bg: "#fffbeb", text: "#d97706", border: "#fde68a", dot: "#f59e0b" },
  "rejected":      { bg: "#fef2f2", text: "#dc2626", border: "#fecaca", dot: "#ef4444" },
  "not submitted": { bg: "#f8fafc", text: "#64748b", border: "#e2e8f0", dot: "#94a3b8" },
};

const StatCard = ({ title, value, icon, delay = 0 }) => {
  const key = typeof value === "string" ? value.toLowerCase() : null;
  const s = key ? STATUS_MAP[key] : null;

  return (
    <div
      className="bg-white rounded-2xl p-5 flex flex-col gap-3"
      style={{
        border: "1px solid #e8edf2",
        boxShadow: "0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.05)",
        animationDelay: `${delay}s`,
        fontFamily: "'DM Sans', sans-serif",
        transition: "box-shadow .2s, transform .2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,.1)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.05)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && (
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
              style={{ background: "#f1f5f9" }}
            >
              {icon}
            </div>
          )}
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            {title}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100" />

      {/* Value */}
      <div>
        {s ? (
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold"
            style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: s.dot, flexShrink: 0 }}
            />
            {value}
          </div>
        ) : (
          <p className="text-3xl font-bold text-slate-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {value ?? "—"}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;