// import { Link } from "react-router-dom"
// import TuHeader from "../components/TuHeader"
// import graduation from "../assets/graduation.jpg"
// import deepak from "../assets/deepak.jpg"
// import activity1 from "../assets/activity1.jpg"
// import activity2 from "../assets/activity2.jpg"
// import activity3 from "../assets/activity3.jpg"
// import activity4 from "../assets/activity4.jpg"
// import hero1 from "../assets/hero1.jpg"
// import hero2 from "../assets/hero2.jpg"
// import hero3 from "../assets/hero3.jpg"
// import hero4 from "../assets/hero4.png"
// import axios from "axios"
// import "./Home.css"
// import { useState,useEffect } from "react"

// export default function HomePageTU() {

//   const [latestNews, setLatestNews] = useState([]);
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/notices?limit=4");
//         console.log("Fetched news:", res.data);
        
//         setLatestNews(res.data.notices || []);
//       } catch (error) {
//         console.error("Failed to fetch news:", error);
//       }
//     };

//     fetchNews();
//   }, []);



// useEffect(() => {
//   const fetchEvents = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/events?limit=4");
//       console.log("Fetched events:", res.data);
      
//       setEvents(res.data.events || []);
//     } catch (error) {
//       console.error("Failed to fetch events:", error);
//     }
//   };

//   fetchEvents();
// }, []);

// const heroData = [
//   {
//     image: hero1,
    
//     stats: [
//       {  label : "TU Senate" },
   
//     ],
//   },
//   {
//     image: hero2,

//     stats: [
//       {  label: "Dr. Deepak Aryal is taking a confidential oath with Prime Minister K.P. Oli to improve the university." },
     
//     ],
//   },
//   {
//     image: hero3,
    
//     stats: [
//       {  label: "The University Campus , Kritipur" },
 
//     ],
//   },
//   {
//     image: hero4,
   
//     stats: [
//       {  label: "Office Of Registrar, Building" },
    
  
//     ],
//   },
// ];
// const getRandomIndex = (exclude) => {
//   let index;
//   do {
//     index = Math.floor(Math.random() * heroData.length);
//   } while (index === exclude);
//   return index;
// };

// const [currentHeroIndex, setCurrentHeroIndex] = useState(() =>
//   Math.floor(Math.random() * heroData.length)
// );
// const handleHeroClick = () => {
//   const nextIndex = getRandomIndex(currentHeroIndex);
//   setCurrentHeroIndex(nextIndex);
// };
// const galleryData = [
//   {
//     image: activity1,
//     alt: 'Activity 1',
//     category: 'Seminar',
//     date: 'July 10, 2025',
//   },
//   {
//     image: activity2,
//     alt: 'Activity 2',
//     category: 'Sports',
//     date: 'June 28, 2025',
//   },
//   {
//     image: activity3,
//     alt: 'Activity 3',
//     category: 'Cultural Program',
//     date: 'May 15, 2025',
//   },
//   {
//     image: activity4,
//     alt: 'Activity 4',
//     category: 'Workshop',
//     date: 'April 5, 2025',
//   },
// ];
//   return (
//     <div className="page-container">
//       <div>
//         <TuHeader />
//       </div>
// <div
//   className="hero-section"
//   onClick={handleHeroClick}
//  style={{
//   backgroundImage: `url(${heroData[currentHeroIndex].image})`,
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   backgroundRepeat: "no-repeat",
//   position: "relative",
// filter: "contrast(120%) saturate(115%) brightness(0.9)",

//   // filter: "contrast(110%) saturate(110%)",
//   /* covers container without distortion */
// }}>



//   <div className="hero-overlay"></div>
//   <div className="hero-content">
//     <h1 className="hero-title">{heroData[currentHeroIndex].title}</h1>
//     <p className="hero-subtitle">{heroData[currentHeroIndex].subtitle}</p>
//     <div className="hero-stats">
//       {heroData[currentHeroIndex].stats.map((item, index) => (
//         <div className="stat-item" key={index}>
//           <span className="stat-number">{item.number}</span>
//           <span className="stat-label">{item.label}</span>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>

     
     
//       {/* News & Events Section */}
//       <section className="news-events-section">
//         <div className="news-section">
//           <div className="section-header">
//             <h2 className="section-title">Latest News</h2>
//             <Link to="/news" className="view-all-link">
//               View All
//             </Link>
//           </div>
//           <ul className="list">
  
