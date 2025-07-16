import React, { useEffect, useState } from "react";
import axios from "axios";
import './ExamRoutineGallery.css';

export default function ExamRoutineGallery() {
  const [imageUrl, setImageUrl] = useState(""); // single image URL string
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/routine")
      .then((res) => {
        console.log("API response data:", res.data);
        if (res.data.routine && res.data.routine.imageUrl) {
          // Build full URL including server origin
          const fullUrl = `http://localhost:5000${res.data.routine.imageUrl}`;
          setImageUrl(fullUrl);
        } else {
          setImageUrl("");
        }
      })
      .catch((err) => {
        setError("Failed to load image");
        console.error(err);
      });
  }, []);

  // Programmatic download handler
  const handleDownload = () => {
    fetch(imageUrl)
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "exam-routine.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert("Download failed"));
  };

  return (
    <div className="exam-routine-gallery">
      <h2>Exam Routine Gallery</h2>

      {error && <p className="error-message">{error}</p>}

      {!imageUrl && !error && <p className="no-images">No image found.</p>}

      {imageUrl && (
        <div className="gallery-item">
          <img src={imageUrl} alt="Exam Routine" />
          <button onClick={handleDownload} className="download-btn">
            Download
          </button>
        </div>
      )}
    </div>
  );
}
