import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TuHeader from "../components/TuHeader";
import Footer from "../components/Footer";
import Base_Url from '../api/Base_Url'
import {SERVER_URL} from '../api/Base_Url'
export default function NoticeDetailsPage() {
  const { id } = useParams();

  console.log("Notice ID being requested:", id);
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${Base_Url}/notices/${id}`);
        console.log("Fetched news detail:", res.data);
        setNews(res.data);
      } catch (err) {
        console.error("Failed to fetch news detail:", err);
      }
    };
    fetchNews();
  }, [id]);

  if (!news)
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F5F7FA" }}>
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
            style={{ borderColor: "#0B3C5D", borderTopColor: "transparent" }}
          />
          <p className="text-sm font-medium" style={{ color: "#0B3C5D" }}>
            Loading notice...
          </p>
        </div>
      </div>
    );

  return (
    <>
      {/* Sticky Navy Header */}
      <div className="sticky top-0 z-50 w-full shadow-md" style={{ backgroundColor: "#0B3C5D" }}>
        <TuHeader />
      </div>

      {/* Page Hero Bar */}
      <div className="py-10 px-4 text-center" style={{ backgroundColor: "#0B3C5D" }}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#D4AF37" }}>
          Official Notice
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-3xl mx-auto leading-tight">
          {news.title}
        </h1>
        {/* Gold underline accent */}
        <div className="mt-4 mx-auto w-16 h-1 rounded" style={{ backgroundColor: "#D4AF37" }} />
      </div>

      {/* Main Content Card */}
      <main
        className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#F5F7FA" }}
      >
        <div className="max-w-3xl mx-auto">
          <article className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">

            {/* Card top accent bar */}
            <div className="h-1 w-full" style={{ backgroundColor: "#D4AF37" }} />

            <div className="p-6 sm:p-8 md:p-10">

              {/* Date badge */}
              <div className="flex items-center gap-2 mb-6">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#0B3C5D15", color: "#0B3C5D" }}
                >
                  📅{" "}
                  {new Date(news.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              {/* Divider */}
              <hr className="mb-6" style={{ borderColor: "#E5E7EB" }} />

              {/* Notice Content */}
              <p
                className="text-sm sm:text-base leading-relaxed whitespace-pre-line"
                style={{ color: "#1F2937" }}
              >
                {news.content}
              </p>
            </div>

            {/* Card footer */}
            <div
              className="px-6 sm:px-8 md:px-10 py-4 flex items-center justify-between border-t"
              style={{ backgroundColor: "#F5F7FA", borderColor: "#E5E7EB" }}
            >
              <p className="text-xs text-gray-400">Tribhuvan University — Official Notice</p>
              <button
                className="text-xs font-semibold px-4 py-2 rounded-lg text-white transition-colors duration-200"
                style={{ backgroundColor: "#0B3C5D" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1D4ED8")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0B3C5D")}
                onClick={() => window.history.back()}
              >
                ← Back
              </button>
            </div>
          </article>
        </div>
      </main>

      <div className="w-full">
        <Footer />
      </div>
    </>
  );
}