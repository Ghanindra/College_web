// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import "./TUHeader.css";
// import logo from "../assets/tu.png";
// import ExamForm from "../pages/ExamForm"; // Make sure this path is correct
// import ResultSearch from "../pages/ResultSearch";

// import ExamRoutineGallery from "../pages/ExamRoutineGallery";

// export default function TUHeader() {
//   const [open, setOpen] = useState(false);
//   const [dropdown, setDropdown] = useState(null);
//   const [openExamSection, setOpenExamSection] = useState(null);

//   const navItems = [
//     { name: "Home", path: "/" },
//     { name: "Notices", path: "/news" },
//     {
//       name: "Courses",
//       children: ["BSc CSIT", "BBA", "BBS", "B.Ed", "BCA", "B.Sc"],
//     },
//     {
//       name: "Faculties",
//       children: ["Science", "Management", "Education", "Humanities", "Law", "Engineering"],
//     },
//     { name: "Events", path: "/events" },
//     { name: "Gallery", path: "/gallery" },
//     {
//       name: "Exam Schedule",
//       children: ["Exam Routine", "Result", "Exam Form"],
//     },
//   ];

//   const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

//   return (
//     <header className="header">
//       <div className="container">
//         {/* Logo */}
//         <NavLink to="/" className="logo-link">
//           <img src={logo} alt="TU Logo" className="logo" />
//           <span className="logo-text">Tribhuvan University</span>
//         </NavLink>

//         {/* Desktop Nav */}
//         <nav className="nav-desktop">
//           {navItems.map((item, i) =>
//             item.children ? (
//               <div
//                 key={i}
//                 className="nav-dropdown"
//                 onMouseEnter={() => setDropdown(item.name)}
//                 onMouseLeave={() => setDropdown(null)}
//               >
//                 <span className="nav-dropdown-label">
//                   {item.name}
//                   <svg className="dropdown-arrow" viewBox="0 0 20 20" fill="currentColor">
//                     <path
//                       fillRule="evenodd"
//                       d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </span>
//                 <div className={`nav-dropdown-menu ${dropdown === item.name ? "active" : ""}`}>
//                   {item.children.map((child, index) => (
//                     <button
//                       key={index}
//                       className="nav-dropdown-item"
//                       onClick={() => {
//                         if (item.name === "Exam Schedule") {
//                           setOpenExamSection(child.toLowerCase().replace(/\s+/g, "-"));
//                         }
//                         setDropdown(null);
//                       }}
//                       style={{ background: "none", border: "none", cursor: "pointer", font: "inherit", padding: 0 }}
//                     >
//                       {child}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <NavLink key={i} to={item.path} className={linkClass}>
//                 {item.name}
//               </NavLink>
//             )
//           )}
//         </nav>

//         {/* Mobile Toggle Button */}
//         <div className="mobile-menu-toggle">
//           <button onClick={() => setOpen(!open)} className="mobile-menu-button" aria-label="Toggle mobile menu">
//             <svg className="mobile-menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
//               />
//             </svg>
//           </button>

//           {/* Mobile Nav */}
//           <nav className={`nav-mobile ${open ? "active" : ""}`}>
//             <div className="nav-mobile-content">
//               {navItems.map((item, i) =>
//                 item.children ? (
//                   <div key={i} className="nav-mobile-dropdown">
//                     <div className="nav-mobile-dropdown-label">
//                       {item.name}
//                       <svg className="dropdown-arrow-mobile" viewBox="0 0 20 20" fill="currentColor">
//                         <path
//                           fillRule="evenodd"
//                           d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </div>
//                     <div className="nav-mobile-dropdown-content">
//                       {item.children.map((child, index) => (
//                         <button
//                           key={index}
//                           className="nav-mobile-dropdown-item"
//                           onClick={() => {
//                             if (item.name === "Exam Schedule") {
//                               setOpenExamSection(child.toLowerCase().replace(/\s+/g, "-"));
//                               setOpen(false);
//                             }
//                           }}
//                           style={{
//                             background: "none",
//                             border: "none",
//                             font: "inherit",
//                             padding: "8px 0",
//                             cursor: "pointer",
//                           }}
//                         >
//                           {child}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 ) : (
//                   <NavLink key={i} to={item.path} className="nav-mobile-link" onClick={() => setOpen(false)}>
//                     {item.name}
//                   </NavLink>
//                 )
//               )}
//             </div>
//           </nav>
//         </div>
//       </div>

