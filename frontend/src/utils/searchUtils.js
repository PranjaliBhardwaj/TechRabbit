// Utility function to filter cards based on search query
export const filterCardsBySearch = (cards, searchQuery) => {
  if (!searchQuery.trim()) {
    return cards; // Return all cards if no search query
  }

  const query = searchQuery.toLowerCase().trim();
  
  return cards.filter(card => {
    // Search in title
    if (card.title && card.title.toLowerCase().includes(query)) {
      return true;
    }
    
    // Search in description
    if (card.description && card.description.toLowerCase().includes(query)) {
      return true;
    }
    
    // Search in section
    if (card.section && card.section.toLowerCase().includes(query)) {
      return true;
    }
    
    // Search in nested data fields if they exist
    if (card.nestedData) {
      const nestedFields = [
        card.nestedData.videoUrl,
        card.nestedData.duration,
        card.nestedData.level,
        card.nestedData.price,
        card.nestedData.instructor,
        card.nestedData.curriculum?.join(' ')
      ].filter(Boolean);
      
      return nestedFields.some(field => 
        field.toLowerCase().includes(query)
      );
    }
    
    return false;
  });
};
