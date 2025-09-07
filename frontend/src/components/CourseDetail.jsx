import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const CourseDetail = () => {
  const { parentId, nestedId, courseId } = useParams();
  const navigate = useNavigate();
  const [parentCard, setParentCard] = useState(null);
  const [nestedCard, setNestedCard] = useState(null);
  const [courseCard, setCourseCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isStandaloneCourse, setIsStandaloneCourse] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        // Check if this is a standalone course or nested card
        if (courseId) {
          // Standalone course
          setIsStandaloneCourse(true);
          const courseRes = await fetch(`${API_URL}/cards/${courseId}`);
          if (!courseRes.ok) {
            throw new Error('Course not found');
          }
          const courseData = await courseRes.json();
          setCourseCard(courseData);
        } else if (parentId && nestedId) {
          // Nested card under parent
          setIsStandaloneCourse(false);
          // Fetch parent card
          const parentRes = await fetch(`${API_URL}/cards/${parentId}`);
          if (!parentRes.ok) {
            throw new Error('Parent card not found');
          }
          const parentData = await parentRes.json();
          setParentCard(parentData);

          // Fetch nested card
          const nestedRes = await fetch(`${API_URL}/cards/${parentId}/nested/${nestedId}`);
          if (!nestedRes.ok) {
            throw new Error('Nested card not found');
          }
          const nestedData = await nestedRes.json();
          setNestedCard(nestedData);
        }
      } catch (err) {
        console.error('Error fetching course details:', err);
        setParentCard(null);
        setNestedCard(null);
        setCourseCard(null);
      }
      setLoading(false);
    };

    if (courseId || (parentId && nestedId)) {
      fetchCourseDetails();
    }
  }, [parentId, nestedId, courseId]);

  if (loading) {
    return (
      <div className="relative flex min-h-screen flex-col bg-[#161122]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (isStandaloneCourse && !courseCard) {
    return (
      <div className="relative flex min-h-screen flex-col bg-[#161122]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-white text-lg mb-4">Course not found</div>
            <button
              onClick={() => navigate('/courses-hub')}
              className="bg-[#c1b2e5] text-[#17141f] px-6 py-2 rounded-full font-medium hover:bg-[#b0a1d4] transition-colors"
            >
              Back to Course Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isStandaloneCourse && (!parentCard || !nestedCard)) {
    return (
      <div className="relative flex min-h-screen flex-col bg-[#161122]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-white text-lg mb-4">Course not found</div>
            <button
              onClick={() => navigate(`/explore/${parentId}`)}
              className="bg-[#c1b2e5] text-[#17141f] px-6 py-2 rounded-full font-medium hover:bg-[#b0a1d4] transition-colors"
            >
              Back to Parent Card
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

  // Get the card data to display
  const displayCard = isStandaloneCourse ? courseCard : nestedCard;
  const cardTitle = isStandaloneCourse ? courseCard?.title : nestedCard?.title;
  const cardDescription = isStandaloneCourse ? courseCard?.description : nestedCard?.description;
  const cardImage = isStandaloneCourse ? courseCard?.image : nestedCard?.image;
  const cardNestedData = isStandaloneCourse ? courseCard?.nestedData : nestedCard?.nestedData;

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#161122] overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <Header />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-8 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate(isStandaloneCourse ? '/courses-hub' : `/explore/${parentId}`)}
              className="flex items-center gap-2 text-[#c1b2e5] hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to {isStandaloneCourse ? 'Course Hub' : 'Parent Card'}
            </button>
          </div>

          {/* Course Header */}
          <div className="bg-[#1a1f2a] rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image */}
              <div className="relative">
                {cardImage ? (
                  <img
                    src={`${API_URL}/uploads/${cardImage}`}
                    alt={cardTitle}
                    className="w-full h-80 object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-80 bg-[#2b3240] rounded-xl flex items-center justify-center">
                    <span className="text-[#9da8be] text-lg">No Image</span>
                  </div>
                )}
                
                {/* Level Badge */}
                {cardNestedData?.level && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-[#c1b2e5] text-[#17141f]">
                    {cardNestedData.level}
                  </div>
                )}
              </div>

              {/* Course Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-white text-3xl font-bold mb-3">{cardTitle}</h1>
                  <p className="text-[#9da8be] text-lg leading-relaxed">{cardDescription}</p>
                </div>

                {/* Course Details */}
                <div className="grid grid-cols-2 gap-4">
                  {cardNestedData?.duration && (
                    <div className="bg-[#2b3240] p-4 rounded-lg">
                      <div className="text-[#9da8be] text-sm mb-1">Duration</div>
                      <div className="text-white font-semibold">{cardNestedData.duration}</div>
                    </div>
                  )}
                  
                  {cardNestedData?.instructor && (
                    <div className="bg-[#2b3240] p-4 rounded-lg">
                      <div className="text-[#9da8be] text-sm mb-1">Instructor</div>
                      <div className="text-white font-semibold">{cardNestedData.instructor}</div>
                    </div>
                  )}
                  
                  {cardNestedData?.price && (
                    <div className="bg-[#2b3240] p-4 rounded-lg">
                      <div className="text-[#9da8be] text-sm mb-1">Price</div>
                      <div className="text-white font-semibold text-[#c1b2e5]">
                        {cardNestedData.price === 'Free' ? 'Free' : `₹${cardNestedData.price}`}
                      </div>
                    </div>
                  )}
                  
                  {cardNestedData?.rating && (
                    <div className="bg-[#2b3240] p-4 rounded-lg">
                      <div className="text-[#9da8be] text-sm mb-1">Rating</div>
                      <div className="flex items-center gap-2">
                        {cardNestedData.rating === 'N/A' ? (
                          <span className="text-white font-semibold">N/A</span>
                        ) : (
                          <>
                            <div className="flex">{renderStars(cardNestedData.rating)}</div>
                            <span className="text-white font-semibold">{cardNestedData.rating}/5</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  {cardNestedData?.enrollmentUrl && (
                    <a
                      href={cardNestedData.enrollmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#c1b2e5] text-[#17141f] px-8 py-3 rounded-lg font-semibold hover:bg-[#b0a1d4] transition-colors"
                    >
                      Enroll Now
                    </a>
                  )}
                  
                  {cardNestedData?.videoUrl && (
                    <a
                      href={cardNestedData.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#2b3240] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3a4250] transition-colors border border-[#3a4250]"
                    >
                      Watch Preview
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Curriculum */}
          {cardNestedData?.curriculum && cardNestedData.curriculum.length > 0 && (
            <div className="bg-[#1a1f2a] rounded-2xl p-8 mb-8">
              <h2 className="text-white text-2xl font-bold mb-6">Curriculum</h2>
              <div className="space-y-4">
                {cardNestedData.curriculum.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-[#2b3240] rounded-lg">
                    <div className="w-8 h-8 bg-[#c1b2e5] text-[#17141f] rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <span className="text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {cardNestedData?.reviews && cardNestedData.reviews > 0 && (
            <div className="bg-[#1a1f2a] rounded-2xl p-8">
              <h2 className="text-white text-2xl font-bold mb-6">Reviews</h2>
              <div className="text-center">
                <div className="text-6xl mb-4">{cardNestedData.reviews}</div>
                <p className="text-[#9da8be] text-lg">Student reviews</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
