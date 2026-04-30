import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Base_Url from '../api/Base_Url'

const API_URL = `${Base_Url}/notices`;

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
      toast.success("Notice deleted");
    } catch (error) {
      toast.error("Delete failed",error);
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
        toast.success("Notice updated successfully");
      } else {
        await axios.post(API_URL, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Notice added successfully");
      }
      setForm({ title: "", content: "", category: "" });
      setEditingId(null);
      fetchNotices();
    } catch (error) {
      toast.error("Save failed",error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar placeholder (visible always) */}
      {/* <aside className="hidden md:block w-1/5 bg-gray-800 text-white p-6 min-h-screen">
        <h2 className="text-xl font-bold mb-6">Sidebar</h2>
        <nav className="flex flex-col gap-3">
          <a href="#" className="hover:text-blue-400">Dashboard</a>
          <a href="#" className="hover:text-blue-400">Notices</a>
          <a href="#" className="hover:text-blue-400">Settings</a>
        </nav>
      </aside> */}

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-4xl w-full mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center md:text-left">
            Manage Notices
          </h2>

          {/* Search */}
          <input
            type="text"
            placeholder="Search title..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full p-3 mb-5 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full mb-6">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full p-3 mb-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
              rows={4}
              className="w-full p-3 mb-3 border border-gray-300 rounded-md text-base resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full p-3 mb-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
              >
                {editingId ? "Update" : "Add"} Notice
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition w-full sm:w-auto"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Notices list */}
          {notices.length === 0 ? (
            <p className="text-gray-500 mb-4 text-center">No notices found</p>
          ) : (
            <ul className="space-y-4">
              {notices.map((notice) => (
                <li
                  key={notice._id}
                  className="p-4 border border-gray-200 rounded-md shadow-sm bg-white text-left"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">{notice.title}</h3>
                  <p className="text-gray-600 my-2">{notice.content}</p>
                  <small className="text-gray-400 block">Category: {notice.category || "N/A"}</small>
                  <div className="flex flex-wrap gap-2 mt-3 justify-start">
                    <button
                      onClick={() => handleEdit(notice)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition w-full sm:w-auto"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(notice._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition w-full sm:w-auto"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination */}
          <div className="flex flex-wrap justify-start items-center gap-3 mt-6">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            <span className="font-medium">Page {page} of {totalPages}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}