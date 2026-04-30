// src/pages/Gallery.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Base_Url from '../api/Base_Url'
import {SERVER_URL} from '../api/Base_Url'
export default function Gallery() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "event",
  });
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch gallery items
  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${Base_Url}/gallery`);
      setGallery(res.data);
    } catch {
      setError("Failed to load gallery");
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      e.target.value = null; // allow re-selecting same file
    }
  };

  // Submit form (create/update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!editingId && !image) {
      return setError("Please select an image.");
    }

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      if (image) formData.append("image", image);

      if (editingId) {
        await axios.put(
          `${Base_Url}/gallery/${editingId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
        );
        toast.success("Gallery updated successfully");
        setEditingId(null);
      } else {
        await axios.post(`${Base_Url}/gallery`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
        toast.success("Gallery added successfully");
      }

      setForm({ title: "", description: "", category: "event" });
      setImage(null);
      fetchGallery();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save image");
      console.error(err);
    }
  };

  // Edit existing item
  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      description: item.description,
      category: item.category,
    });
    setImage(null);
  };

  // Delete gallery item
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      await axios.delete(`${Base_Url}/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Successfully deleted image");
      fetchGallery();
    } catch {
      setError("Failed to delete image");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ title: "", description: "", category: "event" });
    setImage(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:block w-64">
        {/* <Sidebar /> */}
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 py-10 md:px-8 lg:px-12 overflow-y-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {editingId ? "Edit Gallery Item" : "Upload New Image"}
        </h2>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-10 space-y-6"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all duration-300"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          >
            <option value="event">Event</option>
            <option value="activity">Activity</option>
          </select>

          {!editingId && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file:mr-3 file:py-2 file:px-3 file:bg-indigo-600 file:text-white file:rounded file:border-0 file:cursor-pointer file:font-semibold hover:file:bg-indigo-500 transition-all duration-300"
            />
          )}

          {/* Preview image */}
          {image && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-48 h-48 object-cover rounded-xl border border-gray-200 shadow-md"
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300"
            >
              {editingId ? "Update Image Info" : "Upload Image"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Gallery Grid */}
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Uploaded Gallery</h3>
        {gallery.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <p className="text-gray-600 text-lg font-medium">No images uploaded yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {gallery.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative overflow-hidden bg-gray-200 h-48">
                  <img
                    src={`${SERVER_URL}${item.imageUrl}`}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h4 className="text-lg font-bold text-gray-900 line-clamp-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <p className="text-gray-500 text-xs">{item.category}</p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-all duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}