// {latestNews.map((item) => (
//   <li className="list-item" key={item._id}>
//     <Link to={`/news/${item._id}`} className="news-link">
//       <div className="news-content">
//         <h3 className="news-title">{item.title}</h3>
//         <span className="news-date">
//           {new Date(item.date).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           })}
//         </span>
//       </div>
//       <span className="news-arrow">→</span>
//     </Link>
//   </li>
// ))}
// </ul>

//         </div>

//         <div className="events-section">
//           <div className="section-header">
//             <h2 className="section-title">Upcoming Events</h2>
//             <Link to="/events" className="view-all-link">
//               View All
//             </Link>
//           </div>
//        <ul className="list">
//   {events.map((event) => (
//     <li className="list-item event-item" key={event._id}>
//       <Link
//         to="/events"
//         state={{ selectedEventId: event._id }}
//         className="event-link-wrapper"
//       >
//         <div className="event-date">
//           <span className="event-day">{new Date(event.date).getDate()}</span>
//           <span className="event-month">
//             {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
//           </span>
//         </div>
//         <div className="event-details" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//           {/* Image */}
//           {event.imageUrl ? (
//             <img
//               src={`http://localhost:5000${event.imageUrl}`}  // Adjust base URL if needed
//               alt={event.title}
//               style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
//             />
//           ) : (
//             <div
//               style={{
//                 width: 80,
//                 height: 80,
//                 backgroundColor: "#ccc",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 borderRadius: 8,
//                 fontSize: 12,
//                 color: "#666",
//               }}
//             >
//               No Image
//             </div>
//           )}
//           <div>
//             <h3 className="event-title">{event.title}</h3>
//             <span className="event-location">{event.category || "TBA"}</span>
//           </div>
//         </div>
//       </Link>
//     </li>
//   ))}
// </ul>



//         </div>
//       </section>
// <section className="convocation-fixed-banner"   style={{
//     backgroundImage: `url(${graduation})`,
//     backgroundAttachment: "fixed",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//   }}>
//   <div className="convocation-overlay-content">
//     <h2 className="convocation-title">TU Convocation</h2>
//     <p className="convocation-description">
//       Tribhuvan University holds two types of convocations: regular and special.
//       Regular convocation is held every year for conferring Bachelor’s, Master’s,
//       Master in Philosophy (M.Phil.) and...
//     </p>
//     <Link to="/convocation" className="convocation-button">
//       More Detail
//     </Link>
//   </div>
// </section>

// <section className="vc-card-section">
//   <h2 className="vc-section-title">Message from the Vice Chancellor</h2>

//   <div className="vc-card">
//     <div className="vc-image-container">
//       <img src={deepak} alt="Vice Chancellor" className="vc-image" />
//     </div>
//     <div className="vc-info">
//       <h3 className="vc-name">Prof. Deepak Aryal, PhD</h3>
//       <p className="vc-role">Vice Chancellor</p>
//       <p className="vc-message-title">Message from the Vice Chancellor</p>
//       <p className="vc-snippet">
//         Dear Students, Faculty Members, Sta..
//       </p>
//       <Link to="/vice-chancellor" className="vc-more-button">More</Link>
//     </div>
//   </div>
// </section>

//   <section className="tu-activities-gallery">
//       <h2 className="gallery-title">TU Activities</h2>
//       <div className="gallery-grid">
//         {galleryData.map((item, index) => (
//           <div className="gallery-card" key={index}>
//             <img src={item.image} alt={item.alt} className="gallery-img" />
//             <div className="gallery-info">
//               <p className="gallery-category">{item.category}</p>
//               <p className="gallery-date">{item.date}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="gallery-more-container">
//         <Link to="/activities" className="gallery-more-button">More</Link>
//       </div>
//     </section>

//       {/* Footer */}
//       <footer className="page-footer">
//         <div className="footer-content">
//           <div className="footer-section">
//             <h3 className="footer-title">Tribhuvan University</h3>
//             <p className="footer-description">
//               Nepal's premier institution of higher education, committed to excellence in teaching, research, and
//               service.
//             </p>
//           </div>
//           <div className="footer-section">
//             <h4 className="footer-subtitle">Quick Links</h4>
//             <ul className="footer-links">
//               <li>
//                 <Link to="/about">About TU</Link>
//               </li>
//               <li>
//                 <Link to="/admissions">Admissions</Link>
//               </li>
//               <li>
//                 <Link to="/research">Research</Link>
//               </li>
//               <li>
//                 <Link to="/contact">Contact</Link>
//               </li>
//             </ul>
//           </div>
//           <div className="footer-section">
//             <h4 className="footer-subtitle">Contact Info</h4>
//             <div className="contact-info">
//               <p>📍 Kirtipur, Kathmandu, Nepal</p>
//               <p>📞 +977-1-4330433</p>
//               <p>✉️ info@tu.edu.np</p>
//             </div>
//           </div>
//         </div>
//         <div className="footer-bottom">
//           <p>Tribhuvan University © {new Date().getFullYear()} | All Rights Reserved</p>
//         </div>
//       </footer>
//     </div>
//   )
// }




