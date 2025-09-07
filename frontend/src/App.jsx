import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Section from "./components/Section";
import CursorTrail from "./components/CursorTrail";
import sectionsData from "./data/sectionsData";
import Loader from "./components/Loader";
import Explore from "./components/Explore";
import CardDetail from "./components/CardDetail";
import CourseDetail from "./components/CourseDetail";
import NestedCardDetail from "./components/NestedCardDetail";
import UnifiedAdminDashboard from "./components/UnifiedAdminDashboard";
import AdminLogin from "./components/AdminLogin";
import Women_Corner from "./components/Women_Corner";
import WomenDetail from "./components/WomenDetail";
import Course_Hub from "./components/Course_Hub";
import Chat from "./components/Chat";
import ProfilePage from "./components/Profile";
import Login from "./components/Login";
import Freelancing_Page from "./components/Freelancing_Page";
import TeamSection from "./components/TeamSection";
import { SearchProvider } from "./contexts/SearchContext";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

function Landing() {
  const colors = ["#000", "#f5f5dc", "#add8e6", "#ffb6c1", "#90ee90", "#ffe4b5"];
  const [bgColor, setBgColor] = useState("#FF6B6B");
  const [activeSection, setActiveSection] = useState(0);
  const secondaries = ["#FF8E72","#FFE27A","#8EF3A0","#82B1FF","#C89CFF","#FFB3C7"];
  const brandColors = [
    "#FF6B6B", // vibrant coral
    "#FFD93D", // sunflower
    "#6BCB77", // fresh green
    "#4D96FF", // vivid blue
    "#B36BFF", // electric purple
    "#FF8FAB"  // rosy pink
  ];
  const gradientForIndex = (i) => `linear-gradient(135deg, ${brandColors[i]} 0%, ${secondaries[i]} 100%)`;
  const [baseGradient, setBaseGradient] = useState(gradientForIndex(0));
  const [overlayGradient, setOverlayGradient] = useState(gradientForIndex(0));
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [loading, setLoading] = useState(true);
  const mountAtRef = useRef(Date.now());
  // Typewriter in-hero: rotate focus domains
  const typewriterWords = ["courses", "internships", "scholarships", "mentorships"];
  const [twIndex, setTwIndex] = useState(0);
  const [twText, setTwText] = useState("");
  const [twDeleting, setTwDeleting] = useState(false);
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
      { threshold: 0.35 }
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
      const sections = document.querySelectorAll('.section');
      const mid = window.scrollY + window.innerHeight * 0.55;
      const heroBottom = window.innerHeight; // first screen height
      let active = 0;
      if (mid >= heroBottom) {
        sections.forEach((section, i) => {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          const bottom = top + height;
          if (mid >= top && mid < bottom) {
            active = i;
          }
          // Parallax: compute distance from viewport mid to section center
          const sectionCenter = top + height / 2;
          const distance = mid - sectionCenter; // px
          const ratio = Math.max(-1, Math.min(1, distance / window.innerHeight));
          const imageOffset = (ratio * -40).toFixed(2); // px
          const contentOffset = (ratio * 20).toFixed(2); // px
          section.style.setProperty('--parallaxImage', imageOffset + 'px');
          section.style.setProperty('--parallaxContent', contentOffset + 'px');

          // Handoff progress within section [0..1]
          const progress = Math.max(0, Math.min(1, (mid - top) / Math.max(1, height)));
          const travel = 110; // overshoot for clarity
          // Downward handoff (current -> next)
          const currentY = `${progress * travel}%`; // 0% -> 110%
          const nextY = `${travel - progress * travel}%`; // 110% -> 0%
          section.style.setProperty('--handoffCurrentY', currentY);
          section.style.setProperty('--handoffNextY', nextY);

          // Remove unused prev/current-from-prev vars (single stack now)
        });
      } else {
        // still in hero; keep first section colors without triggering jump
        active = 0;
      }
      const color = brandColors[active % brandColors.length];
      setBgColor(color);
      setActiveSection(active % brandColors.length);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const MIN_DELAY_MS = 2000;
    const resolveLoading = () => {
      const elapsed = Date.now() - mountAtRef.current;
      const remaining = Math.max(0, MIN_DELAY_MS - elapsed);
      if (remaining === 0) {
        setLoading(false);
      } else {
        const t = setTimeout(() => setLoading(false), remaining);
        return () => clearTimeout(t);
      }
    };

    if (document.readyState === 'complete') {
      return resolveLoading();
    }

    const onLoad = () => { resolveLoading(); };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  // Typewriter effect for hero (type → pause → delete → next)
  useEffect(() => {
    const current = typewriterWords[twIndex];
    let speed = twDeleting ? 45 : 110;
    const timer = setTimeout(() => {
      if (!twDeleting) {
        setTwText(current.substring(0, twText.length + 1));
        if (twText.length + 1 === current.length) {
          setTimeout(() => setTwDeleting(true), 900);
        }
      } else {
        setTwText(current.substring(0, twText.length - 1));
        if (twText.length === 0) {
          setTwDeleting(false);
          setTwIndex((i) => (i + 1) % typewriterWords.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [twText, twDeleting, twIndex]);

  // Crossfade background gradients on section change
  useEffect(() => {
    const nextGradient = `linear-gradient(135deg, ${bgColor} 0%, ${secondaries[activeSection]} 100%)`;
    setOverlayGradient(nextGradient);
    // fade in overlay
    requestAnimationFrame(() => setOverlayOpacity(1));
    const t = setTimeout(() => {
      setBaseGradient(nextGradient);
      setOverlayOpacity(0);
    }, 1000);
    return () => clearTimeout(t);
  }, [bgColor, activeSection]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      {/* Hero Section with brand-aligned gradient and centered CTA */}
      <div className="hero-wrapper" style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '48px 16px',
          background: 'linear-gradient(135deg, #a393c8 0%, #6b5bd6 40%, #2c2447 100%)',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden'
        }}>
        {/* decorative gradient blobs */}
        <span className="hero-decor hero-decor-1 float-animation" />
        <span className="hero-decor hero-decor-2 float-animation" />
        
        <div className="glass-card" style={{ maxWidth: 960, width: '100%' }}>
          <img
            src="/logo.png"
            alt="TechRabbit Logo"
            style={{ width: 100, height: 100, objectFit: 'contain', margin: '0 auto 16px auto', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.25))' }}
          />
          <h1 className="gradient-text" style={{ fontSize: 44, fontWeight: 800, margin: '8px 0' }}>Discover Tech Opportunities</h1>
          <p style={{ fontSize: 20, opacity: 0.95, margin: '0 0 16px 0' }}>
            Explore <span style={{ borderRight: '2px solid #fff', paddingRight: 4 }}>{twText}</span>
          </p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
            <span className="hero-chip">Courses</span>
            <span className="hero-chip">Internships</span>
            <span className="hero-chip">Scholarships</span>
            <span className="hero-chip">Mentorships</span>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/explore')}
              className="enhanced-button focus-ring"
            >
              Get Started
            </button>
            <button
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="button-ghost focus-ring"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="scroll-indicator" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <span />
        </div>
      </div>

      {/* Content Sections with smooth bg transitions on scroll */}
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: baseGradient,
          transition: 'none'
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: overlayGradient,
          opacity: overlayOpacity,
          transition: 'opacity 1000ms ease'
        }} />
        <div style={{ position: 'relative' }}>
        <CursorTrail />
        {sectionsData.map((section, index) => (
          <Section
            key={index}
            title={section.title}
            description={section.description}
            image={section.image}
            nextImage={sectionsData[(index + 1) % sectionsData.length].image}
            darkText={index >= 0}
            isInView={sectionsInView.has(index)}
          />
        ))}
        <TeamSection />
        </div>
      </div>
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
    <SearchProvider>
      <AuthProvider>
      <BrowserRouter>
        <BotIcon />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/:id" element={<CardDetail />} />
          <Route path="/nested-card/:parentId/:nestedId" element={<NestedCardDetail />} />
          <Route path="/course/:parentId/:nestedId" element={<CourseDetail />} />
          <Route path="/course-detail/:courseId" element={<CourseDetail />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<UnifiedAdminDashboard />} />
          <Route path="/women-corner" element={<Women_Corner />} />
          <Route path="/women-detail/:cardId" element={<WomenDetail />} />
          <Route path="/courses-hub" element={<Course_Hub />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/freelancing" element={<Freelancing_Page />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </SearchProvider>
  );
}

export default App;
