import "../../tailwind.css";
import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";
import { filterCardsBySearch } from "../utils/searchUtils";

const API_URL = "http://localhost:5000";

const CourseHub = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef([]);
  const { searchQuery, clearSearch } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  // Filter states
  const [activeFilters, setActiveFilters] = useState({
    paid: false,
    unpaid: false,
    oneshot: false,
    detailed: false
  });

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setCourses([]); // Reset courses first
      try {
        const res = await fetch(`${API_URL}/cards`);
        const data = await res.json();
        // Filter for course section cards
        const courseCards = data.filter(card => card.section === 'course');
        setCourses(courseCards);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setCourses([]);
      }
      setLoading(false);
    };
    fetchCourses();
  }, [location.pathname]); // Re-fetch when location changes

  // Filter courses based on search query
  const filteredCourses = filterCardsBySearch(courses, searchQuery);

  // Apply additional filters
  const applyFilters = (courses) => {
    return courses.filter(course => {
      const nestedData = course.nestedData || {};
      
      // Paid filter
      if (activeFilters.paid && !activeFilters.unpaid) {
        if (nestedData.price === 'Free' || !nestedData.price) return false;
      }
      
      // Unpaid filter
      if (activeFilters.unpaid && !activeFilters.paid) {
        if (nestedData.price !== 'Free') return false;
      }
      
      // One-shot filter
      if (activeFilters.oneshot && !activeFilters.detailed) {
        if (nestedData.courseType !== 'One-shot') return false;
      }
      
      // Detailed filter
      if (activeFilters.detailed && !activeFilters.oneshot) {
        if (nestedData.courseType !== 'Detailed') return false;
      }
      
      return true;
    });
  };

  const finalFilteredCourses = applyFilters(filteredCourses);



  const filters = ["Paid", "Unpaid", "One-shot", "Detailed"];

  const handleFilterChange = (filterName) => {
    const filterKey = filterName.toLowerCase().replace('-', '');
    setActiveFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey]
    }));
  };

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
   }, [finalFilteredCourses]);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-green-400 bg-green-400/10';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10';
      case 'Advanced': return 'text-red-400 bg-red-400/10';
      default: return 'text-blue-400 bg-blue-400/10';
    }
  };

  const getPriceColor = (price) => {
    if (price === 'Free') return 'text-green-400 bg-green-400/10';
    return 'text-blue-400 bg-blue-400/10';
  };

  const getCourseTypeColor = (courseType) => {
    switch (courseType) {
      case 'One-shot': return 'text-purple-400 bg-purple-400/10';
      case 'Detailed': return 'text-orange-400 bg-orange-400/10';
      default: return 'text-blue-400 bg-blue-400/10';
    }
  };


  
  return (
    <div
      className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#161122] via-[#1a2a3e] to-[#161122] overflow-x-hidden font-space-grotesk page-transition"
      style={{
        "--checkbox-tick-svg": `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='rgb(23,20,31)' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`
      }}
    >
             <Header />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Main */}
      <main className="flex flex-1 py-5 px-6 relative z-10">
        {/* Filters */}
        <aside className="w-80 flex-shrink-0 animate-slide-in-left">
          <div className="sticky top-24">
            <h2 className="text-white text-[22px] font-bold px-4 pb-3 flex items-center">
              Filters
              <span className="ml-2 text-blue-400">⚙️</span>
            </h2>
            <div className="bg-gradient-to-br from-[#2a2a3e] to-[#1f1f2e] rounded-2xl border border-white/10 p-4">
                             {filters.map((label, idx) => (
                 <label
                   key={idx}
                   className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg transition-all duration-300 cursor-pointer group"
                   style={{ animationDelay: `${idx * 0.1}s` }}
                 >
                   <input
                     type="checkbox"
                     checked={activeFilters[label.toLowerCase().replace('-', '')]}
                     onChange={() => handleFilterChange(label)}
                     className="h-5 w-5 rounded border-2 border-white/20 bg-transparent text-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
                   />
                   <p className="text-white text-base group-hover:text-blue-300 transition-colors duration-300">{label}</p>
                 </label>
               ))}
            </div>
          </div>
        </aside>

                 {/* Course Cards */}
         <section className="flex-1 pl-6">
           
           {loading ? (
             <div className="text-center py-20">
               <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
               <p className="text-lg mt-4 text-blue-300">Loading amazing courses...</p>
             </div>
           ) : (
             <>
               <div className="flex justify-between flex-wrap gap-3 mb-6 animate-fade-in-up">
             <div className="min-w-36">
               <h1 className="text-white text-[32px] font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                 Course Hub
               </h1>
               <p className="text-white text-sm mt-2 opacity-80">
                 Explore our courses and resources to enhance your technical skills.
               </p>
               <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-3 animate-pulse"></div>
             </div>
           </div>
           
                       {searchQuery && (
              <div className="mb-6">
                <p className="text-blue-300 text-sm">
                  Search results for: <span className="text-white font-semibold">"{searchQuery}"</span>
                  <button 
                    onClick={clearSearch}
                    className="ml-2 text-red-400 hover:text-red-300 underline"
                  >
                    Clear Search
                  </button>
                </p>
              </div>
            )}

                                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {finalFilteredCourses.length > 0 ? (
                finalFilteredCourses.map((course, i) => (
                               <div 
                  key={course._id} 
                  ref={el => cardsRef.current[i] = el}
                  className="card-reveal animate-in group cursor-pointer"
                  style={{ animationDelay: `${i * 0.1}s` }}
                  onClick={() => navigate(`/nested-card/standalone/${course._id}`)}
                >
                 <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2a2a3e] to-[#1f1f2e] border border-white/10 transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10">
                   {/* Gradient overlay */}
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                   
                   {/* Image container */}
                   <div className="relative overflow-hidden">
                     <div
                       className="w-full aspect-video bg-cover bg-center"
                       style={{ 
                         backgroundImage: `url(${course.image ? `${API_URL}/uploads/${course.image}` : 'https://via.placeholder.com/400x225?text=Course+Image'})` 
                       }}
                     ></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     
                                           {/* Badges container */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {/* Level badge */}
                        {course.nestedData?.level && (
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.nestedData.level)} backdrop-blur-sm border border-white/20`}>
                            {course.nestedData.level}
                          </div>
                        )}
                        
                        {/* Course Type badge */}
                        {course.nestedData?.courseType && (
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getCourseTypeColor(course.nestedData.courseType)} backdrop-blur-sm border border-white/20`}>
                            {course.nestedData.courseType}
                          </div>
                        )}
                      </div>
                      
                      {/* Price badge */}
                      {course.nestedData?.price && (
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getPriceColor(course.nestedData.price)} backdrop-blur-sm border border-white/20`}>
                          {course.nestedData.price === 'Free' ? 'Unpaid' : 'Paid'}
                        </div>
                      )}
                   </div>
                   
                   {/* Content */}
                   <div className="p-6 relative z-10">
                     <h3 className="text-white text-lg font-bold mb-2 group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">
                       {course.title}
                     </h3>
                     <p className="text-white/70 text-sm leading-relaxed mb-4 group-hover:text-white/90 transition-colors duration-300 line-clamp-3">
                       {course.description}
                     </p>
                     
                     {/* Course info */}
                     <div className="flex items-center justify-between text-xs text-white/60 mb-4">
                       {course.nestedData?.duration && (
                         <span className="flex items-center">
                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                           </svg>
                           {course.nestedData.duration}
                         </span>
                       )}
                       {course.nestedData?.instructor && (
                         <span className="flex items-center">
                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                           </svg>
                           {course.nestedData.instructor}
                         </span>
                       )}
                     </div>
                     
                     {/* Price if available */}
                     {course.nestedData?.price && (
                       <div className="mb-4">
                         <span className="text-blue-400 font-semibold text-lg">
                           {course.nestedData.price === 'Free' ? 'Free' : `₹${course.nestedData.price}`}
                         </span>
                       </div>
                     )}
                     
                     {/* Enroll button */}
                     <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:from-blue-600 hover:to-purple-600">
                       Enroll Now
                     </button>
                   </div>
                   
                   {/* Shine effect */}
                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                   </div>
                 </div>
               </div>
             ))
            ) : (
                            <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4 opacity-50">📚</div>
                                 <p className="text-white/70 text-lg">
                   {searchQuery || Object.values(activeFilters).some(Boolean) ? `No courses found matching your criteria` : "No courses available yet."}
                 </p>
                 <p className="text-white/50 text-sm mt-2">
                   {searchQuery || Object.values(activeFilters).some(Boolean) ? "Try adjusting your search or filters." : "Check back soon for amazing courses!"}
                 </p>
                                 {!searchQuery && !Object.values(activeFilters).some(Boolean) && (
                   <div className="mt-6">
                     <p className="text-blue-300 text-sm mb-3">Want to add courses?</p>
                     <button 
                       onClick={() => navigate('/admin')}
                       className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                     >
                       Go to Admin Dashboard
                     </button>
                   </div>
                 )}
              </div>
             )}
           </div>
             </>
           )}
         </section>
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

export default CourseHub;