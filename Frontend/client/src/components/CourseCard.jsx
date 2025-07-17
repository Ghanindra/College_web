// components/CourseCard.jsx
import React from "react";
import './CourseCard.css'; // optional for styling

export default function CourseCard({ title, image, description, deanMessage }) {
  return (
    <div className="course-card">
      <img src={image} alt={title} className="course-image" />
      <h2 className="course-title">{title}</h2>
      <p className="course-description">{description}</p>
      <div className="dean-message">
        <h4>Message from Dean</h4>
        <p>{deanMessage}</p>
      </div>
    </div>
  );
}
