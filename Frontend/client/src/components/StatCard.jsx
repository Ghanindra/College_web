import React from "react";

const STATUS_MAP = {
  approved: { bg: "#f0fdf4", text: "#16a34a", border: "#bbf7d0", dot: "#22c55e" },
  pending: { bg: "#fffbeb", text: "#d97706", border: "#fde68a", dot: "#f59e0b" },
  rejected: { bg: "#fef2f2", text: "#dc2626", border: "#fecaca", dot: "#ef4444" },
  "not submitted": { bg: "#f8fafc", text: "#64748b", border: "#e2e8f0", dot: "#94a3b8" },
};

const StatCard = ({ title, value, icon, delay = 0 }) => {
  const key = typeof value === "string" ? value.toLowerCase() : null;
  const s = key ? STATUS_MAP[key] : null;

  return (
    <div
      className="w-full min-w-0 h-full bg-white rounded-2xl p-4 sm:p-5 flex flex-col gap-3"
      style={{
        border: "1px solid #e8edf2",
        boxShadow: "0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.05)",
        animationDelay: `${delay}s`,
        fontFamily: "'DM Sans', sans-serif",
        transition: "transform .2s ease, box-shadow .2s ease",
        willChange: "transform",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.12)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.05)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {icon && (
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 bg-slate-100">
              {icon}
            </div>
          )}

          <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-widest truncate">
            {title}
          </span>
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      {/* VALUE */}
      <div className="flex-1 flex items-center">
        {s ? (
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold max-w-full"
            style={{
              background: s.bg,
              color: s.text,
              border: `1px solid ${s.border}`,
            }}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: s.dot }}
            />
            <span className="truncate">{value}</span>
          </div>
        ) : (
          <p className="text-2xl sm:text-3xl font-bold text-slate-800 break-words">
            {value ?? "—"}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
