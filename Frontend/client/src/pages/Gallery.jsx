import React, { useState, useEffect } from "react";
import axios from "axios";
import "./gallery.css"; // Make sure this is created

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

  const fetchGallery = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/gallery");
      setGallery(res.data);
    } catch (err) {
      setError("Failed to load gallery");
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/gallery/${editingId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setEditingId(null);
      } else {
        if (!image) return setError("Please select an image.");

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("category", form.category);
        formData.append("image", image);

        await axios.post("http://localhost:5000/api/gallery", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setForm({ title: "", description: "", category: "event" });
      setImage(null);
      fetchGallery();
    } catch (err) {
      setError("Failed to save image");
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      description: item.description,
      category: item.category,
    });
    setImage(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await axios.delete(`http://localhost:5000/api/gallery/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchGallery();
      } catch (err) {
        setError("Failed to delete image");
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ title: "", description: "", category: "event" });
    setImage(null);
  };

  return (
    <div className="gallery-admin-container">
      <h2>{editingId ? "Edit Gallery Item" : "Upload New Image"}</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="gallery-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="event">Event</option>
          <option value="activity">Activity</option>
        </select>

        {!editingId && (
          <input type="file" accept="image/*" onChange={handleImageChange} />
        )}

        <button type="submit">
          {editingId ? "Update Image Info" : "Upload Image"}
        </button>
        {editingId && (
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </form>

      <h3>Uploaded Gallery</h3>
      {gallery.map((item) => (
        <div key={item._id} className="gallery-item">
          <img
            src={`http://localhost:5000${item.imageUrl}`}
            alt={item.title}
            className="gallery-img"
          />
          <p>
            <strong>{item.title}</strong> ({item.category})
          </p>
          <p>{item.description}</p>
          <div className="gallery-actions">
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
