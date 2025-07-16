// Modal.js
import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1000,
        }}
        onClick={onClose}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          zIndex: 1001,
          maxHeight: "90vh",
          overflowY: "auto",
          width: "90%",
          maxWidth: "700px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
        }}
      >
        <button
          onClick={onClose}
          style={{
            float: "right",
            fontSize: "1.3rem",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            marginBottom: "10px",
          }}
          aria-label="Close Modal"
        >
          &times;
        </button>
        {children}
      </div>
    </>
  );
}
