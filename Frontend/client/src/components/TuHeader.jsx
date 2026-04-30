
import React, { useState, useEffect, } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import logo from "../assets/tu.png";
import {  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import ExamRoutineGallery from "../pages/ExamRoutineGallery";

/* ── Shared design tokens (must match HomePageTU) ── */
const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

  .tu-header {
    font-family: 'DM Sans', sans-serif;
  }

  /* Top utility bar */
  .tu-topbar {
    background: #0a1628;
    border-bottom: 1px solid rgba(201,168,76,.2);
    padding: 0 7vw;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .tu-topbar__left {
    display: flex; align-items: center; gap: 1.5rem;
    font-size: .72rem; color: rgba(255,255,255,.55); letter-spacing: .04em;
  }
  .tu-topbar__right {
    display: flex; align-items: center; gap: 1rem;
  }
  .tu-topbar__link {
    font-size: .72rem; font-weight: 600; letter-spacing: .08em; text-transform: uppercase;
    color: rgba(255,255,255,.55); text-decoration: none;
    transition: color .2s;
  }
  .tu-topbar__link:hover { color: #c9a84c; }
  .tu-topbar__sep { width: 1px; height: 12px; background: rgba(255,255,255,.15); }
  @media(max-width:768px) { .tu-topbar { display: none; } }

  /* Main header */
  .tu-nav {
    background: #ffffff;
    border-bottom: 3px solid #c9a84c;
    box-shadow: 0 4px 24px rgba(10,22,40,.1);
    position: sticky;
    top: 0;
    z-index: 1000;
    height: 72px;
    display: flex;
    align-items: center;
    padding: 0 7vw;
    justify-content: space-between;
    transition: all .3s ease;
  }
  .tu-nav.scrolled {
    height: 62px;
    box-shadow: 0 6px 32px rgba(10,22,40,.16);
  }

  /* Logo */
  .tu-logo {
    display: flex; align-items: center; gap: 12px;
    text-decoration: none; flex-shrink: 0;
    transition: opacity .2s;
  }
  .tu-logo:hover { opacity: .88; }
  .tu-logo__img { height: 46px; width: auto; object-fit: contain; }
  .tu-logo__text { line-height: 1.1; }
  .tu-logo__name {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.12rem; font-weight: 800;
    color: #0a1628; display: block;
  }
  .tu-logo__tagline {
    font-size: .65rem; font-weight: 500; letter-spacing: .1em;
    text-transform: uppercase; color: #c9a84c; display: block;
  }
  @media(max-width:480px) { .tu-logo__text { display: none; } }

  /* Desktop nav links */
  .tu-links {
    display: flex; align-items: center; gap: .25rem; list-style: none;
    flex: 1; justify-content: center;
  }
  @media(max-width:1024px) { .tu-links { display: none; } }

  .tu-link {
    position: relative;
  }
  .tu-link__a, .tu-link__btn {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: .84rem; font-weight: 600; letter-spacing: .03em;
    color: #1a3a5c; text-decoration: none;
    padding: .5rem .85rem; border-radius: 8px;
    background: none; border: none; cursor: pointer;
    transition: background .2s, color .2s;
    white-space: nowrap;
  }
  .tu-link__a:hover, .tu-link__btn:hover,
  .tu-link__a.active, .tu-link__a--active {
    background: rgba(201,168,76,.1);
    color: #0a1628;
  }
  .tu-link__a.active { color: #0a1628; font-weight: 700; }
  .tu-link__a.active::after {
    content: ''; position: absolute; left: .85rem; right: .85rem;
    bottom: 2px; height: 2px; background: #c9a84c; border-radius: 2px;
  }
  .tu-link__chevron {
    width: 13px; height: 13px; transition: transform .25s ease;
    opacity: .6;
  }
  .tu-link:hover .tu-link__chevron { transform: rotate(180deg); opacity: 1; }

  /* Dropdown */
  .tu-link {
  position: relative;
  padding-bottom: 10px;
}

.tu-drop {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 16px 50px rgba(10,22,40,.15);
  min-width: 230px;
  padding: .5rem;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all .22s ease;
}

.tu-link:hover .tu-drop {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}
  /* Arrow */
  .tu-drop::before {
    content: ''; position: absolute; top: -6px; left: 50%;
    transform: translateX(-50%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #fff;
    filter: drop-shadow(0 -2px 2px rgba(10,22,40,.06));
  }
  .tu-drop__item {
    display: block; padding: .65rem 1rem;
    font-size: .83rem; font-weight: 500; color: #1a3a5c;
    text-decoration: none; border-radius: 8px;
    transition: background .15s, color .15s, padding-left .15s;
    cursor: pointer; background: none; border: none; width: 100%; text-align: left;
  }
  .tu-drop__item:hover {
    background: rgba(201,168,76,.1); color: #0a1628; padding-left: 1.3rem;
  }
  .tu-drop__divider { height: 1px; background: #f0ebe3; margin: .3rem .75rem; }

  /* Auth buttons */
  .tu-auth {
    display: flex; align-items: center; gap: .75rem; flex-shrink: 0;
  }
  @media(max-width:1024px) { .tu-auth__login { display: none; } }

  .tu-auth__login {
    font-size: .82rem; font-weight: 600; letter-spacing: .04em;
    color: #1a3a5c; text-decoration: none; padding: .45rem .9rem;
    border-radius: 8px; transition: background .2s, color .2s;
  }
  .tu-auth__login:hover { background: rgba(201,168,76,.1); color: #0a1628; }
  .tu-auth__register {
    font-size: .82rem; font-weight: 700; letter-spacing: .06em;
    text-transform: uppercase; color: #0a1628; text-decoration: none;
    padding: .48rem 1.3rem; border-radius: 100px;
    background: #c9a84c; border: 2px solid #c9a84c;
    transition: all .25s ease;
  }
  .tu-auth__register:hover { background: transparent; color: #c9a84c; }
  .tu-auth__logout {
    font-size: .82rem; font-weight: 600; color: #64748b;
    background: none; border: 1px solid #e2e8f0; border-radius: 8px;
    padding: .45rem .9rem; cursor: pointer; transition: all .2s;
  }
  .tu-auth__logout:hover { border-color: #c9a84c; color: #c9a84c; }
  .tu-auth__dash {
    font-size: .82rem; font-weight: 600; color: #1a3a5c;
    text-decoration: none; padding: .45rem .9rem; border-radius: 8px;
    transition: background .2s;
  }
  .tu-auth__dash:hover { background: rgba(201,168,76,.1); color: #0a1628; }

  /* Hamburger */
  .tu-ham {
    display: none; background: none; border: none; cursor: pointer;
    padding: .4rem; border-radius: 8px; transition: background .2s;
    color: #0a1628;
  }
  .tu-ham:hover { background: rgba(201,168,76,.12); }
  @media(max-width:1024px) { .tu-ham { display: flex; align-items: center; } }

  /* Mobile nav */
  .tu-mob {
    position: fixed; inset: 0; top: 0;
    background: rgba(10,22,40,.55); backdrop-filter: blur(4px);
    z-index: 1999; opacity: 0; pointer-events: none;
    transition: opacity .3s ease;
  }
  .tu-mob.open { opacity: 1; pointer-events: auto; }
  .tu-mob__panel {
    position: absolute; right: 0; top: 0; bottom: 0;
    width: min(340px, 88vw); background: #fff;
    box-shadow: -8px 0 40px rgba(10,22,40,.18);
    transform: translateX(100%); transition: transform .35s cubic-bezier(.4,0,.2,1);
    overflow-y: auto; display: flex; flex-direction: column;
  }
  .tu-mob.open .tu-mob__panel { transform: translateX(0); }

  .tu-mob__head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.2rem 1.5rem; border-bottom: 2px solid #c9a84c;
    background: #0a1628;
  }
  .tu-mob__brand {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1rem; font-weight: 800; color: #fff;
  }
  .tu-mob__brand span { color: #c9a84c; }
  .tu-mob__close {
    background: rgba(255,255,255,.1); border: none; cursor: pointer;
    width: 32px; height: 32px; border-radius: 8px; color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; transition: background .2s;
  }
  .tu-mob__close:hover { background: rgba(201,168,76,.3); }

  .tu-mob__body { flex: 1; padding: 1rem; }
  .tu-mob__link {
    display: block; padding: .75rem 1rem; font-size: .9rem; font-weight: 600;
    color: #1a3a5c; text-decoration: none; border-radius: 10px;
    transition: background .2s, color .2s; margin-bottom: .2rem;
  }
  .tu-mob__link:hover { background: rgba(201,168,76,.1); color: #0a1628; }
  .tu-mob__link.active { background: rgba(201,168,76,.15); color: #0a1628; }

  .tu-mob__acc-btn {
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; padding: .75rem 1rem; font-size: .9rem; font-weight: 600;
    color: #1a3a5c; background: none; border: none; cursor: pointer;
    border-radius: 10px; transition: background .2s; margin-bottom: .2rem;
    text-align: left;
  }
  .tu-mob__acc-btn:hover { background: rgba(201,168,76,.1); color: #0a1628; }
  .tu-mob__acc-chev { width: 15px; height: 15px; transition: transform .25s; flex-shrink: 0; }
  .tu-mob__acc-chev.open { transform: rotate(180deg); }
  .tu-mob__sub {
    overflow: hidden; max-height: 0;
    transition: max-height .3s ease; margin: 0 .5rem .2rem;
  }
  .tu-mob__sub.open { max-height: 400px; }
  .tu-mob__sub-item {
    display: block; padding: .55rem 1rem; font-size: .84rem; font-weight: 500;
    color: #64748b; text-decoration: none; border-radius: 8px;
    transition: background .15s, color .15s, padding-left .15s;
    background: none; border: none; cursor: pointer; width: 100%; text-align: left;
  }
  .tu-mob__sub-item:hover { background: #fdfaf5; color: #0a1628; padding-left: 1.3rem; }

  .tu-mob__divider { height: 1px; background: #f0ebe3; margin: .75rem 0; }
  .tu-mob__foot {
    padding: 1rem 1.5rem 1.5rem; border-top: 1px solid #f0ebe3;
    display: flex; flex-direction: column; gap: .75rem;
  }
  .tu-mob__auth-login {
    display: block; text-align: center; padding: .7rem; border-radius: 10px;
    font-size: .88rem; font-weight: 600; color: #1a3a5c;
    border: 1.5px solid rgba(26,58,92,.2); text-decoration: none;
    transition: all .2s;
  }
  .tu-mob__auth-login:hover { border-color: #c9a84c; color: #c9a84c; }
  .tu-mob__auth-register {
    display: block; text-align: center; padding: .7rem; border-radius: 10px;
    font-size: .88rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: .08em; color: #0a1628; background: #c9a84c;
    text-decoration: none; transition: all .2s;
  }
  .tu-mob__auth-register:hover { background: #b8963d; }

  /* Modal */
  .tu-modal-bg {
    position: fixed; inset: 0; z-index: 3000;
    background: rgba(10,22,40,.75); backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center; padding: 1rem;
    animation: fadeIn .25s ease;
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  .tu-modal {
    background: #fff; border-radius: 20px; width: 100%; max-width: 700px;
    max-height: 90vh; overflow-y: auto; position: relative;
    box-shadow: 0 32px 80px rgba(10,22,40,.35);
    animation: slideUp .3s cubic-bezier(.4,0,.2,1);
    border-top: 4px solid #c9a84c;
  }
  @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  .tu-modal__close {
    position: sticky; top: 1rem; left: calc(100% - 3.5rem);
    width: 36px; height: 36px; border-radius: 10px;
    background: #f0ebe3; border: none; cursor: pointer;
    font-size: 1.3rem; color: #0a1628; display: flex;
    align-items: center; justify-content: center; z-index: 10;
    transition: background .2s, transform .2s; margin: 1rem 1rem 0 auto; display: block;
    line-height: 36px; text-align: center;
  }
  .tu-modal__close:hover { background: #c9a84c; color: #fff; transform: rotate(90deg); }
`;

export default function TuHeader() {
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [openExamSection, setOpenExamSection] = useState(null);
  const [scrolled, setScrolled]         = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Notices", path: "/news" },
    {
      name: "Faculty",
      children: [
        { name: "Institute of Engineering",          path: "https://ioe.tu.edu.np/",    external: true },
        { name: "Institute of Medicine",             path: "https://iom.edu.np",         external: true },
        { name: "Institute of Science & Technology", path: "https://iost.tu.edu.np",     external: true },
        { name: "Institute of Forestry",             path: "https://iof.edu.np",          external: true },
        { name: "Faculty of Management",             path: "https://fomecd.edu.np",       external: true },
        { name: "Faculty of Law",                    path: "https://fol.tu.edu.np",       external: true },
      ],
    },
    {
      name: "Campuses",
      children: [
        { name: "Amrit Science Campus",        path: "https://amritcampus.edu.np",        external: true },
        { name: "Tri-Chandra Campus",          path: "https://trichandracampus.edu.np",   external: true },
        { name: "Ratna Rajya Laxmi Campus",    path: "https://www.collegesnepal.com/ratna-rajya-laxmi-campus/", external: true },
        { name: "Patan Multiple Campus",       path: "https://pmc.tu.edu.np",             external: true },
        { name: "Saraswoti Multiple Campus",   path: "https://smc.edu.np",                external: true },
        { name: "Mahendra Ratna Campus",       path: "https://mrc.tu.edu.np",             external: true },
        { name: "Padma Kanya Multiple Campus", path: "https://edusanjal.com/college/padma-kanya-campus/", external: true },
      ],
    },
    { name: "Events",  path: "/events" },
    { name: "Gallery", path: "/gallery" },
    {
      name: "Exam Schedule",
      examMenu: true,
      children: [
        { name: "Exam Routine", key: "exam-routine" },
        // { name: "Result",       key: "result" },
        // { name: "Exam Form",    key: "exam-form" },
      ],
    },
  ];

  const ChevronIcon = ({ className = "" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
  const MenuIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
  const XIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );

  return (
    <>
      <style>{S}</style>
      <div className="tu-header">

        {/* ── Top utility bar ── */}
        <div className="tu-topbar">
          <div className="tu-topbar__left">
          <span><FaMapMarkerAlt/></span><span> Kirtipur, Kathmandu, Nepal</span>
            <div className="tu-topbar__sep" />
           <span><FaPhoneAlt/></span> <span> +977-1-4330433</span>
            <div className="tu-topbar__sep" />
            <span>< FaEnvelope /></span><span> info@tu.edu.np</span>
          </div>
          <div className="tu-topbar__right">
            <a href="/aboutus" className="tu-topbar__link">About</a>
            <div className="tu-topbar__sep" />
            <a href="/contact" className="tu-topbar__link">Contact</a>
            <div className="tu-topbar__sep" />
            <a href="/research" className="tu-topbar__link">Research</a>
          </div>
        </div>

        {/* ── Main nav ── */}
        <nav className={`tu-nav${scrolled ? " scrolled" : ""}`}>

          {/* Logo */}
          <NavLink to="/" className="tu-logo">
            <img src={logo} alt="TU Logo" className="tu-logo__img" />
            <div className="tu-logo__text">
              <span className="tu-logo__name">Tribhuvan University</span>
              <span className="tu-logo__tagline">Nepal's Premier Institution</span>
            </div>
          </NavLink>

          {/* Desktop links */}
          <ul className="tu-links">
            {navItems.map((item) => (
              <li key={item.name} className="tu-link">
                {item.children ? (
                  <>
                    <button className="tu-link__btn">
                      {item.name}
                      <ChevronIcon className="tu-link__chevron" />
                    </button>
                    <div className="tu-drop">
                      {item.children.map((child, ci) => (
                        <React.Fragment key={child.name}>
                          {ci > 0 && ci % 3 === 0 && <div className="tu-drop__divider" />}
                          {item.examMenu ? (
                            <button
                              className="tu-drop__item"
                              onClick={() => setOpenExamSection(child.key)}
                            >
                              {child.name}
                            </button>
                          ) : child.external ? (
                            <a href={child.path} target="_blank" rel="noopener noreferrer" className="tu-drop__item">
                              {child.name} ↗
                            </a>
                          ) : (
                            <NavLink to={child.path} className="tu-drop__item">{child.name}</NavLink>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `tu-link__a${isActive ? " active" : ""}`}
                  >
                    {item.name}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          {/* Auth + Hamburger */}
          <div className="tu-auth">
            {!user ? (
              <>
                <NavLink to="/login" className="tu-auth__login">Login</NavLink>
                {/* <NavLink to="/register" className="tu-auth__register">Register</NavLink> */}
              </>
            ) : (
              <>
                {/* {user.role === "admin"   && <NavLink to="/dashboard" className="tu-auth__dash">Dashboard</NavLink>} */}
                {/* {user.role === "student" && <NavLink to="/student"   className="tu-auth__dash">My Dashboard</NavLink>} */}
                <button onClick={logout} className="tu-auth__logout">Logout</button>
              </>
            )}
            <button className="tu-ham" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <MenuIcon />
            </button>
          </div>
        </nav>

        {/* ── Mobile overlay + panel ── */}
        <div className={`tu-mob${mobileOpen ? " open" : ""}`} onClick={() => setMobileOpen(false)}>
          <div className="tu-mob__panel" onClick={e => e.stopPropagation()}>

            <div className="tu-mob__head">
              <span className="tu-mob__brand">Tribhuvan <span>University</span></span>
              <button className="tu-mob__close" onClick={() => setMobileOpen(false)}><XIcon /></button>
            </div>

            <div className="tu-mob__body">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <>
                      <button
                        className="tu-mob__acc-btn"
                        onClick={() => setOpenAccordion(openAccordion === item.name ? null : item.name)}
                      >
                        {item.name}
                        <ChevronIcon className={`tu-mob__acc-chev${openAccordion === item.name ? " open" : ""}`} />
                      </button>
                      <div className={`tu-mob__sub${openAccordion === item.name ? " open" : ""}`}>
                        {item.children.map((child) => (
                          item.examMenu ? (
                            <button
                              key={child.key}
                              className="tu-mob__sub-item"
                              onClick={() => { setOpenExamSection(child.key); setMobileOpen(false); }}
                            >
                              {child.name}
                            </button>
                          ) : child.external ? (
                            <a key={child.name} href={child.path} target="_blank" rel="noopener noreferrer" className="tu-mob__sub-item" onClick={() => setMobileOpen(false)}>
                              {child.name} ↗
                            </a>
                          ) : (
                            <NavLink key={child.name} to={child.path} className="tu-mob__sub-item" onClick={() => setMobileOpen(false)}>
                              {child.name}
                            </NavLink>
                          )
                        ))}
                      </div>
                    </>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `tu-mob__link${isActive ? " active" : ""}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  )}
                </div>
              ))}

              {user && (
                <>
                  <div className="tu-mob__divider" />
                  {user.role === "admin"   && <NavLink to="/dashboard" className="tu-mob__link" onClick={() => setMobileOpen(false)}>Dashboard</NavLink>}
                  {user.role === "student" && <NavLink to="/student"   className="tu-mob__link" onClick={() => setMobileOpen(false)}>My Dashboard</NavLink>}
                </>
              )}
            </div>

            {!user ? (
              <div className="tu-mob__foot">
                <NavLink to="/login"    className="tu-mob__auth-login"    onClick={() => setMobileOpen(false)}>Login</NavLink>
                <NavLink to="/register" className="tu-mob__auth-register" onClick={() => setMobileOpen(false)}>Register</NavLink>
              </div>
            ) : (
              <div className="tu-mob__foot">
                <button onClick={() => { logout(); setMobileOpen(false); }} className="tu-mob__auth-login" style={{ border: "1.5px solid #e2e8f0", cursor: "pointer", background: "none", width: "100%", borderRadius: "10px", padding: ".7rem", fontSize: ".88rem", fontWeight: 600, color: "#64748b" }}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Exam Modal ── */}
        {openExamSection && (
          <div className="tu-modal-bg" onClick={() => setOpenExamSection(null)}>
            <div className="tu-modal" onClick={e => e.stopPropagation()}>
              <button className="tu-modal__close" onClick={() => setOpenExamSection(null)}>✕</button>
              {/* {openExamSection === "exam-form"    && <ExamForm />} */}
              {openExamSection === "exam-routine" && <ExamRoutineGallery />}
              {/* {openExamSection === "result"       && <ResultSearch />} */}
            </div>
          </div>
        )}

      </div>
    </>
  );
}