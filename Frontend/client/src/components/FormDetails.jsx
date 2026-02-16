


// import React, { useState } from 'react';
// import axios from 'axios';

// const FormDetails = ({ form, token, onFormUpdated }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState(form);
//   const [files, setFiles] = useState({ photo: null, citizenshipDocument: null, plusTwoDocument: null });
// // const token = () => localStorage.getItem("token");
//   if (!form) return <p>No form submitted yet.</p>;
// console.log("edit",token);

//   const handleFileChange = (e) => {
//     setFiles(prev => ({ ...prev, [e.target.name]: e.target.files[0] }));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleResubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();

//     // Add files if updated
//     if (files.photo) data.append('photo', files.photo);
//     if (files.citizenshipDocument) data.append('citizenshipDocument', files.citizenshipDocument);
//     if (files.plusTwoDocument) data.append('plusTwoDocument', files.plusTwoDocument);

//     // Add form fields as JSON string
//     data.append('data', JSON.stringify(formData));

//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/forms/forms/${form._id}`,
//         data,
//         { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
//       );
//       alert('Form resubmitted successfully!');
//       setIsEditing(false);
//   if (onFormUpdated) onFormUpdated(res.data); // <-- safely call
//     } catch (err) {
//       console.error(err);
//       alert('Failed to resubmit form');
//     }
//   };

//   // Helper to render documents
//   const renderDocument = (label, file) => {
//     if (!file) return null;
//     const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file);
//     const url = `http://localhost:5000${file}`;
//     return (
//       <div style={{ marginBottom: '10px' }}>
//         <strong>{label}:</strong>{' '}
//         {isImage ? (
//           <img src={url} alt={label} style={{ width: '150px', borderRadius: '5px' }} />
//         ) : (
//           <a href={url} target="_blank" rel="noopener noreferrer">View Document</a>
//         )}
//       </div>
//     );
//   };

//   if (isEditing) {
//     // Edit form UI
//     return (
//       <form onSubmit={handleResubmit} style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', background: '#fff', borderRadius: '10px' }}>
//         <h2>Edit & Resubmit Form</h2>
//         <div>
//           <label>Full Name:</label>
//           <input type="text" name="fullName" value={formData.fullName || ''} onChange={handleInputChange} required />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="contact.email" value={formData.contact?.email || ''} onChange={(e) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, email: e.target.value } }))} required />
//         </div>
//         <div>
//           <label>Phone:</label>
//           <input type="text" name="contact.phone" value={formData.contact?.phone || ''} onChange={(e) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, phone: e.target.value } }))} required />
//         </div>
//         <div>
//           <label>Photo:</label>
//           <input type="file" name="photo" onChange={handleFileChange} />
//         </div>
//         <div>
//           <label>Citizenship Document:</label>
//           <input type="file" name="citizenshipDocument" onChange={handleFileChange} />
//         </div>
//         <div>
//           <label>+2 Certificate:</label>
//           <input type="file" name="plusTwoDocument" onChange={handleFileChange} />
//         </div>
//         <button type="submit">Resubmit Form</button>
//         <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
//       </form>
//     );
//   }

//   return (
//     <div style={{ background: 'white', padding: '30px', borderRadius: '10px', maxWidth: '800px', margin: '20px auto' }}>
//       <h2>Submitted Form Details</h2>
//       <p><strong>Full Name:</strong> {form.fullName}</p>
//       <p><strong>Email:</strong> {form.contact?.email}</p>
//       <p><strong>Phone:</strong> {form.contact?.phone}</p>
//       <p><strong>Payment Status:</strong> {form.paymentStatus}</p>
//       <p><strong>Approval Status:</strong> {form.approvalStatus}</p>
//       <h3>Documents</h3>
//       {renderDocument('Photo', form.photo)}
//       {renderDocument('Citizenship Document', form.citizenshipDocument)}
//       {renderDocument('+2 Certificate', form.plusTwoDocument)}

//       {/* Show Edit & Resubmit only if rejected */}
//       {form.approvalStatus === 'rejected' && (
//         <button onClick={() => setIsEditing(true)} style={{ marginTop: '20px' }}>
//           Edit & Resubmit
//         </button>
//       )}
//     </div>
//   );
// };

// export default FormDetails;



