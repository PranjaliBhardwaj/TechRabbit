import React from "react";
import "../Section.css";

function Section({ title, description, image, nextImage, darkText, isInView }) {
  return (
    <div className={`section ${isInView ? 'animate-in' : ''}`}>
      {/* decorative blurred blobs */}
      <span className="section-decor decor-a" />
      <span className="section-decor decor-b" />

      <div
        className={`section-content section-card ${isInView ? 'animate-in' : ''}`}
        style={{ color: darkText ? "#000" : "#fff" }}
      >
        <span className="accent-badge">Featured</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className={`section-image ${isInView ? 'animate-in' : ''}`}>
        <div className="image-frame image-handoff">
          <img className="image-current" src={image} alt={title} />
          <img className="image-next" src={nextImage} alt={title + ' next'} />
        </div>
      </div>
    </div>
  );
}

export default Section;
