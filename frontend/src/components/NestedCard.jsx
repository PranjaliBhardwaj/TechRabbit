import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NestedCardForm from './NestedCardForm';

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const NestedCard = ({ 
  card, 
  parentCardId, 
  isAdmin = false,
  onUpdate, 
  onDelete
}) => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCardClick = () => {
    // Navigate to the nested card detail page
    navigate(`/nested-card/${parentCardId}/${card._id}`);
  };

  const handleEdit = () => {
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/cards/${parentCardId}/nested/${card._id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          onDelete(card._id);
        } else {
          throw new Error('Failed to delete card');
        }
      } catch (error) {
        console.error('Error deleting nested card:', error);
        alert('Failed to delete card');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async (formData) => {
    setLoading(true);
    try {
      const url = isEdit 
        ? `${API_URL}/cards/${parentCardId}/nested/${card._id}`
        : `${API_URL}/cards/${parentCardId}/nested`;
      
      const method = isEdit ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formData
      });
      
      if (response.ok) {
        const updatedCard = await response.json();
        onUpdate(updatedCard, isEdit ? card._id : null);
        setShowForm(false);
        setIsEdit(false);
      } else {
        throw new Error('Failed to save card');
      }
    } catch (error) {
      console.error('Error saving nested card:', error);
      alert('Failed to save card');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-400">☆</span>);
    }
    
    return stars;
  };

  return (
    <>
      <div className="bg-[#1a1f2a] rounded-xl p-4 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl">
        {/* Card Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-white text-lg font-bold mb-2 line-clamp-2">{card.title}</h3>
            <p className="text-[#9da8be] text-sm line-clamp-3">{card.description}</p>
          </div>
          
          {isAdmin && (
            <div className="flex gap-2 ml-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit();
                }}
                className="px-3 py-1 bg-[#c1b2e5] text-[#17141f] rounded-lg text-xs font-medium hover:bg-[#b0a1d4] transition-colors"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                disabled={loading}
                className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {loading ? '...' : 'Delete'}
              </button>
            </div>
          )}
        </div>

        {/* Course Details */}
        <div className="space-y-3" onClick={handleCardClick}>
          {/* Image */}
          {card.image && (
            <div
              className="w-full aspect-video bg-center bg-cover rounded-lg"
              style={{ 
                backgroundImage: `url(${API_URL}/uploads/${card.image})` 
              }}
            ></div>
          )}

          {/* Course Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {card.nestedData?.duration && (
              <div className="flex items-center gap-2">
                <span className="text-[#9da8be]">⏱️</span>
                <span className="text-white">{card.nestedData.duration}</span>
              </div>
            )}
            
            {card.nestedData?.level && (
              <div className="flex items-center gap-2">
                <span className="text-[#9da8be]">📚</span>
                <span className="text-white">{card.nestedData.level}</span>
              </div>
            )}
            
            {card.nestedData?.instructor && (
              <div className="flex items-center gap-2">
                <span className="text-[#9da8be]">👨‍🏫</span>
                <span className="text-white">{card.nestedData.instructor}</span>
              </div>
            )}
            
            {card.nestedData?.price && (
              <div className="flex items-center gap-2">
                <span className="text-[#9da8be]">💰</span>
                <span className="text-white">{card.nestedData.price}</span>
              </div>
            )}
          </div>

          {/* Rating */}
          {card.nestedData?.rating && (
            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(card.nestedData.rating)}
              </div>
              <span className="text-[#9da8be] text-sm">
                {card.nestedData.rating === 'N/A' ? 'N/A' : `${card.nestedData.rating}/5`} ({card.nestedData.reviews === 'N/A' ? 'N/A' : (card.nestedData.reviews || 0)} reviews)
              </span>
            </div>
          )}

          {/* Curriculum Preview */}
          {card.nestedData?.curriculum && card.nestedData.curriculum.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-white text-sm font-medium">Curriculum Preview:</h4>
              <div className="space-y-1">
                {card.nestedData.curriculum.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <span className="text-[#c1b2e5]">•</span>
                    <span className="text-[#9da8be] line-clamp-1">{item}</span>
                  </div>
                ))}
                {card.nestedData.curriculum.length > 3 && (
                  <div className="text-[#9da8be] text-xs">
                    +{card.nestedData.curriculum.length - 3} more items
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Enroll Button */}
          {card.nestedData?.enrollmentUrl && (
            <button 
              className="w-full mt-4 py-2 bg-[#5619e5] text-white rounded-lg font-medium hover:bg-[#4a15d1] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                window.open(card.nestedData.enrollmentUrl, '_blank');
              }}
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <NestedCardForm
          parentCardId={parentCardId}
          onClose={() => {
            setShowForm(false);
            setIsEdit(false);
          }}
          onSave={handleSave}
          editCard={isEdit ? card : null}
          isEdit={isEdit}
        />
      )}
    </>
  );
};

export default NestedCard;
