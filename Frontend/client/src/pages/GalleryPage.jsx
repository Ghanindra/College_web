import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TuHeader from "../components/TuHeader";
import Footer from "../components/Footer";
import "./gallerypage.css"; // You need to create/edit this

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [zoomImage, setZoomImage] = useState(null); // for lightbox

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/gallery");
        console.log("Fetched gallery items:", res.data);
        const filteredItems = res.data.filter(item => item.imageUrl);
        setGalleryItems(filteredItems);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      }
    };

    fetchGallery();
  }, []);

  return (
    <>
      <div className="galleryHeader">
        <TuHeader />
      </div>

      <section
        className="gallery-hero"
        style={{
          backgroundImage: `url('/images/gallery-banner.jpg')`, // Replace with your image path
        }}
      >
        <div className="gallery-overlay">
          <div className="gallery-heading">
            <p className="breadcrumb"><Link to="/">Home</Link> / Gallery</p>
            <h1>Gallery</h1>
          </div>
        </div>
      </section>

      <section className="gallery-container">
        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div className="gallery-card" key={item._id}>
              <img
                src={`http://localhost:5000${item.imageUrl}`}
                alt={item.title || "Gallery Image"}
                className="gallery-image"
                onClick={() => setZoomImage(`http://localhost:5000${item.imageUrl}`)}
              />
              <div className="gallery-info">
                <h3>{item.title}</h3>
                <p> {new Date(item.uploadedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {zoomImage && (
        <div className="lightbox" onClick={() => setZoomImage(null)}>
          <img src={zoomImage} alt="Zoomed" />
        </div>
      )}

      <Footer />
    </>
  );
};

export default GalleryPage;