//       {/* Modal for Exam Schedule */}
//       {openExamSection && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0,0,0,0.5)",
//             zIndex: 1000,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//           onClick={() => setOpenExamSection(null)}
//         >
//           <div
//             style={{
//               background: "white",
//               padding: "20px",
//               borderRadius: "8px",
//               maxHeight: "90vh",
//               overflowY: "auto",
//               width: "90%",
//               maxWidth: "700px",
//               position: "relative",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setOpenExamSection(null)}
//               style={{
//                 position: "absolute",
//                 right: 10,
//                 top: 10,
//                 border: "none",
//                 background: "transparent",
//                 fontSize: "1.5rem",
//                 cursor: "pointer",
//               }}
//               aria-label="Close Modal"
//             >
//               &times;
//             </button>

//             {openExamSection === "exam-form" && <ExamForm />}
//             {openExamSection === "exam routine" && <ExamRoutineGallery/>}
//             {openExamSection === "result" && <ResultSearch/>}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }



import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./TUHeader.css";
import logo from "../assets/tu.png";
import ExamForm from "../pages/ExamForm"; // Make sure this path is correct
import ResultSearch from "../pages/ResultSearch";
import ExamRoutineGallery from "../pages/ExamRoutineGallery";

export default function TUHeader() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [openExamSection, setOpenExamSection] = useState(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Notices", path: "/news" },
    {
      name: "Courses",
      children: ["BSc CSIT", "BBA", "BBS", "B.Ed", "BCA", "B.Sc"],
    },
    {
      name: "Faculties",
      children: ["Science", "Management", "Education", "Humanities", "Law", "Engineering"],
    },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    {
      name: "Exam Schedule",
      children: ["Exam Routine", "Result", "Exam Form"],
    },
  ];

  const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <NavLink to="/" className="logo-link">
          <img src={logo} alt="TU Logo" className="logo" />
          <span className="logo-text">Tribhuvan University</span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="nav-desktop">
          {navItems.map((item, i) =>
            item.children ? (
              <div
                key={i}
                className="nav-dropdown"
                onMouseEnter={() => setDropdown(item.name)}
                onMouseLeave={() => setDropdown(null)}
              >
                <span className="nav-dropdown-label">
                  {item.name}
                  <svg className="dropdown-arrow" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div className={`nav-dropdown-menu ${dropdown === item.name ? "active" : ""}`}>
                  {item.children.map((child, index) => (
                    <button
                      key={index}
                      className="nav-dropdown-item"
                      onClick={() => {
                        if (item.name === "Exam Schedule") {
                          // Fix here: set exact string you check in modal below
                          setOpenExamSection(child.toLowerCase().replace(/\s+/g, "-")); // "exam-routine", "result", or "exam-form"
                        }
                        setDropdown(null);
                      }}
                      style={{ background: "none", border: "none", cursor: "pointer", font: "inherit", padding: 0 }}
                    >
                      {child}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink key={i} to={item.path} className={linkClass}>
                {item.name}
              </NavLink>
            )
          )}
        </nav>

        {/* Mobile Toggle Button */}
        <div className="mobile-menu-toggle">
          <button onClick={() => setOpen(!open)} className="mobile-menu-button" aria-label="Toggle mobile menu">
            <svg className="mobile-menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          {/* Mobile Nav */}
          <nav className={`nav-mobile ${open ? "active" : ""}`}>
            <div className="nav-mobile-content">
              {navItems.map((item, i) =>
                item.children ? (
                  <div key={i} className="nav-mobile-dropdown">
                    <div className="nav-mobile-dropdown-label">
                      {item.name}
                      <svg className="dropdown-arrow-mobile" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="nav-mobile-dropdown-content">
                      {item.children.map((child, index) => (
                        <button
                          key={index}
                          className="nav-mobile-dropdown-item"
                          onClick={() => {
                            if (item.name === "Exam Schedule") {
                              setOpenExamSection(child.toLowerCase().replace(/\s+/g, "-"));
                              setOpen(false);
                            }
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            font: "inherit",
                            padding: "8px 0",
                            cursor: "pointer",
                          }}
                        >
                          {child}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NavLink key={i} to={item.path} className="nav-mobile-link" onClick={() => setOpen(false)}>
                    {item.name}
                  </NavLink>
                )
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Modal for Exam Schedule */}
      {openExamSection && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setOpenExamSection(null)}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              maxHeight: "90vh",
              overflowY: "auto",
              width: "90%",
              maxWidth: "700px",
              position: "relative",
              minWidth: "320px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenExamSection(null)}
              style={{
                position: "absolute",
                right: 10,
                top: 10,
                border: "none",
                background: "transparent",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
              aria-label="Close Modal"
            >
              &times;
            </button>

            {openExamSection === "exam-form" && <ExamForm />}
            {openExamSection === "exam-routine" && <ExamRoutineGallery />}
            {openExamSection === "result" && <ResultSearch />}
          </div>
        </div>
      )}
    </header>
  );
}

