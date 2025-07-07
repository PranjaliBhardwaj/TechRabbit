import React, { useEffect, useRef } from "react";

export default function CursorTrail() {
  const circlesRef = useRef([]);

  const coords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      coords.current.x = e.clientX;
      coords.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    circlesRef.current.forEach((circle) => {
      circle.x = 0;
      circle.y = 0;
    });

    function animateCircles() {
      let x = coords.current.x;
      let y = coords.current.y;

      circlesRef.current.forEach((circle, index) => {
        if (!circle) return;

        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";

        const scale = (circlesRef.current.length - index) / circlesRef.current.length;
        circle.style.transform = `scale(${scale})`;

        circle.x = x;
        circle.y = y;

        const nextCircle = circlesRef.current[index + 1] || circlesRef.current[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
      });

      requestAnimationFrame(animateCircles);
    }

    animateCircles();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          ref={(el) => (circlesRef.current[index] = el)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 99999999,
            backgroundColor: "black"
          }}
        />
      ))}
    </>
  );
}
