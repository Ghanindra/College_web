import TuHeader from "../components/TuHeader"
import Footer from "../components/Footer"
import lila from '../assets/lila.jpg'
import deepak from '../assets/deepak.jpg'
import registrar from '../assets/registrar.jpg'
import rector from '../assets/rector.jpg'

import "./AboutUs.css" // Import the CSS file

export default function AboutUs() {
  return (
    <div className="about-container">
     <div className="aboutHeader"><TuHeader /></div> 
      <main className="about-content">
        <section className="hero-section">
          <h1 className="page-title">About Our College</h1>
          {/* <p className="page-description">Empowering Minds, Shaping Futures</p> */}
        </section>

        <section className="info-section">
          <h2 className="section-heading">Our Story</h2>
          <p>
           Tribhuvan University (TU),  established in 1959, is the first national institution of higher education in Nepal. The Central Administrative Office and the Central Campus of the university are located on the north eastern facade of Kirtipur, an ancient and small town located five kilometers away from Kathmandu city centre. The university covers over an area of 154.77 hectares (3042-5-2 ropanis) of land at Kirtipur.

 40After the second democratic movement of 2006, the Prime Minister of Nepal is the ceremonial chief, the Chancellor of the University, whereas the Minister of Education is the Pro-Chancellor. The Vice Chancellor is the Chief Executive of the university. Academic programmes are headed by the Rector the financial management and general administration are regulated by Registrar under the leadership of the Vice Chancellor.

Tribhuvan University is a non-profit making autonomous institution funded by the Government of Nepal. On January 8, 2013, the government of Nepal has principally agreed to declare Tribhuvan University as the Central University.

There are five institutes and four faculties under which 40 central departments, 64 constituent campuses, and 1053 affiliated colleges in different disciplines are running. Likewise, there are four research centres in TU Being one of the largest universities in the world in terms of its size and the diversity of programmes, it has been able to fulfill the requirements of large number of students.
          </p>
          <p>
            Over the decades, we have continuously adapted to the evolving educational landscape, introducing new
            programs, embracing modern teaching methodologies, and building state-of-the-art facilities. Our journey is
            marked by a commitment to providing accessible, high-quality education that prepares students for the
            challenges and opportunities of the future.
          </p>
        </section>

        <section className="info-section">
          <h2 className="section-heading">Mission & Vision</h2>
          <div className="mission-vision-grid">
            <div className="mission-vision-item">
              <h3>Mission</h3>
              <p>
                To provide a transformative educational experience that empowers students to achieve their full
                potential, become lifelong learners, and contribute positively to society through knowledge, leadership,
                and service.
              </p>
            </div>
            <div className="mission-vision-item">
              <h3>Vision</h3>
              <p>
                To be a globally recognized institution known for its innovative academic programs, impactful research,
                and a diverse, inclusive community that inspires excellence and ethical leadership.
              </p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="section-heading">Our Values</h2>
          <p>Our core values guide everything we do, shaping our community and our approach to education:</p>
          <ul className="values-list">
            <li>Integrity: Upholding honesty, ethical conduct, and transparency in all endeavors.</li>
            <li>Excellence: Striving for the highest standards in teaching, learning, and research.</li>
            <li>Innovation: Embracing creativity and forward-thinking approaches to education and problem-solving.</li>
            <li>
              Diversity & Inclusion: Fostering a welcoming environment that respects and celebrates all individuals.
            </li>
            <li>Community Engagement: Connecting with and contributing to local and global communities.</li>
            <li>Student Success: Prioritizing student well-being, academic achievement, and career readiness.</li>
          </ul>
        </section>

        <section className="info-section">
          <h2 className="section-heading">Our Team</h2>
          <p>
            Our dedicated faculty and staff are the heart of our institution, committed to nurturing talent and guiding
            students toward success.
          </p>
          <div className="team-grid">
            <div className="team-member">
              <img src={deepak}alt="Dr. Jane Doe" />
              <h4>Prof. Deepak Aryal, PhD</h4>
              <p>Vice chancellor</p>
            </div>
            <div className="team-member">
              <img src={rector} alt="Prof. John Smith" />
              <h4>Prof. Khadga K.C, PhD</h4>
              <p>Rector</p>
            </div>
            <div className="team-member">
              <img src={registrar} alt="Ms. Emily White" />
              <h4>Prof. Kedar Prasad Rijal, PhD </h4>
              <p>Registrar</p>
            </div>
            <div className="team-member">
              <img src={lila} alt="Mr. David Green" />
              <h4>Lilly Thapa Chhetri</h4>
              <p>Information Officer</p>
            </div>
          </div>
        </section>
      </main>
    <div className="aboutFooter"><Footer /></div>  
    </div>
  )
}
