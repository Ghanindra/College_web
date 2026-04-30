import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TuHeader from "../components/TuHeader";
import Footer from "../components/Footer";
import Base_Url from '../api/Base_Url'
import {SERVER_URL} from '../api/Base_Url'
const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [zoomImage, setZoomImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`${Base_Url}/gallery`);
        console.log("Fetched gallery items:", res.data);
        const filteredItems = res.data.filter((item) => item.imageUrl);
        setGalleryItems(filteredItems);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      }
    };
    fetchGallery();
  }, []);

  return (
    <>
      {/* Sticky Navy Header */}
      <div className="sticky top-0 z-50 w-full shadow-md" style={{ backgroundColor: "#0B3C5D" }}>
        <TuHeader />
      </div>

      {/* Hero Banner */}
      <section
        className="relative h-56 sm:h-72 md:h-80 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/gallery-banner.jpg')` }}
      >
        <div
          className="absolute inset-0 flex items-end pb-8 px-6 sm:px-12"
          style={{ backgroundColor: "rgba(11,60,93,0.75)" }}
        >
          <div>
            <p className="text-sm mb-1" style={{ color: "#D4AF37" }}>
              <Link to="/" className="hover:underline" style={{ color: "#D4AF37" }}>
                Home
              </Link>{" "}
              / Gallery
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Gallery
            </h1>
            <div className="mt-2 w-14 h-1 rounded" style={{ backgroundColor: "#D4AF37" }} />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={{ backgroundColor: "#F5F7FA" }} className="py-14 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">

          {/* Section Title */}
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "#0B3C5D" }}>
              Photo Gallery
            </h2>
            <div className="mt-2 mx-auto w-14 h-1 rounded" style={{ backgroundColor: "#D4AF37" }} />
          </div>

          {galleryItems.length === 0 ? (
            <p className="text-center text-gray-400 py-16">No gallery items found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {galleryItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl overflow-hidden shadow border border-gray-100 cursor-pointer transition-transform duration-200 hover:scale-[1.02] hover:shadow-md"
                  onClick={() => setZoomImage(`${SERVER_URL}${item.imageUrl}`)}
                >
                  <div className="overflow-hidden h-48 sm:h-52">
                    <img
                      src={`${SERVER_URL}${item.imageUrl}`}
                      alt={item.title || "Gallery Image"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 border-t" style={{ borderColor: "#E5E7EB" }}>
                    <h3 className="text-sm sm:text-base font-semibold leading-snug mb-1" style={{ color: "#1F2937" }}>
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {new Date(item.uploadedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {zoomImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={zoomImage}
              alt="Zoomed"
              className="w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
            <button
              className="absolute top-3 right-3 text-white text-sm font-semibold px-4 py-1.5 rounded-full transition-colors"
              style={{ backgroundColor: "#0B3C5D" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1D4ED8")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#0B3C5D")}
              onClick={() => setZoomImage(null)}
            >
              Close ✕
            </button>
          </div>
        </div>
      )}

      <div className="w-full">
        <Footer />
      </div>
    </>
  );
};

export default GalleryPage;