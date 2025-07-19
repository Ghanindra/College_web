import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export default function FormConfig() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/forms/form-config", {
      formType: "examForm",
      startTime,
      endTime,
    });
    toast.success("Form schedule updated.");
  setStartTime("");
      setEndTime("");
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h3>Set Exam Form Timing</h3>
      <label>Start Time:</label>
      <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />

      <label>End Time:</label>
      <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />

      <button type="submit">Save</button>
    </form>
  );
}
