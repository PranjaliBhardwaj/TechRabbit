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
      className="relative flex min-h-screen flex-col bg-[#14181f] overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <Header />

      {/* Main */}
      <main className="px-40 py-5 flex flex-1 justify-center">
        <div className="flex flex-col max-w-[960px] w-full">
          <div className="p-4">
            <p className="text-white text-[32px] font-bold">Explore</p>
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
    </div>
  );
};

export default Explore;
