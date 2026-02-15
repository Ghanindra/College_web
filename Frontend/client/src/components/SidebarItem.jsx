import React from 'react'
const SidebarItem = ({ label, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "10px",
        marginBottom: "10px",
        cursor: "pointer",
        background: active ? "#334155" : "transparent",
        borderRadius: "5px",
      }}
    >
      {label}
    </div>
  );
};
export default SidebarItem;