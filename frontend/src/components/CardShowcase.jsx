import React, { useEffect, useState } from 'react';
import Header from './Header';
import ContentGrid from './ContentGrid';

const API_URL = "http://localhost:5000";

const CardShowcase = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/cards`);
        const data = await res.json();
        setCards(data);
      } catch (err) {
        setCards([]);
      }
      setLoading(false);
    };
    fetchCards();
  }, []);

  if (loading) {
    return (
      <div className="relative flex min-h-screen flex-col bg-[#14181f]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#14181f] overflow-x-hidden">
      <Header />
      
      <main className="px-40 py-5 flex flex-1 justify-center">
        <div className="flex flex-col max-w-[1200px] w-full">
          <div className="p-4">
            <h1 className="text-white text-[32px] font-bold mb-8">Card System Showcase</h1>
          </div>

          {/* Default Grid */}
          <section className="mb-12">
            <h2 className="text-white text-2xl font-bold mb-6 px-4">Default Grid Layout</h2>
            <ContentGrid 
              cards={cards.slice(0, 8)} 
              variant="default"
              columns={4} 
              gap={4} 
              className="px-4"
              emptyMessage="No cards available for default layout."
            />
          </section>

          {/* Featured Cards */}
          <section className="mb-12">
            <h2 className="text-white text-2xl font-bold mb-6 px-4">Featured Cards</h2>
            <ContentGrid 
              cards={cards.slice(0, 6)} 
              variant="featured"
              columns={3} 
              gap={6} 
              className="px-4"
              emptyMessage="No cards available for featured layout."
              showActions={true}
              showBadge={true}
            />
          </section>

          {/* Compact Grid */}
          <section className="mb-12">
            <h2 className="text-white text-2xl font-bold mb-6 px-4">Compact Grid (6 columns)</h2>
            <ContentGrid 
              cards={cards.slice(0, 12)} 
              variant="compact"
              columns={6} 
              gap={3} 
              className="px-4"
              emptyMessage="No cards available for compact layout."
              showBadge={false}
            />
          </section>

          {/* Detailed Cards */}
          <section className="mb-12">
            <h2 className="text-white text-2xl font-bold mb-6 px-4">Detailed Cards</h2>
            <ContentGrid 
              cards={cards.slice(0, 8)} 
              variant="detailed"
              columns={4} 
              gap={4} 
              className="px-4"
              emptyMessage="No cards available for detailed layout."
              showBadge={true}
            />
          </section>

          {/* Carousel Layout */}
          <section className="mb-12">
            <h2 className="text-white text-2xl font-bold mb-6 px-4">Carousel Layout</h2>
            <ContentGrid 
              cards={cards.slice(0, 10)} 
              variant="carousel"
              className="px-4"
              emptyMessage="No cards available for carousel layout."
              showBadge={true}
            />
          </section>

          {/* Masonry Layout */}
          <section className="mb-12">
            <h2 className="text-white text-2xl font-bold mb-6 px-4">Masonry Layout</h2>
            <ContentGrid 
              cards={cards.slice(0, 12)} 
              variant="masonry"
              className="px-4"
              emptyMessage="No cards available for masonry layout."
              showBadge={true}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default CardShowcase;
