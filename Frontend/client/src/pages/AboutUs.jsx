import React from 'react';
import TuHeader from "../components/TuHeader";
import Footer from "../components/Footer";
import lila from '../assets/lila.jpg';
import deepak from '../assets/deepak.jpg';
import registrar from '../assets/registrar.jpg';
import rector from '../assets/rector.jpg';

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <TuHeader />

      {/* Hero Section */}
      <section className="relative w-full h-72 md:h-96 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 px-4 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2">About Our College</h1>
          <p className="text-lg sm:text-xl md:text-2xl">Empowering Minds, Shaping Futures</p>
        </div>
      </section>

      <main className="flex-1 py-12 space-y-16 flex flex-col items-center">
        {/* Our Story */}
        <section className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Tribhuvan University (TU), established in 1959, is the first national institution of higher education in Nepal.
            The Central Administrative Office and the Central Campus of the university are located on the north eastern facade
            of Kirtipur, an ancient and small town located five kilometers away from Kathmandu city centre. The university covers
            over an area of 154.77 hectares (3042-5-2 ropanis) of land at Kirtipur.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            After the second democratic movement of 2006, the Prime Minister of Nepal is the ceremonial chief, the Chancellor
            of the University, whereas the Minister of Education is the Pro-Chancellor. The Vice Chancellor is the Chief Executive
            of the university. Academic programmes are headed by the Rector, and financial management and general administration
            are regulated by the Registrar under the leadership of the Vice Chancellor.
          </p>
          <p className="text-gray-700 leading-relaxed">
            TU is a non-profit autonomous institution funded by the Government of Nepal. There are five institutes and four
            faculties under which 40 central departments, 64 constituent campuses, and 1053 affiliated colleges operate. Likewise,
            there are four research centres. TU is one of the largest universities in the world in terms of size and diversity
            of programmes, fulfilling the needs of a large number of students.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4">Mission</h3>
            <p className="text-white">
              To provide a transformative educational experience that empowers students to achieve their full potential,
              become lifelong learners, and contribute positively to society through knowledge, leadership, and service.
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4">Vision</h3>
            <p className="text-white">
              To be a globally recognized institution known for its innovative academic programs, impactful research,
              and a diverse, inclusive community that inspires excellence and ethical leadership.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Our Values</h2>
          <p className="text-gray-700 mb-4 text-center">
            Our core values guide everything we do, shaping our community and our approach to education:
          </p>
          <ul className="list-decimal list-inside space-y-3 text-gray-700 ml-4">
            <li><strong>Integrity:</strong> Upholding honesty, ethical conduct, and transparency in all endeavors.</li>
            <li><strong>Excellence:</strong> Striving for the highest standards in teaching, learning, and research.</li>
            <li><strong>Innovation:</strong> Embracing creativity and forward-thinking approaches to education and problem-solving.</li>
            <li><strong>Diversity & Inclusion:</strong> Fostering a welcoming environment that respects and celebrates all individuals.</li>
            <li><strong>Community Engagement:</strong> Connecting with and contributing to local and global communities.</li>
            <li><strong>Student Success:</strong> Prioritizing student well-being, academic achievement, and career readiness.</li>
          </ul>
        </section>

        {/* Our Team */}
        <section className="w-full max-w-6xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Our Team</h2>
          <p className="text-gray-700 text-center mb-8">
            Our dedicated faculty and staff are the heart of our institution, committed to nurturing talent and guiding students toward success.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
            {[{img: deepak, name: 'Prof. Deepak Aryal, PhD', role: 'Vice Chancellor'},
              {img: rector, name: 'Prof. Khadga K.C, PhD', role: 'Rector'},
              {img: registrar, name: 'Prof. Kedar Prasad Rijal, PhD', role: 'Registrar'},
              {img: lila, name: 'Lilly Thapa Chhetri', role: 'Information Officer'}].map((member, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all text-center transform hover:-translate-y-2 duration-300">
                <img src={member.img} alt={member.name} className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-indigo-500" />
                <h4 className="font-semibold text-lg">{member.name}</h4>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}