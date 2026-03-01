// AuthForm.jsx
import React, { useState } from "react";
import { login, register as registerAPI } from "../api/Auth";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy:  #04111f;
    --navy2: #071828;
    --gold:  #c9a84c;
    --gold2: #e4c97a;
    --ff-h: 'Cormorant Garamond', Georgia, serif;
    --ff-b: 'Outfit', sans-serif;
  }

  .auth-root { font-family: var(--ff-b); }

  @keyframes rise  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes orb1  { 0%,100%{transform:translate(0,0)}  50%{transform:translate(14px,-20px)} }
  @keyframes orb2  { 0%,100%{transform:translate(0,0)}  50%{transform:translate(-12px,16px)} }
  @keyframes spin  { to{transform:rotate(360deg)} }
  @keyframes sweep { from{transform:translateX(-100%)} to{transform:translateX(100%)} }

  .r-rise { animation: rise .6s cubic-bezier(.25,.46,.45,.94) both }
  .r-orb1 { animation: orb1  9s ease-in-out infinite }
  .r-orb2 { animation: orb2 11s ease-in-out infinite }
  .r-spin { animation: spin .9s linear infinite }
  .d1{animation-delay:.07s} .d2{animation-delay:.14s}
  .d3{animation-delay:.21s} .d4{animation-delay:.28s} .d5{animation-delay:.36s}

  /* Underline inputs */
  .af-field {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1.5px solid rgba(255,255,255,.15);
    padding: .75rem .5rem .75rem 2.2rem;
    color: #fff;
    font-size: .92rem;
    font-family: var(--ff-b);
    font-weight: 400;
    outline: none;
    transition: border-color .25s, box-shadow .25s;
  }
  .af-field::placeholder { color: rgba(255,255,255,.22); font-weight: 300; }
  .af-field:focus {
    border-color: var(--gold);
    box-shadow: 0 2px 0 0 rgba(201,168,76,.22);
  }
  .af-select { -webkit-appearance:none; appearance:none; cursor:pointer; }
  .af-select option { background:#071828; color:#fff; }

  /* Clipped CTA */
  .af-cta {
    position: relative;
    width: 100%;
    padding: 1rem 2rem;
    background: var(--gold);
    color: var(--navy);
    border: none;
    cursor: pointer;
    font-family: var(--ff-b);
    font-size: .78rem;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
    overflow: hidden;
    clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%);
    transition: background .3s, transform .2s, box-shadow .25s;
    box-shadow: 6px 6px 0 rgba(201,168,76,.22);
  }
  .af-cta::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(110deg,transparent 30%,rgba(255,255,255,.28) 50%,transparent 70%);
    transform: translateX(-100%);
    transition: transform .55s ease;
  }
  .af-cta:hover::before { transform: translateX(100%); }
  .af-cta:hover:not(:disabled) {
    background: var(--gold2);
    transform: translateY(-2px);
    box-shadow: 8px 10px 0 rgba(201,168,76,.18);
  }
  .af-cta:active:not(:disabled) { transform: translateY(0); }
  .af-cta:disabled { opacity:.55; cursor:not-allowed; }

  /* Ghost button */
  .af-ghost {
    width: 100%;
    padding: .85rem 2rem;
    background: transparent;
    border: 1.5px solid rgba(201,168,76,.3);
    color: var(--gold);
    cursor: pointer;
    font-family: var(--ff-b);
    font-size: .78rem;
    font-weight: 600;
    letter-spacing: .12em;
    text-transform: uppercase;
    transition: border-color .25s, background .25s, color .25s;
    clip-path: polygon(14px 0, 100% 0, 100% 100%, 0 100%, 0 50%);
  }
  .af-ghost:hover {
    border-color: var(--gold);
    background: rgba(201,168,76,.07);
    color: var(--gold2);
  }

  /* Tab */
  .af-tab {
    flex: 1; padding: .55rem; border: none; background: transparent;
    cursor: pointer; font-family: var(--ff-b); font-size: .78rem;
    font-weight: 600; letter-spacing: .08em; text-transform: uppercase;
    border-radius: 4px; color: rgba(255,255,255,.3);
    transition: color .2s, background .2s;
  }
  .af-tab.on {
    background: rgba(201,168,76,.12);
    color: var(--gold);
    border: 1px solid rgba(201,168,76,.25);
  }
