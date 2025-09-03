import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';

const API_URL = "http://localhost:5000";

const NestedCardDetail = () => {
  const { parentId, nestedId } = useParams();
  const navigate = useNavigate();
  const [parentCard, setParentCard] = useState(null);
  const [nestedCard, setNestedCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNestedCardDetails = async () => {
      setLoading(true);
      try {
                          // Check if this is a standalone course (not nested under a parent)
         if (parentId === 'standalone') {
           console.log('Fetching standalone course:', nestedId);
           // Fetch the course directly
           const courseRes = await fetch(`${API_URL}/cards/${nestedId}`);
           if (!courseRes.ok) {
             throw new Error('Course not found');
           }
           const courseData = await courseRes.json();
           console.log('Received course data:', courseData);
           console.log('Course nestedData:', courseData.nestedData);
           
           // For standalone courses, we'll use the course as both parent and nested
           // Create a dummy parent card with course info
           const dummyParent = {
             _id: courseData._id,
             title: 'Course',
             description: 'Standalone course'
           };
           
           setParentCard(dummyParent);
           setNestedCard(courseData);
        } else {
          console.log('Fetching parent card:', parentId);
          // Fetch parent card
          const parentRes = await fetch(`${API_URL}/cards/${parentId}`);
          if (!parentRes.ok) {
            throw new Error('Parent card not found');
          }
          const parentData = await parentRes.json();
          console.log('Parent card data:', parentData);
          setParentCard(parentData);

          console.log('Fetching nested card:', nestedId);
          // Fetch nested card
          const nestedRes = await fetch(`${API_URL}/cards/${parentId}/nested/${nestedId}`);
          console.log('Nested card response status:', nestedRes.status);
          if (!nestedRes.ok) {
            const errorText = await nestedRes.text();
            console.error('Nested card error response:', errorText);
            throw new Error(`Nested card not found: ${nestedRes.status}`);
          }
                     const nestedData = await nestedRes.json();
           setNestedCard(nestedData);
        }
      } catch (err) {
        console.error('Error fetching nested card details:', err);
        setParentCard(null);
        setNestedCard(null);
      }
      setLoading(false);
    };

    if (parentId && nestedId) {
      fetchNestedCardDetails();
    }
  }, [parentId, nestedId]);

  if (loading) {
    return (
      <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#c1b2e5]"></div>
            <p className="text-white mt-4">Loading course details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!parentCard || !nestedCard) {
    return (
      <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-white text-lg mb-4">Course not found</div>
            <button
              onClick={() => navigate(parentId === 'standalone' ? '/courses-hub' : '/explore')}
              className="bg-gradient-to-r from-[#c1b2e5] to-[#a393c8] text-[#17141f] px-6 py-3 rounded-full font-medium hover:from-[#b0a1d4] hover:to-[#9283b6] transition-all duration-300 shadow-lg"
            >
              Back to {parentId === 'standalone' ? 'Courses' : 'Explore'}
            </button>
          </div>
        </div>
      </div>
    );
  }

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
    <div
      className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <Header />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-[#a393c8]">
            <button 
              onClick={() => navigate(parentId === 'standalone' ? '/courses-hub' : '/explore')}
              className="text-sm font-medium hover:text-white transition-colors duration-200"
            >
              {parentId === 'standalone' ? 'Courses' : 'Explore'}
            </button>
            {parentId !== 'standalone' && (
              <>
                <span className="text-sm">/</span>
                <button 
                  onClick={() => navigate('/explore')}
                  className="text-sm font-medium hover:text-white transition-colors duration-200"
                >
                  {parentCard.title}
                </button>
              </>
            )}
            <span className="text-sm">/</span>
            <span className="text-white text-sm font-medium">{nestedCard.title}</span>
          </div>

                     {/* Hero Section */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
             {/* Image Section */}
             <div className="lg:col-span-1">
               <div className="relative group">
                 <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                   <img
                     src={nestedCard.image ? `${API_URL}/uploads/${nestedCard.image}` : "/default_bunny.jpg"}
                     alt={nestedCard.title}
                     className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                   
                   {/* Level Badge */}
                   {(nestedCard.nestedData?.level || nestedCard.level) && (
                     <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#c1b2e5] to-[#a393c8] text-[#17141f] shadow-lg">
                       {nestedCard.nestedData?.level || nestedCard.level}
                     </div>
                   )}
                   
                   {/* Play Button Overlay */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                       <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M8 5v14l11-7z"/>
                       </svg>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

             {/* Content Section */}
             <div className="lg:col-span-2">
               <div className="space-y-6">
                 {/* Title and Category */}
                 <div>
                   <div className="inline-block px-3 py-1 bg-gradient-to-r from-[#c1b2e5]/20 to-[#a393c8]/20 rounded-full text-[#c1b2e5] text-sm font-medium mb-3">
                     {parentId === 'standalone' ? 'Course' : parentCard.title}
                   </div>
                   <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                     {nestedCard.title === 'undefined' ? 'Course Title Not Available' : nestedCard.title}
                   </h1>
                   <p className="text-[#a393c8] text-lg leading-relaxed">
                     {nestedCard.description === 'undefined' ? 'Course description not available.' : nestedCard.description}
                   </p>
                 </div>

                 {/* Warning Message for Incomplete Course */}
                 {(nestedCard.title === 'undefined' || nestedCard.description === 'undefined') && (
                   <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-6 border border-yellow-500/20">
                     <div className="flex items-center gap-3 mb-3">
                       <span className="text-2xl">⚠️</span>
                       <h3 className="text-yellow-400 text-lg font-semibold">Course Information Incomplete</h3>
                     </div>
                     <p className="text-yellow-300 text-base">
                       This course appears to have been created with incomplete information. Please contact an administrator to update the course details.
                     </p>
                   </div>
                 )}

                 {/* Course Stats */}
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {(nestedCard.nestedData?.duration || nestedCard.duration) && (
                     <div className="bg-gradient-to-br from-[#1a1f2a] to-[#2b3240] p-4 rounded-xl border border-[#2b3240]">
                       <div className="text-[#a393c8] text-sm mb-1">Duration</div>
                       <div className="text-white font-semibold">{nestedCard.nestedData?.duration || nestedCard.duration}</div>
                     </div>
                   )}
                   
                   {(nestedCard.nestedData?.instructor || nestedCard.instructor) && (
                     <div className="bg-gradient-to-br from-[#1a1f2a] to-[#2b3240] p-4 rounded-xl border border-[#2b3240]">
                       <div className="text-[#a393c8] text-sm mb-1">Instructor</div>
                       <div className="text-white font-semibold">{nestedCard.nestedData?.instructor || nestedCard.instructor}</div>
                     </div>
                   )}
                   
                   {(nestedCard.nestedData?.price || nestedCard.price) && (
                     <div className="bg-gradient-to-br from-[#1a1f2a] to-[#2b3240] p-4 rounded-xl border border-[#2b3240]">
                       <div className="text-[#a393c8] text-sm mb-1">Price</div>
                       <div className="text-[#c1b2e5] font-bold text-lg">
                         {(nestedCard.nestedData?.price || nestedCard.price) === 'Free' ? 'Free' : `$${nestedCard.nestedData?.price || nestedCard.price}`}
                       </div>
                     </div>
                   )}
                   
                   {(nestedCard.nestedData?.rating || nestedCard.rating) && (
                     <div className="bg-gradient-to-br from-[#1a1f2a] to-[#2b3240] p-4 rounded-xl border border-[#2b3240]">
                       <div className="text-[#a393c8] text-sm mb-1">Rating</div>
                       <div className="flex items-center gap-2">
                         <div className="flex">{renderStars(nestedCard.nestedData?.rating || nestedCard.rating)}</div>
                         <span className="text-white font-semibold">{(nestedCard.nestedData?.rating || nestedCard.rating)}/5</span>
                       </div>
                     </div>
                   )}
                 </div>

                                 {/* Action Buttons */}
                 <div className="flex flex-col sm:flex-row gap-4">
                   {(nestedCard.nestedData?.enrollmentUrl || nestedCard.enrollmentUrl) && (
                     <a
                       href={nestedCard.nestedData?.enrollmentUrl || nestedCard.enrollmentUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex-1 bg-gradient-to-r from-[#c1b2e5] to-[#a393c8] text-[#17141f] px-8 py-4 rounded-xl font-semibold hover:from-[#b0a1d4] hover:to-[#9283b6] transition-all duration-300 shadow-lg text-center"
                     >
                       Enroll Now
                     </a>
                   )}
                   
                   {(nestedCard.nestedData?.videoUrl || nestedCard.videoUrl) && (
                     <a
                       href={nestedCard.nestedData?.videoUrl || nestedCard.videoUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex-1 bg-gradient-to-br from-[#1a1f2a] to-[#2b3240] text-white px-8 py-4 rounded-xl font-semibold hover:from-[#2b3240] hover:to-[#3a4250] transition-all duration-300 border border-[#2b3240] text-center"
                     >
                       Watch Preview
                     </a>
                   )}
                 </div>
              </div>
            </div>
          </div>

                     {/* Course Description */}
           {(nestedCard.nestedData?.courseDescription || nestedCard.courseDescription) && (
             <div className="mb-12">
               <div className="bg-gradient-to-br from-[#1a1f2a] to-[#2b3240] rounded-2xl p-8 border border-[#2b3240] shadow-xl">
                 <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                   <span className="text-2xl">📚</span>
                   About This Course
                 </h2>
                 <div className="text-[#a393c8] text-lg leading-relaxed whitespace-pre-wrap">
                   {nestedCard.nestedData?.courseDescription || nestedCard.courseDescription}
                 </div>
               </div>
             </div>
           )}

                     {/* Curriculum */}
           {((nestedCard.nestedData?.curriculum && nestedCard.nestedData.curriculum.length > 0) || (nestedCard.curriculum && nestedCard.curriculum.length > 0)) && (
             <div className="mb-12">
               <div className="bg-gradient-to-br from-[#1a1f2a] to-[#2b3240] rounded-2xl p-8 border border-[#2b3240] shadow-xl">
                 <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                   <span className="text-2xl">🎯</span>
                   What You'll Learn
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {(nestedCard.nestedData?.curriculum || nestedCard.curriculum).map((item, index) => (
                     <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-br from-[#2b3240] to-[#3a4250] rounded-xl border border-[#3a4250] hover:border-[#c1b2e5]/30 transition-all duration-300">
                       <div className="w-8 h-8 bg-gradient-to-r from-[#c1b2e5] to-[#a393c8] text-[#17141f] rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                         {index + 1}
                       </div>
                       <span className="text-white text-base leading-relaxed">{item}</span>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           )}

          {/* Course Highlights */}
          <div className="mb-12">
            <div className="bg-gradient-to-br from-[#1a1f2a] to-[#2b3240] rounded-2xl p-8 border border-[#2b3240] shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">✨</span>
                Course Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-[#2b3240] to-[#3a4250] rounded-xl border border-[#3a4250]">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#c1b2e5] to-[#a393c8] rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Expert Instruction</div>
                    <div className="text-[#a393c8] text-sm">Learn from industry professionals</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-[#2b3240] to-[#3a4250] rounded-xl border border-[#3a4250]">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#c1b2e5] to-[#a393c8] rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Flexible Learning</div>
                    <div className="text-[#a393c8] text-sm">Study at your own pace</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-[#2b3240] to-[#3a4250] rounded-xl border border-[#3a4250]">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#c1b2e5] to-[#a393c8] rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Certificate</div>
                    <div className="text-[#a393c8] text-sm">Earn a completion certificate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

                     {/* Reviews Section */}
           {((nestedCard.nestedData?.reviews && nestedCard.nestedData.reviews > 0) || (nestedCard.reviews && nestedCard.reviews > 0)) && (
             <div className="mb-12">
               <div className="bg-gradient-to-br from-[#1a1f2a] to-[#2b3240] rounded-2xl p-8 border border-[#2b3240] shadow-xl">
                 <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                   <span className="text-2xl">⭐</span>
                   Student Reviews
                 </h2>
                 <div className="text-center">
                   <div className="text-6xl font-bold text-[#c1b2e5] mb-4">{nestedCard.nestedData?.reviews || nestedCard.reviews}</div>
                   <p className="text-[#a393c8] text-lg">Happy students have taken this course</p>
                   <div className="flex justify-center mt-4">
                     {renderStars((nestedCard.nestedData?.rating || nestedCard.rating) || 5)}
                   </div>
                 </div>
               </div>
             </div>
           )}

                     {/* Call to Action */}
           <div className="text-center">
             <div className="bg-gradient-to-br from-[#c1b2e5]/10 to-[#a393c8]/10 rounded-2xl p-8 border border-[#c1b2e5]/20">
               <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Learning?</h3>
               <p className="text-[#a393c8] text-lg mb-6">Join thousands of students who have already enrolled in this course</p>
               {(nestedCard.nestedData?.enrollmentUrl || nestedCard.enrollmentUrl) && (
                 <a
                   href={nestedCard.nestedData?.enrollmentUrl || nestedCard.enrollmentUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-block bg-gradient-to-r from-[#c1b2e5] to-[#a393c8] text-[#17141f] px-8 py-4 rounded-xl font-semibold hover:from-[#b0a1d4] hover:to-[#9283b6] transition-all duration-300 shadow-lg text-lg"
                 >
                   Enroll Now - Start Learning Today!
                 </a>
               )}
             </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default NestedCardDetail;