import { Link } from "react-router-dom"
import TuHeader from "../components/TuHeader"
import graduation from "../assets/graduation.jpg"
import deepak from "../assets/deepak.jpg"
import activity1 from "../assets/activity1.jpg"
import activity2 from "../assets/activity2.jpg"
import activity3 from "../assets/activity3.jpg"
import activity4 from "../assets/activity4.jpg"
import hero1 from "../assets/hero1.jpg"
import hero2 from "../assets/hero2.jpg"
import hero3 from "../assets/hero3.jpg"
import hero4 from "../assets/hero4.png"
import axios from "axios"
import "./Home.css"
import { useState,useEffect } from "react"

export default function HomePageTU() {

  const [latestNews, setLatestNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
  const fetchActivities = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/activity");
      console.log("Fetched activities:", res.data);
      
      setActivities(res.data || []);
    } catch (error) {
      console.error("Failed to fetch TU activities:", error);
    }
  };

  fetchActivities();
}, []);


  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notices?limit=4");
        console.log("Fetched news:", res.data);
        
        setLatestNews(res.data.notices || []);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, []);



useEffect(() => {
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events?limit=4");
      console.log("Fetched events:", res.data);
      
      setEvents(res.data.events || []);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  fetchEvents();
}, []);

const heroData = [
  {
    image: hero1,
    
    stats: [
      {  label : "TU Senate" },
   
    ],
  },
  {
    image: hero2,

    stats: [
      {  label: "Dr. Deepak Aryal is taking a confidential oath with Prime Minister K.P. Oli to improve the university." },
     
    ],
  },
  {
    image: hero3,
    
    stats: [
      {  label: "The University Campus , Kritipur" },
 
    ],
  },
  {
    image: hero4,
   
    stats: [
      {  label: "Office Of Registrar, Building" },
    
  
    ],
  },
];
const getRandomIndex = (exclude) => {
  let index;
  do {
    index = Math.floor(Math.random() * heroData.length);
  } while (index === exclude);
  return index;
};

const [currentHeroIndex, setCurrentHeroIndex] = useState(() =>
  Math.floor(Math.random() * heroData.length)
);
const handleHeroClick = () => {
  const nextIndex = getRandomIndex(currentHeroIndex);
  setCurrentHeroIndex(nextIndex);
};
const galleryData = [
  {
    image: activity1,
    alt: 'Activity 1',
    category: 'Seminar',
    date: 'July 10, 2025',
  },
  {
    image: activity2,
    alt: 'Activity 2',
    category: 'Sports',
    date: 'June 28, 2025',
  },
  {
    image: activity3,
    alt: 'Activity 3',
    category: 'Cultural Program',
    date: 'May 15, 2025',
  },
  {
    image: activity4,
    alt: 'Activity 4',
    category: 'Workshop',
    date: 'April 5, 2025',
  },
];
  return (
    <div className="page-container">
      <div>
        <TuHeader />
      </div>
<div
  className="hero-section"
  onClick={handleHeroClick}
 style={{
  backgroundImage: `url(${heroData[currentHeroIndex].image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
filter: "contrast(120%) saturate(115%) brightness(0.9)",

  // filter: "contrast(110%) saturate(110%)",
  /* covers container without distortion */
}}>



  <div className="hero-overlay"></div>
  <div className="hero-content">
    <h1 className="hero-title">{heroData[currentHeroIndex].title}</h1>
    <p className="hero-subtitle">{heroData[currentHeroIndex].subtitle}</p>
    <div className="hero-stats">
      {heroData[currentHeroIndex].stats.map((item, index) => (
        <div className="stat-item" key={index}>
          <span className="stat-number">{item.number}</span>
          <span className="stat-label">{item.label}</span>
        </div>
      ))}
    </div>
  </div>
</div>

     
     
      {/* News & Events Section */}
      <section className="news-events-section">
        <div className="news-section">
          <div className="section-header">
            <h2 className="section-title">Latest News</h2>
            <Link to="/news" className="view-all-link">
              View All
            </Link>
          </div>
          <ul className="list">
  
{latestNews.map((item) => (
  <li className="list-item" key={item._id}>
    <Link to={`/news/${item._id}`} className="news-link">
      <div className="news-content">
        <h3 className="news-title">{item.title}</h3>
        <span className="news-date">
          {new Date(item.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <span className="news-arrow">→</span>
    </Link>
  </li>
))}
</ul>

        </div>

        <div className="events-section">
          <div className="section-header">
            <h2 className="section-title">Upcoming Events</h2>
            <Link to="/events" className="view-all-link">
              View All
            </Link>
          </div>
       <ul className="list">
  {events.map((event) => (
    <li className="list-item event-item" key={event._id}>
      <Link
        to="/events"
        state={{ selectedEventId: event._id }}
        className="event-link-wrapper"
      >
        <div className="event-date">
          <span className="event-day">{new Date(event.date).getDate()}</span>
          <span className="event-month">
            {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
          </span>
        </div>
        <div className="event-details" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Image */}
          {event.imageUrl ? (
            <img
              src={`http://localhost:5000${event.imageUrl}`}  // Adjust base URL if needed
              alt={event.title}
              style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
            />
          ) : (
            <div
              style={{
                width: 80,
                height: 80,
                backgroundColor: "#ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                fontSize: 12,
                color: "#666",
              }}
            >
              No Image
            </div>
          )}
          <div>
            <h3 className="event-title">{event.title}</h3>
            <span className="event-location">{event.category || "TBA"}</span>
          </div>
        </div>
      </Link>
    </li>
  ))}
