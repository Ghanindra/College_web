// // import React from "react";
// // import { Link } from "react-router-dom";
// // import "./Footer.css"; // import your CSS here

// // export default function Footer() {
// //   return (
// //     <footer className="page-footer">
// //       <div className="footer-content">
// //         <div className="footer-section">
// //           <h3 className="footer-title">Tribhuvan University</h3>
// //           <p className="footer-description">
// //             Nepal's premier institution of higher education, committed to excellence in teaching, research, and service.
// //           </p>
// //         </div>
// //         <div className="footer-section">
// //           <h4 className="footer-subtitle">Quick Links</h4>
// //           <ul className="footer-links">
// //             <li><Link to="/aboutus">About TU</Link></li>
// //             {/* <li><Link to="/admissions">Admissions</Link></li> */}
// //             <li><Link to="/research">Research</Link></li>
// //             <li><Link to="/contact">Contact</Link></li>
// //           </ul>
// //         </div>
// //         <div className="footer-section">
// //           <h4 className="footer-subtitle">Contact Info</h4>
// //           <div className="contact-info">
// //             <p> Kirtipur, Kathmandu, Nepal</p>
// //             <p>📞 +977-1-4330433</p>
// //             <p>✉️ info@tu.edu.np</p>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="footer-bottom">
// //         <p>Tribhuvan University © {new Date().getFullYear()} | All Rights Reserved</p>
// //       </div>
// //     </footer>
// //   );
// // }

// import React from "react";
// import { Mail, MapPin, Phone } from "lucide-react";

// export default function TUFooter() {
//   const footerLinks = {
//     About: [
//       { name: "About TU", href: "/aboutus" },
//       { name: "History", href: "/history" },
//       { name: "Vision & Mission", href: "/vision" },
//       { name: "Leadership", href: "/leadership" },
//     ],
//     Resources: [
//       { name: "Research", href: "/research" },
//       { name: "Library", href: "/library" },
//       { name: "Admissions", href: "/admissions" },
//       { name: "Events", href: "/events" },
//     ],
//     Support: [
//       { name: "Contact", href: "/contact" },
//       { name: "FAQ", href: "/faq" },
//       { name: "Feedback", href: "/feedback" },
//       { name: "Help Center", href: "/help" },
//     ],
//     Legal: [
//       { name: "Privacy Policy", href: "/privacy" },
//       { name: "Terms of Service", href: "/terms" },
//       { name: "Cookie Policy", href: "/cookies" },
//       { name: "Accessibility", href: "/accessibility" },
//     ],
//   };

//   return (
//     <footer className="bg-primary text-primary-foreground">
//       {/* Main Footer */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
//         {/* Logo & Description */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
//           <div className="lg:col-span-1">
//             <a href="/" className="flex items-center gap-3 mb-4">
//               <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
//                 <span className="text-primary font-bold text-sm">TU</span>
//               </div>
//             </a>
//             <p className="text-primary-foreground/90 text-sm leading-relaxed">
//               Nepal's premier institution of higher education, committed to excellence in teaching, research, and service.
//             </p>
//           </div>

//           {/* Link Sections */}
//           {Object.entries(footerLinks).map(([title, links]) => (
//             <div key={title}>
//               <h3 className="font-semibold text-sm uppercase tracking-widest mb-4">
//                 {title}
//               </h3>
//               <ul className="space-y-2">
//                 {links.map((link) => (
//                   <li key={link.name}>
//                     <a
//                       href={link.href}
//                       className="text-primary-foreground/80 hover:text-white transition-colors text-sm"
//                     >
//                       {link.name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Divider */}
//         <div className="border-t border-primary-foreground/20 my-8"></div>

//         {/* Contact Info & Copyright */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="space-y-4">
//             <h3 className="font-semibold text-sm uppercase tracking-widest">
//               Contact Information
//             </h3>
//             <div className="space-y-3">
//               <div className="flex items-start gap-3">
//                 <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
//                 <span className="text-primary-foreground/90 text-sm">
//                   Kirtipur, Kathmandu, Nepal
//                 </span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Phone className="w-5 h-5 flex-shrink-0" />
//                 <a
//                   href="tel:+977-1-4330433"
//                   className="text-primary-foreground/90 hover:text-white transition-colors text-sm"
//                 >
//                   +977-1-4330433
//                 </a>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Mail className="w-5 h-5 flex-shrink-0" />
//                 <a
//                   href="mailto:info@tu.edu.np"
//                   className="text-primary-foreground/90 hover:text-white transition-colors text-sm"
//                 >
//                   info@tu.edu.np
//                 </a>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col justify-end">
//             <p className="text-primary-foreground/80 text-sm">
//               Tribhuvan University © {new Date().getFullYear()} | All Rights Reserved
//             </p>
//             <p className="text-primary-foreground/60 text-xs mt-2">
//               Built with excellence in education
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }


