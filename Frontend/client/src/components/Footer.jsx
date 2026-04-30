// TuFooter.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe } from "react-icons/fa";
/* ── Scoped styles that mirror the original HomePageTU footer CSS exactly ── */
const FOOTER_STYLES = `
  .footer-bridge {
    height: 5px;
    background: linear-gradient(90deg, #0a1628 0%, #c9a84c 35%, #e8c97a 50%, #c9a84c 65%, #0a1628 100%);
  }
  .footer {
    background: #0a1628;
    font-family: 'DM Sans', sans-serif;
  }

  /* Newsletter band */
  .footer__nl-band {
    background: #112240;
    padding: 2.4rem 7vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
    border-bottom: 1px solid rgba(201,168,76,.15);
  }
  .footer__nl-text h4 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: .2rem;
  }
  .footer__nl-text p {
    font-size: .82rem;
    color: rgba(255,255,255,.45);
  }
  .footer__nl-form {
    display: flex;
    gap: .5rem;
    flex-shrink: 0;
    flex-wrap: wrap;
  }
  .footer__nl-input {
    padding: .65rem 1.1rem;
    border-radius: 10px;
    min-width: 240px;
    background: rgba(255,255,255,.07);
    border: 1px solid rgba(255,255,255,.12);
    color: #fff;
    font-size: .84rem;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border .2s;
  }
  .footer__nl-input::placeholder { color: rgba(255,255,255,.3); }
  .footer__nl-input:focus        { border-color: rgba(201,168,76,.5); }
  .footer__nl-btn {
    padding: .65rem 1.5rem;
    border-radius: 10px;
    cursor: pointer;
    background: #c9a84c;
    color: #0a1628;
    font-size: .8rem;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
    border: 2px solid #c9a84c;
    font-family: 'DM Sans', sans-serif;
    transition: all .25s;
  }
  .footer__nl-btn:hover { background: transparent; color: #c9a84c; }

  /* Main columns */
  .footer__main {
    display: grid;
    grid-template-columns: 1.8fr 1fr 1fr 1fr;
    gap: 3.5rem;
    padding: 4rem 7vw 3rem;
    border-bottom: 1px solid rgba(255,255,255,.08);
  }
  @media(max-width:960px) { .footer__main { grid-template-columns: 1fr 1fr; gap: 2.5rem; } }
  @media(max-width:520px) { .footer__main { grid-template-columns: 1fr; gap: 2rem; } }

  /* Brand */
  .footer__brand {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.6rem;
    font-weight: 800;
    color: #fff;
    margin-bottom: .4rem;
    line-height: 1.1;
  }
  .footer__brand span { color: #c9a84c; }
  .footer__tagline {
    font-size: .65rem;
    font-weight: 700;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: rgba(201,168,76,.7);
    display: block;
    margin-bottom: 1rem;
  }
  .footer__desc {
    font-size: .86rem;
    line-height: 1.85;
    color: rgba(255,255,255,.45);
    max-width: 300px;
    margin-bottom: 1.6rem;
  }
  .footer__socials { display: flex; gap: .6rem; }
  .footer__social {
    width: 34px; height: 34px;
    border-radius: 9px;
    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.1);
    display: flex; align-items: center; justify-content: center;
    font-size: .82rem;
    text-decoration: none;
    color: rgba(255,255,255,.55);
    transition: all .25s;
  }
  .footer__social:hover {
    background: rgba(201,168,76,.2);
    border-color: rgba(201,168,76,.5);
    color: #c9a84c;
    transform: translateY(-2px);
  }

  /* Nav columns */
  .footer__col-title {
    font-size: .65rem;
    font-weight: 700;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: #c9a84c;
    margin-bottom: 1.4rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .footer__col-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(201,168,76,.35), transparent);
  }
  .footer__links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: .65rem;
  }
  .footer__links a {
    text-decoration: none;
    color: rgba(255,255,255,.48);
    font-size: .86rem;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: color .2s, padding-left .18s;
  }
  .footer__links a::before {
    content: '—';
    font-size: .58rem;
    color: rgba(201,168,76,.45);
  }
  .footer__links a:hover { color: #c9a84c; padding-left: 4px; }

  /* Contact info */
  .footer__ci {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    font-size: .84rem;
    color: rgba(255,255,255,.48);
    margin-bottom: .7rem;
  }
  .footer__ci-ic { color: #c9a84c; flex-shrink: 0; }
  .footer__ci a  { color: rgba(255,255,255,.48); text-decoration: none; transition: color .2s; }
  .footer__ci a:hover { color: #c9a84c; }

  /* Stats */
  .footer__stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-bottom: 1px solid rgba(255,255,255,.07);
  }
  @media(max-width:720px) { .footer__stats { grid-template-columns: repeat(2,1fr); } }
  .footer__stat {
    padding: 1.8rem;
    text-align: center;
    border-right: 1px solid rgba(255,255,255,.07);
  }
  .footer__stat:last-child { border-right: none; }
  .footer__stat-val {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.9rem;
    font-weight: 800;
    color: #c9a84c;
    display: block;
    line-height: 1;
    margin-bottom: .3rem;
  }
  .footer__stat-lbl {
    font-size: .64rem;
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
    color: rgba(255,255,255,.35);
  }

  /* Bottom bar */
  .footer__bot {
    padding: 1.6rem 7vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    background: rgba(0,0,0,.22);
  }
  .footer__bot-copy { font-size: .77rem; color: rgba(255,255,255,.28); }
  .footer__bot-copy strong { color: #c9a84c; font-weight: 600; }
  .footer__bot-legal { display: flex; gap: 1.4rem; flex-wrap: wrap; }
  .footer__bot-legal a {
    font-size: .74rem;
    color: rgba(255,255,255,.28);
    text-decoration: none;
    transition: color .2s;
  }
  .footer__bot-legal a:hover { color: #c9a84c; }
`;

