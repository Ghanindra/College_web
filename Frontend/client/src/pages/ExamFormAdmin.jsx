



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './ExamFormAdmin.css'; 

// export default function ExamFormAdmin() {
//   const [forms, setForms] = useState([]);
//   const [searchTu, setSearchTu] = useState('');
//   const [loading, setLoading] = useState(false);

//   const fetchForms = async (tuRegistrationNo = '') => {
//     setLoading(true);
//     try {
//       const res = await axios.get('http://localhost:5000/api/forms/forms', {
//         params: tuRegistrationNo ? { tuRegistrationNo } : {},
//       });
//       setForms(res.data);
//     } catch (error) {
//       alert('Error fetching forms');
//       console.error(error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchForms();
//   }, []);

//   const approvePayment = async (id) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/forms/forms/${id}/approve`);
//       alert('Payment approved');
//       fetchForms(searchTu);
//     } catch (error) {
//       alert('Error approving payment');
//       console.error(error);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     fetchForms(searchTu.trim());
//   };

//   return (
//     <div className="exam-form-admin-container">
//       <h2>Admin Dashboard - Exam Forms</h2>

//       <form onSubmit={handleSearch} className="search-form">
//         <input
//           type="text"
//           placeholder="Search by TU Registration No."
//           value={searchTu}
//           onChange={(e) => setSearchTu(e.target.value)}
//           className="search-input"
//         />
//         <button type="submit" className="btn-primary">Search</button>
//         <button
//           type="button"
//           onClick={() => {
//             setSearchTu('');
//             fetchForms();
//           }}
//           className="btn-secondary"
//         >
//           Reset
//         </button>
//       </form>

//       {loading && <p>Loading forms...</p>}
//       {!loading && forms.length === 0 && <p>No forms found.</p>}

//       {!loading && forms.length > 0 && (
//         <div className="forms-list">
//           {forms.map((form) => (
//             <div key={form._id} className="form-card">
//               <h3>{form.fullName} — TU Reg#: {form.tuRegistrationNo}</h3>
//               <p><strong>Nationality:</strong> {form.nationality}</p>
//               <p><strong>Date of Birth:</strong> {new Date(form.dob).toLocaleDateString()}</p>
//               <p><strong>Father's Name:</strong> {form.fatherName}</p>

//               <h4>Address</h4>
//               <p>Province: {form.address?.province}</p>
//               <p>District: {form.address?.district}</p>
//               <p>Municipality: {form.address?.municipality}</p>
//               <p>Ward: {form.address?.ward}</p>

//               <h4>Contact</h4>
//               <p>Phone: {form.contact?.phone}</p>
//               <p>Email: {form.contact?.email}</p>

//               <h4>Academic Records</h4>
//               {form.academicRecords && form.academicRecords.length > 0 ? (
//                 <table className="academic-table">
//                   <thead>
//                     <tr>
//                       <th>Exam</th>
//                       <th>Board</th>
//                       <th>Year</th>
//                       <th>Roll No.</th>
//                       <th>Marks</th>
//                       <th>Percentage</th>
//                       <th>Division</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {form.academicRecords.map((record, idx) => (
//                       <tr key={idx}>
//                         <td>{record.exam}</td>
//                         <td>{record.board}</td>
//                         <td>{record.year}</td>
//                         <td>{record.rollNo}</td>
//                         <td>{record.marks}</td>
//                         <td>{record.percentage}</td>
//                         <td>{record.division}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <p>No academic records submitted.</p>
//               )}

//               <h4>Exam Info</h4>
//               <p>Semester: {form.semester}</p>
//               <p>Year: {form.year}</p>
//               <p>Batch: {form.batch}</p>
//               <p>College Name: {form.collegeName}</p>
//               <p>Exam Center: {form.examCenter}</p>

//               <h4>Subjects</h4>
//               {form.subjects && form.subjects.length > 0 ? (
//                 <ul>
//                   {form.subjects.map((subj, idx) => (
//                     <li key={idx}>
//                       {subj.code} — {subj.title}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No subjects submitted.</p>
//               )}

//               <h4>Payment Details</h4>
//               <p>Amount: NPR {form.paymentDetails?.amount}</p>
//               <p>Method: {form.paymentDetails?.method}</p>
//               <p>Status: {form.paymentStatus}</p>

//               <h4>Photo</h4>
//               {form.photo ? (
//                 <img
//                   src={`http://localhost:5000/uploads/${form.photo}`}
//                   alt="Uploaded Photo"
//                   className="uploaded-photo"
//                 />
//               ) : (
//                 <p>No photo uploaded.</p>
//               )}

//               <p>
//                 <strong>Submitted At:</strong> {new Date(form.createdAt).toLocaleString()}
//               </p>

