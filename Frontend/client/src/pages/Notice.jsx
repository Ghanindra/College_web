import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/notices";

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ title: "", content: "", category: "" });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNotices();
  }, [page, search]);

  const fetchNotices = async () => {
    try {
      const res = await axios.get(API_URL, {
        params: { page, search, limit: 5 },
      });
      setNotices(res.data.notices);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Fetch error", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization:  `Bearer ${token}`},
      });
      fetchNotices();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleEdit = (notice) => {
    setEditingId(notice._id);
    setForm({
      title: notice.title,
      content: notice.content,
      category: notice.category || "",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ title: "", content: "", category: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", form, "Editing ID:", editingId);
    
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form, {
          headers: { Authorization:  `Bearer ${token}` },
        });
      } else {
        await axios.post(API_URL, form, {
          headers: { Authorization:  `Bearer ${token}`},
        });
        alert("Notice added successfully");
      }
      setForm({ title: "", content: "", category: "" });
      setEditingId(null);
      fetchNotices();
    } catch (error) {
      alert("Save failed");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h2>Manage Notices</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 20, width: "100%" }}
      />

      {/* Notice Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
          rows={4}
          style={{ width: "100%", marginBottom: 10 }}
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          style={{ width: "100%", marginBottom: 10 }}
        />
        <button type="submit">{editingId ? "Update" : "Add"} Notice</button>
        {editingId && (
          <button
            type="button"
            onClick={handleCancel}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Notice List */}
      {notices.length === 0 && <p>No notices found</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {notices.map((notice) => (
          <li
            key={notice._id}
            style={{
              border: "1px solid #ccc",
              marginBottom: 10,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <h3>{notice.title}</h3>
            <p>{notice.content}</p>
            <small>Category: {notice.category || "N/A"}</small>
            <br />
            <button onClick={() => handleEdit(notice)}>Edit</button>
            <button
              onClick={() => handleDelete(notice._id)}
              style={{ marginLeft: 10, color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div style={{ marginTop: 20 }}>
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
