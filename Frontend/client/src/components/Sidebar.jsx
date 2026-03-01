// Sidebar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

  .sb * { box-sizing: border-box; }
  .sb   { font-family: 'DM Sans', sans-serif; }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 10px;
    font-size: 13.5px;
    font-weight: 500;
    color: #64748b;
    text-decoration: none;
    transition: background .15s, color .15s;
    white-space: nowrap;
  }
  .nav-link:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
  .nav-link.active {
    background: #0a1628;
    color: #ffffff;
    font-weight: 600;
  }
  .nav-link.active .nav-ico {
    color: #c9a84c;
  }
  .nav-link:hover .nav-ico {
    color: #334155;
  }
  .nav-ico {
    font-size: 15px;
    width: 20px;
    text-align: center;
    flex-shrink: 0;
    color: #94a3b8;
    transition: color .15s;
  }

  @keyframes slideIn {
    from { transform: translateX(-100%); opacity: 0; }
    to   { transform: translateX(0);     opacity: 1; }
  }
  .sb-anim { animation: slideIn .25s cubic-bezier(.4,0,.2,1) both; }
`;

const NAV = [
  { to: "/dashboard",            label: "Dashboard",        icon: "⊞", end: true },
  { to: "/dashboard/notices",    label: "Notices",          icon: "📢" },
  { to: "/dashboard/events",     label: "Events",           icon: "📅" },
  { to: "/dashboard/gallery",    label: "Gallery",          icon: "🖼️"  },
  { to: "/dashboard/examform",   label: "Exam Forms",       icon: "📄" },
  { to: "/dashboard/formconfig", label: "Allow Exam Form",  icon: "⚙️"  },
  { to: "/dashboard/addresult",  label: "Add Result",       icon: "📊" },
  { to: "/dashboard/addroutine", label: "Add Routine",      icon: "🗓️"  },
  { to: "/dashboard/register",   label: "Register",         icon: "👤" },
];

function SidebarInner({ onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Admin Logout Successfully");
  };

  return (
    <div className="flex flex-col h-full">

      {/* ── Logo ── */}
      <div
        className="flex items-center justify-between px-5 py-5"
        style={{ borderBottom: "1px solid #f1f5f9" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#0a1628" }}
          >
            <span className="text-sm">🎓</span>
          </div>
          <div>
            <p className="font-bold text-sm text-slate-800 leading-tight">
              TU <span style={{ color: "#c9a84c" }}>Admin</span>
            </p>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">
              Admin Panel
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden text-xs"
            style={{ border: "1px solid #e2e8f0", background: "transparent", cursor: "pointer" }}
          >
            ✕
          </button>
        )}
      </div>

      {/* ── Nav ── */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          Menu
        </p>
        <nav className="flex flex-col gap-0.5">
          {NAV.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
              onClick={onClose}
            >
              <span className="nav-ico">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* ── Logout ── */}
      <div className="px-3 pb-5" style={{ borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
          style={{ border: "1px solid #fee2e2", background: "transparent", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
        >
          <span className="text-base">→</span>
          Logout
        </button>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{STYLES}</style>

      {/* Mobile top bar */}
      <header
        className="sb lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 bg-white"
        style={{ borderBottom: "1px solid #f1f5f9", boxShadow: "0 1px 8px rgba(0,0,0,.05)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "#0a1628" }}
          >
            <span className="text-xs">🎓</span>
          </div>
          <span className="font-bold text-slate-800 text-sm">
            TU <span style={{ color: "#c9a84c" }}>Admin</span>
          </span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg hover:bg-slate-50 transition-colors"
          style={{ border: "1px solid #e2e8f0", background: "transparent", cursor: "pointer" }}
        >
          <div className="flex flex-col gap-1">
            <span className="block w-5 h-0.5 rounded bg-slate-600" />
            <span className="block w-3.5 h-0.5 rounded bg-slate-600" />
            <span className="block w-5 h-0.5 rounded bg-slate-600" />
          </div>
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div
          className="sb lg:hidden fixed inset-0 z-50"
          onClick={() => setOpen(false)}
          style={{ background: "rgba(15,23,42,.4)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="sb-anim absolute top-0 left-0 bottom-0 w-[72vw] max-w-[280px] bg-white"
            style={{ boxShadow: "4px 0 32px rgba(0,0,0,.12)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarInner onClose={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside
        className="sb hidden lg:flex flex-col fixed top-0 left-0 bottom-0 w-[220px] xl:w-[240px] z-30 bg-white"
        style={{ borderRight: "1px solid #f1f5f9", boxShadow: "2px 0 16px rgba(0,0,0,.04)" }}
      >
        <SidebarInner />
      </aside>
    </>
  );
}