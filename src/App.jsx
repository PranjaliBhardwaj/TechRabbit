import React, { useEffect, useState } from "react";
import TypewriterSection from "./components/TypewriterSection";
import Section from "./components/Section";
import CursorTrail from "./components/CursorTrail";
import sectionsData from "./data/sectionsData";
import Loader from "./components/Loader"; // ✅ Import your Loader component
import "./App.css";

function App() {
  const colors = ["#000", "#f5f5dc", "#add8e6", "#ffb6c1", "#90ee90", "#ffe4b5"];
  const [bgColor, setBgColor] = useState(colors[0]);
  const [loading, setLoading] = useState(true); // ✅ Add loader state

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".section, .typewriter-section");
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        if (
          scrollPosition >= section.offsetTop &&
          scrollPosition < section.offsetTop + section.offsetHeight
        ) {
          if (index > 0) {
            setBgColor(colors[index]);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // ✅ Show loader for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // ✅ If loading, render only Loader
  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className="App"
      style={{
        backgroundColor: bgColor,
        transition: "background-color 0.8s ease"
      }}
    >
      <CursorTrail />
      <TypewriterSection />
      {sectionsData.map((section, index) => (
        <Section
          key={index}
          title={section.title}
          description={section.description}
          image={section.image}
          darkText={index >= 0}
        />
      ))}
    </div>
  );
}

export default App;
