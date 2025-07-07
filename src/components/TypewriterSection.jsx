import React, { useState, useEffect } from "react";
import "../TypewriterSection.css";

function TypewriterSection() {
  const words = ["developer.", "designer.", "creator."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let typingSpeed = 150;

    if (isDeleting) {
      typingSpeed = 50;
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex, words]);

  return (
    <div className="typewriter-section">
      <h1>
        I am a <span className="typing">{displayText}</span>
      </h1>
    </div>
  );
}

export default TypewriterSection;
