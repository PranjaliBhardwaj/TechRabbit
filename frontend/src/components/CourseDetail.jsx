import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';

const API_URL = "http://localhost:5000";

const CourseDetail = () => {
  const { parentId, nestedId } = useParams();
  const navigate = useNavigate();
  const [parentCard, setParentCard] = useState(null);
  const [nestedCard, setNestedCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
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
      } catch (err) {
        console.error('Error fetching course details:', err);
        setParentCard(null);
        setNestedCard(null);
      }
      setLoading(false);
    };

    if (parentId && nestedId) {
      fetchCourseDetails();
    }
  }, [parentId, nestedId]);

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

  if (!parentCard || !nestedCard) {
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

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#161122] overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <Header />

      {/* Main Content */}
      <main className="px-40 py-5 flex flex-1 justify-center">
        <div className="flex flex-col max-w-[960px] w-full">
          {/* Breadcrumb */}
          <div className="flex gap-2 p-4 text-[#a393c8]">
            <button 
              onClick={() => navigate('/explore')}
              className="text-base font-medium hover:text-white transition-colors"
            >
              Explore
            </button>
            <span className="text-base font-medium">/</span>
            <button 
              onClick={() => navigate(`/explore/${parentId}`)}
              className="text-base font-medium hover:text-white transition-colors"
            >
              {parentCard.title}
            </button>
            <span className="text-base font-medium">/</span>
            <span className="text-white text-base font-medium">{nestedCard.title}</span>
          </div>

          {/* Course Header */}
          <div className="flex justify-between gap-3 p-4">
            <div className="flex flex-col gap-3 min-w-72">
              <p className="text-white text-[32px] font-bold">{nestedCard.title}</p>
              <p className="text-[#a393c8] text-sm">
                {nestedCard.description}
              </p>
            </div>
          </div>

          {/* Video + Info Card */}
          <div className="p-4">
            <div className="flex flex-col @xl:flex-row rounded-xl">
              <div
                className="w-full aspect-video bg-center bg-cover rounded-xl"
                style={{
                  backgroundImage: nestedCard.image 
                    ? `url(${API_URL}/uploads/${nestedCard.image})`
                    : 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuANh6JebIOZJGkf8IVQfPK0DBXG3B7L89OkkrHcyax6i8ZnYShjRxGjTyjFQEebpiV7UFnmIt197zMp5pgaCbGa-OoqsOD3EDlXoC4qoCi9BVq1yJ9Te1M4tRwdiU1lfbF_GFjFExwxT6XS6Qjw6UNaT2ChigxYJtWi7i6TKX-mbIJKUqfKUUU9Xwd5g6SvzH1GH-JHfbwyMhhWRxhNoohDWtivIjhB8fS_59XJn2iiVv0dlylPYvuwGl5fL5gU1F5C5IU225FvEDTl")'
                }}
              ></div>
              <div className="flex flex-col justify-center py-4 px-4">
                <p className="text-[#a393c8] text-sm">Course</p>
                <p className="text-white text-lg font-bold">{nestedCard.title}</p>
                <div className="flex justify-between items-end gap-3">
                  <p className="text-[#a393c8] text-base">
                    {nestedCard.description}
                  </p>
                  {nestedCard.nestedData?.enrollmentUrl && (
                    <button 
                      className="h-8 px-4 rounded-full bg-[#5619e5] text-white text-sm font-medium hover:bg-[#4a15d1] transition-colors"
                      onClick={() => window.open(nestedCard.nestedData.enrollmentUrl, '_blank')}
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Course Details */}
          <div className="p-4 space-y-6">
            {/* Course Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nestedCard.nestedData?.duration && (
                <div className="bg-[#1a1f2a] rounded-xl p-4">
                  <h3 className="text-white font-semibold mb-2">Duration</h3>
                  <p className="text-[#a393c8]">{nestedCard.nestedData.duration}</p>
                </div>
              )}
              
              {nestedCard.nestedData?.level && (
                <div className="bg-[#1a1f2a] rounded-xl p-4">
                  <h3 className="text-white font-semibold mb-2">Level</h3>
                  <p className="text-[#a393c8]">{nestedCard.nestedData.level}</p>
                </div>
              )}
              
              {nestedCard.nestedData?.price && (
                <div className="bg-[#1a1f2a] rounded-xl p-4">
                  <h3 className="text-white font-semibold mb-2">Price</h3>
                  <p className="text-[#a393c8]">{nestedCard.nestedData.price}</p>
                </div>
              )}
            </div>

            {/* Instructor */}
            {nestedCard.nestedData?.instructor && (
              <div className="bg-[#1a1f2a] rounded-xl p-4">
                <h3 className="text-white font-semibold mb-2">Instructor</h3>
                <p className="text-[#a393c8]">{nestedCard.nestedData.instructor}</p>
              </div>
            )}

            {/* Rating */}
            {nestedCard.nestedData?.rating && (
              <div className="bg-[#1a1f2a] rounded-xl p-4">
                <h3 className="text-white font-semibold mb-2">Rating</h3>
                <div className="flex items-center gap-3">
                  <div className="flex text-2xl">
                    {renderStars(nestedCard.nestedData.rating)}
                  </div>
                  <div className="text-[#a393c8]">
                    {nestedCard.nestedData.rating} out of 5
                    {nestedCard.nestedData.reviews && (
                      <span className="block text-sm">
                        Based on {nestedCard.nestedData.reviews} reviews
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Curriculum */}
            {nestedCard.nestedData?.curriculum && nestedCard.nestedData.curriculum.length > 0 && (
              <div className="bg-[#1a1f2a] rounded-xl p-4">
                <h3 className="text-white font-semibold mb-4">Curriculum</h3>
                <div className="space-y-3">
                  {nestedCard.nestedData.curriculum.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-[#c1b2e5] rounded-full flex items-center justify-center text-[#17141f] text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-[#a393c8]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
