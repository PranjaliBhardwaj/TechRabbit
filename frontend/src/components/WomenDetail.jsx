import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const WomenDetail = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardDetails = async () => {
      console.log('🔍 WomenDetail: Starting to fetch card with ID:', cardId);
      setLoading(true);
      setError(null);
      
      try {
        const cardRes = await fetch(`${API_URL}/cards/${cardId}`);
        console.log('🔍 WomenDetail: Response status:', cardRes.status);
        
        if (!cardRes.ok) {
          const errorText = await cardRes.text();
          console.error('❌ WomenDetail: Card not found, status:', cardRes.status, 'error:', errorText);
          throw new Error(`Card not found: ${cardRes.status}`);
        }
        
        const cardData = await cardRes.json();
        console.log('✅ WomenDetail: Received card data:', cardData);
        console.log('✅ WomenDetail: Card nestedData:', cardData.nestedData);
        console.log('✅ WomenDetail: Card section:', cardData.section);
        console.log('✅ WomenDetail: Card title:', cardData.title);
        console.log('✅ WomenDetail: Full card data structure:', JSON.stringify(cardData, null, 2));
        
        setCard(cardData);
      } catch (err) {
        console.error('❌ WomenDetail: Error fetching card details:', err);
        setError(err.message);
        setCard(null);
      } finally {
        setLoading(false);
      }
    };

    if (cardId) {
      fetchCardDetails();
    } else {
      console.error('❌ WomenDetail: No cardId provided');
      setError('No card ID provided');
      setLoading(false);
    }
  }, [cardId]);

  if (loading) {
    return (
      <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#1f141b] via-[#2a1a2e] to-[#1f141b]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400"></div>
            <p className="text-pink-300 mt-4">Loading opportunity details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#1f141b] via-[#2a1a2e] to-[#1f141b]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-pink-300 text-lg mb-4">
              {error || 'Opportunity not found'}
            </div>
            <button
              onClick={() => navigate('/women-corner')}
              className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-3 rounded-full font-medium hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-lg"
            >
              Back to Women's Corner
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
      stars.push(<span key={i} className="text-pink-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-pink-400">☆</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-400">☆</span>);
    }
    
    return stars;
  };

  const getSectionIcon = (section) => {
    switch (section) {
      case 'scholarship': return '🎓';
      case 'internship': return '💼';
      case 'mentorship': return '🌟';
      default: return '🌸';
    }
  };

  const getSectionLabel = (section) => {
    switch (section) {
      case 'scholarship': return 'Scholarship';
      case 'internship': return 'Internship';
      case 'mentorship': return 'Mentorship';
      default: return 'Opportunity';
    }
  };

  console.log('🎨 WomenDetail: Rendering card with data:', {
    title: card.title,
    description: card.description,
    section: card.section,
    nestedData: card.nestedData,
    hasImage: !!card.image
  });

  return (
    <div
      className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#1f141b] via-[#2a1a2e] to-[#1f141b] overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <Header />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-pink-300">
            <button 
              onClick={() => navigate('/women-corner')}
              className="text-sm font-medium hover:text-white transition-colors duration-200"
            >
              Women's Corner
            </button>
            <span className="text-sm">/</span>
            <span className="text-white text-sm font-medium">{card.title}</span>
          </div>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Image Section */}
            <div className="lg:col-span-1">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={card.image ? `${API_URL}/uploads/${card.image}` : "/default_bunny.jpg"}
                    alt={card.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.target.src = "/default_bunny.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Section Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg">
                    {getSectionIcon(card.section)} {getSectionLabel(card.section)}
                  </div>
                  
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Title and Category */}
                <div>
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full text-pink-300 text-sm font-medium mb-3">
                    {getSectionLabel(card.section)}
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    {card.title === 'undefined' ? 'Opportunity Title Not Available' : card.title}
                  </h1>
                  <p className="text-pink-200 text-lg leading-relaxed">
                    {card.description === 'undefined' ? 'Opportunity description not available.' : card.description}
                  </p>
                </div>

                {/* Warning Message for Incomplete Opportunity */}
                {(card.title === 'undefined' || card.description === 'undefined') && (
                  <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-xl p-6 border border-pink-500/20">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">⚠️</span>
                      <h3 className="text-pink-300 text-lg font-semibold">Opportunity Information Incomplete</h3>
                    </div>
                    <p className="text-pink-200 text-base">
                      This opportunity appears to have been created with incomplete information. Please contact an administrator to update the details.
                    </p>
                  </div>
                )}

                {/* Opportunity Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(card.nestedData?.duration || card.duration) && (
                    <div className="bg-gradient-to-br from-[#2a1a2e] to-[#1f141b] p-4 rounded-xl border border-pink-500/20">
                      <div className="text-pink-300 text-sm mb-1">Duration</div>
                      <div className="text-white font-semibold">{card.nestedData?.duration || card.duration}</div>
                    </div>
                  )}
                  
                  {(card.nestedData?.price || card.price) && (
                    <div className="bg-gradient-to-br from-[#2a1a2e] to-[#1f141b] p-4 rounded-xl border border-pink-500/20">
                      <div className="text-pink-300 text-sm mb-1">Price</div>
                      <div className="text-pink-400 font-bold text-lg">
                        {(card.nestedData?.price || card.price) === 'Free' ? 'Free' : `₹${card.nestedData?.price || card.price}`}
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-gradient-to-br from-[#2a1a2e] to-[#1f141b] p-4 rounded-xl border border-pink-500/20">
                    <div className="text-pink-300 text-sm mb-1">Stipend/Value</div>
                    <div className="text-pink-400 font-bold text-lg">
                      {(card.nestedData?.stipendValue || card.stipendValue) ? 
                        ((card.nestedData?.stipendValue || card.stipendValue) === 'Free' ? 'Free' : `₹${card.nestedData?.stipendValue || card.stipendValue}`) : 
                        'Not specified'
                      }
                    </div>
                  </div>
                  
                  {(card.nestedData?.rating || card.rating) && (
                    <div className="bg-gradient-to-br from-[#2a1a2e] to-[#1f141b] p-4 rounded-xl border border-pink-500/20">
                      <div className="text-pink-300 text-sm mb-1">Rating</div>
                      <div className="flex items-center gap-2">
                        {(card.nestedData?.rating || card.rating) === 'N/A' ? (
                          <span className="text-white font-semibold">N/A</span>
                        ) : (
                          <>
                            <div className="flex">{renderStars(card.nestedData?.rating || card.rating)}</div>
                            <span className="text-white font-semibold">{(card.nestedData?.rating || card.rating)}/5</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {(card.nestedData?.enrollmentUrl || card.enrollmentUrl) && (
                    <a
                      href={card.nestedData?.enrollmentUrl || card.enrollmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-lg text-center"
                    >
                      Apply Now
                    </a>
                  )}
                  
                  {(card.nestedData?.videoUrl || card.videoUrl) && (
                    <a
                      href={card.nestedData?.videoUrl || card.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-br from-[#2a1a2e] to-[#1f141b] text-white px-8 py-4 rounded-xl font-semibold hover:from-[#1f141b] hover:to-[#2a1a2e] transition-all duration-300 border border-pink-500/20 text-center"
                    >
                      Learn More
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          {(card.nestedData?.courseDescription || card.courseDescription) && (
            <div className="mb-12">
              <div className="bg-gradient-to-br from-[#2a1a2e] to-[#1f141b] rounded-2xl p-8 border border-pink-500/20 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-2xl">🌸</span>
                  About This Opportunity
                </h2>
                <div className="text-pink-200 text-lg leading-relaxed whitespace-pre-wrap">
                  {card.nestedData?.courseDescription || card.courseDescription}
                </div>
              </div>
            </div>
          )}

          {/* Requirements/Curriculum */}
          {((card.nestedData?.curriculum && card.nestedData.curriculum.length > 0) || (card.curriculum && card.curriculum.length > 0)) && (
            <div className="mb-12">
              <div className="bg-gradient-to-br from-[#2a1a2e] to-[#1f141b] rounded-2xl p-8 border border-pink-500/20 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-2xl">✨</span>
                  What You'll Gain
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(card.nestedData?.curriculum || card.curriculum).map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-br from-[#1f141b] to-[#2a1a2e] rounded-xl border border-pink-500/20 hover:border-pink-400/30 transition-all duration-300">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                        {index + 1}
                      </div>
                      <span className="text-white text-base leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Opportunity Highlights */}
          <div className="mb-12">
            <div className="bg-gradient-to-br from-[#2a1a2e] to-[#1f141b] rounded-2xl p-8 border border-pink-500/20 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">💖</span>
                Why This Opportunity?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-[#1f141b] to-[#2a1a2e] rounded-xl border border-pink-500/20">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Expert Guidance</div>
                    <div className="text-pink-200 text-sm">Learn from experienced professionals</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-[#1f141b] to-[#2a1a2e] rounded-xl border border-pink-500/20">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">💪</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Empowerment</div>
                    <div className="text-pink-200 text-sm">Build confidence and skills</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-[#1f141b] to-[#2a1a2e] rounded-xl border border-pink-500/20">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Networking</div>
                    <div className="text-pink-200 text-sm">Connect with like-minded women</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          {((card.nestedData?.reviews && card.nestedData.reviews > 0) || (card.reviews && card.reviews > 0)) && (
            <div className="mb-12">
              <div className="bg-gradient-to-br from-[#2a1a2e] to-[#1f141b] rounded-2xl p-8 border border-pink-500/20 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-2xl">💖</span>
                  Participant Reviews
                </h2>
                <div className="text-center">
                  <div className="text-6xl font-bold text-pink-400 mb-4">{card.nestedData?.reviews || card.reviews}</div>
                  <p className="text-pink-200 text-lg">Amazing women have participated in this opportunity</p>
                  <div className="flex justify-center mt-4">
                    {renderStars((card.nestedData?.rating || card.rating) || 5)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-pink-400/10 to-purple-400/10 rounded-2xl p-8 border border-pink-400/20">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Take the Next Step?</h3>
              <p className="text-pink-200 text-lg mb-6">Join hundreds of women who have already seized this amazing opportunity</p>
              {(card.nestedData?.enrollmentUrl || card.enrollmentUrl) && (
                <a
                  href={card.nestedData?.enrollmentUrl || card.enrollmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-lg text-lg"
                >
                  Apply Now - Start Your Journey Today!
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WomenDetail;
