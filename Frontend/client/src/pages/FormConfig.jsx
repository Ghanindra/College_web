import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Base_Url from '../api/Base_Url'

export default function FormConfig() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${Base_Url}/forms/form-config`, {
        formType: "examForm",
        startTime,
        endTime,
      });
      toast.success("Form schedule updated.");
      setStartTime("");
      setEndTime("");
    } catch (err) {
      toast.error("Failed to update form schedule.");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 space-y-4"
      >
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
          Set Exam Form Timing
        </h3>

        <div className="flex flex-col space-y-2">
          <label className="font-medium text-gray-700">Start Time:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-medium text-gray-700">End Time:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 mt-4"
        >
          Save
        </button>
      </form>
    </div>
  );
}