import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const token = () => localStorage.getItem("token");


export default function ExamForm() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if form is open
  useEffect(() => {
    const checkFormStatus = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/forms/form-config?formType=examForm"
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

  // Initiate eSewa payment - SIMPLIFIED VERSION
  // const initiateEsewa = ({ formId, amount }) => {
  //   console.log("🔵 STEP 3: Starting eSewa initiation...");
  //   console.log("FormID:", formId);
  //   console.log("Amount:", amount);
  //   console.log("🔹 Sending token:", token());

  //   axios
  //     .post(
  //       "http://localhost:5000/esewa/initiate",
  //       { formId, amount },
  //       { headers: { Authorization: `Bearer ${token()}` } }
  //     )
  //     .then((res) => {
  //       console.log("🟢 STEP 4: eSewa API response received:", res.data);
        
  //       const data = res.data.paymentData;
  //       // console.log("data",data);
        
        
  //       if (!data) {
  //         console.error("❌ No paymentData in response");
  //         toast.error("Invalid payment data received");
  //         return;
  //       }

  //       console.log("🟢 STEP 5: Creating form element...");
  //       const form = document.createElement("form");
  //       form.method = "POST";
  //       form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

  //       Object.entries(data).forEach(([key, value]) => {
  //         const input = document.createElement("input");
  //         input.type = "hidden";
  //         input.name = key;
  //         input.value = value.toString();
  //         form.appendChild(input);
  //       });

  //       document.body.appendChild(form);
        
  //       console.log(" STEP 6: Submitting form to eSewa...");
  //       console.log("Form data:", data);
        
  //       form.submit();
        
  //       console.log(" Form submitted - should redirect now");
  //     })
  //     .catch((err) => {
  //       console.error(" eSewa initiation error:", err);
  //       console.error("Error response:", err.response?.data);
  //       toast.error(err.response?.data?.error || "Failed to initiate eSewa payment");
  //     });
  // };
// Initiate eSewa payment - DEBUG FRIENDLY
// Initiate eSewa payment safely
const initiateEsewa = ({ formId, amount }) => {
  console.log("🔵 STEP 3: Starting eSewa initiation...");
  console.log("FormID:", formId);
  console.log("Amount:", amount);
  console.log("🔹 Sending token:", token());

  axios
    .post(
      "http://localhost:5000/esewa/initiate",
      { formId, amount },
      { headers: { Authorization: `Bearer ${token()}` } }
    )
    .then((res) => {
      const data = res.data.paymentData;

      if (!data) {
        console.error("❌ No paymentData received");
        toast.error("Invalid payment data received");
        return;
      }

      console.log("🟢 STEP 4: eSewa API response received:", data);

      // Make sure transaction_uuid exists
      if (!data.transaction_uuid) {
        console.error("❌ transaction_uuid is missing! Signature will fail");
        toast.error("transaction_uuid missing. Cannot proceed to eSewa");
        return;
      }

      // Log all values in signed_field_names
      console.log("🔹 Form ready to submit. Data being sent to eSewa:");
      data.signed_field_names.split(",").forEach((key) => {
        console.log(`${key} =`, data[key]);
      });

      // --- PAUSE SUBMISSION --- 
      // Create form but don't submit yet
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      // Append inputs in exact order of signed_field_names
      data.signed_field_names.split(",").forEach((key) => {
  const input = document.createElement("input");
  input.type = "hidden";
  input.name = key;
  input.value =
    typeof data[key] === "string" ? data[key].trim() : data[key] != null ? data[key].toString() : "";
  form.appendChild(input);
});


      // Optional: append remaining fields like signature
      if (data.signature) {
        const sigInput = document.createElement("input");
        sigInput.type = "hidden";
        sigInput.name = "signature";
        sigInput.value = data.signature.trim();
        form.appendChild(sigInput);
      }

      document.body.appendChild(form);
console.log("Final form values ready for submission:");
[...form.elements].forEach((el) => {
  if (el.name) console.log(el.name, "=>", `"${el.value}"`);
});
      console.log(
        "✅ Form built successfully. Check console above. Ready to submit manually."
      );

      // TEMPORARY: wait for confirmation before submitting
      if (window.confirm("Submit to eSewa now? Check console logs first.")) {
        form.submit();
        console.log("🟢 Form submitted to eSewa. Redirecting...");
      } else {
        console.log("⏸ Submission paused for inspection. Fix signature if needed.");
      }
    })
    .catch((err) => {
      console.error("❌ eSewa initiation error:", err);
      console.error("Error response:", err.response?.data);
      toast.error(err.response?.data?.error || "Failed to initiate eSewa payment");
    });
};

  // Formik setup
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
      course: "",
      subjects: "",
      paymentAmount: "",
      paymentMethod: "",
      plusTwoDocument: null,
      citizenshipDocument: null,
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
      citizenshipDocument: Yup.mixed().required("Citizenship Document is required"),
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
      course: Yup.string().required("Course selection is required"),
      examCenter: Yup.string().required("Exam Center is required"),
      subjects: Yup.string().required("Subjects are required"),
      paymentAmount: Yup.number()
        .typeError("Payment amount must be a number")
        .required("Payment amount is required")
        .min(200, "Minimum payment is NPR 200"),
      paymentMethod: Yup.string().required("Payment method is required"),
      photo: Yup.mixed().required("Photo is required"),
      plusTwoDocument: Yup.mixed().required("+2 Document is required"),
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
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log("🔵 STEP 1: Form submission started");
      console.log("Payment Method:", values.paymentMethod);
      
      try {
        // Format subjects
        const formattedSubjects = values.subjects
          .split(",")
          .map((t, i) => ({ code: `SUB${i + 1}`, title: t.trim() }));

        // Prepare FormData
        const formData = new FormData();

        const payload = {
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
          contact: { phone: values.phone, email: values.email },
          academicRecords: values.academicRecords,
          tuRegistrationNo: values.tuRegistrationNo,
          semester: values.semester,
          year: values.year,
          batch: values.batch,
          collegeName: values.collegeName,
          examCenter: values.examCenter,
          course: values.course,
          subjects: formattedSubjects,
          paymentDetails: {
            amount: Number(values.paymentAmount),
            method: values.paymentMethod,
          },
        };

        formData.append("data", JSON.stringify(payload));
        formData.append("photo", values.photo);
        formData.append("citizenshipDocument", values.citizenshipDocument);
        formData.append("plusTwoDocument", values.plusTwoDocument);

        console.log("🔵 STEP 2: Saving draft...");
        
        // Step 1: Save draft
        const { data: draftResponse } = await axios.post(
          "http://localhost:5000/api/forms/draft",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token()}`,
            },
          }
        );

        console.log("🟢 Draft saved successfully:", draftResponse);

        const formId = draftResponse.draftId;
        const amount = Number(values.paymentAmount);

        if (!formId) {
          console.error("❌ Form ID missing");
          toast.error("Form ID missing. Draft not created.");
          setSubmitting(false);
          return;
        }

        // Step 2: Handle eSewa payment
        if (values.paymentMethod === "eSewa") {
          console.log("🔵 eSewa payment selected");
          toast.info("Redirecting to eSewa...");
            setSubmitting(false);    
          // Call eSewa immediately
          initiateEsewa({ formId, amount });
          
          // Don't set submitting to false - page will redirect
          return;
        }

        // Step 3: Normal form submission (non-eSewa)
        console.log("🔵 Non-eSewa payment - submitting form");
        
        await axios.post("http://localhost:5000/api/forms", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token()}`,
          },
        });

        console.log("✅ Form submitted successfully");
        toast.success("Form submitted successfully!");
        resetForm();
        setSubmitting(false);
        
      } catch (err) {
        console.error("❌ Form submission error:", err);
        console.error("Error details:", err.response?.data);
        toast.error(err.response?.data?.message || "Submission error.");
        setSubmitting(false);
      }
    },
  });

  // Academic Records helpers
  const addAcademicRecord = () => {
    formik.setFieldValue("academicRecords", [
      ...formik.values.academicRecords,
      {
        exam: "",
        board: "",
        year: "",
        rollNo: "",
        marks: "",
        percentage: "",
        division: "",
      },
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

  // Loading state
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Checking form availability...</p>
      </div>
    );
  }

  // Form closed state
  if (!isFormOpen) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>The exam form is currently closed.</h2>
        <p>Please check back later.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
      style={{ maxWidth: 700, margin: "auto", padding: "20px" }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Exam Registration Form</h2>

      {/* Personal Information Section */}
      <h3 style={{ borderBottom: "2px solid #1976d2", paddingBottom: "5px" }}>
        Personal Information
      </h3>

      {[
        { name: "fullName", label: "Full Name" },
        { name: "nationality", label: "Nationality" },
        { name: "dob", label: "Date of Birth", type: "date" },
        { name: "fatherName", label: "Father's Name" },
      ].map(({ name, label, type = "text" }) => (
        <div key={name} style={{ marginBottom: 15 }}>
          <label style={{ display: "block", marginBottom: 5, fontWeight: "500" }}>
            {label}
          </label>
          <input
            name={name}
            type={type}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={label}
            style={{
              width: "100%",
              padding: 8,
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
          {formik.touched[name] && formik.errors[name] && (
            <div style={{ color: "red", fontSize: "14px", marginTop: 5 }}>
              {formik.errors[name]}
            </div>
          )}
        </div>
      ))}

      {/* Address Section */}
      <h3 style={{ borderBottom: "2px solid #1976d2", paddingBottom: "5px", marginTop: 30 }}>
        Address
      </h3>

      {[
        { name: "province", label: "Province" },
        { name: "district", label: "District" },
        { name: "municipality", label: "Municipality" },
        { name: "ward", label: "Ward" },
      ].map(({ name, label }) => (
        <div key={name} style={{ marginBottom: 15 }}>
          <label style={{ display: "block", marginBottom: 5, fontWeight: "500" }}>
            {label}
          </label>
          <input
            name={name}
            type="text"
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={label}
            style={{
              width: "100%",
              padding: 8,
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
          {formik.touched[name] && formik.errors[name] && (
            <div style={{ color: "red", fontSize: "14px", marginTop: 5 }}>
              {formik.errors[name]}
            </div>
          )}
        </div>
      ))}

      {/* Contact Information */}
      <h3 style={{ borderBottom: "2px solid #1976d2", paddingBottom: "5px", marginTop: 30 }}>
        Contact Information
      </h3>

      {[
        { name: "phone", label: "Phone" },
        { name: "email", label: "Email", type: "email" },
      ].map(({ name, label, type = "text" }) => (
        <div key={name} style={{ marginBottom: 15 }}>
          <label style={{ display: "block", marginBottom: 5, fontWeight: "500" }}>
            {label}
          </label>
          <input
            name={name}
            type={type}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={label}
            style={{
              width: "100%",
              padding: 8,
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
          {formik.touched[name] && formik.errors[name] && (
            <div style={{ color: "red", fontSize: "14px", marginTop: 5 }}>
              {formik.errors[name]}
            </div>
          )}
        </div>
      ))}

      {/* Academic Information */}
      <h3 style={{ borderBottom: "2px solid #1976d2", paddingBottom: "5px", marginTop: 30 }}>
        Academic Information
      </h3>

      {[
        { name: "tuRegistrationNo", label: "TU Registration No." },
        { name: "semester", label: "Semester" },
        { name: "year", label: "Year" },
        { name: "batch", label: "Batch" },
        { name: "collegeName", label: "College Name" },
        { name: "examCenter", label: "Exam Center" },
      ].map(({ name, label }) => (
        <div key={name} style={{ marginBottom: 15 }}>
          <label style={{ display: "block", marginBottom: 5, fontWeight: "500" }}>
            {label}
          </label>
          <input
            name={name}
            type="text"
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={label}
            style={{
              width: "100%",
              padding: 8,
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          />
          {formik.touched[name] && formik.errors[name] && (
            <div style={{ color: "red", fontSize: "14px", marginTop: 5 }}>
              {formik.errors[name]}
            </div>
          )}
        </div>
      ))}

      {/* Course Selection */}
      <div style={{ marginBottom: 15 }}>
        <label style={{ display: "block", marginBottom: 5, fontWeight: "500" }}>
          Course
        </label>
        <select
          name="course"
          value={formik.values.course}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        >
          <option value="">Select a course</option>
          <option value="CSIT">CSIT</option>
          <option value="BIT">BIT</option>
          <option value="Engineering">Engineering</option>
          <option value="Management">Management</option>
          <option value="Arts">Arts</option>
          <option value="Law">Law</option>
        </select>
        {formik.touched.course && formik.errors.course && (
          <div style={{ color: "red", fontSize: "14px", marginTop: 5 }}>
            {formik.errors.course}
          </div>
        )}
      </div>

      {/* Academic Records */}
      <h3 style={{ borderBottom: "2px solid #1976d2", paddingBottom: "5px", marginTop: 30 }}>
        Academic Records
      </h3>

      {formik.values.academicRecords.map((record, idx) => (
        <div
          key={idx}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            borderRadius: 6,
            marginBottom: 15,
            position: "relative",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h4 style={{ marginTop: 0, marginBottom: 15 }}>Record {idx + 1}</h4>

          {formik.values.academicRecords.length > 1 && (
            <button
              type="button"
              onClick={() => removeAcademicRecord(idx)}
              style={{
                position: "absolute",
                right: 10,
                top: 10,
                background: "#d32f2f",
                color: "white",
                border: "none",
                borderRadius: 4,
                padding: "5px 10px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Remove
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
            <div key={name} style={{ marginBottom: 10 }}>
              <label style={{ display: "block", marginBottom: 3, fontSize: "14px" }}>
                {label}
              </label>
              <input
                type="text"
                value={formik.values.academicRecords[idx][name]}
                onChange={(e) =>
                  handleAcademicRecordChange(idx, name, e.target.value)
                }
                onBlur={formik.handleBlur}
                name={`academicRecords[${idx}].${name}`}
                placeholder={label}
                style={{
                  width: "100%",
                  padding: 6,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                }}
              />
              {formik.touched.academicRecords &&
              formik.touched.academicRecords[idx] &&
              formik.touched.academicRecords[idx][name] &&
              formik.errors.academicRecords &&
              formik.errors.academicRecords[idx] &&
              formik.errors.academicRecords[idx][name] ? (
                <div style={{ color: "red", fontSize: "12px", marginTop: 3 }}>
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
          fontSize: "14px",
        }}
      >
        + Add Academic Record
      </button>

      {/* Subjects */}
      <h3 style={{ borderBottom: "2px solid #1976d2", paddingBottom: "5px", marginTop: 30 }}>
        Subjects
      </h3>

      <div style={{ marginBottom: 15 }}>
        <label style={{ display: "block", marginBottom: 5, fontWeight: "500" }}>
          Subjects (comma separated)
        </label>
        <input
          name="subjects"
          type="text"
          value={formik.values.subjects}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Math, English, Physics"
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        />
        {formik.touched.subjects && formik.errors.subjects && (
          <div style={{ color: "red", fontSize: "14px", marginTop: 5 }}>
            {formik.errors.subjects}
          </div>
        )}
      </div>

      {/* Payment Information */}
      <h3 style={{ borderBottom: "2px solid #1976d2", paddingBottom: "5px", marginTop: 30 }}>
        Payment Information
      </h3>

      <div style={{ marginBottom: 15 }}>
        <label style={{ display: "block", marginBottom: 5, fontWeight: "500" }}>
          Payment Amount (NPR)
        </label>
        <input
          type="number"
          name="paymentAmount"
          value={formik.values.paymentAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="e.g. 2000"
          min="200"
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        />
        {formik.touched.paymentAmount && formik.errors.paymentAmount && (
          <div style={{ color: "red", fontSize: "14px", marginTop: 5 }}>
            {formik.errors.paymentAmount}
          </div>
        )}
      </div>

      <div style={{ marginBottom: 15 }}>
        <label style={{ display: "block", marginBottom: 5, fontWeight: "500" }}>
          Payment Method
        </label>
        <select
          name="paymentMethod"
          value={formik.values.paymentMethod}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        >
          <option value="">Select Method</option>
          <option value="eSewa">eSewa</option>
          <option value="Khalti">Khalti</option>
          <option value="Bank">Bank</option>
        </select>
        {formik.touched.paymentMethod && formik.errors.paymentMethod && (
          <div style={{ color: "red", fontSize: "14px", marginTop: 5 }}>
            {formik.errors.paymentMethod}
          </div>
        )}
      </div>

      {/* Document Uploads */}
      <h3 style={{ borderBottom: "2px solid #1976d2", paddingBottom: "5px", marginTop: 30 }}>
        Document Uploads
      </h3>

      <div style={{ marginBottom: 15 }}>
        <label style={{ display: "block", marginBottom: 5, fontWeight: "500" }}>
          +2 Document
        </label>
        <input
          name="plusTwoDocument"
          type="file"
          onChange={(e) =>
            formik.setFieldValue("plusTwoDocument", e.currentTarget.files[0])
          }
          onBlur={formik.handleBlur}
          accept="application/pdf,image/*"
          style={{ display: "block", marginTop: 6 }}
        />
        {formik.touched.plusTwoDocument && formik.errors.plusTwoDocument && (
          <div style={{ color: "red", fontSize: "14px", marginTop: 5 }}>
            {formik.errors.plusTwoDocument}
          </div>
        )}
      </div>

      <div style={{ marginBottom: 15 }}>
        <label style={{ display: "block", marginBottom: 5, fontWeight: "500" }}>
          Citizenship Document
        </label>
        <input
          name="citizenshipDocument"
          type="file"
          onChange={(e) =>
            formik.setFieldValue("citizenshipDocument", e.currentTarget.files[0])
          }
          onBlur={formik.handleBlur}
          accept="application/pdf,image/*"
          style={{ display: "block", marginTop: 6 }}
        />
        {formik.touched.citizenshipDocument && formik.errors.citizenshipDocument && (
          <div style={{ color: "red", fontSize: "14px", marginTop: 5 }}>
            {formik.errors.citizenshipDocument}
          </div>
        )}
      </div>

      <div style={{ marginBottom: 30 }}>
        <label style={{ display: "block", marginBottom: 5, fontWeight: "500" }}>
          Photo
        </label>
        <input
          name="photo"
          type="file"
          onChange={(e) => formik.setFieldValue("photo", e.currentTarget.files[0])}
          onBlur={formik.handleBlur}
          accept="image/*"
          style={{ display: "block", marginTop: 6 }}
        />
        {formik.touched.photo && formik.errors.photo && (
          <div style={{ color: "red", fontSize: "14px", marginTop: 5 }}>
            {formik.errors.photo}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        style={{
          width: "100%",
          padding: "12px 20px",
          background: formik.isSubmitting ? "#ccc" : "#4caf50",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: formik.isSubmitting ? "not-allowed" : "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        {formik.isSubmitting ? "Processing..." : "Submit Form"}
      </button>
    </form>
  );
}