import React from "react";
import { Link } from "react-router-dom";

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

  .tu-footer {
    font-family: 'DM Sans', sans-serif;
    background: #0a1628;
    color: rgba(255,255,255,.7);
  }

  /* ── Top wave divider ── */
  .tu-footer__wave {
    display: block; width: 100%; height: 48px;
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    clip-path: polygon(0 100%, 100% 100%, 100% 0, 75% 60%, 50% 0, 25% 60%, 0 0);
  }

  /* ── Gold stripe ── */
  .tu-footer__stripe {
    height: 3px;
    background: linear-gradient(90deg, transparent, #c9a84c 30%, #e8c97a 50%, #c9a84c 70%, transparent);
  }

  /* ── Main body ── */
  .tu-footer__body {
    background: #0a1628;
    padding: 4.5rem 7vw 0;
  }

  /* ── Top row: brand + newsletter ── */
  .tu-footer__top {
    display: grid; grid-template-columns: 1.5fr 1fr;
    gap: 4rem; align-items: start;
    padding-bottom: 3rem;
    border-bottom: 1px solid rgba(255,255,255,.08);
    margin-bottom: 3.5rem;
  }
  @media(max-width:768px) { .tu-footer__top { grid-template-columns: 1fr; gap: 2rem; } }

  .tu-footer__brand {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.8rem; font-weight: 800; color: #fff;
    margin-bottom: .5rem; line-height: 1.1;
  }
  .tu-footer__brand span { color: #c9a84c; }
  .tu-footer__tagline {
    font-size: .68rem; font-weight: 700; letter-spacing: .2em;
    text-transform: uppercase; color: #c9a84c; margin-bottom: 1rem; display: block;
  }
  .tu-footer__desc {
    font-size: .88rem; line-height: 1.85; color: rgba(255,255,255,.55);
    max-width: 380px; margin-bottom: 1.8rem;
  }
  .tu-footer__socials {
    display: flex; gap: .75rem;
  }
  .tu-footer__social {
    width: 36px; height: 36px; border-radius: 10px;
    background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
    display: flex; align-items: center; justify-content: center;
    font-size: .9rem; text-decoration: none;
    transition: all .25s ease;
  }
  .tu-footer__social:hover {
    background: rgba(201,168,76,.2); border-color: rgba(201,168,76,.5);
    transform: translateY(-2px);
  }

  .tu-footer__nl-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: .5rem;
  }
  .tu-footer__nl-sub {
    font-size: .82rem; color: rgba(255,255,255,.5); margin-bottom: 1.2rem; line-height: 1.5;
  }
  .tu-footer__nl-form {
    display: flex; gap: .5rem;
  }
  @media(max-width:480px) { .tu-footer__nl-form { flex-direction: column; } }
  .tu-footer__nl-input {
    flex: 1; padding: .65rem 1rem; border-radius: 10px;
    background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.12);
    color: #fff; font-size: .84rem; font-family: 'DM Sans', sans-serif;
    outline: none; transition: border .2s;
  }
  .tu-footer__nl-input::placeholder { color: rgba(255,255,255,.3); }
  .tu-footer__nl-input:focus { border-color: rgba(201,168,76,.5); }
  .tu-footer__nl-btn {
    padding: .65rem 1.3rem; border-radius: 10px;
    background: #c9a84c; color: #0a1628; font-size: .82rem;
    font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
    border: 2px solid #c9a84c; cursor: pointer; white-space: nowrap;
    transition: all .25s ease; font-family: 'DM Sans', sans-serif;
  }
  .tu-footer__nl-btn:hover { background: transparent; color: #c9a84c; }

  /* ── Links grid ── */
  .tu-footer__links-grid {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 2.5rem; margin-bottom: 3.5rem;
  }
  @media(max-width:900px)  { .tu-footer__links-grid { grid-template-columns: repeat(2,1fr); gap: 2rem; } }
  @media(max-width:480px)  { .tu-footer__links-grid { grid-template-columns: 1fr; gap: 1.5rem; } }

  .tu-footer__col-title {
    font-size: .68rem; font-weight: 700; letter-spacing: .2em;
    text-transform: uppercase; color: #c9a84c; margin-bottom: 1.3rem;
    display: flex; align-items: center; gap: 8px;
  }
  .tu-footer__col-title::after {
    content: ''; flex: 1; height: 1px;
    background: linear-gradient(90deg, rgba(201,168,76,.4), transparent);
  }
  .tu-footer__col-links { list-style: none; display: flex; flex-direction: column; gap: .65rem; }
  .tu-footer__col-links a,
  .tu-footer__col-links span {
    font-size: .86rem; color: rgba(255,255,255,.55);
    text-decoration: none; display: inline-flex; align-items: center; gap: 7px;
    transition: color .2s, padding-left .2s;
  }
  .tu-footer__col-links a::before { content: '—'; font-size: .6rem; color: rgba(201,168,76,.5); }
  .tu-footer__col-links a:hover { color: #c9a84c; padding-left: 4px; }

  /* ── Contact block ── */
  .tu-footer__contact {
    display: flex; flex-direction: column; gap: .8rem;
  }
  .tu-footer__ci {
    display: flex; gap: 10px; align-items: flex-start;
    font-size: .84rem; color: rgba(255,255,255,.55);
  }
  .tu-footer__ci-ic { color: #c9a84c; flex-shrink: 0; font-size: .9rem; margin-top: 1px; }
  .tu-footer__ci a { color: rgba(255,255,255,.55); text-decoration: none; transition: color .2s; }
  .tu-footer__ci a:hover { color: #c9a84c; }

  /* ── Stats bar ── */
  .tu-footer__stats {
    display: flex; flex-wrap: wrap; gap: .5rem;
    padding: 2rem 0; margin-bottom: 0;
    border-top: 1px solid rgba(255,255,255,.07);
    border-bottom: 1px solid rgba(255,255,255,.07);
  }
  .tu-footer__stat {
    flex: 1; min-width: 130px;
    display: flex; flex-direction: column; align-items: center; padding: 1rem;
    border-right: 1px solid rgba(255,255,255,.07);
    text-align: center;
  }
  .tu-footer__stat:last-child { border-right: none; }
  .tu-footer__stat-val {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.8rem; font-weight: 800; color: #c9a84c; line-height: 1;
    margin-bottom: .3rem;
  }
  .tu-footer__stat-lbl {
    font-size: .68rem; font-weight: 600; letter-spacing: .1em;
    text-transform: uppercase; color: rgba(255,255,255,.4);
  }

  /* ── Bottom bar ── */
  .tu-footer__bottom {
    padding: 1.8rem 7vw;
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 1rem;
    background: rgba(0,0,0,.25);
  }
  .tu-footer__copy {
    font-size: .78rem; color: rgba(255,255,255,.3);
  }
  .tu-footer__copy strong { color: #c9a84c; font-weight: 600; }
  .tu-footer__legal {
    display: flex; gap: 1.5rem; align-items: center;
  }
  .tu-footer__legal a {
    font-size: .75rem; color: rgba(255,255,255,.3);
    text-decoration: none; transition: color .2s;
  }
  .tu-footer__legal a:hover { color: #c9a84c; }
  .tu-footer__legal-sep { width: 1px; height: 10px; background: rgba(255,255,255,.15); }
`;

export default function TUFooter() {
  const links = {
    "About TU": [
      { label: "About University", href: "/aboutus" },
      { label: "History",          href: "/history" },
      { label: "Vision & Mission", href: "/vision" },
      { label: "Leadership",       href: "/leadership" },
      { label: "TU Convocation",   href: "/tuconvocation" },
    ],
    "Academics": [
      { label: "Faculties",   href: "/faculties" },
      { label: "Campuses",    href: "/campuses" },
      { label: "Research",    href: "/research" },
      { label: "Library",     href: "/library" },
      { label: "Admissions",  href: "/admissions" },
    ],
    "Students": [
      { label: "Exam Schedule", href: "#exam-routine" },
      { label: "Results",       href: "#result" },
      { label: "Exam Form",     href: "#exam-form" },
      { label: "Events",        href: "/events" },
      { label: "Activities",    href: "/activities" },
    ],
    "Contact": null, // rendered separately
  };

  const stats = [
    { val: "60+",  lbl: "Campuses" },
    { val: "400K+",lbl: "Students" },
    { val: "300+", lbl: "Programs" },
    { val: "65+",  lbl: "Years" },
  ];

  return (
    <>
      <style>{S}</style>
      <footer className="tu-footer">

        <div className="tu-footer__stripe" />

        <div className="tu-footer__body">

          {/* ── Top: Brand + Newsletter ── */}
          <div className="tu-footer__top">
            <div>
              <p className="tu-footer__brand">Tribhuvan <span>University</span></p>
              <span className="tu-footer__tagline">Nepal's Premier Institution Since 1959</span>
              <p className="tu-footer__desc">
                Dedicated to advancing knowledge, fostering innovation, and serving
                the people of Nepal through quality education and transformative research
                across all disciplines.
              </p>
              <div className="tu-footer__socials">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="tu-footer__social" aria-label="Facebook">𝗙</a>
                <a href="https://twitter.com"  target="_blank" rel="noopener noreferrer" className="tu-footer__social" aria-label="Twitter">𝕏</a>
                <a href="https://youtube.com"  target="_blank" rel="noopener noreferrer" className="tu-footer__social" aria-label="YouTube">▶</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="tu-footer__social" aria-label="LinkedIn">in</a>
              </div>
            </div>

            <div>
              <h3 className="tu-footer__nl-title">Stay Updated</h3>
              <p className="tu-footer__nl-sub">
                Subscribe to receive the latest notices, events, and academic updates from TU.
              </p>
              <div className="tu-footer__nl-form">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="tu-footer__nl-input"
                />
                <button className="tu-footer__nl-btn">Subscribe</button>
              </div>
            </div>
          </div>

          {/* ── Links Grid ── */}
          <div className="tu-footer__links-grid">
            {Object.entries(links).filter(([, v]) => v !== null).map(([title, items]) => (
              <div key={title}>
                <p className="tu-footer__col-title">{title}</p>
                <ul className="tu-footer__col-links">
                  {items.map(item => (
                    <li key={item.label}>
                      <Link to={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact column */}
            <div>
              <p className="tu-footer__col-title">Contact</p>
              <div className="tu-footer__contact">
                <div className="tu-footer__ci">
                  <span className="tu-footer__ci-ic">📍</span>
                  <span>Kirtipur, Kathmandu, Nepal</span>
                </div>
                <div className="tu-footer__ci">
                  <span className="tu-footer__ci-ic">📞</span>
                  <a href="tel:+97714330433">+977-1-4330433</a>
                </div>
                <div className="tu-footer__ci">
                  <span className="tu-footer__ci-ic">✉️</span>
                  <a href="mailto:info@tu.edu.np">info@tu.edu.np</a>
                </div>
                <div className="tu-footer__ci">
                  <span className="tu-footer__ci-ic">🌐</span>
                  <a href="https://tu.edu.np" target="_blank" rel="noopener noreferrer">www.tu.edu.np</a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Stats bar ── */}
          <div className="tu-footer__stats">
            {stats.map(s => (
              <div key={s.lbl} className="tu-footer__stat">
                <span className="tu-footer__stat-val">{s.val}</span>
                <span className="tu-footer__stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="tu-footer__bottom">
          <p className="tu-footer__copy">
            © {new Date().getFullYear()} <strong>Tribhuvan University</strong>. All Rights Reserved.
          </p>
          <div className="tu-footer__legal">
            <Link to="/privacy"  className="tu-footer__legal" style={{ textDecoration: "none", fontSize: ".75rem", color: "rgba(255,255,255,.3)", transition: "color .2s" }}>Privacy Policy</Link>
            <div className="tu-footer__legal-sep" />
            <Link to="/terms"    className="tu-footer__legal" style={{ textDecoration: "none", fontSize: ".75rem", color: "rgba(255,255,255,.3)", transition: "color .2s" }}>Terms of Use</Link>
            <div className="tu-footer__legal-sep" />
            <Link to="/sitemap"  className="tu-footer__legal" style={{ textDecoration: "none", fontSize: ".75rem", color: "rgba(255,255,255,.3)", transition: "color .2s" }}>Sitemap</Link>
          </div>
        </div>

      </footer>
    </>
  );
}