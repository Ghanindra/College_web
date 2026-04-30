// Research.jsx
import React, { useEffect, useState } from "react";
import TuHeader from "../components/TuHeader";
import Footer from "../components/Footer";

export default function Research() {
  const [publications, setPublications] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
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
      {/* Sticky Navy Header */}
      <div className="sticky top-0 z-50 w-full shadow-md" style={{ backgroundColor: "#0B3C5D" }}>
        <TuHeader />
      </div>

      <main className="min-h-screen" style={{ backgroundColor: "#F5F7FA", color: "#1F2937" }}>

        {/* Hero */}
        <section
          className="py-16 px-4 text-center text-white"
          style={{ backgroundColor: "#0B3C5D" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            Research at Tribhuvan University
          </h1>
          <p className="text-base sm:text-lg" style={{ color: "#D4AF37" }}>
            Advancing knowledge that serves Nepal and the world.
          </p>
        </section>

        {/* Publications */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Section Title with Gold underline */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "#0B3C5D" }}>
              Research Publications
            </h2>
            <div className="mt-2 w-14 h-1 rounded" style={{ backgroundColor: "#D4AF37" }} />
          </div>

          {loading ? (
            <p className="text-gray-400 animate-pulse">Loading...</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {publications.map((pub) => (
                <li
                  key={pub.id}
                  className="bg-white rounded-xl shadow p-6 flex flex-col gap-3 border border-gray-100 transition-transform duration-200 hover:scale-[1.02] hover:shadow-md"
                >
                  <h3 className="text-base sm:text-lg font-semibold leading-snug" style={{ color: "#1F2937" }}>
                    {pub.title}
                  </h3>
                  <p className="text-sm font-medium" style={{ color: "#1D4ED8" }}>
                    {pub.authors}
                  </p>
                  <p className="text-sm text-gray-400">
                    {pub.journal}, {pub.year}
                  </p>
                  <a
                    href={pub.link}
                    className="mt-auto inline-block text-center text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                    style={{ backgroundColor: "#0B3C5D" }}
                    onMouseEnter={e => (e.target.style.backgroundColor = "#1D4ED8")}
                    onMouseLeave={e => (e.target.style.backgroundColor = "#0B3C5D")}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Paper
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Funded Projects — alternating light bg */}
        <section style={{ backgroundColor: "#EEF2F7" }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "#0B3C5D" }}>
                Funded Projects
              </h2>
              <div className="mt-2 w-14 h-1 rounded" style={{ backgroundColor: "#D4AF37" }} />
            </div>

            {loading ? (
              <p className="text-gray-400 animate-pulse">Loading...</p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((prj) => (
                  <li
                    key={prj.id}
                    className="bg-white rounded-xl shadow p-6 flex flex-col gap-3 border border-gray-100 transition-transform duration-200 hover:scale-[1.02] hover:shadow-md"
                  >
                    <h3 className="text-base sm:text-lg font-semibold" style={{ color: "#1F2937" }}>
                      {prj.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium" style={{ color: "#1F2937" }}>Funded by: </span>
                      {prj.funding}
                    </p>
                    <span
                      className="self-start text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide"
                      style={
                        prj.status.toLowerCase() === "ongoing"
                          ? { backgroundColor: "#D4AF3720", color: "#B8960C", border: "1px solid #D4AF37" }
                          : { backgroundColor: "#F3F4F6", color: "#6B7280", border: "1px solid #D1D5DB" }
                      }
                    >
                      {prj.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 text-center" style={{ backgroundColor: "#F5F7FA" }}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "#0B3C5D" }}>
            Collaborate with Us
          </h2>
          <div className="mx-auto w-14 h-1 rounded mb-5" style={{ backgroundColor: "#D4AF37" }} />
          <p className="text-gray-500 max-w-xl mx-auto mb-8 text-sm sm:text-base">
            Faculty, students and external partners are welcome to join ongoing
            research or propose new initiatives.
          </p>
          <button
            className="text-white font-semibold py-3 px-10 rounded-lg shadow transition-colors duration-200"
            style={{ backgroundColor: "#0B3C5D" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1D4ED8")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#0B3C5D")}
            onClick={() => setShowModal((prev) => !prev)}
          >
            Contact Research Office
          </button>
        </section>

        {/* Modal */}
        {showModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center border-t-4"
              style={{ borderColor: "#D4AF37" }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-1" style={{ color: "#0B3C5D" }}>
                Research Office Contacts
              </h3>
              <div className="mx-auto w-10 h-1 rounded mb-5" style={{ backgroundColor: "#D4AF37" }} />
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Phone: </span>
                <a href="tel:+977-1-4330435" className="hover:underline" style={{ color: "#1D4ED8" }}>
                  +977-1-4330435
                </a>
              </p>
              <p className="text-gray-700 mb-6">
                <span className="font-semibold">Email: </span>
                <a href="mailto:research@tu.edu.np" className="hover:underline" style={{ color: "#1D4ED8" }}>
                  research@tu.edu.np
                </a>
              </p>
              <button
                className="text-white text-sm font-semibold py-2 px-6 rounded-lg transition-colors"
                style={{ backgroundColor: "#0B3C5D" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1D4ED8")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#0B3C5D")}
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>

      <div className="w-full">
        <Footer />
      </div>
    </>
  );
}