import React, { useState } from 'react';
import axios from 'axios';
import AdmitCard from "../components/AdmitCard";
const FormDetails = ({ form, token, onFormUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(form);
  const [files, setFiles] = useState({
    photo: null,
    citizenshipDocument: null,
    plusTwoDocument: null
  });

  if (!form) return <p>No form submitted yet.</p>;

  // =========================
  // Handlers
  // =========================
// const handleDownloadAdmitCard = async () => {
//   try {
//     const response = await axios.get(
//       `http://localhost:5000/api/forms/forms/${form._id}/admit-card`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         responseType: "blob"
//       }
//     );

//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "AdmitCard.pdf");
//     document.body.appendChild(link);
//     link.click();
//     link.remove();

//   } catch (error) {
//     console.error(error);
//     alert("Unable to download admit card");
//   }
// };

  const handleFileChange = (e) => {
    setFiles(prev => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Academic Records
  const handleAcademicChange = (index, field, value) => {
    const updated = [...(formData.academicRecords || [])];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, academicRecords: updated }));
  };

  const addAcademicRecord = () => {
    setFormData(prev => ({
      ...prev,
      academicRecords: [
        ...(prev.academicRecords || []),
        { exam: '', board: '', year: '', rollNo: '', marks: '', percentage: '', division: '' }
      ]
    }));
  };

  // Subjects
  const handleSubjectChange = (index, field, value) => {
    const updated = [...(formData.subjects || [])];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, subjects: updated }));
  };

  const addSubject = () => {
    setFormData(prev => ({
      ...prev,
      subjects: [
        ...(prev.subjects || []),
        { code: '', title: '' }
      ]
    }));
  };

  // =========================
  // Resubmit
  // =========================

  const handleResubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    if (files.photo) data.append('photo', files.photo);
    if (files.citizenshipDocument) data.append('citizenshipDocument', files.citizenshipDocument);
    if (files.plusTwoDocument) data.append('plusTwoDocument', files.plusTwoDocument);

    data.append('data', JSON.stringify(formData));

    try {
      const res = await axios.put(
        `http://localhost:5000/api/forms/forms/${form._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      alert('Form resubmitted successfully!');
      setIsEditing(false);
      if (onFormUpdated) onFormUpdated(res.data.form);

    } catch (err) {
      console.error(err);
      alert('Failed to resubmit form');
    }
  };

  // =========================
  // Document Renderer
  // =========================

  const renderDocument = (label, file) => {
    if (!file) return null;
    const url = `http://localhost:5000${file}`;
    return (
      <div>
        <strong>{label}:</strong>{" "}
        <a href={url} target="_blank" rel="noopener noreferrer">
          View
        </a>
      </div>
    );
  };

  // =========================
  // EDIT MODE
  // =========================

  if (isEditing) {
    return (
      <form onSubmit={handleResubmit} style={{ maxWidth: 900, margin: "20px auto", padding: 20, background: "#fff", borderRadius: 10 }}>
        <h2>Edit & Resubmit Form</h2>

        {/* Basic Info */}
        <input name="fullName" value={formData.fullName || ''} onChange={handleInputChange} placeholder="Full Name" required />
        <input name="nationality" value={formData.nationality || ''} onChange={handleInputChange} placeholder="Nationality" />
        <input type="date" name="dob"
          value={formData.dob ? formData.dob.substring(0,10) : ''}
          onChange={handleInputChange}
        />
        <input name="fatherName" value={formData.fatherName || ''} onChange={handleInputChange} placeholder="Father Name" />

        {/* Address */}
        <h4>Address</h4>
        <input value={formData.address?.province || ''} placeholder="Province"
          onChange={(e)=>handleNestedChange('address','province',e.target.value)} />
        <input value={formData.address?.district || ''} placeholder="District"
          onChange={(e)=>handleNestedChange('address','district',e.target.value)} />
        <input value={formData.address?.municipality || ''} placeholder="Municipality"
          onChange={(e)=>handleNestedChange('address','municipality',e.target.value)} />
        <input value={formData.address?.ward || ''} placeholder="Ward"
          onChange={(e)=>handleNestedChange('address','ward',e.target.value)} />

        {/* Contact */}
        <h4>Contact</h4>
        <input value={formData.contact?.email || ''} placeholder="Email"
          onChange={(e)=>handleNestedChange('contact','email',e.target.value)} required />
        <input value={formData.contact?.phone || ''} placeholder="Phone"
          onChange={(e)=>handleNestedChange('contact','phone',e.target.value)} required />

        {/* Academic Records */}
        <h4>Academic Records</h4>
        {(formData.academicRecords || []).map((record, index) => (
          <div key={index} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
            <input placeholder="Exam" value={record.exam}
              onChange={(e)=>handleAcademicChange(index,'exam',e.target.value)} />
            <input placeholder="Board" value={record.board}
              onChange={(e)=>handleAcademicChange(index,'board',e.target.value)} />
            <input placeholder="Year" value={record.year}
              onChange={(e)=>handleAcademicChange(index,'year',e.target.value)} />
            <input placeholder="Roll No" value={record.rollNo}
              onChange={(e)=>handleAcademicChange(index,'rollNo',e.target.value)} />
            <input placeholder="Marks" value={record.marks}
              onChange={(e)=>handleAcademicChange(index,'marks',e.target.value)} />
            <input placeholder="Percentage" value={record.percentage}
              onChange={(e)=>handleAcademicChange(index,'percentage',e.target.value)} />
            <input placeholder="Division" value={record.division}
              onChange={(e)=>handleAcademicChange(index,'division',e.target.value)} />
          </div>
        ))}
        <button type="button" onClick={addAcademicRecord}>Add Academic Record</button>

        {/* TU Info */}
        <h4>TU Information</h4>
        <input name="tuRegistrationNo" value={formData.tuRegistrationNo || ''} onChange={handleInputChange} placeholder="TU Registration No" />
        <input name="semester" value={formData.semester || ''} onChange={handleInputChange} placeholder="Semester" />
        <input name="year" value={formData.year || ''} onChange={handleInputChange} placeholder="Year" />
        <input name="batch" value={formData.batch || ''} onChange={handleInputChange} placeholder="Batch" />
        <input name="collegeName" value={formData.collegeName || ''} onChange={handleInputChange} placeholder="College Name" />
        <input name="course" value={formData.course || ''} onChange={handleInputChange} placeholder="Course" />
        <input name="examCenter" value={formData.examCenter || ''} onChange={handleInputChange} placeholder="Exam Center" />

        {/* Subjects */}
        <h4>Subjects</h4>
        {(formData.subjects || []).map((sub, index) => (
          <div key={index}>
            <input placeholder="Subject Code"
              value={sub.code}
              onChange={(e)=>handleSubjectChange(index,'code',e.target.value)} />
            <input placeholder="Subject Title"
              value={sub.title}
              onChange={(e)=>handleSubjectChange(index,'title',e.target.value)} />
          </div>
        ))}
        <button type="button" onClick={addSubject}>Add Subject</button>

        {/* Files */}
        <h4>Documents</h4>
        <input type="file" name="photo" onChange={handleFileChange} />
        <input type="file" name="citizenshipDocument" onChange={handleFileChange} />
        <input type="file" name="plusTwoDocument" onChange={handleFileChange} />

        <br /><br />
        <button type="submit">Resubmit Form</button>
        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
      </form>
    );
  }

  // =========================
  // VIEW MODE
  // =========================

  return (
    <div style={{ background: 'white', padding: 30, borderRadius: 10, maxWidth: 900, margin: '20px auto' }}>
      <h2>Submitted Form Details</h2>

      <p><strong>Name:</strong> {form.fullName}</p>
      <p><strong>Nationality:</strong> {form.nationality}</p>
      <p><strong>DOB:</strong> {form.dob?.substring(0,10)}</p>
      <p><strong>Father Name:</strong> {form.fatherName}</p>

      <h4>Address</h4>
      <p>Province:{form.address?.province}</p> 
      <p>  District:{form.address?.district}</p>
      <p>Muncipality:{form.address?.municipality} </p>
      <p> Ward: {form.address?.ward}</p>

      <h4>Contact</h4>
      <p>{form.contact?.email}</p>
      <p>{form.contact?.phone}</p>
<h4>Academic Records</h4>
{form.academicRecords && form.academicRecords.length > 0 ? (
  form.academicRecords.map((record, index) => (
    <div key={index} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
      <p><strong>Exam:</strong> {record.exam}</p>
      <p><strong>Board:</strong> {record.board}</p>
      <p><strong>Year:</strong> {record.year}</p>
      <p><strong>Roll No:</strong> {record.rollNo}</p>
      <p><strong>Marks:</strong> {record.marks}</p>
      <p><strong>Percentage:</strong> {record.percentage}</p>
      <p><strong>Division:</strong> {record.division}</p>
    </div>
  ))
) : (
  <p>No academic records available.</p>
)}

      <h4>TU Info</h4>
      <p>Reg No: {form.tuRegistrationNo}</p>
      <p>Semester: {form.semester}</p>
      <p>Year: {form.year}</p>
      <p>Batch: {form.batch}</p>
      <p>College: {form.collegeName}</p>
      <p>Course: {form.course}</p>
      <p>Exam Center: {form.examCenter}</p>
<h4>Subjects</h4>
{form.subjects && form.subjects.length > 0 ? (
  form.subjects.map((sub, index) => (
    <div key={index} style={{ marginBottom: 5 }}>
      <p>
        <strong>{sub.code}</strong> - {sub.title}
      </p>
    </div>
  ))
) : (
  <p>No subjects added.</p>
)}

      <p><strong>Payment Status:</strong> {form.paymentStatus}</p>
      <p><strong>Approval Status:</strong> {form.approvalStatus}</p>

      <h4>Documents</h4>
      {renderDocument("Photo", form.photo)}
      {renderDocument("Citizenship", form.citizenshipDocument)}
      {renderDocument("+2 Certificate", form.plusTwoDocument)}

      {form.approvalStatus === 'rejected' && (
        <button onClick={() => setIsEditing(true)} style={{ marginTop: 20 }}>
          Edit & Resubmit
        </button>
        
      )}
      {/* {form.approvalStatus === "approved" && (
  <button
    onClick={handleDownloadAdmitCard}
    style={{
      marginTop: 20,
      background: "#2e7d32",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: 5,
      cursor: "pointer"
    }}
  >
    Download Admit Card
  </button>
)} */}
   <AdmitCard form={form} token={token} />
    </div>
  );
};

export default FormDetails;
