import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Base_Url from '../api/Base_Url'
import {SERVER_URL} from '../api/Base_Url'
export default function ExamRoutineUpload() {
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);

  // Fetch latest uploaded image URL on component mount
  useEffect(() => {
    fetchLatestRoutine();
  }, []);

  const fetchLatestRoutine = async () => {
    try {
      const res = await axios.get(`${Base_Url}/routine`);
      if (res.data && res.data.routine && res.data.routine.imageUrl) {
        setImageUrl(`${SERVER_URL}` + res.data.routine.imageUrl);
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
    formData.append("examRoutine", file);

    try {
      const res = await axios.post(
        `${Base_Url}/routine/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success(res.data.message);
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
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4 md:p-8 lg:p-16">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 text-white px-6 py-4">
          <h1 className="text-2xl font-semibold">Upload Exam Routine</h1>
          <p className="text-sm opacity-90">
            Select and upload the latest exam routine
          </p>
        </div>

        {/* Upload Card */}
        <div className="p-6 space-y-6">
          <label className="w-full flex flex-col items-center px-6 py-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              name="examRoutine"
              className="hidden"
              onChange={handleImageChange}
            />
            <span className="text-indigo-600 font-semibold text-lg flex items-center gap-2">
              📤 Choose Image
            </span>
            <p className="text-gray-500 text-sm mt-2">
              Supported formats: JPG, PNG, GIF
            </p>
          </label>

          {imageUrl && (
            <div className="preview-wrapper mt-6">
              <h3 className="text-gray-700 font-semibold mb-2">Uploaded Exam Routine:</h3>
              <div className="w-full h-auto border rounded-lg overflow-hidden shadow-sm">
                <img
                  src={imageUrl}
                  alt="Uploaded Exam Routine"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}