import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const StudentDashboard = () => {
  const { token, logout } = useAuth();
  const [examForms, setExamForms] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        // Fetch student exam forms
        const formsRes = await axios.get(`${API_URL}/student/forms`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExamForms(formsRes.data);

        // Fetch student results
        const resultsRes = await axios.get(`${API_URL}/student/results`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(resultsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h1>Welcome, Student!</h1>
      <button onClick={logout}>Logout</button>

      <section>
        <h2>Your Exam Forms</h2>
        {examForms.length === 0 ? (
          <p>No exam forms submitted.</p>
        ) : (
          <ul>
            {examForms.map((form) => (
              <li key={form._id}>
                {form.examName} - Status: {form.status}
              </li>
            ))}
          </ul>
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
