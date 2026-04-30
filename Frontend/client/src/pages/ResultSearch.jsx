import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import { toPng } from "html-to-image";
import Base_Url from '../api/Base_Url'
import {SERVER_URL} from '../api/Base_Url'
export default function ResultSearch() {
  const [symbolNo, setSymbolNo] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const res = await axios.get(`${Base_Url}/results/search?symbolNo=${symbolNo}`);
      setResult(res.data);
      localStorage.setItem('symbolNo', symbolNo);
      localStorage.setItem('resultData', JSON.stringify(res.data));
    } catch (err) {
      setError(err.response?.data?.error || 'Result not found');
      localStorage.removeItem('resultData');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSymbolNo('');
    setResult(null);
    setError('');
    localStorage.removeItem('symbolNo');
    localStorage.removeItem('resultData');
  };

  // const handleDownload = async () => {
  //   const element = resultRef.current;
  //   const canvas = await html2canvas(element, { scale: 2 });
  //   const imgData = canvas.toDataURL('image/png');
  //   const pdf = new jsPDF();
  //   const imgProps = pdf.getImageProperties(imgData);
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //   pdf.save(`Result_${symbolNo}.pdf`);
  // };


const handleDownload = async () => {
  const element = resultRef.current;

  const dataUrl = await toPng(element);

  const pdf = new jsPDF();
  const imgProps = pdf.getImageProperties(dataUrl);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`Result_${symbolNo}.pdf`);
};


  const gradeColor = (grade) => {
    if (!grade) return 'text-gray-600';
    const g = grade.toUpperCase();
    if (g === 'A+' || g === 'A') return 'text-emerald-600';
    if (g === 'B+' || g === 'B') return 'text-blue-600';
    if (g === 'C+' || g === 'C') return 'text-yellow-600';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-100 via-indigo-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8 box-border">
      <style>{`*, *::before, *::after { box-sizing: border-box; } body { overflow-x: hidden; }`}</style>
      <div className="max-w-3xl mx-auto w-full space-y-6">

        {/* Page Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-xl p-6 sm:p-8 text-white text-center">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Result Search</h1>
          <p className="text-indigo-200 text-sm mt-1">Search your exam result by Symbol Number</p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-md p-5 sm:p-7 w-full overflow-hidden">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 min-w-0 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Enter Symbol Number"
                value={symbolNo}
                onChange={(e) => setSymbolNo(e.target.value)}
                required
                className="w-full min-w-0 box-border pl-9 pr-4 py-3 text-sm bg-gray-50 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-none px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2 active:scale-[0.98] shadow-sm"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Searching...</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>Search</>
                )}
              </button>
              {result && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium rounded-xl transition-colors text-sm flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="hidden sm:inline">Clear</span>
                </button>
              )}
            </div>
          </form>

          {/* Error */}
          {error && (
            <div className="mt-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
        </div>

        {/* Result Card */}
        {result && (
          <div className="bg-white rounded-2xl shadow-md w-full overflow-hidden">

            {/* Result Header */}
            <div
              className={`px-5 sm:px-7 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
                result.status === 'Pass' ? 'bg-emerald-50' : 'bg-red-50'
              }`}
            >
              {/* <div ref={resultRef} className="hidden" /> for PDF capture - actual ref below */}
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-gray-800 truncate">{result.studentName}</h2>
                <p className="text-sm text-gray-500 mt-0.5">Symbol No: <span className="font-semibold text-gray-700">{result.symbolNo}</span> &nbsp;·&nbsp; Exam Year: <span className="font-semibold text-gray-700">{result.examYear}</span></p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${result.status === 'Pass' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  {result.status === 'Pass' ? '✓ Pass' : '✗ Fail'}
                </span>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm active:scale-[0.97]"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  PDF
                </button>
              </div>
            </div>

            {/* Printable Content */}
            {/* <div ref={resultRef} className="p-5 sm:p-7 space-y-5"> */}
            <div
  ref={resultRef}
  style={{ background: "white", color: "black" }}
  className="p-5 sm:p-7 space-y-5"
>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Total Marks', value: result.totalMarks },
                  { label: 'Percentage', value: `${result.percentage}%` },
                  { label: 'Grade', value: result.grade, colored: true },
                  { label: 'Status', value: result.status, status: true },
                ].map(({ label, value, colored, status }) => (
                  <div key={label} className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{label}</p>
                    <p className={`text-lg font-bold ${
                      status
                        ? result.status === 'Pass' ? 'text-emerald-600' : 'text-red-500'
                        : colored ? gradeColor(value) : 'text-gray-800'
                    }`}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Subject Table */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Subject-wise Marks</h3>
                {/* Mobile: card per subject */}
                <div className="sm:hidden space-y-2">
                  {result.subjects.map((subj, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 min-w-0">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-400 font-medium">{subj.code}</p>
                        <p className="text-sm text-gray-800 font-semibold truncate">{subj.title}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-3">
                        <p className="text-lg font-bold text-indigo-600">{subj.marksObtained}</p>
                        <p className="text-xs text-gray-400">/ {subj.maxMarks}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop: table */}
                <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-sm min-w-0">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">#</th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Code</th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Subject</th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">Obtained</th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">Max</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {result.subjects.map((subj, idx) => (
                        <tr key={idx} className="hover:bg-indigo-50/30 transition-colors">
                          <td className="px-4 py-3 text-gray-400 text-xs">{idx + 1}</td>
                          <td className="px-4 py-3 font-mono text-xs text-indigo-600 font-semibold">{subj.code}</td>
                          <td className="px-4 py-3 text-gray-700">{subj.title}</td>
                          <td className="px-4 py-3 text-center font-bold text-gray-800">{subj.marksObtained}</td>
                          <td className="px-4 py-3 text-center text-gray-400">{subj.maxMarks}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-indigo-50 border-t-2 border-indigo-100">
                        <td colSpan={3} className="px-4 py-3 text-sm font-bold text-indigo-700">Total</td>
                        <td className="px-4 py-3 text-center font-bold text-indigo-700">{result.totalMarks}</td>
                        <td className="px-4 py-3 text-center text-gray-400 text-xs">{result.subjects?.reduce((a, s) => a + s.maxMarks, 0) || '—'}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}