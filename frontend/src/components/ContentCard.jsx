import React from 'react';
import { useNavigate } from 'react-router-dom';

const ContentCard = ({ 
  card, 
  variant = "default", // default, featured, compact, detailed
  onClick,
  className = "",
  showActions = true,
  showBadge = true,
  isSelected = false,
  parentCategory = null
}) => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const handleCardClick = () => {
    if (onClick) {
      onClick(card);
    } else {
      // Check if this is a category card
      if (card.section === 'category' && !card.isNested) {
        // Category cards are handled by the parent component (Explore)
        return;
      } else if (card.isNested && card.parentCardId) {
        // Navigate to nested card detail page
        navigate(`/nested-card/${card.parentCardId}/${card._id}`);
      } else if (card.section === 'course') {
        // Navigate to standalone course detail page
        navigate(`/nested-card/standalone/${card._id}`);
      } else {
        // Default navigation to card detail page
        navigate(`/explore/${card._id}`);
      }
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "featured":
        return "min-w-[280px] max-w-[350px]";
      case "compact":
        return "min-w-[120px] max-w-[160px]";
      case "detailed":
        return "min-w-[200px] max-w-[280px]";
      default:
        return "min-w-[158px] max-w-[220px]";
    }
  };

  const getImageSize = () => {
    switch (variant) {
      case "featured":
        return "w-full aspect-[4/3]";
      case "compact":
        return "w-full aspect-square";
      case "detailed":
        return "w-full aspect-[3/2]";
      default:
        return "w-full aspect-square";
    }
  };

  const getTextSize = () => {
    switch (variant) {
      case "featured":
        return { title: "text-xl", description: "text-base" };
      case "compact":
        return { title: "text-sm", description: "text-xs" };
      case "detailed":
        return { title: "text-lg", description: "text-sm" };
      default:
        return { title: "text-base", description: "text-sm" };
    }
  };

  const textSizes = getTextSize();

  const isCategoryCard = card.section === 'category' && !card.isNested;
  const normalizeLevel = (level) => {
    if (!level) return null;
    const normalized = String(level).toLowerCase();
    if (normalized.includes('beginner')) return 'Beginner';
    if (normalized.includes('intermediate')) return 'Intermediate';
    if (normalized.includes('advanced')) return 'Advanced';
    return null;
  };
  const getLevelClasses = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-500/80 text-white';
      case 'Intermediate':
        return 'bg-yellow-500/80 text-white';
      case 'Advanced':
        return 'bg-red-500/80 text-white';
      default:
        return 'bg-[#14181f]/80 text-white';
    }
  };
  const levelLabel = card.section === 'course' ? normalizeLevel(card?.nestedData?.level) : null;
  
  return (
    <div 
      className={`flex flex-col gap-3 pb-3 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl ${getVariantClasses()} ${className} ${
        isCategoryCard ? 'hover:border-2 hover:border-[#c1b2e5]' : ''
      } ${isSelected ? 'border-2 border-[#c1b2e5] shadow-lg shadow-[#c1b2e5]/20' : ''}`}
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative">
        <div
          className={`${getImageSize()} bg-center bg-no-repeat bg-cover rounded-xl shadow-lg`}
          style={{ 
            backgroundImage: `url(${card.image ? `${API_URL}/uploads/${card.image}` : '/default_bunny.jpg'})` 
          }}
        ></div>
        
        {/* Badges */}
        {showBadge && (
          <div className="absolute top-2 left-2 flex gap-2 items-center">
            <span className="bg-[#c1b2e5] text-[#17141f] px-2 py-1 rounded-full text-xs font-medium">
              {card.isNested && parentCategory ? parentCategory.title : card.section}
            </span>
            {levelLabel && (
              <span className={`${getLevelClasses(levelLabel)} px-2 py-1 rounded-full text-[10px] font-semibold border border-white/20 backdrop-blur-sm`}>
                {levelLabel}
              </span>
            )}
          </div>
        )}
        

      </div>

      {/* Content */}
      <div className="px-1 flex-1">
        <h3 className={`text-white font-medium line-clamp-2 ${textSizes.title}`}>
          {card.title}
        </h3>
        <p className={`text-[#9da8be] line-clamp-3 ${textSizes.description} mt-1`}>
          {card.description}
        </p>
        
        {/* Additional Info for Detailed Cards */}
        {variant === "detailed" && card.createdAt && (
          <div className="mt-2 text-[#9da8be] text-xs">
            Added {new Date(card.createdAt).toLocaleDateString()}
          </div>
        )}
      </div>

      {/* Actions */}
      {showActions && variant === "featured" && (
        <div className="flex gap-2 mt-2">
          <button 
            className="flex-1 bg-[#c1b2e5] text-[#17141f] px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#b0a1d4] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            View Details
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentCard;
