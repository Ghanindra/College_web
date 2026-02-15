


import React, { useState } from 'react';
import axios from 'axios';

const FormDetails = ({ form, token, onFormUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(form);
  const [files, setFiles] = useState({ photo: null, citizenshipDocument: null, plusTwoDocument: null });
// const token = () => localStorage.getItem("token");
  if (!form) return <p>No form submitted yet.</p>;
console.log("edit",token);

  const handleFileChange = (e) => {
    setFiles(prev => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleResubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Add files if updated
    if (files.photo) data.append('photo', files.photo);
    if (files.citizenshipDocument) data.append('citizenshipDocument', files.citizenshipDocument);
    if (files.plusTwoDocument) data.append('plusTwoDocument', files.plusTwoDocument);

    // Add form fields as JSON string
    data.append('data', JSON.stringify(formData));

    try {
      const res = await axios.put(
        `http://localhost:5000/api/forms/forms/${form._id}`,
        data,
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
      );
      alert('Form resubmitted successfully!');
      setIsEditing(false);
  if (onFormUpdated) onFormUpdated(res.data); // <-- safely call
    } catch (err) {
      console.error(err);
      alert('Failed to resubmit form');
    }
  };

  // Helper to render documents
  const renderDocument = (label, file) => {
    if (!file) return null;
    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file);
    const url = `http://localhost:5000${file}`;
    return (
      <div style={{ marginBottom: '10px' }}>
        <strong>{label}:</strong>{' '}
        {isImage ? (
          <img src={url} alt={label} style={{ width: '150px', borderRadius: '5px' }} />
        ) : (
          <a href={url} target="_blank" rel="noopener noreferrer">View Document</a>
        )}
      </div>
    );
  };

  if (isEditing) {
    // Edit form UI
    return (
      <form onSubmit={handleResubmit} style={{ maxWidth: '800px', margin: '20px auto', padding: '20px', background: '#fff', borderRadius: '10px' }}>
        <h2>Edit & Resubmit Form</h2>
        <div>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName || ''} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="contact.email" value={formData.contact?.email || ''} onChange={(e) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, email: e.target.value } }))} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="contact.phone" value={formData.contact?.phone || ''} onChange={(e) => setFormData(prev => ({ ...prev, contact: { ...prev.contact, phone: e.target.value } }))} required />
        </div>
        <div>
          <label>Photo:</label>
          <input type="file" name="photo" onChange={handleFileChange} />
        </div>
        <div>
          <label>Citizenship Document:</label>
          <input type="file" name="citizenshipDocument" onChange={handleFileChange} />
        </div>
        <div>
          <label>+2 Certificate:</label>
          <input type="file" name="plusTwoDocument" onChange={handleFileChange} />
        </div>
        <button type="submit">Resubmit Form</button>
        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
      </form>
    );
  }

  return (
    <div style={{ background: 'white', padding: '30px', borderRadius: '10px', maxWidth: '800px', margin: '20px auto' }}>
      <h2>Submitted Form Details</h2>
      <p><strong>Full Name:</strong> {form.fullName}</p>
      <p><strong>Email:</strong> {form.contact?.email}</p>
      <p><strong>Phone:</strong> {form.contact?.phone}</p>
      <p><strong>Payment Status:</strong> {form.paymentStatus}</p>
      <p><strong>Approval Status:</strong> {form.approvalStatus}</p>
      <h3>Documents</h3>
      {renderDocument('Photo', form.photo)}
      {renderDocument('Citizenship Document', form.citizenshipDocument)}
      {renderDocument('+2 Certificate', form.plusTwoDocument)}

      {/* Show Edit & Resubmit only if rejected */}
      {form.approvalStatus === 'rejected' && (
        <button onClick={() => setIsEditing(true)} style={{ marginTop: '20px' }}>
          Edit & Resubmit
        </button>
      )}
    </div>
  );
};

export default FormDetails;
