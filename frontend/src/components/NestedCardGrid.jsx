import React, { useState } from 'react';
import NestedCard from './NestedCard';
import NestedCardForm from './NestedCardForm';

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const NestedCardGrid = ({ 
  parentCardId,
  nestedCards, 
  columns = 3, 
  gap = 6, 
  className = "",
  onCardsUpdate,
  isAdmin = false,
  emptyMessage = "No nested cards available."
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddCard = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/cards/${parentCardId}/nested`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      
      if (response.ok) {
        const newCard = await response.json();
        onCardsUpdate(newCard, null); // Add new card
        setShowAddForm(false);
      } else {
        throw new Error('Failed to create nested card');
      }
    } catch (error) {
      console.error('Error creating nested card:', error);
      alert('Failed to create nested card');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCard = (updatedCard, oldId) => {
    if (oldId) {
      // Update existing card
      onCardsUpdate(updatedCard, oldId);
    } else {
      // Add new card
      onCardsUpdate(updatedCard, null);
    }
  };

  const handleDeleteCard = (cardId) => {
    onCardsUpdate(null, cardId);
  };

  const getGridCols = () => {
    const gridCols = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    };
    return gridCols[columns] || gridCols[3];
  };

  const getGapSize = () => {
    const gapSizes = {
      4: 'gap-4',
      6: 'gap-6',
      8: 'gap-8'
    };
    return gapSizes[gap] || gapSizes[6];
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button (Admin Only) */}
      <div className="flex justify-between items-center">
        <h3 className="text-white text-xl font-bold">Nested Cards</h3>
        {isAdmin && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-[#c1b2e5] text-[#17141f] rounded-lg font-medium hover:bg-[#b0a1d4] transition-colors"
          >
            + Add Nested Card
          </button>
        )}
      </div>

      {/* Cards Grid */}
      {nestedCards && nestedCards.length > 0 ? (
        <div className={`grid ${getGridCols()} ${getGapSize()} ${className}`}>
          {nestedCards.map((card) => (
            <NestedCard
              key={card._id}
              card={card}
              parentCardId={parentCardId}
              isAdmin={isAdmin}
              onUpdate={handleUpdateCard}
              onDelete={handleDeleteCard}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-[#9da8be] text-lg mb-4">{emptyMessage}</div>
          {isAdmin && (
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-[#c1b2e5] text-[#17141f] rounded-lg font-medium hover:bg-[#b0a1d4] transition-colors"
            >
              Create Your First Nested Card
            </button>
          )}
        </div>
      )}

      {/* Add Form Modal */}
      {showAddForm && (
        <NestedCardForm
          parentCardId={parentCardId}
          onClose={() => setShowAddForm(false)}
          onSave={handleAddCard}
          editCard={null}
          isEdit={false}
        />
      )}
    </div>
  );
};

export default NestedCardGrid;
