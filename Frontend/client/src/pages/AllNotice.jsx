import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TuHeader from "../components/TuHeader";
import Footer from "../components/Footer";
import noticebanner from "../assets/noticebanner.png";
import Base_Url from '../api/Base_Url'

export default function NoticePage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get(`${Base_Url}/notices/all`);
        setNotices(res.data || []);
      } catch (err) {
        console.error("Failed to fetch notices:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  return (
    <>
      {/* Sticky Navy Header */}
      <div className="sticky top-0 z-50 w-full shadow-md" style={{ backgroundColor: "#0B3C5D" }}>
        <TuHeader />
      </div>

      {/* Hero Banner */}
      <div
        className="relative h-48 sm:h-60 md:h-72 bg-cover bg-center"
        style={{
          backgroundImage: `url(${noticebanner})`,
          filter: "contrast(120%) saturate(115%) brightness(0.9)",
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{ backgroundColor: "rgba(11,60,93,0.72)" }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "#D4AF37" }}
          >
            Tribhuvan University
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            All Notices
          </h1>
          <div
            className="mt-3 w-16 h-1 rounded"
            style={{ backgroundColor: "#D4AF37" }}
          />
        </div>
      </div>

      {/* Main Content */}
      <main
        className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#F5F7FA" }}
      >
        <div className="max-w-4xl mx-auto">

          {/* Section heading */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold" style={{ color: "#0B3C5D" }}>
              Latest Notices
            </h2>
            <div
              className="mt-2 w-12 h-1 rounded"
              style={{ backgroundColor: "#D4AF37" }}
            />
          </div>

          {/* Loading spinner */}
          {loading ? (
            <div className="flex flex-col items-center gap-3 py-20">
              <div
                className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
                style={{ borderColor: "#0B3C5D", borderTopColor: "transparent" }}
              />
              <p className="text-sm font-medium" style={{ color: "#0B3C5D" }}>
                Fetching notices...
              </p>
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center py-20 text-gray-400 text-sm">
              No notices available at this time.
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {notices.map((notice, index) => (
                <li key={notice._id}>
                  <Link
                    to={`/news/${notice._id}`}
                    className="group flex flex-col sm:flex-row sm:items-start gap-4 bg-white rounded-xl shadow border border-gray-100 p-5 sm:p-6 transition-transform duration-200 hover:scale-[1.02] hover:shadow-md no-underline"
                  >
                    {/* Index number badge */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: "#0B3C5D" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-base sm:text-lg font-semibold leading-snug mb-1 group-hover:underline"
                        style={{ color: "#1F2937" }}
                      >
                        {notice.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3">
                        {notice.content.slice(0, 120)}...
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                          style={{ backgroundColor: "#0B3C5D15", color: "#0B3C5D" }}
                        >
                          📅{" "}
                          {new Date(notice.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Arrow indicator */}
                    <div
                      className="hidden sm:flex flex-shrink-0 items-center self-center text-lg font-bold transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: "#D4AF37" }}
                    >
                      →
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <div className="w-full">
        <Footer />
      </div>
    </>
  );
}