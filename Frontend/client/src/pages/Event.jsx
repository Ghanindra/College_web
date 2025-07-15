import React, { useEffect, useState } from "react";
import axios from "axios";

const PAGE_SIZE = 5;

export default function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch events from backend with pagination and search
  async function fetchEvents() {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/events", {
        params: { page, limit: PAGE_SIZE, search },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEvents(res.data.events);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, [page, search]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/events/${editingId}`,
          form,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      } else {
        await axios.post("http://localhost:5000/api/events", form, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }
      setForm({ title: "", description: "", date: "" });
      setEditingId(null);
      fetchEvents();
    } catch (err) {
      setError("Failed to save event");
    }
  }

  function startEdit(event) {
    setEditingId(event._id);
    setForm({
      title: event.title,
      description: event.description,
      date: event.date.slice(0, 10), // format date for input[type=date]
    });
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        fetchEvents();
      } catch {
        setError("Failed to delete event");
      }
    }
  }

  return (
    <div>
      <h2>Events Management</h2>

      <input
        type="text"
        placeholder="Search events by title..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
        style={{ marginBottom: 20, padding: 8, width: "100%", maxWidth: 400 }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <h3>{editingId ? "Edit Event" : "Add New Event"}</h3>
        <div>
          <label>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: 10 }}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: 10 }}
          />
        </div>
        <div>
          <label>Date</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            style={{ marginBottom: 10 }}
          />
        </div>
        <button type="submit">{editingId ? "Update Event" : "Add Event"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ title: "", description: "", date: "" });
              setError("");
            }}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        )}
      </form>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", maxWidth: 800 }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No events found.
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => startEdit(event)}>Edit</button>{" "}
                    <button onClick={() => handleDelete(event._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          style={{ marginRight: 10 }}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          style={{ marginLeft: 10 }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