//               {form.paymentStatus === 'pending' ? (
//                 <button onClick={() => approvePayment(form._id)} className="btn-approve">Approve Payment</button>
//               ) : (
//                 <span className="approved-text">Payment Approved</span>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react"
import axios from "axios"
import "./ExamFormAdmin.css" // Import the external CSS file

export default function ExamFormAdmin() {
  const [forms, setForms] = useState([])
  const [searchTu, setSearchTu] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchForms = async (tuRegistrationNo = "") => {
    setLoading(true)
    try {
      const res = await axios.get("http://localhost:5000/api/forms/forms", {
        params: tuRegistrationNo ? { tuRegistrationNo } : {},
      })
      setForms(res.data)
    } catch (error) {
      alert("Error fetching forms")
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchForms()
  }, [])

  const approvePayment = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/forms/forms/${id}/approve`)
      alert("Payment approved")
      fetchForms(searchTu)
    } catch (error) {
      alert("Error approving payment")
      console.error(error)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchForms(searchTu.trim())
  }

  return (
    <div className="exam-form-admin-container">
      <h2>Admin Dashboard - Exam Forms</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by TU Registration No."
          value={searchTu}
          onChange={(e) => setSearchTu(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="btn-primary">
          Search
        </button>
        <button
          type="button"
          onClick={() => {
            setSearchTu("")
            fetchForms()
          }}
          className="btn-secondary"
        >
          Reset
        </button>
      </form>

      {loading && <p className="loading-message">Loading forms...</p>}
      {!loading && forms.length === 0 && <p className="no-forms-message">No forms found.</p>}

      {!loading && forms.length > 0 && (
        <div className="forms-list">
          {forms.map((form) => (
            <div key={form._id} className="form-card">
              <div>
                {" "}
                {/* Wrapper div for content that should stick together */}
                <h3>
                  {form.fullName} — TU Reg#: {form.tuRegistrationNo}
                </h3>
                <p>
                  <strong>Nationality:</strong> {form.nationality}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {new Date(form.dob).toLocaleDateString()}
                </p>
                <p>
                  <strong>Father's Name:</strong> {form.fatherName}
                </p>
                <h4>Address</h4>
                <p>Province: {form.address?.province}</p>
                <p>District: {form.address?.district}</p>
                <p>Municipality: {form.address?.municipality}</p>
                <p>Ward: {form.address?.ward}</p>
                <h4>Contact</h4>
                <p>Phone: {form.contact?.phone}</p>
                <p>Email: {form.contact?.email}</p>
                <h4>Academic Records</h4>
                {form.academicRecords && form.academicRecords.length > 0 ? (
                  <table className="academic-table">
                    <thead>
                      <tr>
                        <th>Exam</th>
                        <th>Board</th>
                        <th>Year</th>
                        <th>Roll No.</th>
                        <th>Marks</th>
                        <th>Percentage</th>
                        <th>Division</th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.academicRecords.map((record, idx) => (
                        <tr key={idx}>
                          <td>{record.exam}</td>
                          <td>{record.board}</td>
                          <td>{record.year}</td>
                          <td>{record.rollNo}</td>
                          <td>{record.marks}</td>
                          <td>{record.percentage}</td>
                          <td>{record.division}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No academic records submitted.</p>
                )}
                <h4>Exam Info</h4>
                <p>Semester: {form.semester}</p>
                <p>Year: {form.year}</p>
                <p>Batch: {form.batch}</p>
                <p>College Name: {form.collegeName}</p>
                <p>Exam Center: {form.examCenter}</p>
                <h4>Subjects</h4>
                {form.subjects && form.subjects.length > 0 ? (
                  <ul>
                    {form.subjects.map((subj, idx) => (
                      <li key={idx}>
                        {subj.code} — {subj.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No subjects submitted.</p>
                )}
                <h4>Payment Details</h4>
                <p>Amount: NPR {form.paymentDetails?.amount}</p>
                <p>Method: {form.paymentDetails?.method}</p>
                <p>Status: {form.paymentStatus}</p>
                <h4>Photo</h4>
                {form.photo ? (
                  <img
                    src={`http://localhost:5000/uploads/${form.photo}`}
                    alt="Uploaded Photo"
                    className="uploaded-photo"
                  />
                ) : (
                  <p>No photo uploaded.</p>
                )}
                <p>
                  <strong>Submitted At:</strong> {new Date(form.createdAt).toLocaleString()}
                </p>
              </div>{" "}
              {/* End of wrapper div */}
              {form.paymentStatus === "pending" ? (
                <button onClick={() => approvePayment(form._id)} className="btn-approve">
                  Approve Payment
                </button>
              ) : (
                <span className="approved-text">Payment Approved</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}