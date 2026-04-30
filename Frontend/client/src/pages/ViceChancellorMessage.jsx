// pages/ViceChancellorMessage.jsx
import React from "react";
import TuHeader from "../components/TuHeader";
import Footer from "../components/Footer";
import vcImg from "../assets/deepak.jpg"; 

export default function ViceChancellorMessage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <TuHeader />

      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
            Message from the Vice Chancellor
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white mt-4 drop-shadow-md">
            Prof. Deepak Aryal, PhD
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Text Section */}
          <div className="lg:col-span-2 space-y-6 text-gray-700">
            <p>
              Dear Students, Faculty Members, Staff, Alumni, Parents, and Friends of Tribhuvan University,
            </p>
            <p>
              It is a great honour to serve as the Vice Chancellor of Tribhuvan University, Nepal’s oldest, largest, and most pivotal academic institution. Since its establishment in 1959, TU has been the foundation of higher education in the country, serving students across disciplines, generations, and geographies. Today, it stands as a symbol of both national progress and academic aspiration.
            </p>
            <p>
              As we move forward in a rapidly evolving world, we are committed to ensuring that Tribhuvan University continues to provide inclusive, globally informed, and relevant education. We aim to uphold academic integrity at all levels, foster creativity in the classroom, and continually improve the quality of teaching and learning.
            </p>
            <p>
              Research and knowledge creation are central to our mission as a national university. We will support projects that address local needs while contributing to the global body of knowledge. Every faculty and department, from science and technology, social sciences, management, medicine, agriculture, forestry, engineering, education and law has a role to play in advancing society through rigorous inquiry and collaboration.
            </p>
            <p>
              Tribhuvan University is a vibrant network of campuses, academic programs, and diverse communities. Strengthening this network, through better communication, resource sharing, digital transformation, and infrastructure development, will be essential to our collective progress. Our goal is to ensure that every faculty, department, and campus thrives with equal opportunities for growth and success.
            </p>
            <p>
              We remain committed to building strong international partnerships and academic collaborations, as well as engaging more actively with our alumni and broader communities. Tribhuvan University must reflect both Nepali values and global standards. We will work closely with private enterprises, community-based organizations (CBOs), governmental and non-governmental organizations (GOs and NGOs), and other partners to broaden our impact and promote practical, evidence-based solutions.
            </p>
            <p>
              To our vibrant students, I encourage you to study with purpose, think critically, and serve with integrity. The future of TU lies in your ambition and curiosity.
            </p>
            <p>
              To our dedicated faculty and staff, thank you for your tireless efforts. Your knowledge, commitment, and continuous service are the foundation of this remarkable institution. I urge you to continue growing, adopting innovative teaching practices, and nurturing a culture of mentorship and excellence.
            </p>
            <p>
              To our esteemed alumni, parents, and well-wishers, your engagement strengthens our shared mission. Your support, experience, and collaboration are invaluable. Let us work together to build Tribhuvan University into a leading center of education, research, and innovation.
            </p>
            <p>
              Together, let us uphold the honour of Tribhuvan University and help it grow as a truly national and globally respected institution.
            </p>
          </div>

          {/* Image Section */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-xs rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1">
              <img
                src={vcImg}
                alt="Prof. Deepak Aryal"
                className="w-full h-full object-cover"
              />
              <div className="p-4 text-center bg-white">
                <p className="font-semibold text-gray-900">Prof. Deepak Aryal, PhD</p>
                <p className="text-gray-600">Vice Chancellor</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}