export default function TuFooter() {
  const [email, setEmail] = useState("");

  return (
    <>
      <style>{FOOTER_STYLES}</style>

      {/* Gold bridge line */}
      <div className="footer-bridge" />

      <footer className="footer">

        {/* ── Newsletter Band ── */}
        <div className="footer__nl-band">
          <div className="footer__nl-text">
            <h4>Stay Connected with Tribhuvan University</h4>
            <p>Get the latest notices, exam schedules, and academic updates directly in your inbox.</p>
          </div>
          <div className="footer__nl-form">
            <input
              type="email"
              placeholder="Enter your email address"
              className="footer__nl-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="footer__nl-btn">Subscribe</button>
          </div>
        </div>

        {/* ── Main Columns ── */}
        <div className="footer__main">

          {/* Brand */}
          <div>
            <p className="footer__brand">Tribhuvan <span>University</span></p>
            <span className="footer__tagline">Nepal's Premier Institution · Est. 1959</span>
            <p className="footer__desc">
              Dedicated to advancing knowledge, fostering innovation, and serving
              the people of Nepal through quality education and impactful research.
            </p>
            <div className="footer__socials">
<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Facebook">
  <FaFacebookF />
</a>

<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Twitter">
  <FaTwitter />
</a>

<a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="YouTube">
  <FaYoutube />
</a>

<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="LinkedIn">
  <FaLinkedinIn />
</a>
            </div>
          </div>

          {/* About */}
          <div>
            <p className="footer__col-title">About</p>
            <ul className="footer__links">
              <li><Link to="/aboutus">About TU</Link></li>
              <li><Link to="/history">History</Link></li>
              <li><Link to="/vision">Vision &amp; Mission</Link></li>
              <li><Link to="/leadership">Leadership</Link></li>
              <li><Link to="/tuconvocation">Convocation</Link></li>
            </ul>
          </div>

          {/* Academics */}
          <div>
            <p className="footer__col-title">Academics</p>
            <ul className="footer__links">
              <li><Link to="/research">Research</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/news">Notices</Link></li>
              <li><Link to="/activities">Activities</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="footer__col-title">Contact</p>
            <div className="footer__ci"><span className="footer__ci-ic"><FaMapMarkerAlt /></span><span>Kirtipur, Kathmandu, Nepal</span></div>
            <div className="footer__ci"><span className="footer__ci-ic"><FaPhoneAlt /></span><a href="tel:+97714330433">+977-1-4330433</a></div>
            <div className="footer__ci"><span className="footer__ci-ic"><FaEnvelope /></span><a href="mailto:info@tu.edu.np">info@tu.edu.np</a></div>
            <div className="footer__ci"><span className="footer__ci-ic"><FaGlobe /></span><a href="https://tu.edu.np" target="_blank" rel="noopener noreferrer">www.tu.edu.np</a></div>
          </div>

        </div>

        {/* ── Stats Bar ── */}
        <div className="footer__stats">
          {[
            { val: "60+",   lbl: "Constituent Campuses" },
            { val: "400K+", lbl: "Enrolled Students" },
            { val: "300+",  lbl: "Academic Programs" },
            { val: "65+",   lbl: "Years of Excellence" },
          ].map((s) => (
            <div key={s.lbl} className="footer__stat">
              <span className="footer__stat-val">{s.val}</span>
              <span className="footer__stat-lbl">{s.lbl}</span>
            </div>
          ))}
        </div>

        {/* ── Bottom Bar ── */}
        <div className="footer__bot">
          <p className="footer__bot-copy">
            © {new Date().getFullYear()} <strong>Tribhuvan University</strong>. All Rights Reserved.
          </p>
          <div className="footer__bot-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
            <Link to="/sitemap">Sitemap</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

      </footer>
    </>
  );
}