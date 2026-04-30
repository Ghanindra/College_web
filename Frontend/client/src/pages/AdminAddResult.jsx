import React, { useState } from "react";
import axios from "axios";
import Base_Url from '../api/Base_Url'
import { toast } from "react-toastify";

export default function AdminAddResult() {
  const [formData, setFormData] = useState({
    symbolNo: "",
    studentName: "",
    examYear: "",
    subjects: [{ code: "", title: "", marksObtained: "", maxMarks: "" }],
    totalMarks: 0,
    percentage: 0,
    grade: "",
  });

  const calculateResult = (subjects) => {
    let totalMarks = 0;
    let totalMax = 0;

    subjects.forEach((s) => {
      totalMarks += parseFloat(s.marksObtained) || 0;
      totalMax += parseFloat(s.maxMarks) || 0;
    });

    const percentage = totalMax ? (totalMarks / totalMax) * 100 : 0;
    let grade = "";
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B+";
    else if (percentage >= 60) grade = "B";
    else if (percentage >= 50) grade = "C";
    else if (percentage >= 40) grade = "D";
    else grade = "F";

    return { totalMarks, percentage: percentage.toFixed(2), grade };
  };

  const handleChange = (e, index, field) => {
    if (field === "subject") {
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
      subjects: [
        ...formData.subjects,
        { code: "", title: "", marksObtained: "", maxMarks: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedSubjects = formData.subjects.map((s) => ({
        code: s.code,
        title: s.title,
        marksObtained: Number(s.marksObtained),
        maxMarks: Number(s.maxMarks),
      }));

      const payload = {
        ...formData,
        examYear: Number(formData.examYear),
        subjects: formattedSubjects,
        totalMarks: Number(formData.totalMarks),
        percentage: Number(formData.percentage),
        grade: formData.grade,
      };

      await axios.post(`${Base_Url}/results/add`, payload);
      toast.success("Result added successfully!");
      setFormData({
        symbolNo: "",
        studentName: "",
        examYear: "",
        subjects: [{ code: "", title: "", marksObtained: "", maxMarks: "" }],
        totalMarks: 0,
        percentage: 0,
        grade: "",
      });
    } catch (error) {
      toast.error(
        "Error adding result: " + (error.response?.data?.error || error.message)
      );
    }
  };

  return (
<div className="flex justify-center ml-8 md:ml-18 lg:ml-24 px-4 md:px-8 lg:px-16 py-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 text-white px-6 py-4">
          <h1 className="text-2xl font-semibold">Add Student Result</h1>
          <p className="text-sm opacity-90">
            Fill student result details and submit
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Student Information */}
          <div className="space-y-2">
            <h2 className="font-semibold text-lg text-gray-700">
              Student Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="symbolNo"
                placeholder="Symbol Number"
                value={formData.symbolNo}
                onChange={handleChange}
                required
                className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="text"
                name="studentName"
                placeholder="Student Name"
                value={formData.studentName}
                onChange={handleChange}
                required
                className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="number"
                name="examYear"
                placeholder="Exam Year"
                value={formData.examYear}
                onChange={handleChange}
                required
                className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Subjects */}
          <div className="space-y-2">
            <h2 className="font-semibold text-lg text-gray-700">Subject Marks</h2>
            <div className="space-y-3">
              {formData.subjects.map((subj, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3"
                >
                  <input
                    name="code"
                    placeholder="Code"
                    value={subj.code}
                    onChange={(e) => handleChange(e, idx, "subject")}
                    required
                    className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <input
                    name="title"
                    placeholder="Title"
                    value={subj.title}
                    onChange={(e) => handleChange(e, idx, "subject")}
                    required
                    className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <input
                    name="marksObtained"
                    type="number"
                    placeholder="Marks Obtained"
                    value={subj.marksObtained}
                    onChange={(e) => handleChange(e, idx, "subject")}
                    required
                    className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <input
                    name="maxMarks"
                    type="number"
                    placeholder="Max Marks"
                    value={subj.maxMarks}
                    onChange={(e) => handleChange(e, idx, "subject")}
                    required
                    className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addSubject}
              className="mt-2 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              + Add Subject
            </button>
          </div>

          {/* Result Summary */}
          <div className="space-y-2">
            <h2 className="font-semibold text-lg text-gray-700">
              Result Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                readOnly
                name="totalMarks"
                value={formData.totalMarks}
                placeholder="Total Marks"
                className="bg-gray-100 border px-4 py-2 rounded-lg"
              />
              <input
                readOnly
                name="percentage"
                value={formData.percentage}
                placeholder="Percentage"
                className="bg-gray-100 border px-4 py-2 rounded-lg"
              />
              <input
                readOnly
                name="grade"
                value={formData.grade}
                placeholder="Grade"
                className="bg-gray-100 border px-4 py-2 rounded-lg"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Submit Result
          </button>
        </form>
      </div>
    </div>
  );
}