// import React from 'react'
// import StatCard from '../components/StatCard'
// const DashboardOverview = ({  formData }) => {
//   const totalForms = formData ? 1 : 0;
//   const Form_status = formData?.approvalStatus || "Not Submitted";


//   return (
//     <div>
//       <h1>Welcome, {formData?.fullName}</h1>

//       <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
//         <StatCard title="Total Forms" value={totalForms} />
//         <StatCard title="Form Status" value={Form_status} />
//       </div>
//     </div>
//   );
// };
// export default DashboardOverview;


import React, { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import axios from 'axios';

const DashboardOverview = ({ formData, token }) => {
  const [totalForms, setTotalForms] = useState(0);

  const Form_status = formData?.approvalStatus || "Not Submitted";

  useEffect(() => {
    const fetchTotalForms = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/forms/student/my-form", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTotalForms(res.data.totalForms);
      } catch (err) {
        console.error("Failed to fetch total forms", err);
      }
    };

    if (formData) fetchTotalForms();
  }, [formData, token]);

  return (
    <div>
      <h1>Welcome, {formData?.fullName}</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        <StatCard title="Total Forms" value={totalForms} />
        <StatCard title="Form Status" value={Form_status} />
      </div>
    </div>
  );
};

export default DashboardOverview;
