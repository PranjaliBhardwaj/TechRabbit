import React from "react";
import "../Section.css";

function Section({ title, description, image, darkText }) {
  return (
    <div className="section">
      <div
        className="section-content"
        style={{ color: darkText ? "#000" : "#fff" }}
      >
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="section-image">
        <img src={image} alt={title} />
      </div>
    </div>
  );
}

export default Section;
