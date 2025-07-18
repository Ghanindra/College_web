// Research.jsx
import React, { useEffect, useState } from "react";
import TuHeader from "../components/TuHeader";
import Footer from "../components/Footer";
import "./Research.css";

export default function Research() {
  // Dummy data – replace with API call later
  const [publications, setPublications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Simulated fetch
    setTimeout(() => {
      setPublications([
        {
          id: 1,
          title: "Quantum Machine Learning in Nepalese Context",
          authors: "Dr. S. Sharma, Er. P. Adhikari",
          journal: "TU Journal of CS & IT",
          year: 2024,
          link: "https://elibrary.tucl.edu.np/bitstream/123456789/12345/1/QuantumML_Nepal2024.pdf",
        },
        {
          id: 2,
          title: "Smart Irrigation Using IoT for Mid-Hills of Nepal",
          authors: "Asst. Prof. A. Rai et al.",
          journal: "Elsevier Smart Agriculture",
          year: 2023,
          link: "https://elibrary.tucl.edu.np/",
        },
      ]);
      setProjects([
        {
          id: 1,
          title: "AI-Based Early-Warning Landslide System",
          funding: "University Grants Commission (UGC)",
          status: "Ongoing",
        },
        {
          id: 2,
          title: "Nepali ASR (Automatic Speech Recognition) Dataset",
          funding: "NAAMII",
          status: "Completed",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <>
      <div className="researchHeader">
        <TuHeader />
      </div>

      <main className="research">
        <section className="hero">
          <h1>Research at Tribhuvan University</h1>
          <p>Advancing knowledge that serves Nepal and the world.</p>
        </section>

        <section className="section">
          <h2>Research Publications</h2>
          {loading ? (
            <p>Loading…</p>
          ) : (
            <ul className="publication-list">
              {publications.map((pub) => (
                <li key={pub.id} className="card">
                  <h3>{pub.title}</h3>
                  <p className="authors">{pub.authors}</p>
                  <p className="meta">
                    {pub.journal}, {pub.year}
                  </p>
                  <a href={pub.link} className="btn" target="_blank" rel="noreferrer">
                    View Paper
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="section">
          <h2>Funded Projects</h2>
          {loading ? (
            <p>Loading…</p>
          ) : (
            <ul className="project-list">
              {projects.map((prj) => (
                <li key={prj.id} className="card">
                  <h3>{prj.title}</h3>
                  <p className="funding">Funded by: {prj.funding}</p>
                  <span className={`pill ${prj.status.toLowerCase()}`}>{prj.status}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="section cta">
          <h2>Collaborate with Us</h2>
          <p>
            Faculty, students and external partners are welcome to join ongoing
            research or propose new initiatives.
          </p>

         <button
  className="btn primary contact-btn"

 onClick={() => setShowModal(prev => !prev)}
>
  Contact Research Office
</button>
            
        </section>

        {/* Modal */}
        {showModal && (
          <div className="contact-modal" onClick={() => setShowModal(false)}>
            <div className="modal-content">
              <h3>Research Office Contacts</h3>
              <p>
                <strong>Phone:</strong>{" "}
                <a href="tel:+977-1-4330435">+977-1-4330435</a>
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:research@tu.edu.np">research@tu.edu.np</a>
              </p>
            </div>
          </div>
        )}
      </main>

      <div className="researchFooter">
        <Footer />
      </div>
    </>
  );
}