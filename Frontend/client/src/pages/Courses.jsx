// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const PAGE_SIZE = 5;

// export default function Courses() {
//   const [courses, setCourses] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     duration: "",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch courses with pagination and search
//   async function fetchCourses() {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:5000/api/courses", {
//         params: { page, limit: PAGE_SIZE, search },
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setCourses(res.data.courses);
//       setTotalPages(res.data.totalPages);
//     } catch (err) {
//       setError("Failed to load courses");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchCourses();
//   }, [page, search]);

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");

//     try {
//       if (editingId) {
//         await axios.put(
//           `http://localhost:5000/api/courses/${editingId}`,
//           form,
//           { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//         );
//       } else {
//         await axios.post("http://localhost:5000/api/courses", form, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//       }
//       setForm({ name: "", description: "", duration: "" });
//       setEditingId(null);
//       fetchCourses();
//     } catch (err) {
//       setError("Failed to save course");
//     }
//   }

//   function startEdit(course) {
//     setEditingId(course._id);
//     setForm({
//       name: course.name,
//       description: course.description,
//       duration: course.duration,
//     });
//   }

//   async function handleDelete(id) {
//     if (window.confirm("Are you sure you want to delete this course?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/courses/${id}`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         fetchCourses();
//       } catch {
//         setError("Failed to delete course");
//       }
//     }
//   }

//   return (
//     <div>
//       <h2>Courses Management</h2>

//       <input
//         type="text"
//         placeholder="Search courses by name..."
//         value={search}
//         onChange={(e) => {
//           setPage(1);
//           setSearch(e.target.value);
//         }}
//         style={{ marginBottom: 20, padding: 8, width: "100%", maxWidth: 400 }}
//       />

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
//         <h3>{editingId ? "Edit Course" : "Add New Course"}</h3>
//         <div>
//           <label>Name</label>
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             required
//             style={{ width: "100%", marginBottom: 10 }}
//           />
//         </div>
//         <div>
//           <label>Description</label>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             required
//             style={{ width: "100%", marginBottom: 10 }}
//           />
//         </div>
//         <div>
//           <label>Duration</label>
//           <input
//             name="duration"
//             value={form.duration}
//             onChange={handleChange}
//             placeholder="e.g. 6 months"
//             required
//             style={{ marginBottom: 10 }}
//           />
//         </div>
//         <button type="submit">{editingId ? "Update Course" : "Add Course"}</button>
//         {editingId && (
//           <button
//             type="button"
//             onClick={() => {
//               setEditingId(null);
//               setForm({ name: "", description: "", duration: "" });
//               setError("");
//             }}
//             style={{ marginLeft: 10 }}
//           >
//             Cancel
//           </button>
//         )}
//       </form>

//       {loading ? (
//         <p>Loading courses...</p>
//       ) : (
//         <table border="1" cellPadding="10" style={{ width: "100%", maxWidth: 800 }}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Duration</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {courses.length === 0 ? (
//               <tr>
//                 <td colSpan="4" style={{ textAlign: "center" }}>
//                   No courses found.
//                 </td>
//               </tr>
//             ) : (
//               courses.map((course) => (
//                 <tr key={course._id}>
//                   <td>{course.name}</td>
//                   <td>{course.description}</td>
//                   <td>{course.duration}</td>
//                   <td>
//                     <button onClick={() => startEdit(course)}>Edit</button>{" "}
//                     <button onClick={() => handleDelete(course._id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       )}

//       {/* Pagination */}
//       <div style={{ marginTop: 20 }}>
//         <button
//           onClick={() => setPage((p) => Math.max(p - 1, 1))}
//           disabled={page === 1}
//           style={{ marginRight: 10 }}
//         >
//           Previous
//         </button>
//         <span>
//           Page {page} of {totalPages}
//         </span>
//         <button
//           onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
//           disabled={page === totalPages}
//           style={{ marginLeft: 10 }}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }


// pages/Courses.jsx
import React from "react";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const courses = [
    {
      id: "bsc-csit",
      title: "BSc CSIT",
      image: "/images/csit.jpg",
      description: "Bachelor of Science in Computer Science and Information Technology...",
      deanMessage: "Our CSIT program is designed to build strong logical and technical skills..."
    },
    {
        id: "bba",
      title: "BBA",
      image: "/images/bba.jpg",
      description: "Bachelor of Business Administration helps build a strong foundation in management...",
      deanMessage: "We aim to create capable leaders in the business world..."
    },
    {    id: "bed",
      title: "BEd",
      image: "/images/bed.jpg",
      description: "Bachelor in Education focuses on modern teaching techniques...",
      deanMessage: "We nurture future educators with core values and innovation..."
    },
    // Add more courses here...
  ];

  return (
    <div className="courses-container">
      <h1>Our Academic Programs</h1>
      <div className="course-list">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            title={course.title}
            image={course.image}
            description={course.description}
            deanMessage={course.deanMessage}
          />
        ))}
      </div>
    </div>
  );
}