</ul>



        </div>
      </section>
<section className="convocation-fixed-banner"   style={{
    backgroundImage: `url(${graduation})`,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}>
  <div className="convocation-overlay-content">
    <h2 className="convocation-title">TU Convocation</h2>
    <p className="convocation-description">
      Tribhuvan University holds two types of convocations: regular and special.
      Regular convocation is held every year for conferring Bachelor’s, Master’s,
      Master in Philosophy (M.Phil.) and...
    </p>
    <Link to="/convocation" className="convocation-button">
      More Detail
    </Link>
  </div>
</section>

<section className="vc-card-section">
  <h2 className="vc-section-title">Message from the Vice Chancellor</h2>

  <div className="vc-card">
    <div className="vc-image-container">
      <img src={deepak} alt="Vice Chancellor" className="vc-image" />
    </div>
    <div className="vc-info">
      <h3 className="vc-name">Prof. Deepak Aryal, PhD</h3>
      <p className="vc-role">Vice Chancellor</p>
      <p className="vc-message-title">Message from the Vice Chancellor</p>
      <p className="vc-snippet">
        Dear Students, Faculty Members, Sta..
      </p>
      <Link to="/vice-chancellor" className="vc-more-button">More</Link>
    </div>
  </div>
</section>
<section className="tu-activities-gallery">
  <h2 className="gallery-title">TU Activities</h2>
  <div className="gallery-grid">
    {activities.slice(0, 4).map((item) => (
      <div className="gallery-card" key={item._id}>
        {/* Only show image if imageUrl exists */}
        {item.imageUrl && (
          <img
            src={`http://localhost:5000${item.imageUrl}`}
            alt={item.title}
            className="gallery-img"
          />
        )}
        <div className="gallery-info">
          <p className="gallery-category">
            {item.type === "notice" ? "📢 Notice" : "📅 Event"}
          </p>
          <p className="gallery-date">
            {new Date(item.date).toLocaleDateString()}
          </p>
          <h3 style={{ fontSize: "1rem" }}>{item.title}</h3>
        </div>
      </div>
    ))}
  </div>

  <div className="gallery-more-container">
    <Link to="/activities" className="gallery-more-button">More</Link>
  </div>
</section>


      {/* Footer */}
      <footer className="page-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Tribhuvan University</h3>
            <p className="footer-description">
              Nepal's premier institution of higher education, committed to excellence in teaching, research, and
              service.
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/about">About TU</Link>
              </li>
              <li>
                <Link to="/admissions">Admissions</Link>
              </li>
              <li>
                <Link to="/research">Research</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-subtitle">Contact Info</h4>
            <div className="contact-info">
              <p>📍 Kirtipur, Kathmandu, Nepal</p>
              <p>📞 +977-1-4330433</p>
              <p>✉️ info@tu.edu.np</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Tribhuvan University © {new Date().getFullYear()} | All Rights Reserved</p>
        </div>
      </footer>
    </div>
  )
}
