import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import TuHeader from "../components/TuHeader";
import Footer from "../components/Footer";
import eventbanner from "../assets/eventbanner.jpg";
import Base_Url from '../api/Base_Url'
import {SERVER_URL} from '../api/Base_Url'
// console.log('server',SERVER_URL);

export default function AllEvent() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const selectedEventFromState = location.state?.selectedEvent || null;
  const selectedEventId = location.state?.selectedEventId || null;

  const [searchTitle, setSearchTitle] = useState("");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${Base_Url}/events/all`);
        const fetchedEvents = res.data.events || [];

        setEvents(fetchedEvents);
        setFilteredEvents(fetchedEvents);

        if (selectedEventId) {
          const matched = fetchedEvents.find((e) => e._id === selectedEventId);
          if (matched) { setSelectedEvent(matched); return; }
        }
        if (selectedEventFromState) { setSelectedEvent(selectedEventFromState); return; }
        if (fetchedEvents.length > 0) {
          const latest = fetchedEvents.reduce((a, b) =>
            new Date(a.date) > new Date(b.date) ? a : b
          );
          setSelectedEvent(latest);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [selectedEventFromState, selectedEventId]);

  const handleSearch = () => {
    const filtered = events.filter((event) => {
      const titleMatch = event.title.toLowerCase().includes(searchTitle.toLowerCase());
      let dateMatch = true;
      if (searchDate) {
        const eventDate = new Date(event.date).toISOString().slice(0, 10);
        dateMatch = eventDate === searchDate;
      }
      return titleMatch && dateMatch;
    });
    setFilteredEvents(filtered);
    if (selectedEvent && !filtered.some((e) => e._id === selectedEvent._id)) {
      setSelectedEvent(filtered.length > 0 ? filtered[0] : null);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getImageUrl = (imagePath) =>
    imagePath ? `${SERVER_URL}${imagePath}` : null;

  const sidebarEvents = filteredEvents.filter((e) => e._id !== selectedEvent?._id);

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
          backgroundImage: `url(${eventbanner})`,
          filter: "contrast(120%) saturate(115%) brightness(0.9)",
        }}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{ backgroundColor: "rgba(11,60,93,0.72)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#D4AF37" }}>
            Tribhuvan University
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            All Events
          </h1>
          <div className="mt-3 w-16 h-1 rounded" style={{ backgroundColor: "#D4AF37" }} />
        </div>
      </div>

      {/* Main */}
      <main className="min-h-screen py-10 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F5F7FA" }}>
        <div className="max-w-7xl mx-auto">

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow border border-gray-100 p-4 sm:p-5 mb-8 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="flex-1 text-sm px-4 py-2.5 rounded-lg border border-gray-200 outline-none focus:ring-2 transition"
              style={{ color: "#1F2937", "--tw-ring-color": "#0B3C5D33" }}
              onFocus={(e) => (e.target.style.borderColor = "#0B3C5D")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
            />
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="sm:w-44 text-sm px-4 py-2.5 rounded-lg border border-gray-200 outline-none transition"
              style={{ color: "#1F2937" }}
              onFocus={(e) => (e.target.style.borderColor = "#0B3C5D")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
            />
            <button
              onClick={handleSearch}
              className="text-sm font-semibold text-white px-6 py-2.5 rounded-lg transition-colors duration-200 whitespace-nowrap"
              style={{ backgroundColor: "#0B3C5D" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1D4ED8")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0B3C5D")}
            >
              Search
            </button>
          </div>

          {/* Loading Spinner */}
          {loading ? (
            <div className="flex flex-col items-center gap-3 py-24">
              <div
                className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
                style={{ borderColor: "#0B3C5D", borderTopColor: "transparent" }}
              />
              <p className="text-sm font-medium" style={{ color: "#0B3C5D" }}>
                Loading events...
              </p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">

              {/* ── Selected Event Detail ── */}
              <div className="flex-[2] min-w-0">
                {selectedEvent ? (
                  <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
                    {/* Gold top bar */}
                    <div className="h-1 w-full" style={{ backgroundColor: "#D4AF37" }} />

                    {selectedEvent.imageUrl && (
                      <img
                        src={getImageUrl(selectedEvent.imageUrl)}
                        alt={selectedEvent.title}
                        className="w-full object-cover"
                        style={{ maxHeight: "360px" }}
                      />
                    )}

                    <div className="p-6 sm:p-8">
                      {/* Date badge */}
                      <span
                        className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
                        style={{ backgroundColor: "#0B3C5D15", color: "#0B3C5D" }}
                      >
                        📅{" "}
                        {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>

                      <h2
                        className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 leading-tight"
                        style={{ color: "#0B3C5D" }}
                      >
                        {selectedEvent.title}
                      </h2>
                      <div className="w-12 h-1 rounded mb-5" style={{ backgroundColor: "#D4AF37" }} />
                      <p className="text-sm sm:text-base leading-relaxed text-gray-600 whitespace-pre-line">
                        {selectedEvent.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow border border-gray-100 flex items-center justify-center py-24">
                    <p className="text-gray-400 text-sm">No event selected. Please select one from the list.</p>
                  </div>
                )}
              </div>

              {/* ── Sidebar ── */}
              <div className="lg:w-80 xl:w-96 flex-shrink-0">
                <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
                  {/* Sidebar header */}
                  <div className="px-5 py-4 border-b border-gray-100" style={{ backgroundColor: "#0B3C5D" }}>
                    <h3 className="text-base font-bold text-white">Other Events</h3>
                  </div>

                  <ul
                    className="divide-y divide-gray-100 overflow-y-auto"
                    style={{ maxHeight: "70vh" }}
                  >
                    {sidebarEvents.length === 0 ? (
                      <li className="px-5 py-6 text-center text-sm text-gray-400">
                        No events found.
                      </li>
                    ) : (
                      sidebarEvents.map((event) => (
                        <li
                          key={event._id}
                          onClick={() => handleEventClick(event)}
                          className="flex gap-3 items-center px-4 py-3 cursor-pointer transition-colors duration-150 hover:bg-gray-50 group"
                        >
                          {/* Thumbnail */}
                          {event.imageUrl ? (
                            <img
                              src={getImageUrl(event.imageUrl)}
                              alt={event.title}
                              className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                            />
                          ) : (
                            <div
                              className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-lg font-bold"
                              style={{ backgroundColor: "#0B3C5D" }}
                            >
                              {event.title?.[0] ?? "E"}
                            </div>
                          )}

                          {/* Text */}
                          <div className="min-w-0">
                            <h4
                              className="text-sm font-semibold leading-snug line-clamp-2 group-hover:underline"
                              style={{ color: "#1F2937" }}
                            >
                              {event.title}
                            </h4>
                            <p
                              className="text-xs mt-1 font-medium"
                              style={{ color: "#D4AF37" }}
                            >
                              {new Date(event.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="w-full">
        <Footer />
      </div>
    </>
  );
}