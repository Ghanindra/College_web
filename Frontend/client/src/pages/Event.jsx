import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Event.css";

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
    imageFile: null,
    imagePreview: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }));
    } else {
      setForm((prev) => ({ ...prev, imageFile: null, imagePreview: null }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("date", form.date);
      if (form.imageFile) {
        formData.append("image", form.imageFile);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      };
      toast.success("Event Added Successfully")

      if (editingId) {
        await axios.put(`http://localhost:5000/api/events/${editingId}`, formData, config);
      } else {
        await axios.post("http://localhost:5000/api/events", formData, config);
      }

      setForm({ title: "", description: "", date: "", imageFile: null, imagePreview: null });
      setEditingId(null);
      fetchEvents();
    } catch {
      setError("Failed to save event");
      toast.error("Event added failure")
    }
  }

  function startEdit(event) {
    setEditingId(event._id);
    setForm({
      title: event.title,
      description: event.description,
      date: event.date.slice(0, 10),
      imageFile: null,
      imagePreview: event.imageUrl || null,
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
    <div className="events-container">
      <h2>Events Management</h2>

      <input
        className="events-search-input"
        type="text"
        placeholder="Search events by title..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />

      {error && <p className="events-error">{error}</p>}

      <form onSubmit={handleSubmit} className="events-form">
        <h3>{editingId ? "Edit Event" : "Add New Event"}</h3>
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />

        <label>Date</label>
        <input name="date" type="date" value={form.date} onChange={handleChange} required />

        <label>Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {form.imagePreview && <img className="events-preview" src={form.imagePreview} alt="Preview" />}

        <button type="submit">{editingId ? "Update Event" : "Add Event"}</button>
        {editingId && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setEditingId(null);
              setForm({ title: "", description: "", date: "", imageFile: null, imagePreview: null });
              setError("");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <table className="events-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="5" className="events-empty">No events found.</td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>
                    {event.imageUrl ? (
                      <img
                        src={`http://localhost:5000${event.imageUrl}`}
                        alt={event.title}
                        className="events-thumbnail"
                      />
                    ) : (
                      "No image"
                    )}
                  </td>
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

      <div className="events-pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
