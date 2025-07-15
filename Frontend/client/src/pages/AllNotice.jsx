import { useEffect, useState } from "react";
import axios from "axios";
import "./AllNotice.css"; 
import TuHeader from "../components/TuHeader"; 
import noticebanner from "../assets/noticebanner.png";
export default function NoticePage() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notices"); 
        setNotices(res.data.notices || []);
      } catch (err) {
        console.error("Failed to fetch notices:", err);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="notice-page">
       <div className="noticeHeader">
          <TuHeader />
        </div>
          {/* Banner below header */}
      <div
        className="banner-section"
        style={{
          backgroundImage: `url(${noticebanner})`,
          backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
filter: "contrast(120%) saturate(115%) brightness(0.9)",
        }}
      >
        All Notices
      </div>
      <h2>All Notices</h2>
      <ul className="notice-list">
        {notices.map((notice) => (
          <li key={notice._id} className="notice-item">
            <h3>{notice.title}</h3>
               <p>{notice.content}</p>
            <p className="notice-date">
              {new Date(notice.date).toLocaleDateString()}
            </p>
         
          </li>
        ))}
      </ul>
    </div>
  );
}
