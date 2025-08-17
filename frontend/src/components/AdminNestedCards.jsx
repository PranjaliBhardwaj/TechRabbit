import React, { useState, useEffect } from 'react';
import Header from './Header';
import NestedCardGrid from './NestedCardGrid';

const API_URL = "http://localhost:5000";

const AdminNestedCards = () => {
  const [parentCards, setParentCards] = useState([]);
  const [selectedParentCard, setSelectedParentCard] = useState(null);
  const [nestedCards, setNestedCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParentCards();
  }, []);

  useEffect(() => {
    if (selectedParentCard) {
      fetchNestedCards(selectedParentCard._id);
    }
  }, [selectedParentCard]);

  const fetchParentCards = async () => {
    try {
      const response = await fetch(`${API_URL}/cards`);
      const data = await response.json();
      // Only show non-nested cards as parent cards
      const parentCardsData = data.filter(card => !card.isNested);
      setParentCards(parentCardsData);
      if (parentCardsData.length > 0) {
        setSelectedParentCard(parentCardsData[0]);
      }
    } catch (error) {
      console.error('Error fetching parent cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNestedCards = async (parentId) => {
    try {
      const response = await fetch(`${API_URL}/cards/${parentId}/nested`);
      const data = await response.json();
      setNestedCards(data);
    } catch (error) {
      console.error('Error fetching nested cards:', error);
      setNestedCards([]);
    }
  };

  const handleCardsUpdate = (updatedCard, oldId) => {
    if (oldId) {
      // Update existing card
      setNestedCards(prev => 
        prev.map(card => card._id === oldId ? updatedCard : card)
      );
    } else {
      // Add new card
      setNestedCards(prev => [updatedCard, ...prev]);
    }
  };

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
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-white text-[32px] font-bold mb-4">Admin: Manage Nested Cards</h1>
            <p className="text-[#9da8be] text-lg">
              Select a parent card to manage its nested cards. Only admins can create, edit, and delete nested cards.
            </p>
          </div>

          {/* Parent Card Selection */}
          <div className="mb-8">
            <h2 className="text-white text-xl font-bold mb-4">Select Parent Card</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {parentCards.map((card) => (
                <div
                  key={card._id}
                  onClick={() => setSelectedParentCard(card)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedParentCard?._id === card._id
                      ? 'bg-[#c1b2e5] text-[#17141f]'
                      : 'bg-[#1a1f2a] text-white hover:bg-[#2b3240]'
                  }`}
                >
                  <h3 className="font-bold mb-2">{card.title}</h3>
                  <p className={`text-sm ${
                    selectedParentCard?._id === card._id ? 'text-[#17141f]' : 'text-[#9da8be]'
                  }`}>
                    {card.description}
                  </p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                    selectedParentCard?._id === card._id 
                      ? 'bg-[#17141f] text-[#c1b2e5]' 
                      : 'bg-[#c1b2e5] text-[#17141f]'
                  }`}>
                    {card.section}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Nested Cards Management */}
          {selectedParentCard && (
            <div className="mb-8">
              <div className="bg-[#1a1f2a] rounded-xl p-6 mb-6">
                <h2 className="text-white text-2xl font-bold mb-4">
                  Managing Nested Cards for: {selectedParentCard.title}
                </h2>
                <p className="text-[#9da8be] mb-4">
                  Section: <span className="text-white font-medium">{selectedParentCard.section}</span>
                </p>
                <p className="text-[#9da8be]">
                  {nestedCards.length} nested card{nestedCards.length !== 1 ? 's' : ''} available
                </p>
              </div>

              <NestedCardGrid
                parentCardId={selectedParentCard._id}
                nestedCards={nestedCards}
                columns={3}
                gap={6}
                isAdmin={true}
                onCardsUpdate={handleCardsUpdate}
                emptyMessage={`No nested cards available for ${selectedParentCard.title}.`}
              />
            </div>
          )}

          {/* Admin Instructions */}
          <div className="bg-[#1a1f2a] rounded-xl p-6">
            <h3 className="text-white text-xl font-bold mb-4">Admin Instructions</h3>
            <div className="space-y-3 text-[#9da8be]">
              <div className="flex items-start gap-3">
                <span className="text-[#c1b2e5] font-bold">1.</span>
                <p>Select a parent card from the grid above to manage its nested cards.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#c1b2e5] font-bold">2.</span>
                <p>Use the "Add Nested Card" button to create new nested cards with the Course.jsx template structure.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#c1b2e5] font-bold">3.</span>
                <p>Edit existing nested cards using the "Edit" button on each card.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#c1b2e5] font-bold">4.</span>
                <p>Delete nested cards using the "Delete" button (with confirmation).</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#c1b2e5] font-bold">5.</span>
                <p>All nested cards will follow the Course.jsx template structure and be viewable by users.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminNestedCards;
