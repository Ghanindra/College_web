import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ResultSearch() {
  const [symbolNo, setSymbolNo] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Load saved data on mount
  useEffect(() => {
    const savedSymbol = localStorage.getItem('symbolNo');
    const savedResult = localStorage.getItem('resultData');

    if (savedSymbol) setSymbolNo(savedSymbol);
    if (savedResult) setResult(JSON.parse(savedResult));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const res = await axios.get(`http://localhost:5000/api/results/search?symbolNo=${symbolNo}`);
      setResult(res.data);

      // Save to localStorage
      localStorage.setItem('symbolNo', symbolNo);
      localStorage.setItem('resultData', JSON.stringify(res.data));
    } catch (err) {
      setError(err.response?.data?.error || 'Result not found');
      localStorage.removeItem('resultData');
    }
  };

  const handleClear = () => {
    setSymbolNo('');
    setResult(null);
    setError('');
    localStorage.removeItem('symbolNo');
    localStorage.removeItem('resultData');
  };

  return (
    <div>
      <h2>Search Result by Symbol Number</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter Symbol Number"
          value={symbolNo}
          onChange={(e) => setSymbolNo(e.target.value)}
          required
        />
        <button type="submit">Search</button>
        {result && (
          <button type="button" onClick={handleClear} style={{ marginLeft: '10px' }}>
            Clear
          </button>
        )}
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div>
          <h3>{result.studentName} (Symbol No: {result.symbolNo})</h3>
          <p>Exam Year: {result.examYear}</p>
          <table border="1" cellPadding="6" cellSpacing="0">
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Title</th>
                <th>Marks Obtained</th>
                <th>Max Marks</th>
              </tr>
            </thead>
            <tbody>
              {result.subjects.map((subj, idx) => (
                <tr key={idx}>
                  <td>{subj.code}</td>
                  <td>{subj.title}</td>
                  <td>{subj.marksObtained}</td>
                  <td>{subj.maxMarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total Marks: {result.totalMarks}</p>
          <p>Percentage: {result.percentage}%</p>
          <p>Grade: {result.grade}</p>
          <p>Status: <strong style={{ color: result.status === 'Pass' ? 'green' : 'red' }}>{result.status}</strong></p>
        </div>
      )}
    </div>
  );
}
