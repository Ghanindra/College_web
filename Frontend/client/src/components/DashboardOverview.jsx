import React from 'react'
import StatCard from '../components/StatCard'
const DashboardOverview = ({ user, formData }) => {
  const totalForms = formData ? 1 : 0;
  const status = formData?.paymentStatus || "Not Submitted";

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        <StatCard title="Total Forms" value={totalForms} />
        <StatCard title="Status" value={status} />
      </div>
    </div>
  );
};
export default DashboardOverview;