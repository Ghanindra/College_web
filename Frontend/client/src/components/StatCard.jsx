import React from 'react'
const StatCard = ({ title, value }) => {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "200px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
};
export default StatCard;