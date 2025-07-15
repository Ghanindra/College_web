import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function NoticeDetailsPage() {
  const { id } = useParams();
  
console.log("Notice ID being requested:", id);
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notices/${id}`);
       console. log ("Fetched news detail:", res.data);
        setNews(res.data);
      } catch (err) {
        console.error("Failed to fetch news detail:", err);
      }
    };
    fetchNews();
  }, [id]);

  if (!news) return <p>Loading...</p>;

  return (
    <div className="news-detail-container">
      <h1>{news.title}</h1>
      <p>  {new Date(news.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
      <p>{news.content}</p>
      {/* Add more fields if available */}
    </div>
  );
}
