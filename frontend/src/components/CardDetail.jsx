import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import ContentGrid from './ContentGrid';
import NestedCardGrid from './NestedCardGrid';

const API_URL = "http://localhost:5000";

const CardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);
  const [relatedCards, setRelatedCards] = useState([]);
  const [nestedCards, setNestedCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCardDetails = async () => {
      setLoading(true);
      try {
        // Fetch the selected card
        const cardRes = await fetch(`${API_URL}/cards/${id}`);
        if (!cardRes.ok) {
          throw new Error('Card not found');
        }
        const cardData = await cardRes.json();
        setSelectedCard(cardData);

        // Fetch related cards (same section, excluding current card)
        const relatedRes = await fetch(`${API_URL}/cards?section=${cardData.section}`);
        const relatedData = await relatedRes.json();
        const filteredRelated = relatedData.filter(card => card._id !== id);
        setRelatedCards(filteredRelated);

        // Fetch nested cards for this card
        const nestedRes = await fetch(`${API_URL}/cards/${id}/nested`);
        const nestedData = await nestedRes.json();
        setNestedCards(nestedData);
      } catch (err) {
        console.error('Error fetching card details:', err);
        setSelectedCard(null);
        setRelatedCards([]);
      }
      setLoading(false);
    };

    if (id) {
      fetchCardDetails();
    }
  }, [id]);

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

  if (!selectedCard) {
    return (
      <div className="relative flex min-h-screen flex-col bg-[#14181f]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-white text-lg mb-4">Card not found</div>
            <button
              onClick={() => navigate('/explore')}
              className="bg-[#c1b2e5] text-[#17141f] px-6 py-2 rounded-full font-medium hover:bg-[#b0a1d4] transition-colors"
            >
              Back to Explore
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#14181f] overflow-x-hidden">
      <Header />
      
      <main className="px-40 py-5 flex flex-1 justify-center">
        <div className="flex flex-col max-w-[960px] w-full">
          {/* Back Button */}
          <button
            onClick={() => navigate('/explore')}
            className="text-[#c1b2e5] hover:text-white transition-colors mb-6 flex items-center gap-2"
          >
            ← Back to Explore
          </button>

          {/* Selected Card Detail */}
          <div className="bg-[#1a1f2a] rounded-xl p-6 mb-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div
                  className="w-48 h-48 bg-center bg-no-repeat bg-cover rounded-xl shadow-lg"
                  style={{ 
                    backgroundImage: `url(${selectedCard.image ? `${API_URL}/uploads/${selectedCard.image}` : '/default_bunny.jpg'})` 
                  }}
                ></div>
              </div>
              <div className="flex-1">
                <h1 className="text-white text-3xl font-bold mb-3">{selectedCard.title}</h1>
                <p className="text-[#9da8be] text-lg mb-4">{selectedCard.description}</p>
                <div className="flex items-center gap-2">
                  <span className="bg-[#c1b2e5] text-[#17141f] px-3 py-1 rounded-full text-sm font-medium">
                    {selectedCard.section}
                  </span>
                  <span className="text-[#9da8be] text-sm">
                    Added {new Date(selectedCard.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Nested Cards Section */}
          <div className="mb-8">
            <NestedCardGrid
              parentCardId={selectedCard._id}
              nestedCards={nestedCards}
              columns={3}
              gap={6}
              isAdmin={false} // Set to true for admin access
              onCardsUpdate={(updatedCard, oldId) => {
                if (oldId) {
                  // Update existing card
                  setNestedCards(prev => 
                    prev.map(card => card._id === oldId ? updatedCard : card)
                  );
                } else {
                  // Add new card
                  setNestedCards(prev => [updatedCard, ...prev]);
                }
              }}
              emptyMessage={`No nested cards available for ${selectedCard.title}.`}
            />
          </div>

          {/* Related Cards Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-white">
              More {selectedCard.section} opportunities
            </h2>
            <ContentGrid 
              cards={relatedCards} 
              variant="detailed"
              columns={4} 
              gap={4}
              emptyMessage={`No other ${selectedCard.section} opportunities available at the moment.`}
              showActions={false}
              showBadge={true}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CardDetail;
