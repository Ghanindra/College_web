
import React, { useState } from 'react';
import Base_Url from '../api/Base_Url'
import axios from 'axios';
import AdmitCard from "../components/AdmitCard";
import { FaUser, FaMapMarkerAlt, FaPhone, FaUniversity, FaGraduationCap, FaBook, FaPaperclip, FaEdit, FaFileAlt } from "react-icons/fa";
// ─── Shared Style Constants ────────────────────────────────────────────────────
const inputClass =
  "w-full min-w-0 box-border px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200";

// ─── Sub-components ────────────────────────────────────────────────────────────

const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-2 mt-6 mb-3">
    <span className="text-lg">{icon}</span>
    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">{title}</h3>
    <div className="flex-1 h-px bg-gray-200 ml-1" />
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-2 py-2 border-b border-gray-100 last:border-0">
    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide sm:w-36 flex-shrink-0">{label}</span>
    <span className="text-sm text-gray-800 font-medium">{value || <span className="text-gray-300 italic">—</span>}</span>
  </div>
);

const StatusBadge = ({ label, value, colorMap }) => {
  const colors = colorMap?.[value] || "bg-gray-100 text-gray-600";
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-400 font-medium">{label}</span>
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${colors}`}>
        {value || "N/A"}
      </span>
    </div>
  );
};

const FieldWrapper = ({ label, children, className = "" }) => (
  <div className={`flex flex-col gap-1 min-w-0 ${className}`}>
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
    {children}
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────

const FormDetails = ({ form, token, onFormUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(form);
  const [files, setFiles] = useState({ photo: null, citizenshipDocument: null, plusTwoDocument: null });

  if (!form) return (
    <div className="flex items-center justify-center min-h-40 text-gray-400 text-sm">
      No form submitted yet.
    </div>
  );

  // ── Handlers ──────────────────────────────────────────────────────────────────
  const handleFileChange = (e) => setFiles(prev => ({ ...prev, [e.target.name]: e.target.files[0] }));
  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleNestedChange = (section, field, value) =>
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  const handleAcademicChange = (index, field, value) => {
    const updated = [...(formData.academicRecords || [])];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, academicRecords: updated }));
  };
  const addAcademicRecord = () =>
    setFormData(prev => ({
      ...prev,
      academicRecords: [...(prev.academicRecords || []),
        { exam: '', board: '', year: '', rollNo: '', marks: '', percentage: '', division: '' }]
    }));
  const handleSubjectChange = (index, field, value) => {
    const updated = [...(formData.subjects || [])];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, subjects: updated }));
  };
  const addSubject = () =>
    setFormData(prev => ({ ...prev, subjects: [...(prev.subjects || []), { code: '', title: '' }] }));

  const handleResubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (files.photo) data.append('photo', files.photo);
    if (files.citizenshipDocument) data.append('citizenshipDocument', files.citizenshipDocument);
    if (files.plusTwoDocument) data.append('plusTwoDocument', files.plusTwoDocument);
    data.append('data', JSON.stringify(formData));
    try {
      const res = await axios.put(
        `${Base_Url}/forms/forms/${form._id}`, data,
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
      );
      alert('Form resubmitted successfully!');
      setIsEditing(false);
      if (onFormUpdated) onFormUpdated(res.data.form);
    } catch (err) {
      console.error(err);
      alert('Failed to resubmit form');
    }
  };

  const renderDocument = (label, file) => {
    if (!file) return null;
    // const url = `http://localhost:5000${file}`;

  const url = `${Base_Url.replace('/api','')}${file}`;
    return (
      <a href={url} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-2.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg text-sm text-indigo-700 font-medium transition-colors group">
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span className="truncate">{label}</span>
        <svg className="w-3 h-3 ml-auto opacity-50 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    );
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // EDIT MODE
  // ══════════════════════════════════════════════════════════════════════════════
  if (isEditing) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 box-border">
        <style>{`*, *::before, *::after { box-sizing: border-box; }`}</style>
        <div className="max-w-3xl mx-auto w-full">

          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg p-5 sm:p-7 mb-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold">Edit & Resubmit Form</h1>
                <p className="text-orange-100 text-xs mt-0.5">Update your details and resubmit for approval</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleResubmit} className="bg-white rounded-2xl shadow-md p-5 sm:p-7 w-full overflow-hidden space-y-1">

            {/* Personal Info */}
            <SectionHeader icon={<FaUser />} title="Personal Information" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldWrapper label="Full Name">
                <input name="fullName" value={formData.fullName || ''} onChange={handleInputChange} placeholder="Full Name" required className={inputClass} />
              </FieldWrapper>
              <FieldWrapper label="Nationality">
                <input name="nationality" value={formData.nationality || ''} onChange={handleInputChange} placeholder="Nationality" className={inputClass} />
              </FieldWrapper>
              <FieldWrapper label="Date of Birth">
                <input type="date" name="dob" value={formData.dob ? formData.dob.substring(0, 10) : ''} onChange={handleInputChange} className={inputClass} />
              </FieldWrapper>
              <FieldWrapper label="Father's Name">
                <input name="fatherName" value={formData.fatherName || ''} onChange={handleInputChange} placeholder="Father's Name" className={inputClass} />
              </FieldWrapper>
            </div>

            {/* Address */}
        <SectionHeader icon={<FaMapMarkerAlt />} title="Address" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[['province','Province'],['district','District'],['municipality','Municipality'],['ward','Ward']].map(([field, label]) => (
                <FieldWrapper key={field} label={label}>
                  <input value={formData.address?.[field] || ''} placeholder={label} onChange={(e) => handleNestedChange('address', field, e.target.value)} className={inputClass} />
                </FieldWrapper>
              ))}
            </div>

            {/* Contact */}
           <SectionHeader icon={<FaPhone />} title="Contact" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldWrapper label="Email">
                <input value={formData.contact?.email || ''} placeholder="Email" type="email" onChange={(e) => handleNestedChange('contact', 'email', e.target.value)} required className={inputClass} />
              </FieldWrapper>
              <FieldWrapper label="Phone">
                <input value={formData.contact?.phone || ''} placeholder="Phone" onChange={(e) => handleNestedChange('contact', 'phone', e.target.value)} required className={inputClass} />
              </FieldWrapper>
            </div>

            {/* Academic Records */}
            <SectionHeader icon={<FaGraduationCap />} title="Academic Records" />
            <div className="space-y-3">
              {(formData.academicRecords || []).map((record, index) => (
                <div key={index} className="border border-indigo-100 bg-indigo-50/30 rounded-xl p-4">
                  <p className="text-xs font-semibold text-indigo-600 mb-3">Record {index + 1}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 min-w-0">
                    {[['exam','Exam'],['board','Board'],['year','Year'],['rollNo','Roll No'],['marks','Marks'],['percentage','Percentage'],['division','Division']].map(([field, label]) => (
                      <FieldWrapper key={field} label={label}>
                        <input placeholder={label} value={record[field]} onChange={(e) => handleAcademicChange(index, field, e.target.value)} className={inputClass} />
                      </FieldWrapper>
                    ))}
                  </div>
                </div>
              ))}
              <button type="button" onClick={addAcademicRecord}
                className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 border-2 border-dashed border-indigo-300 hover:border-indigo-500 rounded-xl px-4 py-2.5 w-full justify-center transition-all hover:bg-indigo-50 font-medium">
                + Add Academic Record
              </button>
            </div>

            {/* TU Info */}
              <SectionHeader icon={<FaUniversity />} title="TU Information" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[['tuRegistrationNo','TU Registration No'],['semester','Semester'],['year','Year'],['batch','Batch'],['collegeName','College Name'],['course','Course'],['examCenter','Exam Center']].map(([name, label]) => (
                <FieldWrapper key={name} label={label}>
                  <input name={name} value={formData[name] || ''} onChange={handleInputChange} placeholder={label} className={inputClass} />
                </FieldWrapper>
              ))}
            </div>

            {/* Subjects */}
         <SectionHeader icon={<FaBook />} title="Subjects" />
            <div className="space-y-2">
              {(formData.subjects || []).map((sub, index) => (
                <div key={index} className="grid grid-cols-2 gap-3 min-w-0">
                  <FieldWrapper label="Code">
                    <input placeholder="Subject Code" value={sub.code} onChange={(e) => handleSubjectChange(index, 'code', e.target.value)} className={inputClass} />
                  </FieldWrapper>
                  <FieldWrapper label="Title">
                    <input placeholder="Subject Title" value={sub.title} onChange={(e) => handleSubjectChange(index, 'title', e.target.value)} className={inputClass} />
                  </FieldWrapper>
                </div>
              ))}
              <button type="button" onClick={addSubject}
                className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 border-2 border-dashed border-indigo-300 hover:border-indigo-500 rounded-xl px-4 py-2.5 w-full justify-center transition-all hover:bg-indigo-50 font-medium">
                + Add Subject
              </button>
            </div>

            {/* Documents */}
           <SectionHeader icon={<FaPaperclip />} title="Documents" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[['photo','Photo','image/*'],['citizenshipDocument','Citizenship','application/pdf,image/*'],['plusTwoDocument','+2 Document','application/pdf,image/*']].map(([name, label, accept]) => (
                <FieldWrapper key={name} label={label}>
                  <label className="flex flex-col items-center justify-center gap-1 border-2 border-dashed border-gray-300 hover:border-indigo-400 rounded-xl p-4 cursor-pointer transition-colors bg-gray-50 hover:bg-indigo-50/20 text-center">
                    <span className="text-xl">{name === 'photo' ? '🖼️' : '📄'}</span>
                    <span className="text-xs text-gray-400">{files[name] ? <span className="text-green-600 font-medium">✓ {files[name].name}</span> : 'Click to upload'}</span>
                    <input type="file" name={name} accept={accept} onChange={handleFileChange} className="hidden" />
                  </label>
                </FieldWrapper>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <button type="submit"
                className="flex-1 py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-md transition-all duration-200 active:scale-[0.99] text-sm">
                Resubmit Form
              </button>
              <button type="button" onClick={() => setIsEditing(false)}
                className="flex-1 sm:flex-none sm:px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition-colors text-sm">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // VIEW MODE
  // ══════════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 box-border">
      <style>{`*, *::before, *::after { box-sizing: border-box; }`}</style>
      <div className="max-w-3xl mx-auto w-full space-y-5">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-lg p-5 sm:p-7 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold truncate">{form.fullName}</h1>
                <p className="text-indigo-200 text-xs mt-0.5">Submitted Form Details</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge label="Payment:" value={form.paymentStatus}
                colorMap={{ paid: "bg-green-100 text-green-700", pending: "bg-yellow-100 text-yellow-700", failed: "bg-red-100 text-red-700" }} />
              <StatusBadge label="Approval:" value={form.approvalStatus}
                colorMap={{ approved: "bg-green-100 text-green-700", rejected: "bg-red-100 text-red-700", pending: "bg-yellow-100 text-yellow-700" }} />
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 w-full overflow-hidden">
      <SectionHeader icon={<FaUser />} title="Personal Information" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            <InfoRow label="Full Name" value={form.fullName} />
            <InfoRow label="Nationality" value={form.nationality} />
            <InfoRow label="Date of Birth" value={form.dob?.substring(0, 10)} />
            <InfoRow label="Father's Name" value={form.fatherName} />
          </div>

      <SectionHeader icon={<FaMapMarkerAlt />} title="Address" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            <InfoRow label="Province" value={form.address?.province} />
            <InfoRow label="District" value={form.address?.district} />
            <InfoRow label="Municipality" value={form.address?.municipality} />
            <InfoRow label="Ward" value={form.address?.ward} />
          </div>

    <SectionHeader icon={<FaPhone />} title="Contact" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            <InfoRow label="Email" value={form.contact?.email} />
            <InfoRow label="Phone" value={form.contact?.phone} />
          </div>
        </div>

        {/* TU Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 w-full overflow-hidden">
   <SectionHeader icon={<FaUniversity />} title="TU Information" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            <InfoRow label="TU Reg. No." value={form.tuRegistrationNo} />
            <InfoRow label="Semester" value={form.semester} />
            <InfoRow label="Year" value={form.year} />
            <InfoRow label="Batch" value={form.batch} />
            <InfoRow label="College" value={form.collegeName} />
            <InfoRow label="Course" value={form.course} />
            <InfoRow label="Exam Center" value={form.examCenter} />
          </div>
        </div>

        {/* Academic Records */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 w-full overflow-hidden">
<SectionHeader icon={<FaGraduationCap />} title="Academic Records" />
          {form.academicRecords && form.academicRecords.length > 0 ? (
            <div className="space-y-3">
              {form.academicRecords.map((record, index) => (
                <div key={index} className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                  <p className="text-xs font-semibold text-indigo-600 mb-3 uppercase tracking-wide">Record {index + 1}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {[['Exam', record.exam], ['Board', record.board], ['Year', record.year], ['Roll No.', record.rollNo], ['Marks', record.marks], ['Percentage', record.percentage], ['Division', record.division]].map(([label, value]) => (
                      <div key={label} className="min-w-0">
                        <p className="text-xs text-gray-400 font-medium">{label}</p>
                        <p className="text-sm text-gray-800 font-semibold truncate">{value || '—'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : <p className="text-sm text-gray-400 italic">No academic records available.</p>}
        </div>

        {/* Subjects */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 w-full overflow-hidden">
   <SectionHeader icon={<FaBook />} title="Subjects" />
          {form.subjects && form.subjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {form.subjects.map((sub, index) => (
                <div key={index} className="flex items-center gap-2 bg-indigo-50 rounded-lg px-3 py-2 min-w-0">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded flex-shrink-0">{sub.code}</span>
                  <span className="text-sm text-gray-700 truncate">{sub.title}</span>
                </div>
              ))}
            </div>
          ) : <p className="text-sm text-gray-400 italic">No subjects added.</p>}
        </div>

        {/* Documents */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 w-full overflow-hidden">
  <SectionHeader icon={<FaPaperclip />} title="Documents" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {renderDocument("Photo", form.photo)}
            {renderDocument("Citizenship", form.citizenshipDocument)}
            {renderDocument("+2 Certificate", form.plusTwoDocument)}
          </div>
        </div>

        {/* Admit Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 w-full overflow-hidden">
          <AdmitCard form={form} token={token} />
        </div>

        {/* Edit Button (shown when rejected) */}
        {form.approvalStatus === 'rejected' && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-red-700">Form Rejected</p>
                <p className="text-xs text-red-500 mt-0.5">Please review and correct your details, then resubmit.</p>
              </div>
            </div>
            <button onClick={() => setIsEditing(true)}
              className="flex-shrink-0 w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl shadow transition-all duration-200 active:scale-[0.98]">
              Edit & Resubmit
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default FormDetails;