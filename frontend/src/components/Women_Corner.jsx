import "../../tailwind.css";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import { useSearch } from "../contexts/SearchContext";
import { filterCardsBySearch } from "../utils/searchUtils";

const API_URL = "http://localhost:5000";

const sectionLabels = {
  scholarship: "Scholarships",
  internship: "Internships",
  mentorship: "Mentorship",
};

const WomenCornerPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef([]);
  const { searchQuery } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      setCards([]); // Reset cards first
      try {
        const res = await fetch(`${API_URL}/cards`);
        const data = await res.json();
        setCards(data);
      } catch (err) {
        console.error('Error fetching cards:', err);
        setCards([]);
      }
      setLoading(false);
    };
    fetchCards();
  }, [location.pathname]); // Re-fetch when location changes

  // Group all cards by section first
  const allGrouped = cards.reduce((acc, card) => {
    acc[card.section] = acc[card.section] || [];
    acc[card.section].push(card);
    return acc;
  }, {});
  
  // Then filter each section based on search
  const grouped = {};
  Object.keys(allGrouped).forEach(section => {
    const sectionCards = allGrouped[section];
    if (searchQuery.trim()) {
      // Only filter if there's a search query
      const filteredSectionCards = filterCardsBySearch(sectionCards, searchQuery);
      if (filteredSectionCards.length > 0) {
        grouped[section] = filteredSectionCards;
      }
    } else {
      // If no search query, show all cards
      grouped[section] = sectionCards;
    }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Clear the refs array before adding new ones
    cardsRef.current = [];
    
    // Observe cards after they're rendered
    setTimeout(() => {
      cardsRef.current.forEach((card) => {
        if (card) observer.observe(card);
      });
    }, 100);

    return () => observer.disconnect();
  }, [cards, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f141b] via-[#2a1a2e] to-[#1f141b] text-white font-['Space_Grotesk','Noto_Sans',sans-serif] page-transition">
      <Header />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/5 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/5 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <main className="px-40 py-5 flex flex-1 justify-center relative z-10">
        <div className="flex flex-col max-w-[960px] w-full">
          <div className="p-4 animate-fade-in-up">
            <h1 className="text-[32px] font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
              Women's Corner
            </h1>
            <p className="text-[#be9db3] text-sm mt-2 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              Empowering women in tech with resources and opportunities.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mt-3 animate-pulse"></div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400"></div>
              <p className="text-lg mt-4 text-pink-300">Loading amazing opportunities...</p>
            </div>
          ) : (
            <>
              {searchQuery && (
                <div className="mb-6 px-4">
                  <p className="text-pink-300 text-sm">
                    Search results for: <span className="text-white font-semibold">"{searchQuery}"</span>
                  </p>
                </div>
              )}
              
              {Object.keys(sectionLabels).map((section, sectionIndex) => (
              <div key={section} className="mb-8">
                <h2 
                  className="text-white text-[22px] font-bold px-4 pt-5 pb-3 animate-slide-in-left flex items-center"
                  style={{ animationDelay: `${sectionIndex * 0.2}s` }}
                >
                  {sectionLabels[section]}
                  <span className="ml-2 text-pink-400">
                    {section === 'scholarship' && '🎓'}
                    {section === 'internship' && '💼'}
                    {section === 'mentorship' && '🌟'}
                  </span>
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                  {grouped[section]?.length ? (
                    grouped[section].map((item, index) => (
                                            <div 
                        key={item._id} 
                        ref={el => {
                          if (el) cardsRef.current.push(el);
                        }}
                        className="card-reveal animate-in group cursor-pointer"
                        style={{ animationDelay: `${(sectionIndex * 0.3) + (index * 0.1)}s` }}
                        onClick={() => navigate(`/women-detail/${item._id}`)}
                      >
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2a1a2e] to-[#1f141b] border border-pink-500/20 transition-all duration-500 hover:border-pink-400/40 hover:shadow-2xl hover:shadow-pink-500/20">
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Image container */}
                          <div className="relative overflow-hidden">
                            <div
                              className="w-full aspect-square bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-110"
                              style={{ 
                                backgroundImage: `url(${item.image ? `${API_URL}/uploads/${item.image}` : 'https://via.placeholder.com/300x300?text=No+Image'})` 
                              }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </div>
                          
                          {/* Content */}
                          <div className="p-4 relative z-10">
                            <h3 className="text-white text-base font-semibold mb-2 group-hover:text-pink-300 transition-colors duration-300 line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-[#be9db3] text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300 line-clamp-3">
                              {item.description}
                            </p>
                            
                            {/* Hover arrow */}
                            <div className="mt-3 flex items-center text-pink-400 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                              <span className="text-xs font-medium">Learn More</span>
                              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                          
                          {/* Shine effect */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-400/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                                         <div className="col-span-full text-center py-12">
                       <div className="text-6xl mb-4 opacity-50">🌸</div>
                       <p className="text-[#be9db3] text-lg">
                         {searchQuery ? `No results found for "${searchQuery}"` : "No opportunities available yet."}
                       </p>
                       <p className="text-[#be9db3] text-sm mt-2">
                         {searchQuery ? "Try a different search term." : "Check back soon for amazing opportunities!"}
                       </p>
                     </div>
                  )}
                                 </div>
               </div>
             ))}
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
      `}</style>
    </div>
  );
};

export default WomenCornerPage;