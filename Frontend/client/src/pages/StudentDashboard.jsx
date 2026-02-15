// import React, { useEffect, useState } from "react";
// import { useAuth } from "../context/useAuth";
// import axios from "axios";
// import ExamForm from "../pages/ExamForm";
// import ResultSearch from "../pages/ResultSearch"; // Import your existing result component

// const API_URL = "http://localhost:5000/api";

// const StudentDashboard = () => {
//   const { token, logout, user } = useAuth();
//   const [examForm, setExamForm] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!token) return;

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Fetch student exam form using the correct endpoint
//         const formRes = await axios.get(`${API_URL}/forms/student/my-form`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setExamForm(formRes.data || null);

//       } catch (err) {
//         console.error("Error fetching data:", err);
//         if (err.response?.status !== 401) {
//           setError("Failed to load dashboard data. Please try again.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [token]);

//   const handleFormSubmit = async () => {
//     // Refresh the form data after submission
//     try {
//       const formRes = await axios.get(`${API_URL}/forms/student/my-form`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setExamForm(formRes.data || null);
//       setShowEditForm(false);
//     } catch (err) {
//       console.error("Error refreshing form:", err);
//     }
//   };

//   const handleFormUpdate = async () => {
//     // Refresh the form data after update
//     try {
//       const formRes = await axios.get(`${API_URL}/forms/student/my-form`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setExamForm(formRes.data || null);
//       setShowEditForm(false);
//     } catch (err) {
//       console.error("Error refreshing form:", err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-xl text-gray-700">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800">
//                 Student Dashboard
//               </h1>
//               <p className="text-gray-600 mt-1">
//                 Welcome back, {user?.name || "Student"}!
//               </p>
//             </div>
//             <button
//               onClick={logout}
//               className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-200 font-medium"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Error Message */}
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//             {error}
//           </div>
//         )}

//         {/* Exam Form Section */}
//         <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">
//               📝 Your Exam Form
//             </h2>
//             {examForm && (
//               <StatusBadge status={examForm.paymentStatus} />
//             )}
//           </div>

//           {!examForm ? (
//             <div className="text-center py-8">
//               <div className="mb-6">
//                 <svg
//                   className="mx-auto h-24 w-24 text-gray-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                 No Exam Form Submitted
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 You haven't submitted your exam form yet. Please fill out the form below.
//               </p>
//               <ExamForm onSubmit={handleFormSubmit} />
//             </div>
//           ) : (
//             <div>
//               {/* Action Buttons */}
//               <div className="mb-6 flex gap-4">
//                 {examForm.paymentStatus !== "completed" && (
//                   <button
//                     onClick={() => setShowEditForm(!showEditForm)}
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200 font-medium flex items-center gap-2"
//                   >
//                     {showEditForm ? (
//                       <>
//                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                         View Form
//                       </>
//                     ) : (
//                       <>
//                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                         </svg>
//                         Edit Form
//                       </>
//                     )}
//                   </button>
//                 )}
                
//                 <button
//                   onClick={() => window.print()}
//                   className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition duration-200 font-medium flex items-center gap-2"
//                 >
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
//                   </svg>
//                   Print Form
//                 </button>
//               </div>

//               {/* Form Content */}
//               {showEditForm && examForm.paymentStatus !== "completed" ? (
//                 <ExamForm
//                   initialData={examForm}
//                   onSubmit={handleFormUpdate}
//                   isEditMode={true}
//                 />
//               ) : (
//                 <FormPreview form={examForm} />
//               )}

