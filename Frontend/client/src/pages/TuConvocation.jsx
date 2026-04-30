// pages/TuConvocation.jsx
import React from "react";
import TuHeader from "../components/TuHeader";
import Footer from "../components/Footer";
import bgImage from "../assets/graduation.jpg"; // full background image
import sideImage from "../assets/convocation-side.png"; // image on the right

export default function TuConvocation() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <TuHeader />

      {/* Hero Section */}
      <section
        className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            Tribhuvan University Convocation
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white max-w-3xl mx-auto drop-shadow-md">
            Celebrating academic excellence and new beginnings for our graduates.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              About the Convocation
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Tribhuvan University holds two types of convocations: regular and special. Regular convocation is held every year for conferring Bachelor’s, Master’s, Master in Philosophy (M.Phil.), and Doctor of Philosophy (Ph.D.) degrees to students who have successfully completed their academic programs. It is a prestigious event attended by graduates, faculty, dignitaries, and family members, celebrating academic excellence and the beginning of new journeys.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Special convocations, on the other hand, are organized as needed to honor distinguished individuals with honorary degrees or to mark exceptional achievements and milestones in the university’s history.
            </p>
          </div>

          {/* Image Section */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1">
              <img
                src={sideImage}
                alt="Convocation Ceremony"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}