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
import AdminDashboard from './components/AdminDashboard';
import "./App.css";

function Landing() {
  const colors = ["#000", "#f5f5dc", "#add8e6", "#ffb6c1", "#90ee90", "#ffe4b5"];
  const [bgColor, setBgColor] = useState(colors[0]);
  const [loading, setLoading] = useState(true);
  const [sectionsInView, setSectionsInView] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    // Intersection Observer for section animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = parseInt(entry.target.dataset.sectionIndex);
            setSectionsInView(prev => new Set([...prev, sectionIndex]));
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe sections after a delay to ensure they're rendered
    setTimeout(() => {
      const sections = document.querySelectorAll('.section');
      sections.forEach((section, index) => {
        section.dataset.sectionIndex = index;
        observer.observe(section);
      });
    }, 100);

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
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className="App"
      style={{
        backgroundColor: bgColor,
        transition: "background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      <div 
        className="animate-fade-in-up" 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          padding: '2rem 0 1rem 0',
          animationDelay: '2.2s',
          opacity: 0,
          animation: 'fadeInUp 0.8s ease-out 2.2s forwards'
        }}
      >
        <button
          className="enhanced-button"
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
          isInView={sectionsInView.has(index)}
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
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#c1b2e5] to-[#a393c8] border-none rounded-full w-14 h-14 shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-purple-400/25 group"
      aria-label="Open Chatbot"
    >
      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🤖</span>
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
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
