import React, { useEffect, useState } from "react";
import "../../tailwind.css";
import Header from "./Header";
import ContentGrid from "./ContentGrid";

const API_URL = "http://localhost:5000";

const Explore = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        // Fetch all cards and filter for explore sections
        const res = await fetch(`${API_URL}/cards`);
        const data = await res.json();
        // Filter cards that belong to explore sections
        const exploreCards = data.filter(card => 
          ['scholarship', 'internship', 'course', 'opensource', 'extracurricular'].includes(card.section)
        );
        setCards(exploreCards);
      } catch (err) {
        setCards([]);
      }
      setLoading(false);
    };
    fetchCards();
  }, []);

  return (
    <div
      className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#14181f] via-[#1a1a2e] to-[#16213e] overflow-x-hidden page-transition"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <Header />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main */}
      <main className="px-40 py-5 flex flex-1 justify-center relative z-10">
        <div className="flex flex-col max-w-[960px] w-full">
          <div className="p-4 animate-fade-in-up">
            <h1 className="text-white text-[32px] font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Explore
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 animate-pulse"></div>
          </div>

          <h2 className="text-white text-[22px] font-bold px-4 pb-3 pt-5">Opportunities</h2>

          {loading ? (
            <div className="text-center text-lg py-10 text-white">Loading...</div>
          ) : (
            <ContentGrid 
              cards={cards} 
              variant="default"
              columns={4} 
              gap={3} 
              className="p-4"
              emptyMessage="No opportunities available yet."
              showActions={false}
              showBadge={true}
            />
          )}
        </div>
      </main>

      <style jsx>{`
        .card-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default Explore;