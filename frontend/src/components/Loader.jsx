import React, { useEffect } from "react";
import "../Loader.css";

export default function Loader() {
  useEffect(() => {
    const rabbit = document.querySelector(".rabbit");

    const frameWidth = 150;
    const frameHeight = 122;
    const framesPerRow = 12;
    const totalFrames = 24;

    let currentFrame = 0;

    const interval = setInterval(() => {
      const row = Math.floor(currentFrame / framesPerRow);
      const col = currentFrame % framesPerRow;
      const x = -(col * frameWidth);
      const y = -(row * frameHeight);

      rabbit.style.backgroundPosition = `${x}px ${y}px`;

      currentFrame = (currentFrame + 1) % totalFrames;
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="loader">
      <div className="grass-container">
        <div className="grass"></div>
      </div>
      <div className="rabbit"></div>
    </div>
  );
}
