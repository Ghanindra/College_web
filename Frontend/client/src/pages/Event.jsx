// src/pages/Events.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Base_Url from '../api/Base_Url'
import {SERVER_URL} from '../api/Base_Url'
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

  const token = localStorage.getItem("token");

  // Fetch events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${Base_Url}/events`, {
        params: { page, limit: PAGE_SIZE, search },
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data.events);
      setTotalPages(res.data.totalPages);
    } catch {
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [page, search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({
      ...prev,
      imageFile: file || null,
      imagePreview: file ? URL.createObjectURL(file) : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("date", form.date);
      if (form.imageFile) formData.append("image", form.imageFile);

      const config = {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      };

      if (editingId) {
        // await axios.put(`${Base_Url}/events/${editingId}`, formData, config);
        // toast.success("Event updated successfully");
        const res = await axios.put(
  `${Base_Url}/events/${editingId}`,
  formData,
  config
);
console.log('event data',res.data);

toast.success("Event updated successfully");

const updatedEvent = res.data.event;

setEvents((prev) =>
  prev.map((ev) =>
    ev._id === editingId ? updatedEvent : ev
  )
);
        
      } else {
        await axios.post(`${Base_Url}/events`, formData, config);
        toast.success("Event added successfully");
      }

      setForm({ title: "", description: "", date: "", imageFile: null, imagePreview: null });
      setEditingId(null);
      fetchEvents();
    } catch {
      setError("Failed to save event");
      toast.error("Event operation failed");
    }
  };

  const startEdit = (event) => {
    setEditingId(event._id);
    setForm({
      title: event.title,
      description: event.description,
      date: event.date.slice(0, 10),
      imageFile: null,
      imagePreview: event.imageUrl || null,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`${Base_Url}/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Event deleted successfully");
      fetchEvents();
    } catch {
      setError("Failed to delete event");
      toast.error("Delete failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar placeholder */}
      <div className="w-64">
        {/* <Sidebar /> */}
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 py-10 md:px-8 lg:px-12 overflow-y-auto">
        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Events Management</h2>
          <p className="text-gray-600 mt-2">Create, edit, and manage university events</p>
        </div>

        {/* Search */}
        <div className="mb-8 flex justify-center md:justify-start">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => { setPage(1); setSearch(e.target.value); }}
            className="w-full sm:w-96 px-5 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm hover:shadow-md transition-all duration-300"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-10 space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">{editingId ? "Edit Event" : "Add New Event"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold text-sm">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter event title"
                required
                className="px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold text-sm">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-semibold text-sm">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter event description"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all duration-300"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-semibold text-sm">Event Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file:mr-3 file:py-2 file:px-3 file:bg-indigo-600 file:text-white file:rounded file:border-0 file:cursor-pointer file:font-semibold hover:file:bg-indigo-500 transition-all duration-300"
            />
          </div>

          {form.imagePreview && (
            <div className="mt-2">
              <img
                src={form.imagePreview.startsWith("blob:") ? form.imagePreview : `${SERVER_URL}${form.imagePreview}`}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-xl border border-gray-200 shadow-md"
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300"
            >
              {editingId ? "Update Event" : "Add Event"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setEditingId(null); setForm({ title: "", description: "", date: "", imageFile: null, imagePreview: null }); setError(""); }}
                className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
              >
                Cancel
              </button>
            )}
          </div>

        </form>

        {/* Events Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <p className="text-gray-500 text-lg font-medium">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <p className="text-gray-600 text-lg font-medium">No events found.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                {event.imageUrl && (
                  <div className="relative overflow-hidden bg-gray-200 h-48">
                    <img
                      src={event.imageUrl.startsWith("http") ? event.imageUrl : `${SERVER_URL}${event.imageUrl}`}
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6 space-y-3">
                  <h4 className="text-lg font-bold text-gray-900 line-clamp-2">{event.title}</h4>
                  <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
                  <p className="text-gray-500 text-xs">{new Date(event.date).toLocaleDateString()}</p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <button onClick={() => startEdit(event)} className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-all duration-300">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(event._id)} className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-all duration-300">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-6 mt-10 flex-wrap">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
          >
            ← Previous
          </button>
          <span className="text-gray-900 font-semibold">Page {page} of {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}