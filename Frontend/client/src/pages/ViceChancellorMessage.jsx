import React from "react";
import TuHeader from "../components/TuHeader";
import Footer from "../components/Footer";
import vcImg from "../assets/deepak.jpg"; 
import "./vicechancellormessage.css";  
export default function ViceChancellorMessage() {
  return (
    <>
     <div className="Message"><TuHeader /></div> 
      <div className="vc-message-container">
        <div className="vc-message-content">
          <div className="vc-left">
            <h2>Message from the Vice Chancellor</h2>
            <p><strong>Prof. Deepak Aryal, PhD</strong><br />Vice Chancellor</p>
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
          <div className="vc-right">
            <img src={vcImg} alt="Prof. Deepak Aryal" />
            <p className="vc-name">Prof. Deepak Aryal, PhD<br />Vice Chancellor</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
