import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ card, onClick, className = "" }) => {
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000";

  const handleCardClick = () => {
    if (onClick) {
      onClick(card);
    } else {
      // Default navigation to card detail page
      navigate(`/explore/${card._id}`);
    }
  };

  return (
    <div 
      className={`flex flex-col gap-3 pb-3 min-w-[158px] max-w-[220px] cursor-pointer transition-transform duration-200 hover:scale-105 ${className}`}
      onClick={handleCardClick}
    >
      <div
        className="w-full aspect-square bg-center bg-no-repeat bg-cover rounded-xl shadow-lg"
        style={{ 
          backgroundImage: `url(${card.image ? `${API_URL}/uploads/${card.image}` : '/default_bunny.jpg'})` 
        }}
      ></div>
      <div className="px-1">
        <p className="text-white text-base font-medium line-clamp-2">{card.title}</p>
        <p className="text-[#9da8be] text-sm line-clamp-3">{card.description}</p>
      </div>
    </div>
  );
};

export default Card;
