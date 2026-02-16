


import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./ExamFormAdmin.css"; // Import the external CSS file

export default function ExamFormAdmin() {
  const [forms, setForms] = useState([]);
  const [searchTu, setSearchTu] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({});

  const fetchForms = async (tuRegistrationNo = "") => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/forms/forms", {
        params: tuRegistrationNo ? { tuRegistrationNo } : {},
      });
      console.log("exam form", res.data);
      setForms(res.data);
    } catch (error) {
      toast.error("Error fetching forms");
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleAction = async (id, action) => {
    setActionLoading((prev) => ({ ...prev, [id]: action }));
    try {
      if (action === "approve") {
        await axios.patch(`http://localhost:5000/api/forms/forms/${id}/approve`);
        // await axios.post(`http://localhost:5000/api/forms/forms/${id}/send-email`, { email });
        toast.success("Form approved and email sent");
      } else {
        await axios.patch(`http://localhost:5000/api/forms/forms/${id}/reject`);
        toast.success("Form rejected and email sent");
      }
      fetchForms(searchTu);
    } catch (err) {
      toast.error("Action failed");
      console.error(err);
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: null }));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchForms(searchTu.trim());
  };

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
            setSearchTu("");
            fetchForms();
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
                <p>Course: {form.course}</p>
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
                    src={`http://localhost:5000${form.photo}`}
                    alt="Uploaded Photo"
                    className="uploaded-photo"
                  />
                ) : (
                  <p>No photo uploaded.</p>
                )}
                {form.plusTwoDocument ? (
                  <img
                    src={`http://localhost:5000${form.plusTwoDocument}`}
                    alt="Uploaded +2 Document"
                    className="uploaded-photo"
                  />
                ) : (
                  <p>No +2 document uploaded.</p>
                )}
                {form.citizenshipDocument ? (
                  <img
                    src={`http://localhost:5000${form.citizenshipDocument}`}
                    alt="Uploaded Citizenship Document"
                    className="uploaded-photo"
                  />
                ) : (
                  <p>No citizenship document uploaded.</p>
                )}
                <p>
                  <strong>Submitted At:</strong> {new Date(form.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Approval Buttons */}
              {form.approvalStatus === "pending" ? (
                <>
                  <button
                    onClick={() => handleAction(form._id, "approve", form.contact?.email)}
                    disabled={actionLoading[form._id]}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2 disabled:opacity-50"
                  >
                    {actionLoading[form._id] === "approve" ? "Approving…" : "Approve"}
                  </button>

                  <button
                    onClick={() => handleAction(form._id, "reject")}
                    disabled={actionLoading[form._id]}
                    className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
                  >
                    {actionLoading[form._id] === "reject" ? "Rejecting…" : "Reject"}
                  </button>
                </>
              ) : form.approvalStatus === "approved" ? (
                <span className="text-green-600 font-semibold">Form Approved</span>
              ) : (
                <span className="text-red-600 font-semibold">Form Rejected</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
