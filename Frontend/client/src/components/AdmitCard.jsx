import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AdmitCard = ({ form }) => {
  const cardRef = useRef();

  if (!form) return <p>No form available.</p>;

  const handleDownload = async () => {
    const element = cardRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`AdmitCard-${form.fullName}.pdf`);
  };

  return (
    <div style={{ maxWidth: 700, margin: "20px auto", padding: 20 }}>
      <h2>Admit Card Preview</h2>

      <div
        ref={cardRef}
        style={{
          border: "2px solid #333",
          borderRadius: 10,
          padding: 20,
          background: "#f5f5f5",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: 10 }}>
          Tribhuvan University
        </h3>
        <h4 style={{ textAlign: "center", marginBottom: 20 }}>
          Examination Admit Card
        </h4>

        <p><strong>Name:</strong> {form.fullName}</p>
        <p><strong>TU Registration No:</strong> {form.tuRegistrationNo}</p>
        <p><strong>Semester:</strong> {form.semester}</p>
        <p><strong>Year:</strong> {form.year}</p>
        <p><strong>Course:</strong> {form.course}</p>
        <p><strong>Exam Center:</strong> {form.examCenter}</p>

        <h4>Subjects:</h4>
        <ul>
          {form.subjects?.map((sub, index) => (
            <li key={index}>{sub.code} - {sub.title}</li>
          ))}
        </ul>

        <p style={{ marginTop: 20 }}>Approved By: TU Examination Department</p>
      </div>

      {form.approvalStatus === "approved" && (
        <button
          onClick={handleDownload}
          style={{
            marginTop: 20,
            padding: "10px 20px",
            background: "#2e7d32",
            color: "#fff",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          Download Styled Admit Card
        </button>
      )}
    </div>
  );
};

export default AdmitCard;
