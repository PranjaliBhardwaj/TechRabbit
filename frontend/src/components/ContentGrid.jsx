import React from 'react';
import ContentCard from './ContentCard';

const ContentGrid = ({ 
  cards, 
  variant = "default",
  columns = 4, 
  gap = 4, 
  className = "",
  onCardClick,
  emptyMessage = "No content available.",
  showActions = true,
  showBadge = true,
  isSelected = null,
  parentCategory = null
}) => {
  if (!cards || cards.length === 0) {
    return (
      <div className="text-[#9da8be] text-center py-8">
        {emptyMessage}
      </div>
    );
  }

  const getGridCols = () => {
    const gridCols = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
      6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
    };
    return gridCols[columns] || gridCols[4];
  };

  const getGapSize = () => {
    const gapSizes = {
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8'
    };
    return gapSizes[gap] || gapSizes[4];
  };

  // Special layouts for different variants
  const getSpecialLayout = () => {
    switch (variant) {
      case "featured":
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case "masonry":
        return "columns-1 md:columns-2 lg:columns-3 xl:columns-4";
      case "carousel":
        return "flex overflow-x-auto gap-4 pb-4";
      default:
        return getGridCols();
    }
  };

  const isSpecialLayout = variant === "masonry" || variant === "carousel";

  if (isSpecialLayout) {
    if (variant === "masonry") {
      return (
        <div className={`${getSpecialLayout()} ${className}`}>
          {cards.map((card) => (
            <div key={card._id} className="break-inside-avoid mb-4">
              <ContentCard 
                card={card} 
                variant={variant}
                onClick={onCardClick}
                showActions={showActions}
                showBadge={showBadge}
                isSelected={isSelected === card._id}
                parentCategory={parentCategory}
              />
            </div>
          ))}
        </div>
      );
    }

    if (variant === "carousel") {
      return (
        <div className={`${getSpecialLayout()} ${className}`}>
          {cards.map((card) => (
            <div key={card._id} className="flex-shrink-0">
              <ContentCard 
                card={card} 
                variant={variant}
                onClick={onCardClick}
                showActions={showActions}
                showBadge={showBadge}
                isSelected={isSelected === card._id}
                parentCategory={parentCategory}
              />
            </div>
          ))}
        </div>
      );
    }
  }

  // Default grid layout
  return (
    <div className={`grid ${getSpecialLayout()} ${getGapSize()} ${className}`}>
      {cards.map((card) => (
        <ContentCard 
          key={card._id} 
          card={card} 
          variant={variant}
          onClick={onCardClick}
          showActions={showActions}
          showBadge={showBadge}
          isSelected={isSelected === card._id}
          parentCategory={parentCategory}
        />
      ))}
    </div>
  );
};

export default ContentGrid;
