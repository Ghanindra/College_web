import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notice.css"; // ✅ Import the CSS

const API_URL = "http://localhost:5000/api/notices";

export default function Notice() {
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
        headers: { Authorization: `Bearer ${token}` },
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
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(API_URL, form, {
          headers: { Authorization: `Bearer ${token}` },
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
    <div className="notice-container">
      <h2>Manage Notices</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="notice-search"
      />

      {/* Form */}
      <form onSubmit={handleSubmit} className="notice-form">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
          rows={4}
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <div className="form-buttons">
          <button type="submit">{editingId ? "Update" : "Add"} Notice</button>
          {editingId && <button onClick={handleCancel} type="button">Cancel</button>}
        </div>
      </form>

      {/* List */}
      {notices.length === 0 && <p>No notices found</p>}
      <ul className="notice-list">
        {notices.map((notice) => (
          <li key={notice._id} className="notice-item">
            <h3>{notice.title}</h3>
            <p>{notice.content}</p>
            <small>Category: {notice.category || "N/A"}</small>
            <div className="notice-actions">
              <button onClick={() => handleEdit(notice)}>Edit</button>
              <button onClick={() => handleDelete(notice._id)} className="danger">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
          Next
        </button>
      </div>
    </div>
  );
}