//               {/* Payment Status Message */}
//               {examForm.paymentStatus === "completed" && (
//                 <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
//                   <div className="flex items-center">
//                     <svg className="w-6 h-6 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <p className="text-green-800 font-medium">
//                       Your form has been submitted and payment is completed. You cannot edit it anymore.
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {examForm.paymentStatus === "pending" && (
//                 <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                   <div className="flex items-center">
//                     <svg className="w-6 h-6 text-yellow-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <p className="text-yellow-800 font-medium">
//                       Your payment is pending verification. You'll receive an email once it's approved.
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {examForm.paymentStatus === "rejected" && (
//                 <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
//                   <div className="flex items-center">
//                     <svg className="w-6 h-6 text-red-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <p className="text-red-800 font-medium">
//                       Your payment has been rejected. Please resubmit your form with correct payment details.
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Results Section */}
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//             <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//             </svg>
//             Your Results
//           </h2>
          
//           {/* Use your existing ResultSearch component */}
//           <ResultSearch />
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-white shadow-md mt-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <p className="text-center text-gray-600">
//             © 2025 Tribhuvan University. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// // Status Badge Component
// const StatusBadge = ({ status }) => {
//   const getStatusConfig = (status) => {
//     switch (status) {
//       case "completed":
//         return {
//           bg: "bg-green-100",
//           text: "text-green-800",
//           label: "Completed",
//           icon: (
//             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//             </svg>
//           ),
//         };
//       case "pending":
//         return {
//           bg: "bg-yellow-100",
//           text: "text-yellow-800",
//           label: "Pending",
//           icon: (
//             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
//             </svg>
//           ),
//         };
//       case "rejected":
//         return {
//           bg: "bg-red-100",
//           text: "text-red-800",
//           label: "Rejected",
//           icon: (
//             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//             </svg>
//           ),
//         };
//       default:
//         return {
//           bg: "bg-gray-100",
//           text: "text-gray-800",
//           label: status,
//           icon: null,
//         };
//     }
//   };

//   const config = getStatusConfig(status);

//   return (
//     <span className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
//       {config.icon}
//       {config.label}
//     </span>
//   );
// };

// // Form Preview Component
// const FormPreview = ({ form }) => {
//   return (
//     <div className="space-y-8">
//       {/* Personal Information */}
//       <div className="border-b border-gray-200 pb-6">
//         <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
//           <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//           </svg>
//           Personal Information
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <InfoField label="Full Name" value={form.fullName} />
//           <InfoField label="Date of Birth" value={form.dob} />
//           <InfoField label="Gender" value={form.gender} />
//           <InfoField label="TU Registration No" value={form.tuRegistrationNo} />
//           <InfoField label="Citizenship Number" value={form.citizenshipDocument} />
//           <InfoField label="Form ID" value={form._id} />
//         </div>
//       </div>

//       {/* Contact Information */}
//       <div className="border-b border-gray-200 pb-6">
//         <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
//           <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//           </svg>
//           Contact Information
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <InfoField label="Email" value={form.contact?.email} />
//           <InfoField label="Phone" value={form.contact?.phone} />
//         </div>
        
//         {/* Address Details */}
//         {form.address && (
//           <div className="mt-6">
//             <h4 className="text-md font-medium text-gray-700 mb-3">Address</h4>
//             {typeof form.address === 'object' && !Array.isArray(form.address) ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <InfoField label="Province" value={form.address.province} />
//                 <InfoField label="District" value={form.address.district} />
//                 <InfoField label="Municipality" value={form.address.municipality} />
//                 <InfoField label="Ward" value={form.address.ward} />
//               </div>
//             ) : (
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <p className="text-gray-900 font-medium">{formatAddress(form.address)}</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Academic Information */}
//       <div className="border-b border-gray-200 pb-6">
//         <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
//           <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path d="M12 14l9-5-9-5-9 5 9 5z" />
//             <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
//           </svg>
//           Academic Information
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <InfoField label="Faculty" value={form.faculty} />
//           <InfoField label="Program" value={form.program} />
//           <InfoField label="Year" value={form.year} />
//           <InfoField label="Semester" value={form.semester} />
//           <InfoField label="College Name" value={form.collegeName} />
//         </div>
//       </div>

//       {/* Exam Details */}
//       {form.examType && (
//         <div className="border-b border-gray-200 pb-6">
//           <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
//             <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//             </svg>
//             Exam Details
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <InfoField label="Exam Type" value={form.examType} />
//             <InfoField label="Exam Year" value={form.examYear} />
//           </div>
//         </div>
//       )}

//       {/* Uploaded Documents */}
//       <div className="border-b border-gray-200 pb-6">
//         <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
//           <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//           </svg>
//           Uploaded Documents
//         </h3>
//         <div className="space-y-3">
//           {form.photo && (
//             <DocumentLink label="Photo" filename={form.photo} />
//           )}
//           {form.citizenshipDocument && (
//             <DocumentLink
//               label="Citizenship Document"
//               filename={form.citizenshipDocument}
//             />
//           )}
//           {form.plusTwoDocument && (
//             <DocumentLink
//               label="+2 Document"
//               filename={form.plusTwoDocument}
//             />
//           )}
//         </div>
//       </div>

//       {/* Payment Information */}
//       {form.paymentDetails && (
//         <div>
//           <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
//             <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
//             </svg>
//             Payment Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <InfoField label="Payment Method" value={form.paymentDetails.method} />
//             <InfoField
//               label="Transaction ID"
//               value={form.paymentDetails.transactionId}
//             />
//             <InfoField label="Amount" value={`Rs. ${form.paymentDetails.amount || "N/A"}`} />
//             {form.paymentDetails.completedAt && (
//               <InfoField
//                 label="Completed At"
//                 value={new Date(form.paymentDetails.completedAt).toLocaleString()}
//               />
//             )}
//           </div>
//         </div>
//       )}

//       {/* Submission Date */}
//       <div className="pt-4">
//         <InfoField
//           label="Submitted On"
//           value={new Date(form.createdAt).toLocaleString()}
//         />
//       </div>
//     </div>
//   );
// };

// // Helper component for displaying information fields
// const InfoField = ({ label, value }) => (
//   <div className="bg-gray-50 p-4 rounded-lg">
//     <label className="block text-sm font-medium text-gray-600 mb-1">
//       {label}
//     </label>
//     <p className="text-gray-900 font-medium">{value || "N/A"}</p>
//   </div>
// );

// // Helper component for document links
// const DocumentLink = ({ label, filename }) => (
//   <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition duration-200">
//     <div className="flex items-center gap-3">
//       <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//       </svg>
//       <div>
//         <span className="text-sm font-medium text-gray-700">{label}</span>
//         <p className="text-xs text-gray-500">{filename}</p>
//       </div>
//     </div>
//     <a
//       href={`http://localhost:5000/uploads/${filename}`}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
//     >
//       View
//       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//       </svg>
//     </a>
//   </div>
// );

// // Helper function to format address
// const formatAddress = (address) => {
//   if (!address) return "N/A";
  
//   // If address is a string, return it directly
//   if (typeof address === "string") return address;
  
//   // If address is an object, format it
//   if (typeof address === "object") {
//     const parts = [];
//     if (address.ward) parts.push(`Ward ${address.ward}`);
//     if (address.municipality) parts.push(address.municipality);
//     if (address.district) parts.push(address.district);
//     if (address.province) parts.push(address.province);
//     return parts.length > 0 ? parts.join(", ") : "N/A";
//   }
  
//   return "N/A";
// };

// export default StudentDashboard;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import ExamForm from "../pages/ExamForm";
import SidebarItem from "../components/SidebarItem";
import DashboardOverview from "../components/DashboardOverview";
import FormDetails from "../components/FormDetails";
import ResultSearch from "../pages/ResultSearch";

const API_URL = "http://localhost:5000/api";

export default function StudentDashboard() {
  const { user, logout, token } = useAuth();

  const [activePage, setActivePage] = useState("dashboard");
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= FETCH STUDENT FORM =================
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/forms/student/my-form`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFormData(res.data || null);
      } catch (err) {
        console.error("Error fetching form:", err);
        setFormData(null);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchForm();
  }, [token]);

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f6f9" }}>
      
      {/* ================= SIDEBAR ================= */}
      <div
        style={{
          width: "250px",
          background: "#1e293b",
          color: "white",
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>Student Panel</h2>

        <SidebarItem
          label="Dashboard"
          active={activePage === "dashboard"}
          onClick={() => setActivePage("dashboard")}
        />

        <SidebarItem
          label="Fill Exam Form"
          active={activePage === "form"}
          onClick={() => setActivePage("form")}
        />

        <SidebarItem
          label="My Form Details"
          active={activePage === "details"}
          onClick={() => setActivePage("details")}
        />

        <SidebarItem
          label="Search Result"
          active={activePage === "result"}
          onClick={() => setActivePage("result")}
        />

        <button
          onClick={logout}
          style={{
            marginTop: "40px",
            background: "#dc2626",
            border: "none",
            padding: "10px",
            width: "100%",
            color: "white",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Logout
        </button>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div style={{ flex: 1, padding: "40px" }}>
        
        {activePage === "dashboard" && (
          <DashboardOverview user={user} formData={formData} />
        )}

        {activePage === "form" && <ExamForm />}

        {activePage === "details" && (
          formData ? (
            <FormDetails form={formData} token={token} />
          ) : (
            <p>You have not submitted any form yet.</p>
          )
        )}

        {activePage === "result" && <ResultSearch />}

      </div>
    </div>
  );
}
