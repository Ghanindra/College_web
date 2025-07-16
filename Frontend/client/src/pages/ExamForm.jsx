import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function ExamForm() {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      nationality: "",
      dob: "",
      fatherName: "",
      province: "",
      district: "",
      municipality: "",
      ward: "",
      phone: "",
      email: "",
      tuRegistrationNo: "",
      semester: "",
      year: "",
      batch: "",
      collegeName: "",
      examCenter: "",
      subjects: "", // comma separated: "Math, English"
      paymentAmount: "",
      paymentMethod: "",
      photo: null,
      academicRecords: [
        {
          exam: "",
          board: "",
          year: "",
          rollNo: "",
          marks: "",
          percentage: "",
          division: "",
        },
      ],
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
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
        .required("Phone is required"),
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
          "Email must be a valid @gmail.com address"
        )
        .required("Email is required"),
      tuRegistrationNo: Yup.string()
        .matches(/^\d{11}$/, "TU Registration No. must be exactly 11 digits")
        .required("TU Registration No. is required"),
      semester: Yup.string().required("Semester is required"),
      year: Yup.string().required("Year is required"),
      batch: Yup.string().required("Batch is required"),
      collegeName: Yup.string().required("College Name is required"),
      examCenter: Yup.string().required("Exam Center is required"),
      subjects: Yup.string().required("Subjects are required"),
      paymentAmount: Yup.number()
        .typeError("Payment amount must be a number")
        .required("Payment amount is required")
        .min(200, "Minimum payment is NPR 200"),
      paymentMethod: Yup.string().required("Payment method is required"),
      photo: Yup.mixed().required("Photo is required"),
      academicRecords: Yup.array()
        .of(
          Yup.object({
            exam: Yup.string().required("Exam is required"),
            board: Yup.string().required("Board is required"),
            year: Yup.string().required("Year is required"),
            rollNo: Yup.string().required("Roll No. is required"),
            marks: Yup.string().required("Marks are required"),
            percentage: Yup.string().required("Percentage is required"),
            division: Yup.string().required("Division is required"),
          })
        )
        .min(1, "At least one academic record is required"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("photo", values.photo);

        // Convert comma-separated subjects to array of objects
        const formattedSubjects = values.subjects.split(",").map((title, idx) => ({
          code: `SUB${idx + 1}`,
          title: title.trim(),
        }));

        // Build data object to send (except photo)
        const data = {
          fullName: values.fullName,
          nationality: values.nationality,
          dob: values.dob,
          fatherName: values.fatherName,
          address: {
            province: values.province,
            district: values.district,
            municipality: values.municipality,
            ward: values.ward,
          },
          contact: {
            phone: values.phone,
            email: values.email,
          },
          academicRecords: values.academicRecords,
          tuRegistrationNo: values.tuRegistrationNo,
          semester: values.semester,
          year: values.year,
          batch: values.batch,
          collegeName: values.collegeName,
          examCenter: values.examCenter,
          subjects: formattedSubjects,
          paymentDetails: {
            amount: values.paymentAmount,
            method: values.paymentMethod,
          },
        };

        formData.append("data", JSON.stringify(data));

        await axios.post("http://localhost:5000/api/forms", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Form submitted successfully!");
        formik.resetForm();
      } catch (error) {
        alert("Error submitting form.");
        console.error(error);
      }
    },
  });

  // Handlers for academic records dynamic form
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

  return (
    <form
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
      style={{ maxWidth: 700, margin: "auto" }}
    >
      {/* Static Fields */}
      {[
        { name: "fullName", label: "Full Name" },
        { name: "nationality", label: "Nationality" },
        { name: "dob", label: "Date of Birth", type: "date" },
        { name: "fatherName", label: "Father's Name" },
        { name: "province", label: "Province" },
        { name: "district", label: "District" },
        { name: "municipality", label: "Municipality" },
        { name: "ward", label: "Ward" },
        { name: "phone", label: "Phone" },
        { name: "email", label: "Email", type: "email" },
        { name: "tuRegistrationNo", label: "TU Registration No." },
        { name: "semester", label: "Semester" },
        { name: "year", label: "Year" },
        { name: "batch", label: "Batch" },
        { name: "collegeName", label: "College Name" },
        { name: "examCenter", label: "Exam Center" },
      ].map(({ name, label, type = "text" }) => (
        <div key={name} style={{ marginBottom: 10 }}>
          <label>{label}</label>
          <br />
          <input
            name={name}
            type={type}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={label}
            style={{ width: "100%", padding: 8 }}
          />
          {formik.touched[name] && formik.errors[name] && (
            <div style={{ color: "red" }}>{formik.errors[name]}</div>
          )}
        </div>
      ))}

      {/* Academic Records */}
      <h3>Academic Records</h3>
      {formik.values.academicRecords.map((record, idx) => (
        <div
          key={idx}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            borderRadius: 6,
            marginBottom: 15,
            position: "relative",
          }}
        >
          {formik.values.academicRecords.length > 1 && (
            <button
              type="button"
              onClick={() => removeAcademicRecord(idx)}
              style={{ position: "absolute", right: 10, top: 10, background: "red", color: "white", border: "none", borderRadius: 4, padding: "2px 8px", cursor: "pointer" }}
            >
              X
            </button>
          )}

          {[
            { name: "exam", label: "Exam" },
            { name: "board", label: "Board" },
            { name: "year", label: "Year" },
            { name: "rollNo", label: "Roll No." },
            { name: "marks", label: "Marks" },
            { name: "percentage", label: "Percentage" },
            { name: "division", label: "Division" },
          ].map(({ name, label }) => (
            <div key={name} style={{ marginBottom: 8 }}>
              <label>{label}</label>
              <input
                type="text"
                value={formik.values.academicRecords[idx][name]}
                onChange={(e) =>
                  handleAcademicRecordChange(idx, name, e.target.value)
                }
                onBlur={formik.handleBlur}
                name={`academicRecords[${idx}].${name}`}
                placeholder={label}
                style={{ width: "100%", padding: 6 }}
              />
              {formik.touched.academicRecords &&
              formik.touched.academicRecords[idx] &&
              formik.touched.academicRecords[idx][name] &&
              formik.errors.academicRecords &&
              formik.errors.academicRecords[idx] &&
              formik.errors.academicRecords[idx][name] ? (
                <div style={{ color: "red" }}>
                  {formik.errors.academicRecords[idx][name]}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ))}

      <button
        type="button"
        onClick={addAcademicRecord}
        style={{
          marginBottom: 20,
          padding: "8px 15px",
          background: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        + Add Academic Record
      </button>

      {/* Subjects */}
      <div style={{ marginBottom: 15 }}>
        <label>Subjects (comma separated)</label>
        <input
          name="subjects"
          type="text"
          value={formik.values.subjects}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Math, English, Physics"
          style={{ width: "100%", padding: 8 }}
        />
        {formik.touched.subjects && formik.errors.subjects && (
          <div style={{ color: "red" }}>{formik.errors.subjects}</div>
        )}
      </div>

      {/* Payment Amount */}
      <div style={{ marginBottom: 15 }}>
        <label>Payment Amount</label>
        <input
          type="number"
          name="paymentAmount"
          value={formik.values.paymentAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="e.g. 2000"
          min="200"
          style={{ width: "100%", padding: 8 }}
        />
        {formik.touched.paymentAmount && formik.errors.paymentAmount && (
          <div style={{ color: "red" }}>{formik.errors.paymentAmount}</div>
        )}
      </div>

      {/* Payment Method */}
      <div style={{ marginBottom: 15 }}>
        <label>Payment Method</label>
        <select
          name="paymentMethod"
          value={formik.values.paymentMethod}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{ width: "100%", padding: 8 }}
        >
          <option value="">Select Method</option>
          <option value="eSewa">eSewa</option>
          <option value="Khalti">Khalti</option>
          <option value="Bank">Bank</option>
        </select>
        {formik.touched.paymentMethod && formik.errors.paymentMethod && (
          <div style={{ color: "red" }}>{formik.errors.paymentMethod}</div>
        )}
      </div>

      {/* Photo Upload */}
      <div style={{ marginBottom: 15 }}>
        <label>Photo</label>
        <input
          name="photo"
          type="file"
          onChange={(e) => formik.setFieldValue("photo", e.currentTarget.files[0])}
          onBlur={formik.handleBlur}
          accept="image/*"
          style={{ display: "block", marginTop: 6 }}
        />
        {formik.touched.photo && formik.errors.photo && (
          <div style={{ color: "red" }}>{formik.errors.photo}</div>
        )}
      </div>

      <button
        type="submit"
        style={{
          padding: "10px 20px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Submit Form
      </button>
    </form>
  );
}





