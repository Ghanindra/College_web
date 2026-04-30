// pages/Courses.jsx
import React from "react";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const courses = [
    {
      id: "bsc-csit",
      title: "BSc CSIT",
      image: "/images/csit.jpg",
      description: "Bachelor of Science in Computer Science and Information Technology...",
      deanMessage: "Our CSIT program is designed to build strong logical and technical skills..."
    },
    {
        id: "bba",
      title: "BBA",
      image: "/images/bba.jpg",
      description: "Bachelor of Business Administration helps build a strong foundation in management...",
      deanMessage: "We aim to create capable leaders in the business world..."
    },
    {    id: "bed",
      title: "BEd",
      image: "/images/bed.jpg",
      description: "Bachelor in Education focuses on modern teaching techniques...",
      deanMessage: "We nurture future educators with core values and innovation..."
    },
    // Add more courses here...
  ];

  return (
    <div className="courses-container">
      <h1>Our Academic Programs</h1>
      <div className="course-list">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            title={course.title}
            image={course.image}
            description={course.description}
            deanMessage={course.deanMessage}
          />
        ))}
      </div>
    </div>
  );
}
