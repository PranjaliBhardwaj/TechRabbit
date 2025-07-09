import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import TypewriterSection from "./components/TypewriterSection";
import Section from "./components/Section";
import CursorTrail from "./components/CursorTrail";
import sectionsData from "./data/sectionsData";
import Loader from "./components/Loader";
import Explore from "./components/Explore";
import Women_Corner from "./components/Women_Corner";
import Course_Hub from "./components/Course_Hub";
import Chat from "./components/Chat";
import ProfilePage from "./components/Profile";
import Freelancing_Page from "./components/Freelancing_Page";
import "./App.css";

function Landing() {
  const colors = ["#000", "#f5f5dc", "#add8e6", "#ffb6c1", "#90ee90", "#ffe4b5"];
  const [bgColor, setBgColor] = useState(colors[0]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0 1rem 0' }}>
        <button
          style={{
            background: '#c1b2e5',
            color: '#17141f',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            border: 'none',
            borderRadius: '999px',
            padding: '0.75rem 2.5rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
          }}
          onClick={() => navigate('/explore')}
        >
          Get Started
        </button>
      </div>
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

// BotIcon component
function BotIcon() {
  const navigate = useNavigate();
  const location = useLocation();
  // Hide on landing and chat pages
  if (location.pathname === "/" || location.pathname === "/chat") return null;
  return (
    <button
      onClick={() => navigate("/chat")}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1000,
        background: "#c1b2e5",
        border: "none",
        borderRadius: "50%",
        width: 56,
        height: 56,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      aria-label="Open Chatbot"
    >
      <span style={{ fontSize: 28 }}>🤖</span>
    </button>
  );
}

function App() {
  return (
    <BrowserRouter>
      <BotIcon />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/women-corner" element={<Women_Corner />} />
        <Route path="/courses-hub" element={<Course_Hub />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/freelancing" element={<Freelancing_Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
