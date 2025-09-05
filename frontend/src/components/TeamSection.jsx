import React, { useEffect, useRef, useState } from "react";
import "../Section.css";

export default function TeamSection() {
  const members = [
    {
      name: "Pranjali Bhardwaj",
      role: "",
      image: "/pranjali.jpeg",
      linkedin: "https://www.linkedin.com/in/pranjali-bhardwaj-a33ba2294/",
      github: "https://github.com/PranjaliBhardwaj"
    },
    {
      name: "Pulkit Dadwal",
      role: "",
      image: "/pulkit.jpeg",
      linkedin: "https://www.linkedin.com/in/pulkit-dadwal-49a4a629b/",
      github: "https://github.com/PulkitDadwal"
    },
    {
      name: "Pranav Bhardwaj",
      role: "",
      image: "/pranav.jpeg",
      linkedin: "https://www.linkedin.com/in/pranav-bhardwaj-8a80152ab/",
      github: "https://www.github.com/prnnav"
    }
  ];

  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const runningRef = useRef(true);

  useEffect(() => {
    runningRef.current = true;
    const slideMs = 900; // smoother, longer slide
    const cooldownMs = 3000; // pause between slides

    const run = () => {
      if (!runningRef.current) return;
      // Kick off a CSS-driven transition from 0 -> 1
      setIsAnimating(false);
      setProgress(0);
      requestAnimationFrame(() => {
        setIsAnimating(true);
        setProgress(1);
      });
      // After slide completes, advance index and reset
      setTimeout(() => {
        setIsAnimating(false);
        setIndex((i) => (i + 1) % members.length);
        setProgress(0);
        if (runningRef.current) setTimeout(run, cooldownMs);
      }, slideMs);
    };

    const initial = setTimeout(run, cooldownMs);
    return () => {
      runningRef.current = false;
      clearTimeout(initial);
    };
  }, []);

  const current = members[index];
  const next = members[(index + 1) % members.length];

  return (
    <div className="section animate-in">
      <span className="section-decor decor-a" />
      <span className="section-decor decor-b" />

      <div className="section-content section-card" style={{ color: "#fff" }}>
        <span className="accent-badge">Our Team</span>
        <h2>Meet the Team</h2>
        <p>
          We are a small, passionate team building TechRabbit for learners and doers. We
          believe in accessible growth, clear guidance, and turning ideas into shipped work.
        </p>
      </div>

      <div className="section-image animate-in">
        <div className="image-frame" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Images */}
          <img
            src={current.image}
            alt={current.name}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
              transform: `translateX(${-progress * 100}%)`,
              transition: isAnimating ? 'transform 0.9s cubic-bezier(0.22, 0.61, 0.36, 1)' : 'none',
              willChange: 'transform', zIndex: 2, opacity: 1
            }}
          />
          <img
            src={next.image}
            alt={next.name}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
              transform: `translateX(${100 - progress * 100}%)`,
              transition: isAnimating ? 'transform 0.9s cubic-bezier(0.22, 0.61, 0.36, 1)' : 'none',
              willChange: 'transform', zIndex: 1
            }}
          />

          {/* Overlay: fixed bottom-left pill for current person (no sliding to avoid misalignment) */}
          <div style={{ position: 'absolute', bottom: 8, left: 8, pointerEvents: 'auto', zIndex: 4 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff', borderRadius: 999, padding: '6px 10px', backdropFilter: 'blur(4px)'
            }}>
              <span style={{ fontWeight: 700 }}>{current.name}</span>
              <span style={{ opacity: 0.9 }}>&middot; {current.role}</span>
              <a href={current.linkedin} target="_blank" rel="noreferrer" className="focus-ring" style={{ color: '#fff', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.45)', borderRadius: 999, padding: '4px 8px' }}>LinkedIn</a>
              <a href={current.github} target="_blank" rel="noreferrer" className="focus-ring" style={{ color: '#fff', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.45)', borderRadius: 999, padding: '4px 8px' }}>GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


