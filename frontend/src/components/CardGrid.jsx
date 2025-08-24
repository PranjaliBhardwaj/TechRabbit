import React from 'react';
import Card from './Card';

const CardGrid = ({ 
  cards, 
  columns = 4, 
  gap = 4, 
  className = "",
  onCardClick,
  emptyMessage = "No cards available."
}) => {
  if (!cards || cards.length === 0) {
    return (
      <div className="text-[#9da8be] text-center py-8">
        {emptyMessage}
      </div>
    );
  }

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
  };

  const gapSizes = {
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    8: 'gap-8'
  };

  return (
    <div className={`grid ${gridCols[columns] || gridCols[4]} ${gapSizes[gap] || gapSizes[4]} ${className}`}>
      {cards.map((card) => (
        <Card 
          key={card._id} 
          card={card} 
          onClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default CardGrid;
