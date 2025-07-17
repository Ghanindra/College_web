// pages/TuConvocation.jsx
import React from "react";
import TuHeader from "../components/TuHeader";
import Footer from "../components/Footer";
import "./TuConvocation.css";

import bgImage from "../assets/graduation.jpg"; // full background image
import sideImage from "../assets/convocation-side.png"; // image on the right

export default function TuConvocation() {
  return (
    <>
     <div className="convocationHeader"><TuHeader /></div>

      <div
        className="convocation-container"
        style={{ backgroundImage: `url(${bgImage})` }}
      >     </div>
        <div className="convocation-overlay">
          <div className="convocation-content">
            <div className="convocation-left">
              <h2>Tribhuvan University Convocation</h2>
              <p>
              Tribhuvan University holds two types of convocations: regular and special. Regular convocation is held every year for conferring Bachelor’s, Master’s, Master in Philosophy (M.Phil.), and Doctor of Philosophy (Ph.D.) degrees to students who have successfully completed their academic programs. It is a prestigious event attended by graduates, faculty, dignitaries, and family members, celebrating academic excellence and the beginning of new journeys. Special convocations, on the other hand, are organized as needed to honor distinguished individuals with honorary degrees or to mark exceptional achievements and milestones in the university’s history.
              </p>
              {/* <p>
                This special event is held once a year and marks an important
                milestone for graduates, parents, and faculty members.
              </p> */}
            </div>

            <div className="convocation-right">
              <img src={sideImage} alt="Convocation Ceremony" />
            </div>
          </div>
        </div>
 

      <Footer />
    </>
  );
}
