import React,{ useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./AllEvent.css";
import TuHeader from "../components/TuHeader";
import eventbanner from "../assets/eventbanner.jpg";

export default function AllEvent() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const location = useLocation();
  const selectedEventFromState = location.state?.selectedEvent || null;
  const selectedEventId = location.state?.selectedEventId || null;

  const [searchTitle, setSearchTitle] = useState("");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events/all");
        const fetchedEvents = res.data.events || [];

        setEvents(fetchedEvents);
        setFilteredEvents(fetchedEvents);

        if (selectedEventId) {
          const matched = fetchedEvents.find((e) => e._id === selectedEventId);
          if (matched) {
            setSelectedEvent(matched);
            return;
          }
        }

        if (selectedEventFromState) {
          setSelectedEvent(selectedEventFromState);
          return;
        }

        if (fetchedEvents.length > 0) {
          const latest = fetchedEvents.reduce((a, b) =>
            new Date(a.date) > new Date(b.date) ? a : b
          );
          setSelectedEvent(latest);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
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
      if (filtered.length > 0) {
        setSelectedEvent(filtered[0]);
      } else {
        setSelectedEvent(null);
      }
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getImageUrl = (imagePath) =>
    imagePath ? `http://localhost:5000${imagePath}` : null;

  return (
    <div className="event-page">
      <div className="eventHeader">
        <TuHeader />
      </div>

      <div
        className="banner-section"
        style={{
          backgroundImage: `url(${eventbanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          filter: "contrast(120%) saturate(115%) brightness(0.9)",
        }}
      >
        All Events
      </div>

      <div
        className="event-main-content"
        style={{
          display: "flex",
          gap: "1rem",
          marginTop: "2rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div style={{ flex: "1 1 300px" }}>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ flex: "1 1 200px" }}>
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ flex: "0 0 auto" }}>
          <button
            onClick={handleSearch}
            style={{
              padding: "0.6rem 1.2rem",
              fontSize: "1rem",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
      </div>

      <div className="event-main-content" style={{ display: "flex", gap: "2rem" }}>
        <div className="selected-event" style={{ flex: 2 }}>
          {selectedEvent ? (
            <>
              {selectedEvent.imageUrl && (
                <img
                  src={getImageUrl(selectedEvent.imageUrl)}
                  alt={selectedEvent.title}
                  style={{ maxWidth: "100%", borderRadius: 8, marginBottom: "1rem" }}
                />
              )}
              <h2>{selectedEvent.title}</h2>
              <p>{selectedEvent.description}</p>
              <p className="event-date">
                {new Date(selectedEvent.date).toLocaleDateString()}
              </p>
            </>
          ) : (
            <p>Please select an event to view details.</p>
          )}
        </div>

        <div className="event-sidebar" style={{ flex: 1, minWidth: "250px" }}>
          <h3>Other Events</h3>
          <ul className="event-list" style={{ maxHeight: "70vh", overflowY: "auto" }}>
            {filteredEvents
              .filter((event) => event._id !== selectedEvent?._id)
              .map((event) => (
                <li
                  key={event._id}
                  className="event-item"
                  onClick={() => handleEventClick(event)}
                  style={{ cursor: "pointer", display: "flex", gap: "0.75rem", alignItems: "center" }}
                >
                  {event.imageUrl ? (
                    <img
                      src={getImageUrl(event.imageUrl)}
                      alt={event.title}
                      style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6 }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        backgroundColor: "#ccc",
                        borderRadius: 6,
                      }}
                    />
                  )}
                  <div>
                    <h4 style={{ margin: 0 }}>{event.title}</h4>
                    <p className="event-date" style={{ margin: 0 }}>
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              ))}
            {filteredEvents.filter((event) => event._id !== selectedEvent?._id).length === 0 && (
              <p style={{ padding: "1rem", color: "#64748b" }}>No events found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
