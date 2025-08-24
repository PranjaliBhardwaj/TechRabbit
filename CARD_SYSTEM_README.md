# Card-Based UI System Documentation

## Overview

This project now includes a comprehensive card-based UI system that allows you to create dynamic, interactive card layouts without needing multiple web pages for each card. The system uses React Router for navigation and provides multiple card variants and layout options.

## Features

- **Dynamic Routing**: Cards navigate to detail pages using their unique IDs
- **Multiple Card Variants**: Different card styles for various use cases
- **Flexible Grid Layouts**: Responsive grid systems with customizable columns and gaps
- **Reusable Components**: Modular components that can be used throughout the application
- **Interactive Elements**: Hover effects, click handlers, and customizable actions

## Components

### 1. ContentCard

The main card component with multiple variants:

```jsx
import ContentCard from './components/ContentCard';

<ContentCard 
  card={cardData} 
  variant="default" // default, featured, compact, detailed
  onClick={handleCardClick}
  showActions={true}
  showBadge={true}
/>
```

**Variants:**
- `default`: Standard card (158px - 220px)
- `featured`: Larger card with action buttons (280px - 350px)
- `compact`: Small card for dense layouts (120px - 160px)
- `detailed`: Medium card with additional info (200px - 280px)

**Props:**
- `card`: Card data object
- `variant`: Card style variant
- `onClick`: Custom click handler
- `showActions`: Show action buttons (for featured cards)
- `showBadge`: Show section badge
- `className`: Additional CSS classes

### 2. ContentGrid

Flexible grid layout component:

```jsx
import ContentGrid from './components/ContentGrid';

<ContentGrid 
  cards={cardsArray} 
  variant="default"
  columns={4} 
  gap={4} 
  className="p-4"
  onCardClick={handleCardClick}
  emptyMessage="No cards available."
  showActions={true}
  showBadge={true}
/>
```

**Layout Variants:**
- `default`: Standard grid layout
- `featured`: 3-column grid for featured content
- `masonry`: Pinterest-style masonry layout
- `carousel`: Horizontal scrolling layout

**Props:**
- `cards`: Array of card objects
- `variant`: Layout variant
- `columns`: Number of columns (1-6)
- `gap`: Gap size between cards (2-8)
- `className`: Additional CSS classes
- `onCardClick`: Custom click handler
- `emptyMessage`: Message when no cards exist
- `showActions`: Show action buttons
- `showBadge`: Show section badges

### 3. CardDetail

Dynamic detail page component that shows card information and related cards:

```jsx
import CardDetail from './components/CardDetail';

// Route: /explore/:id
<Route path="/explore/:id" element={<CardDetail />} />
```

**Features:**
- Displays selected card details
- Shows related cards from the same section
- Responsive layout with back navigation
- Error handling for invalid card IDs

## Usage Examples

### Basic Card Grid

```jsx
import ContentGrid from './components/ContentGrid';

function MyComponent() {
  const [cards, setCards] = useState([]);

  return (
    <ContentGrid 
      cards={cards} 
      variant="default"
      columns={4} 
      gap={4} 
      className="p-4"
    />
  );
}
```

### Featured Cards with Actions

```jsx
<ContentGrid 
  cards={featuredCards} 
  variant="featured"
  columns={3} 
  gap={6} 
  showActions={true}
  showBadge={true}
/>
```

### Compact Layout

```jsx
<ContentGrid 
  cards={manyCards} 
  variant="compact"
  columns={6} 
  gap={3} 
  showBadge={false}
/>
```

### Carousel Layout

```jsx
<ContentGrid 
  cards={carouselCards} 
  variant="carousel"
  className="px-4"
/>
```

## Data Structure

Cards should follow this structure:

```javascript
{
  _id: "unique_id",
  title: "Card Title",
  description: "Card description text",
  section: "scholarship|internship|mentorship|course|opensource|extracurricular",
  image: "filename.jpg", // Optional
  createdAt: "2024-01-01T00:00:00.000Z" // Optional
}
```

## Routing

The system automatically handles routing:

1. **Main Grid**: `/explore` - Shows all cards
2. **Card Detail**: `/explore/:id` - Shows specific card details
3. **Showcase**: `/showcase` - Demonstrates different card variants

## Styling

### CSS Classes

The system includes utility classes for text truncation:

```css
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### Tailwind Classes

Cards use Tailwind CSS for styling:
- Responsive grid layouts
- Hover effects and transitions
- Color schemes matching your design
- Shadow and border effects

## Customization

### Adding New Card Variants

1. Extend the `getVariantClasses()` function in `ContentCard.jsx`
2. Add new case statements for sizing and styling
3. Update the `ContentGrid` component if needed

### Custom Click Handlers

```jsx
const handleCardClick = (card) => {
  // Custom logic here
  console.log('Card clicked:', card);
  // Navigate to custom route
  navigate(`/custom/${card._id}`);
};

<ContentGrid 
  cards={cards} 
  onCardClick={handleCardClick}
/>
```

### Custom Styling

```jsx
<ContentCard 
  card={card} 
  className="custom-card-class"
  variant="default"
/>
```

## Performance Considerations

- Cards are rendered efficiently using React's key prop
- Images are loaded lazily
- Grid layouts are responsive and optimized
- Empty states are handled gracefully

## Browser Support

- Modern browsers with CSS Grid support
- Responsive design for mobile devices
- Touch-friendly interactions

## Troubleshooting

### Common Issues

1. **Cards not displaying**: Check if the cards array is populated
2. **Routing issues**: Ensure React Router is properly configured
3. **Styling problems**: Verify Tailwind CSS is loaded
4. **Image loading**: Check API endpoint and image paths

### Debug Mode

Add console logs to debug card data:

```jsx
useEffect(() => {
  console.log('Cards data:', cards);
}, [cards]);
```

## Future Enhancements

- **Infinite Scroll**: Load more cards as user scrolls
- **Search & Filter**: Add search functionality to card grids
- **Animations**: Enhanced hover and click animations
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Virtual scrolling for large datasets

## Support

For questions or issues with the card system, check:
1. Component props and usage examples
2. Browser console for errors
3. Network tab for API calls
4. React DevTools for component state
