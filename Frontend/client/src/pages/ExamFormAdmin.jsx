import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import "./ExamFormAdmin.css";
import Base_Url from '../api/Base_Url'
import {SERVER_URL} from '../api/Base_Url'
export default function ExamFormAdmin() {
  const [forms, setForms] = useState([]);
  const [searchTu, setSearchTu] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({});

  const fetchForms = async (tuRegistrationNo = "") => {
    setLoading(true);
    try {
      const res = await axios.get(`${Base_Url}/forms/forms`, {
        params: tuRegistrationNo ? { tuRegistrationNo } : {},
      });
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
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this form?")) return;

  setActionLoading((prev) => ({ ...prev, [id]: "delete" }));
  try {
    await axios.delete(`${Base_Url}/forms/delete/forms/${id}`);
    toast.success("Form deleted successfully");
    fetchForms(searchTu);
  } catch (err) {
    toast.error("Delete failed");
    console.error(err);
  } finally {
    setActionLoading((prev) => ({ ...prev, [id]: null }));
  }
};
  const handleAction = async (id, action) => {
    setActionLoading((prev) => ({ ...prev, [id]: action }));
    try {
      if (action === "approve") {
        await axios.patch(`${Base_Url}/forms/forms/${id}/approve`);
        toast.success("Form approved and email sent");
      } else {
        await axios.patch(`${Base_Url}/forms/forms/${id}/reject`);
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar placeholder */}
      <div className="hidden md:block w-64">
        {/* <Sidebar /> */}
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
          Admin Dashboard - Exam Forms
        </h2>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            placeholder="Search by TU Registration No."
            value={searchTu}
            onChange={(e) => setSearchTu(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchTu("");
              fetchForms();
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Reset
          </button>
        </form>

        {loading && <p className="text-gray-600">Loading forms...</p>}
        {!loading && forms.length === 0 && <p className="text-gray-600">No forms found.</p>}

        {!loading && forms.length > 0 && (
          <div className="grid gap-6">
            {forms.map((form) => (
              <div
                key={form._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 flex flex-col gap-4"
              >
                <div className="flex flex-col md:flex-row md:gap-6">
                  {/* Left Info */}
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-bold">
                      {form.fullName} — TU Reg#: {form.tuRegistrationNo}
                    </h3>
                    <p>
                      <strong>Nationality:</strong> {form.nationality}
                    </p>
                    <p>
                      <strong>Date of Birth:</strong>{" "}
                      {new Date(form.dob).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Father's Name:</strong> {form.fatherName}
                    </p>

                    <h4 className="font-semibold mt-2">Address</h4>
                    <p>Province: {form.address?.province}</p>
                    <p>District: {form.address?.district}</p>
                    <p>Municipality: {form.address?.municipality}</p>
                    <p>Ward: {form.address?.ward}</p>

                    <h4 className="font-semibold mt-2">Contact</h4>
                    <p>Phone: {form.contact?.phone}</p>
                    <p>Email: {form.contact?.email}</p>
                  </div>

                  {/* Right Info - Documents */}
                  <div className="flex-1 space-y-2">
                    <h4 className="font-semibold">Photo</h4>
                    {form.photo ? (
                      <img
                        src={`${SERVER_URL}${form.photo}`}
                        alt="Photo"
                        className="w-full h-auto rounded-lg"
                      />
                    ) : (
                      <p>No photo uploaded.</p>
                    )}
                    {form.plusTwoDocument && (
                      <>
                        <h4 className="font-semibold">+2 Document</h4>
                        <img
                          src={`${SERVER_URL}${form.plusTwoDocument}`}
                          alt="+2 Document"
                          className="w-full h-auto rounded-lg"
                        />
                      </>
                    )}
                    {form.citizenshipDocument && (
                      <>
                        <h4 className="font-semibold">Citizenship Document</h4>
                        <img
                          src={`${SERVER_URL}${form.citizenshipDocument}`}
                          alt="Citizenship"
                          className="w-full h-auto rounded-lg"
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Academic Records */}
                <div className="overflow-x-auto">
                  <h4 className="font-semibold">Academic Records</h4>
                  {form.academicRecords && form.academicRecords.length > 0 ? (
                    <table className="min-w-full border border-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-2 py-1 border">Exam</th>
                          <th className="px-2 py-1 border">Board</th>
                          <th className="px-2 py-1 border">Year</th>
                          <th className="px-2 py-1 border">Roll No.</th>
                          <th className="px-2 py-1 border">Marks</th>
                          <th className="px-2 py-1 border">Percentage</th>
                          <th className="px-2 py-1 border">Division</th>
                        </tr>
                      </thead>
                      <tbody>
                        {form.academicRecords.map((rec, idx) => (
                          <tr key={idx}>
                            <td className="px-2 py-1 border">{rec.exam}</td>
                            <td className="px-2 py-1 border">{rec.board}</td>
                            <td className="px-2 py-1 border">{rec.year}</td>
                            <td className="px-2 py-1 border">{rec.rollNo}</td>
                            <td className="px-2 py-1 border">{rec.marks}</td>
                            <td className="px-2 py-1 border">{rec.percentage}</td>
                            <td className="px-2 py-1 border">{rec.division}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No academic records submitted.</p>
                  )}
                </div>

                {/* Subjects */}
                <div>
                  <h4 className="font-semibold">Subjects</h4>
                  {form.subjects && form.subjects.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {form.subjects.map((subj, idx) => (
                        <li key={idx}>
                          {subj.code} — {subj.title}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No subjects submitted.</p>
                  )}
                </div>

                {/* Payment */}
                <div>
                  <h4 className="font-semibold">Payment Details</h4>
                  <p>Amount: NPR {form.paymentDetails?.amount}</p>
                  <p>Method: {form.paymentDetails?.method}</p>
                  <p>Status: {form.paymentStatus}</p>
                  <p>
                    <strong>Submitted At:</strong>{" "}
                    {new Date(form.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Approval Buttons */}
                <div className="flex gap-2 flex-wrap mt-2">
                  {form.approvalStatus === "pending" ? (
                    <>
                      <button
                        onClick={() => handleAction(form._id, "approve")}
                        disabled={actionLoading[form._id]}
                        className="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
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
                {form.approvalStatus !== "approved" && (
  <button
    onClick={() => handleDelete(form._id)}
    disabled={actionLoading[form._id]}
    className="bg-gray-500 text-white px-3 py-1 rounded disabled:opacity-50"
  >
    {actionLoading[form._id] === "delete" ? "Deleting…" : "Delete"}
  </button>
)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}