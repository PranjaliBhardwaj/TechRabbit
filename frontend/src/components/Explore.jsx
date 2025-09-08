import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../tailwind.css";
import Header from "./Header";
import ContentGrid from "./ContentGrid";
import { useSearch } from "../contexts/SearchContext";
import { filterCardsBySearch } from "../utils/searchUtils";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Explore = () => {
  const [cards, setCards] = useState([]);
  const [courseCards, setCourseCards] = useState([]);
  const [categoryNestedMap, setCategoryNestedMap] = useState({});
  const [nestedLoading, setNestedLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { searchQuery } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        // Fetch all cards and filter for category cards (explore sections)
        const res = await fetch(`${API_URL}/cards`);
        const data = await res.json();
        // Filter for category cards (cards with section 'category' that are not nested)
        const categoryCards = data.filter(card => 
          card.section === 'category' && !card.isNested
        );
        setCards(categoryCards);
        
        // Fetch nested cards for each category
        setNestedLoading(true);
        const entries = await Promise.all(
          categoryCards.map(async (category) => {
            try {
              const nestedRes = await fetch(`${API_URL}/cards/${category._id}/nested`);
              const nestedData = await nestedRes.json();
              return [category._id, nestedData];
            } catch (e) {
              return [category._id, []];
            }
          })
        );
        setCategoryNestedMap(Object.fromEntries(entries));
        setNestedLoading(false);
        
        // Filter for course cards
        const courses = data.filter(card => card.section === 'course');
        setCourseCards(courses);
      } catch (err) {
        setCards([]);
        setCourseCards([]);
        setCategoryNestedMap({});
        setNestedLoading(false);
      }
      setLoading(false);
    };
    fetchCards();
  }, []);

  const handleCategoryClick = (category) => {
    if (selectedCategory && selectedCategory._id === category._id) {
      // If clicking the same category, deselect it
      setSelectedCategory(null);
    } else {
      // Select the clicked category
      setSelectedCategory(category);
    }
  };

  const handleNestedCardClick = (nestedCard) => {
    // Navigate to the nested card detail page
    navigate(`/nested-card/${selectedCategory._id}/${nestedCard._id}`);
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#14181f] via-[#1a1a2e] to-[#16213e] overflow-x-hidden page-transition"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <Header />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main */}
      <main className="px-40 py-5 flex flex-1 justify-center relative z-10">
        <div className="flex flex-col max-w-[960px] w-full">
          <div className="p-4 animate-fade-in-up">
            <h1 className="text-white text-[32px] font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Explore
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 animate-pulse"></div>
          </div>

          {/* Back button when a category is selected */}
          {selectedCategory && (
            <div className="px-4 mb-4">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2 text-[#c1b2e5] hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Categories
              </button>
            </div>
          )}

          {loading ? (
            <div className="text-center text-lg py-10 text-white">Loading...</div>
          ) : selectedCategory ? (
            // Show selected category's nested cards
            <div>
              <div className="px-4 mb-6">
                <h2 className="text-white text-[28px] font-bold mb-2">{selectedCategory.title}</h2>
                <p className="text-[#9da8be] text-lg">{selectedCategory.description}</p>
              </div>
              
              {nestedLoading ? (
                <div className="text-center text-lg py-10 text-white">Loading nested cards...</div>
              ) : (
                                 <ContentGrid
                   cards={filterCardsBySearch(categoryNestedMap[selectedCategory._id] || [], searchQuery)}
                   variant="default"
                   columns={4}
                   gap={3}
                   className="p-4"
                   emptyMessage={searchQuery ? `No results found for "${searchQuery}" in ${selectedCategory.title}.` : `No items available in ${selectedCategory.title} yet.`}
                   showActions={false}
                   showBadge={true}
                   onCardClick={handleNestedCardClick}
                   parentCategory={selectedCategory}
                 />
              )}
            </div>
          ) : (
            // Show all categories
            <>
              <h2 className="text-white text-[22px] font-bold px-4 pb-3 pt-5">Categories</h2>
              <ContentGrid 
                cards={filterCardsBySearch(cards, searchQuery)} 
                variant="default"
                columns={4} 
                gap={3} 
                className="p-4"
                emptyMessage={searchQuery ? `No results found for "${searchQuery}"` : "No categories available yet."}
                showActions={false}
                showBadge={true}
                onCardClick={handleCategoryClick}
                isSelected={selectedCategory?._id}
              />
              
              {/* Courses Section */}
              <h2 className="text-white text-[22px] font-bold px-4 pb-3 pt-8">Courses</h2>
              <ContentGrid 
                cards={filterCardsBySearch(courseCards, searchQuery)} 
                variant="default"
                columns={4} 
                gap={3} 
                className="p-4"
                emptyMessage={searchQuery ? `No courses found for "${searchQuery}"` : "No courses available yet."}
                showActions={false}
                showBadge={true}
              />
            </>
          )}
        </div>
      </main>

      <style>{`
        .card-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default Explore;