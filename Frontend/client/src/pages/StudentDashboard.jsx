import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import axios from "axios";
import ExamForm from "../pages/ExamForm";
const API_URL = "http://localhost:5000/api";

const StudentDashboard = () => {
  const { token, logout } = useAuth();
  const [examForm, setExamForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        // Fetch student exam form (only one)
        const formRes = await axios.get(`${API_URL}/student/forms`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExamForm(formRes.data || null);

        // Fetch student results
        const resultsRes = await axios.get(`${API_URL}/student/results`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(resultsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h1>Welcome, Student!</h1>
      <button onClick={logout}>Logout</button>

      <section>
        <h2>Your Exam Form</h2>
        {!examForm ? (
          <>
            <p>You haven’t submitted your exam form yet. Fill it below:</p>
            <ExamForm
              existingForm={null}
              onSubmitSuccess={(form) => setExamForm(form)}
            />
          </>
        ) : (
          <>
            <h3>Preview Submitted Form</h3>
            <ExamForm
              existingForm={examForm}
              onSubmitSuccess={(updatedForm) => setExamForm(updatedForm)}
              isEditAllowed={examForm.paymentStatus !== "completed"}
            />
          </>
        )}
      </section>

      <section>
        <h2>Your Results</h2>
        {results.length === 0 ? (
          <p>No results published yet.</p>
        ) : (
          <ul>
            {results.map((result) => (
              <li key={result._id}>
                {result.examName} - Marks: {result.marks} - Grade: {result.grade}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default StudentDashboard;
