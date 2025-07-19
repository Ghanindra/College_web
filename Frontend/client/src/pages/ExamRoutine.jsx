import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./ExamRoutine.css"; 
import { toast } from "react-toastify";
export default function ExamRoutineUpload() {
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null); 

  // Fetch latest uploaded image URL on component mount
  useEffect(() => {
    fetchLatestRoutine();
  }, []);

  // Fetch latest routine info from backend
  const fetchLatestRoutine = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/routine");
      if (res.data && res.data.routine && res.data.routine.imageUrl) {
        setImageUrl("http://localhost:5000" + res.data.routine.imageUrl);
      } else {
        setImageUrl(null);
      }
    } catch (error) {
      console.error("Failed to fetch routine image", error);
      setImageUrl(null);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.info("Please upload an image file");
      return;
    }

    const formData = new FormData();
    formData.append("examRoutine", file); // must match multer field name

    try {
      const res = await axios.post("http://localhost:5000/api/routine/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);

      // After successful upload, fetch latest image URL to display
      fetchLatestRoutine();
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Upload failed");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
return (
  <div className="exam-routine-upload">
    <h2>Upload Exam Routine</h2>

    <div className="upload-card">
      <label className="file-input-wrapper">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          name="examRoutine"
          onChange={handleImageChange}
        />
        <span className="upload-btn">📤 Choose Image</span>
      </label>

      {imageUrl && (
        <div className="preview-wrapper">
          <h3>Uploaded Exam Routine:</h3>
          <img
            src={imageUrl}
            alt="Uploaded Exam Routine"
            className="preview-img"
          />
        </div>
      )}
    </div>
  </div>
);
}
