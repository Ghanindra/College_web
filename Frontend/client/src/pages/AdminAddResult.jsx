import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminaddresult.css';
import { toast } from "react-toastify";
export default function AdminAddResult() {
  const [formData, setFormData] = useState({
    symbolNo: '',
    studentName: '',
    examYear: '',
    subjects: [{ code: '', title: '', marksObtained: '', maxMarks: '' }],
    totalMarks: 0,
    percentage: 0,
    grade: ''
  });
  const [message, setMessage] = useState('');

  const calculateResult = (subjects) => {
    let totalMarks = 0;
    let totalMax = 0;

    subjects.forEach((s) => {
      const marks = parseFloat(s.marksObtained) || 0;
      const max = parseFloat(s.maxMarks) || 0;
      totalMarks += marks;
      totalMax += max;
    });

    const percentage = totalMax ? (totalMarks / totalMax) * 100 : 0;
    let grade = '';

    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B+';
    else if (percentage >= 60) grade = 'B';
    else if (percentage >= 50) grade = 'C';
    else if (percentage >= 40) grade = 'D';
    else grade = 'F';

    return { totalMarks, percentage: percentage.toFixed(2), grade };
  };

  const handleChange = (e, index, field) => {
    if (field === 'subject') {
      const subjects = [...formData.subjects];
      subjects[index][e.target.name] = e.target.value;
      const { totalMarks, percentage, grade } = calculateResult(subjects);
      setFormData({ ...formData, subjects, totalMarks, percentage, grade });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { code: '', title: '', marksObtained: '', maxMarks: '' }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedSubjects = formData.subjects.map((s) => ({
        code: s.code,
        title: s.title,
        marksObtained: Number(s.marksObtained),
        maxMarks: Number(s.maxMarks)
      }));

      const payload = {
        ...formData,
        examYear: Number(formData.examYear),
        subjects: formattedSubjects,
        totalMarks: Number(formData.totalMarks),
        percentage: Number(formData.percentage),
        grade: formData.grade
      };

      await axios.post('http://localhost:5000/api/results/add', payload);
      toast.success('Result added successfully!');
      setFormData({
        symbolNo: '',
        studentName: '',
        examYear: '',
        subjects: [{ code: '', title: '', marksObtained: '', maxMarks: '' }],
        totalMarks: 0,
        percentage: 0,
        grade: ''
      });
    } catch (error) {
      toast.error('Error adding result: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="admin-add-result">
      <h2>Admin – Add Result</h2>
      {message && (
        <p className={`message ${message.includes("success") ? "success" : "error"}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-grid">
          <input name="symbolNo" placeholder="Symbol Number" value={formData.symbolNo} onChange={handleChange} required />
          <input name="studentName" placeholder="Student Name" value={formData.studentName} onChange={handleChange} required />
          <input type="number" name="examYear" placeholder="Exam Year" value={formData.examYear} onChange={handleChange} required />
        </div>

        <div className="subject-section">
          <h3>Subjects</h3>
          {formData.subjects.map((subj, idx) => (
            <div key={idx} className="subject-row">
              <input name="code" placeholder="Code" value={subj.code} onChange={(e) => handleChange(e, idx, 'subject')} required />
              <input name="title" placeholder="Title" value={subj.title} onChange={(e) => handleChange(e, idx, 'subject')} required />
              <input name="marksObtained" placeholder="Marks" type="number" value={subj.marksObtained} onChange={(e) => handleChange(e, idx, 'subject')} required />
              <input name="maxMarks" placeholder="Max" type="number" value={subj.maxMarks} onChange={(e) => handleChange(e, idx, 'subject')} required />
            </div>
          ))}
          <button type="button" onClick={addSubject} className="btn-add-subject">+ Add Subject</button>
        </div>

        <div className="form-grid" style={{ marginTop: 20 }}>
          <input name="totalMarks" placeholder="Total Marks" type="number" value={formData.totalMarks} readOnly />
          <input name="percentage" placeholder="Percentage" type="number" step="0.01" value={formData.percentage} readOnly />
          <input name="grade" placeholder="Grade" value={formData.grade} readOnly />
        </div>

        <button type="submit" className="btn-submit">Submit Result</button>
      </form>
    </div>
  );
}
