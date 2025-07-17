
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ResultSearch() {
  const [symbolNo, setSymbolNo] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const resultRef = useRef();

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

  const handleDownload = async () => {
    const element = resultRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Result_${symbolNo}.pdf`);
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
          <>
            <button type="button" onClick={handleClear} style={{ marginLeft: '10px' }}>
              Clear
            </button>
            <button type="button" onClick={handleDownload} style={{ marginLeft: '10px' }}>
              Download PDF
            </button>
          </>
        )}
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div ref={resultRef} style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc' }}>
          <h3>{result.studentName} (Symbol No: {result.symbolNo})</h3>
          <p>Exam Year: {result.examYear}</p>
          <table border="1" cellPadding="6" cellSpacing="0" style={{ width: '100%' }}>
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
          <p>
            Status:{' '}
            <strong style={{ color: result.status === 'Pass' ? 'green' : 'red' }}>
              {result.status}
            </strong>
          </p>
        </div>
      )}
    </div>
  );
}