`;

const I = {
  user:  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>,
  mail:  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
  lock:  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path strokeLinecap="round" d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  role:  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
  warn:  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{flexShrink:0}}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>,
  spin:  <svg className="r-spin" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
  arrow: <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>,
};

function UField({ label, icon, aside, children }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span
          className="text-[.62rem] font-semibold uppercase tracking-[.16em]"
          style={{ color: "rgba(201,168,76,.7)" }}
        >
          {label}
        </span>
        {aside}
      </div>
      <div className="relative flex items-center">
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "rgba(201,168,76,.45)" }}
        >
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}

export default function AuthForm() {
  const [isLogin,  setIsLogin]  = useState(true);
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [role,     setRole]     = useState("student");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const { setToken } = useAuth();
  const navigate     = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      if (isLogin) {
        const data = await login({ email, password });
        setToken(data.token);
        toast.success("Student Login Successful");
        const payload = JSON.parse(atob(data.token.split(".")[1]));
        if (payload.role === "admin") navigate("/dashboard");
        else navigate("/student");
      } else {
        if (!name.trim()) { setError("Name is required"); setLoading(false); return; }
        await registerAPI({ name, email, password, role });
        toast.success("Registration successful! Please login.");
        setIsLogin(true);
        setName(""); setEmail(""); setPassword(""); setRole("student");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally { setLoading(false); }
  };

  return (
    <>
      <style>{STYLES}</style>

      {/* ── Full page background ── */}
      <div
        className="auth-root min-h-screen w-full flex items-center justify-center px-4 py-12 relative overflow-hidden"
        style={{ background: "var(--navy2)" }}
      >
        {/* Ambient orbs */}
        <div
          className="r-orb1 absolute w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            top: "-200px", left: "-200px",
            background: "radial-gradient(circle, rgba(201,168,76,.07) 0%, transparent 60%)",
          }}
        />
        <div
          className="r-orb2 absolute w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            bottom: "-180px", right: "-150px",
            background: "radial-gradient(circle, rgba(14,50,100,.5) 0%, transparent 65%)",
          }}
        />

        {/* Fine grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(201,168,76,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,.025) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* ── Card ── */}
        <div
          className="r-rise relative w-full max-w-[460px] px-8 sm:px-12 py-10 sm:py-12 z-10"
          style={{
            background: "rgba(4,17,31,.82)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: "1px solid rgba(201,168,76,.13)",
            borderRadius: "4px",
            boxShadow: "0 40px 90px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.05)",
          }}
        >
          {/* Gold top rule */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, transparent, #c9a84c 30%, #e4c97a 50%, #c9a84c 70%, transparent)" }}
          />

          {/* ── Brand mark ── */}
          <div className="r-rise flex flex-col items-center text-center mb-10">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4"
              style={{
                background: "rgba(201,168,76,.08)",
                border: "1px solid rgba(201,168,76,.22)",
              }}
            >
              🎓
            </div>
            <h1
              className="text-[1.55rem] sm:text-[1.8rem] font-bold text-white leading-tight"
              style={{ fontFamily: "var(--ff-h)", letterSpacing: "-.01em" }}
            >
              Tribhuvan <span style={{ color: "var(--gold)" }}>University</span>
            </h1>
            <span
              className="mt-1 text-[.55rem] font-semibold uppercase"
              style={{ letterSpacing: ".26em", color: "rgba(201,168,76,.4)" }}
            >
              Academic Portal · Est. 1959
            </span>
          </div>

          {/* ── Page heading ── */}
          <div className="r-rise d1 mb-8">
            <p
              className="flex items-center gap-2 text-[.6rem] font-semibold uppercase tracking-[.22em] mb-2"
              style={{ color: "rgba(201,168,76,.55)" }}
            >
              <span className="block w-5 h-px" style={{ background: "var(--gold)" }} />
              {isLogin ? "Sign in" : "Create account"}
            </p>
            <h2
              className="text-2xl sm:text-[1.9rem] font-bold text-white leading-[1.05]"
              style={{ fontFamily: "var(--ff-h)" }}
            >
              {isLogin ? (
                <>Welcome <em style={{ color: "var(--gold)", fontStyle: "italic" }}>back</em></>
              ) : (
                <>Create your <em style={{ color: "var(--gold)", fontStyle: "italic" }}>account</em></>
              )}
            </h2>
            <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,.28)", fontWeight: 300 }}>
              {isLogin
                ? "Access your academic dashboard securely."
                : "Join 400,000+ students on the TU Portal."}
            </p>
          </div>

          {/* ── Tabs ── */}
          <div
            className="r-rise d2 flex gap-2 p-[5px] rounded mb-8"
            style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)" }}
          >
            {["Login", "Register"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setIsLogin(t === "Login"); setError(""); }}
                className={`af-tab${(t === "Login") === isLogin ? " on" : ""}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* ── Error ── */}
          {error && (
            <div
              className="r-rise flex items-center gap-2 px-4 py-3 mb-6 text-sm"
              style={{
                background: "rgba(220,50,50,.07)",
                border: "1px solid rgba(220,50,50,.2)",
                color: "#f87171",
                borderRadius: "4px",
              }}
            >
              {I.warn} {error}
            </div>
          )}

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {!isLogin && (
              <div className="r-rise d1">
                <UField label="Full Name" icon={I.user}>
                  <input
                    type="text"
                    placeholder="Ram Prasad Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="af-field"
                  />
                </UField>
              </div>
            )}

            <div className="r-rise d2">
              <UField label="Email Address" icon={I.mail}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="af-field"
                />
              </UField>
            </div>

            <div className="r-rise d3">
              <UField
                label="Password"
                icon={I.lock}
                aside={
                  isLogin && (
                    <button
                      type="button"
                      style={{ background: "none", border: "none", cursor: "pointer", fontSize: ".62rem", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(201,168,76,.5)", fontFamily: "var(--ff-b)" }}
                    >
                      Forgot?
                    </button>
                  )
                }
              >
                <input
                  type="password"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="af-field"
                />
              </UField>
            </div>

            {!isLogin && (
              <div className="r-rise d4">
                <UField label="Register As" icon={I.role}>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="af-field af-select"
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                </UField>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="af-cta r-rise d5 mt-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  {I.spin} {isLogin ? "Signing in…" : "Creating account…"}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {isLogin ? "Sign In" : "Create Account"} {I.arrow}
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,.07)" }} />
            <span className="text-[.6rem] uppercase tracking-[.14em]" style={{ color: "rgba(255,255,255,.18)" }}>or</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,.07)" }} />
          </div>

          {/* Ghost toggle */}
          <button
            type="button"
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
            className="af-ghost"
          >
            {isLogin ? "Create a new account" : "← Back to Sign In"}
          </button>

          {/* Trust */}
          <p
            className="flex items-center justify-center gap-2 mt-8 text-[.58rem] uppercase tracking-[.12em]"
            style={{ color: "rgba(255,255,255,.13)" }}
          >
            <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            256-bit encrypted · Tribhuvan University © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </>
  );
}