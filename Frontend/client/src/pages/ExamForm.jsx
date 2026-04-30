import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Base_Url from '../api/Base_Url'
import {SERVER_URL} from '../api/Base_Url'
const token = () => localStorage.getItem("token");

// ─── Reusable Field Components ──────────────────────────────────────────────

const SectionHeader = ({ step, title }) => (
  <div className="flex items-center gap-3 mb-6 mt-8 first:mt-0">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-md">
      {step}
    </div>
    <h3 className="text-base font-semibold text-gray-800 uppercase tracking-widest border-b-2 border-indigo-200 pb-1 flex-1">
      {title}
    </h3>
  </div>
);

const FieldWrapper = ({ label, error, touched, children }) => (
  <div className="flex flex-col gap-1 min-w-0 w-full">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    {children}
    {touched && error && (
      <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>
    )}
  </div>
);

const inputClass =
  "w-full min-w-0 box-border px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200";

const selectClass =
  "w-full min-w-0 box-border px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer";

// ─── Global overflow fix style ───────────────────────────────────────────────
const globalStyle = `*, *::before, *::after { box-sizing: border-box; } body { overflow-x: hidden; max-width: 100vw; }`;

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ExamForm() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFormStatus = async () => {
      try {
        const res = await axios.get(
          `${Base_Url}/forms/form-config?formType=examForm`
        );
        const { startTime, endTime } = res.data;
        const now = new Date();
        setIsFormOpen(new Date(startTime) <= now && now <= new Date(endTime));
      } catch (err) {
        console.error("Could not fetch form config:", err);
        setIsFormOpen(false);
      } finally {
        setLoading(false);
      }
    };
    checkFormStatus();
  }, []);

  const initiateEsewa = async ({ formId, amount }) => {
    await axios
      .post(
        `${SERVER_URL}/esewa/initiate`,
        { formId, amount },
        { headers: { Authorization: `Bearer ${token()}` } }
      )
      .then((res) => {
        const data = res.data.paymentData;
        console.log("data",data);
        
        if (!data || !data.signature) {
          toast.error("Invalid payment data received");
          return;
        }
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
        Object.entries(data).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value.toString().trim();
          form.appendChild(input);
        });
        document.body.appendChild(form);
        form.submit();
      })
      .catch((err) => {
        toast.error(err.response?.data?.error || "Failed to initiate eSewa payment");
      });
  };

  const formik = useFormik({
    initialValues: {
      fullName: "", nationality: "", dob: "", fatherName: "",
      province: "", district: "", municipality: "", ward: "",
      phone: "", email: "",
      tuRegistrationNo: "", semester: "", year: "", batch: "",
      collegeName: "", examCenter: "", course: "", subjects: "",
      paymentAmount: "", paymentMethod: "",
      plusTwoDocument: null, citizenshipDocument: null, photo: null,
      academicRecords: [{
        exam: "", board: "", year: "", rollNo: "", marks: "", percentage: "", division: "",
      }],
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      nationality: Yup.string().required("Nationality is required"),
      dob: Yup.string().required("Date of Birth is required"),
      fatherName: Yup.string().required("Father Name is required"),
      province: Yup.string().required("Province is required"),
      district: Yup.string().required("District is required"),
      municipality: Yup.string().required("Municipality is required"),
      ward: Yup.string().required("Ward is required"),
      citizenshipDocument: Yup.mixed().required("Citizenship Document is required"),
      phone: Yup.string().matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits").required("Phone is required"),
      email: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Email must be a valid @gmail.com address").required("Email is required"),
      tuRegistrationNo: Yup.string().matches(/^\d{11}$/, "TU Registration No. must be exactly 11 digits").required("TU Registration No. is required"),
      semester: Yup.string().required("Semester is required"),
      year: Yup.string().required("Year is required"),
      batch: Yup.string().required("Batch is required"),
      collegeName: Yup.string().required("College Name is required"),
      course: Yup.string().required("Course selection is required"),
      examCenter: Yup.string().required("Exam Center is required"),
      subjects: Yup.string().required("Subjects are required"),
      paymentAmount: Yup.number().typeError("Payment amount must be a number").required("Payment amount is required").min(200, "Minimum payment is NPR 200"),
      paymentMethod: Yup.string().required("Payment method is required"),
      photo: Yup.mixed().required("Photo is required"),
      plusTwoDocument: Yup.mixed().required("+2 Document is required"),
      academicRecords: Yup.array().of(
        Yup.object({
          exam: Yup.string().required("Exam is required"),
          board: Yup.string().required("Board is required"),
          year: Yup.string().required("Year is required"),
          rollNo: Yup.string().required("Roll No. is required"),
          marks: Yup.string().required("Marks are required"),
          percentage: Yup.string().required("Percentage is required"),
          division: Yup.string().required("Division is required"),
        })
      ).min(1, "At least one academic record is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (values.paymentMethod !== "eSewa") {
          toast.info("Only eSewa is available. Other payment methods coming soon!");
          setSubmitting(false);
          return;
        }
        const formattedSubjects = values.subjects.split(",").map((t, i) => ({ code: `SUB${i + 1}`, title: t.trim() }));
        const formData = new FormData();
        const payload = {
          fullName: values.fullName, nationality: values.nationality, dob: values.dob,
          fatherName: values.fatherName,
          address: { province: values.province, district: values.district, municipality: values.municipality, ward: values.ward },
          contact: { phone: values.phone, email: values.email },
          academicRecords: values.academicRecords,
          tuRegistrationNo: values.tuRegistrationNo, semester: values.semester,
          year: values.year, batch: values.batch, collegeName: values.collegeName,
          examCenter: values.examCenter, course: values.course, subjects: formattedSubjects,
          paymentDetails: { amount: Number(values.paymentAmount), method: values.paymentMethod },
        };
        formData.append("data", JSON.stringify(payload));
        formData.append("photo", values.photo);
        formData.append("citizenshipDocument", values.citizenshipDocument);
        formData.append("plusTwoDocument", values.plusTwoDocument);

        const { data: draftResponse } = await axios.post(
          `${Base_Url}/forms/draft`, formData,
          { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token()}` } }
        );
        const formId = draftResponse.draftId;
        const amount = Number(values.paymentAmount);
        if (!formId) { toast.error("Form ID missing. Draft not created."); setSubmitting(false); return; }
        toast.info("Redirecting to eSewa...");
        initiateEsewa({ formId, amount });
      } catch (err) {
        toast.error(err.response?.data?.message || "Submission error.");
        resetForm();
        setSubmitting(false);
      }
    },
  });

  const addAcademicRecord = () => {
    formik.setFieldValue("academicRecords", [
      ...formik.values.academicRecords,
      { exam: "", board: "", year: "", rollNo: "", marks: "", percentage: "", division: "" },
    ]);
  };

  const removeAcademicRecord = (index) => {
    const records = [...formik.values.academicRecords];
    records.splice(index, 1);
    formik.setFieldValue("academicRecords", records);
  };

  const handleAcademicRecordChange = (index, field, value) => {
    const records = [...formik.values.academicRecords];
    records[index][field] = value;
    formik.setFieldValue("academicRecords", records);
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-500 text-sm font-medium">Checking form availability...</p>
        </div>
      </div>
    );
  }

  // ── Closed ──
  if (!isFormOpen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Form Closed</h2>
          <p className="text-gray-500 text-sm">The exam form is currently closed. Please check back later.</p>
        </div>
      </div>
    );
  }

  // ── Form ──
  return (
    <>
      <style>{globalStyle}</style>
      <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-100 via-indigo-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8 box-border">
      <div className="max-w-3xl mx-auto w-full">

        {/* Header Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-xl p-6 sm:p-8 mb-6 text-white text-center">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Exam Registration Form</h1>
          <p className="text-indigo-200 text-sm mt-1">Tribhuvan University — Academic Year 2081/82</p>
        </div>

        {/* Main Form Card */}
        <form
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
          className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 space-y-2 w-full overflow-hidden"
        >
          {/* ── 1. Personal Information ── */}
          <SectionHeader step="1" title="Personal Information" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            {[
              { name: "fullName", label: "Full Name", placeholder: "John Doe" },
              { name: "nationality", label: "Nationality", placeholder: "Nepali" },
              { name: "fatherName", label: "Father's Name", placeholder: "Father's full name" },
            ].map(({ name, label, placeholder }) => (
              <FieldWrapper key={name} label={label} error={formik.errors[name]} touched={formik.touched[name]}>
                <input
                  name={name}
                  type="text"
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={placeholder}
                  className={inputClass}
                />
              </FieldWrapper>
            ))}
            <FieldWrapper label="Date of Birth" error={formik.errors.dob} touched={formik.touched.dob}>
              <input
                name="dob"
                type="date"
                value={formik.values.dob}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputClass}
              />
            </FieldWrapper>
          </div>

          {/* ── 2. Address ── */}
          <SectionHeader step="2" title="Address" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            {[
              { name: "province", label: "Province", placeholder: "Province No." },
              { name: "district", label: "District", placeholder: "e.g. Kathmandu" },
              { name: "municipality", label: "Municipality", placeholder: "e.g. Kathmandu Metropolitan" },
              { name: "ward", label: "Ward No.", placeholder: "e.g. 5" },
            ].map(({ name, label, placeholder }) => (
              <FieldWrapper key={name} label={label} error={formik.errors[name]} touched={formik.touched[name]}>
                <input
                  name={name}
                  type="text"
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={placeholder}
                  className={inputClass}
                />
              </FieldWrapper>
            ))}
          </div>

          {/* ── 3. Contact Information ── */}
          <SectionHeader step="3" title="Contact Information" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            <FieldWrapper label="Phone Number" error={formik.errors.phone} touched={formik.touched.phone}>
              <input
                name="phone"
                type="tel"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="98XXXXXXXX"
                maxLength={10}
                className={inputClass}
              />
            </FieldWrapper>
            <FieldWrapper label="Email Address" error={formik.errors.email} touched={formik.touched.email}>
              <input
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="you@gmail.com"
                className={inputClass}
              />
            </FieldWrapper>
          </div>

          {/* ── 4. Academic Information ── */}
          <SectionHeader step="4" title="Academic Information" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            {[
              { name: "tuRegistrationNo", label: "TU Registration No.", placeholder: "11-digit number" },
              { name: "semester", label: "Semester", placeholder: "e.g. 1st" },
              { name: "year", label: "Year", placeholder: "e.g. 2081" },
              { name: "batch", label: "Batch", placeholder: "e.g. 2080–2084" },
              { name: "collegeName", label: "College Name", placeholder: "Your college name" },
              { name: "examCenter", label: "Exam Center", placeholder: "e.g. TU Central Campus" },
            ].map(({ name, label, placeholder }) => (
              <FieldWrapper key={name} label={label} error={formik.errors[name]} touched={formik.touched[name]}>
                <input
                  name={name}
                  type="text"
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={placeholder}
                  className={inputClass}
                />
              </FieldWrapper>
            ))}

            {/* Course Select */}
            <FieldWrapper label="Course" error={formik.errors.course} touched={formik.touched.course}>
              <div className="relative min-w-0 w-full">
                <select
                  name="course"
                  value={formik.values.course}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={selectClass}
                >
                  <option value="">Select a course</option>
                  {["CSIT", "BIT", "Engineering", "Management", "Arts", "Law"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </FieldWrapper>
          </div>

          {/* ── 5. Academic Records ── */}
          <SectionHeader step="5" title="Academic Records" />
          <div className="space-y-4">
            {formik.values.academicRecords.map((record, idx) => (
              <div
                key={idx}
                className="border border-indigo-100 rounded-xl p-4 sm:p-5 bg-indigo-50/40 relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
                    Record {idx + 1}
                  </span>
                  {formik.values.academicRecords.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAcademicRecord(idx)}
                      className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 transition-colors font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 min-w-0">
                  {[
                    { name: "exam", label: "Exam", placeholder: "e.g. SEE" },
                    { name: "board", label: "Board", placeholder: "e.g. NEB" },
                    { name: "year", label: "Year", placeholder: "e.g. 2078" },
                    { name: "rollNo", label: "Roll No.", placeholder: "Roll number" },
                    { name: "marks", label: "Marks", placeholder: "e.g. 450/500" },
                    { name: "percentage", label: "Percentage", placeholder: "e.g. 90%" },
                    { name: "division", label: "Division", placeholder: "e.g. First" },
                  ].map(({ name, label, placeholder }) => {
                    const touched = formik.touched.academicRecords?.[idx]?.[name];
                    const error = formik.errors.academicRecords?.[idx]?.[name];
                    return (
                      <FieldWrapper key={name} label={label} error={error} touched={touched}>
                        <input
                          type="text"
                          name={`academicRecords[${idx}].${name}`}
                          value={formik.values.academicRecords[idx][name]}
                          onChange={(e) => handleAcademicRecordChange(idx, name, e.target.value)}
                          onBlur={formik.handleBlur}
                          placeholder={placeholder}
                          className={inputClass}
                        />
                      </FieldWrapper>
                    );
                  })}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addAcademicRecord}
              className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium border-2 border-dashed border-indigo-300 hover:border-indigo-500 rounded-xl px-4 py-3 w-full justify-center transition-all duration-200 hover:bg-indigo-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Another Academic Record
            </button>
          </div>

          {/* ── 6. Subjects ── */}
          <SectionHeader step="6" title="Subjects" />
          <FieldWrapper label="Subjects (comma separated)" error={formik.errors.subjects} touched={formik.touched.subjects}>
            <input
              name="subjects"
              type="text"
              value={formik.values.subjects}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="e.g. Mathematics, Physics, Chemistry"
              className={inputClass}
            />
          </FieldWrapper>

          {/* ── 7. Payment Information ── */}
          <SectionHeader step="7" title="Payment Information" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            <FieldWrapper label="Payment Amount (NPR)" error={formik.errors.paymentAmount} touched={formik.touched.paymentAmount}>
              <div className="relative min-w-0 w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">Rs.</span>
                <input
                  type="number"
                  name="paymentAmount"
                  value={formik.values.paymentAmount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="2000"
                  min="200"
                  className={`${inputClass} pl-9`}
                />
              </div>
            </FieldWrapper>

            <FieldWrapper label="Payment Method" error={formik.errors.paymentMethod} touched={formik.touched.paymentMethod}>
              <div className="relative min-w-0 w-full">
                <select
                  name="paymentMethod"
                  value={formik.values.paymentMethod}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={selectClass}
                >
                  <option value="">Select Method</option>
                  <option value="eSewa">eSewa</option>
                  <option value="Khalti">Khalti</option>
                  <option value="Bank">Bank Transfer</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </FieldWrapper>
          </div>

          {/* eSewa notice */}
          {formik.values.paymentMethod && formik.values.paymentMethod !== "eSewa" && (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 mt-1">
              <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-xs text-amber-700">Only eSewa is currently available. Other payment methods coming soon.</p>
            </div>
          )}

          {/* ── 8. Document Uploads ── */}
          <SectionHeader step="8" title="Document Uploads" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            {[
              { name: "plusTwoDocument", label: "+2 Document", accept: "application/pdf,image/*", icon: "📄" },
              { name: "citizenshipDocument", label: "Citizenship Document", accept: "application/pdf,image/*", icon: "🪪" },
              { name: "photo", label: "Passport Photo", accept: "image/*", icon: "🖼️" },
            ].map(({ name, label, accept, icon }) => (
              <FieldWrapper key={name} label={label} error={formik.errors[name]} touched={formik.touched[name]}>
                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 hover:border-indigo-400 rounded-xl p-5 cursor-pointer transition-colors bg-gray-50 hover:bg-indigo-50/30 group">
                  <span className="text-2xl">{icon}</span>
                  <span className="text-xs text-gray-500 group-hover:text-indigo-600 transition-colors font-medium text-center">
                    {formik.values[name] ? (
                      <span className="text-green-600">✓ {formik.values[name].name}</span>
                    ) : (
                      "Click to upload"
                    )}
                  </span>
                  <span className="text-xs text-gray-400">PDF or Image</span>
                  <input
                    type="file"
                    name={name}
                    accept={accept}
                    onChange={(e) => formik.setFieldValue(name, e.currentTarget.files[0])}
                    onBlur={formik.handleBlur}
                    className="hidden"
                  />
                </label>
              </FieldWrapper>
            ))}
          </div>

          {/* ── Submit ── */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-bold text-base tracking-wide transition-all duration-300 shadow-lg flex items-center justify-center gap-3
                ${formik.isSubmitting
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white cursor-pointer hover:shadow-indigo-200 hover:shadow-xl active:scale-[0.99]"
                }`}
            >
              {formik.isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Submit & Proceed to Payment
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">
              By submitting, you agree to the terms and conditions of Tribhuvan University.
            </p>
          </div>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4 pb-6">
          © {new Date().getFullYear()} Tribhuvan University · Exam Registration System
        </p>
      </div>
    </div>
    </>
  );
}