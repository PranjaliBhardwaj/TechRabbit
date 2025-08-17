import React from "react";
import "../Section.css";

function Section({ title, description, image, darkText, isInView }) {
  return (
    <div className={`section ${isInView ? 'animate-in' : ''}`}>
      <div
        className={`section-content ${isInView ? 'animate-in' : ''}`}
        style={{ color: darkText ? "#000" : "#fff" }}
      >
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className={`section-image ${isInView ? 'animate-in' : ''}`}>
        <img src={image} alt={title} />
      </div>
    </div>
  );
}

export default Section;
