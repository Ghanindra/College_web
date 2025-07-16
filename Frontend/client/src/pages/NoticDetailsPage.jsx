import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TuHeader from "../components/TuHeader";
import Footer from "../components/Footer";
import "./NoticeDetailsPage.css"; // CSS for this page

export default function NoticeDetailsPage() {
  const { id } = useParams();

  console.log("Notice ID being requested:", id);
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notices/${id}`);
        console.log("Fetched news detail:", res.data);
        setNews(res.data);
      } catch (err) {
        console.error("Failed to fetch news detail:", err);
      }
    };
    fetchNews();
  }, [id]);

  if (!news) return <p>Loading...</p>;

  return (
    <>
      <div className="NewsHeader"><TuHeader /></div>
      <main className="news-detail-container">
        <h1>{news.title}</h1>
        
        <p className="news-content">{news.content}</p>
        <p className="news-date">
          {new Date(news.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </main>
      <Footer />
    </>
  );
}
