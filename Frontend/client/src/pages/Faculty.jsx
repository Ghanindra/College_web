import React, { useEffect, useState } from "react";
import axios from "axios";
import Base_Url from '../api/Base_Url'
import {SERVER_URL} from '../api/Base_Url'
const PAGE_SIZE = 5;

export default function Faculty() {
  const [faculties, setFaculties] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    dean: "",
    establishedYear: "",
    website: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  console.log("Token:", token);
  

  const fetchFaculties = async () => {
    try {
      const res = await axios.get(`${Base_Url}/faculties`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let data = res.data;

      if (search.trim()) {
        data = data.filter((f) =>
          f.name.toLowerCase().includes(search.trim().toLowerCase())
        );
      }

      const start = (page - 1) * PAGE_SIZE;
      const pagedData = data.slice(start, start + PAGE_SIZE);
      setFaculties(pagedData);
      setTotalPages(Math.ceil(data.length / PAGE_SIZE));
    } catch (err) {
      setError("Failed to fetch faculties",err);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, [search, page]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");  // reset error

  // Prepare data to send - convert establishedYear to number (or null if empty)
  const dataToSend = {
    ...form,
    establishedYear: form.establishedYear ? Number(form.establishedYear) : undefined,
  };

  console.log("Submitting form data:", dataToSend);

  try {
    if (editingId) {
      await axios.put(
        `${Base_Url}/faculties/${editingId}`,
        dataToSend,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
        }
      );
    } else {
      await axios.post(`${Base_Url}/faculties`, dataToSend, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
    }

    setForm({
      name: "",
      description: "",
      dean: "",
      establishedYear: "",
      website: "",
    });
    setEditingId(null);
    fetchFaculties();
  } catch (err) {
    setError("Failed to save faculty");
    console.error(err.response?.data || err.message);
  }
};

  const handleEdit = (faculty) => {
    setEditingId(faculty._id);
    setForm({
      name: faculty.name,
      description: faculty.description,
      dean: faculty.dean || "",
      establishedYear: faculty.establishedYear || "",
      website: faculty.website || "",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this faculty?")) {
      try {
        await axios.delete(`${Base_Url}/faculties/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchFaculties();
      } catch (err) {
        setError("Failed to delete faculty",err);
      }
    }
  };

  return (
    <div>
      <h2>Faculty Management</h2>

      <input
        type="text"
        placeholder="Search faculty by name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{ marginBottom: 20, padding: 8, width: "100%", maxWidth: 400 }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <h3>{editingId ? "Edit Faculty" : "Add New Faculty"}</h3>
        <input
          name="name"
          placeholder="Faculty Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />
        <input
          name="dean"
          placeholder="Dean Name"
          value={form.dean}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10 }}
        />
        <input
          name="establishedYear"
          placeholder="Established Year"
          value={form.establishedYear}
          onChange={handleChange}
          type="number"
          style={{ width: "100%", marginBottom: 10 }}
        />
        <input
          name="website"
          placeholder="Website"
          value={form.website}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <button type="submit">
          {editingId ? "Update Faculty" : "Add Faculty"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({
                name: "",
                description: "",
                dean: "",
                establishedYear: "",
                website: "",
              });
            }}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        )}
      </form>

      <table border="1" cellPadding="10" style={{ width: "100%", maxWidth: 800 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Dean</th>
            <th>Established</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculties.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No faculties found.
              </td>
            </tr>
          ) : (
            faculties.map((faculty) => (
              <tr key={faculty._id}>
                <td>{faculty.name}</td>
                <td>{faculty.description}</td>
                <td>{faculty.dean}</td>
                <td>{faculty.establishedYear}</td>
                <td>
                  <a href={faculty.website} target="_blank" rel="noreferrer">
                    Visit
                  </a>
                </td>
                <td>
                  <button onClick={() => handleEdit(faculty)}>Edit</button>{" "}
                  <button onClick={() => handleDelete(faculty._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

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
