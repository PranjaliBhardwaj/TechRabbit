import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import NestedCardGrid from './NestedCardGrid';
import NestedCardForm from './NestedCardForm';

const API_URL = 'http://localhost:5000';

const sectionLabels = {
  scholarship: 'Scholarships',
  internship: 'Internships',
  mentorship: 'Mentorships',
  course: 'Courses',
  opensource: 'Open Source Programs',
  extracurricular: 'Extracurricular Activities',
};

// Tab-specific section configurations
const tabConfigurations = {
  explore: {
    title: 'Explore Section',
    description: 'Manage category cards and their content cards',
    sections: ['opensource', 'extracurricular'],
    sectionOptions: [
      { value: 'opensource', label: 'Open Source Programs' },
      { value: 'extracurricular', label: 'Extracurricular Activities' },
    ],
    // Special configuration for explore tab
    isHierarchical: true,
    categorySections: ['opensource', 'extracurricular'], // These will be category cards
    contentSections: ['opensource', 'extracurricular'] // These will be content cards under categories
  },
  'women-corner': {
    title: 'Women Corner',
    description: 'Manage scholarships, internships, and mentorship content for women',
    sections: ['scholarship', 'internship', 'mentorship'],
    sectionOptions: [
      { value: 'scholarship', label: 'Scholarship' },
      { value: 'internship', label: 'Internship' },
      { value: 'mentorship', label: 'Mentorship' },
    ]
  },
  'course-page': {
    title: 'Course Page',
    description: 'Manage course-specific content and materials',
    sections: ['course'],
    sectionOptions: [
      { value: 'course', label: 'Course' },
    ]
  },
  'nested-cards': {
    title: 'Nested Cards',
    description: 'Manage nested content and course materials for parent cards',
    sections: [], // No direct sections, uses parent cards
    sectionOptions: []
  }
};

const UnifiedAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('explore');
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [parentCards, setParentCards] = useState([]);
  const [selectedParentCard, setSelectedParentCard] = useState(null);
  const [nestedCards, setNestedCards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Explore tab specific states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryCards, setCategoryCards] = useState([]);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  
  // Course creation states
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [courseFormData, setCourseFormData] = useState({
    title: '',
    description: '',
    image: null,
    nestedData: {
      videoUrl: '',
      duration: '',
      level: 'Beginner',
      price: '',
      enrollmentUrl: '',
      curriculum: [''],
      instructor: '',
      rating: 0,
      reviews: 0
    }
  });

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    section: tabConfigurations.explore.sectionOptions[0].value,
    image: null,
    nestedData: {
      videoUrl: '',
      duration: '',
      level: 'Beginner',
      price: '',
      enrollmentUrl: '',
      curriculum: [''],
      instructor: '',
      rating: 0,
      reviews: 0,
      courseDescription: '',
      courseType: 'Detailed'
    }
  });

  useEffect(() => {
    // Verify admin session
    fetch(`${API_URL}/auth/me`, { credentials: 'include' })
      .then(r => r.json())
      .then(d => { if (!d.isAdmin) navigate('/admin/login'); })
      .catch(() => navigate('/admin/login'));

    fetchCards();
    fetchParentCards();
    if (activeTab === 'explore') {
      fetchCategoryCards();
    }
  }, [activeTab]);

  useEffect(() => {
    if (selectedParentCard) {
      fetchNestedCards(selectedParentCard._id);
    }
  }, [selectedParentCard]);

  // Reset form when tab changes
  useEffect(() => {
    resetForm();
  }, [activeTab]);

  const fetchCards = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/cards`);
      const data = await res.json();
      setCards(data);
    } catch (err) {
      setMessage('Failed to fetch cards');
    }
    setLoading(false);
  };

  const fetchParentCards = async () => {
    try {
      const response = await fetch(`${API_URL}/cards`);
      const data = await response.json();
      const parentCardsData = data.filter(card => !card.isNested);
      setParentCards(parentCardsData);
      if (parentCardsData.length > 0) {
        setSelectedParentCard(parentCardsData[0]);
      }
    } catch (error) {
      console.error('Error fetching parent cards:', error);
    }
  };

  const fetchNestedCards = async (parentId) => {
    try {
      const response = await fetch(`${API_URL}/cards/${parentId}/nested`);
      const data = await response.json();
      setNestedCards(data);
    } catch (error) {
      console.error('Error fetching nested cards:', error);
      setNestedCards([]);
    }
  };

  const fetchCategoryCards = async () => {
    try {
      const response = await fetch(`${API_URL}/cards`);
      const data = await response.json();
      // Filter for category cards (cards that are not nested and have section 'category')
      const categoryCardsData = data.filter(card => 
        !card.isNested && 
        card.section === 'category'
      );
      setCategoryCards(categoryCardsData);
    } catch (error) {
      console.error('Error fetching category cards:', error);
    }
  };



  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.section) return;
    
    setLoading(true);
    setMessage('');
    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('section', formData.section);
      if (formData.image) submitData.append('image', formData.image);

      // Include full nestedData for Women Corner entries
      if (activeTab === 'women-corner' && ['scholarship', 'internship', 'mentorship'].includes(formData.section)) {
        const nd = formData.nestedData || {};
        const nestedDataPayload = {
          videoUrl: nd.videoUrl || '',
          duration: nd.duration || '',
          price: nd.price || '',
          enrollmentUrl: nd.enrollmentUrl || '',
          curriculum: Array.isArray(nd.curriculum) ? nd.curriculum : [''],
          instructor: nd.instructor || '',
          rating: Number(nd.rating || 0),
          reviews: Number(nd.reviews || 0),
          courseDescription: nd.courseDescription || '',
          
        };
        submitData.append('nestedData', JSON.stringify(nestedDataPayload));
      }

      const res = await fetch(`${API_URL}/cards`, {
        method: 'POST',
        body: submitData,
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to create card');
      setMessage('Card created successfully!');
      resetForm();
      fetchCards();
      fetchParentCards();
    } catch (err) {
      setMessage('Error creating card');
    }
    setLoading(false);
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    
    // For courses, we don't need to set formData since we'll use NestedCardForm
    if (card.section === 'course') {
      setMessage('');
      return;
    }
    
    // For other cards, set the basic form data
    setFormData({
      title: card.title,
      description: card.description,
      section: card.section,
      image: null,
      nestedData: {
        videoUrl: card.nestedData?.videoUrl || '',
        duration: card.nestedData?.duration || '',
        price: card.nestedData?.price || '',
        enrollmentUrl: card.nestedData?.enrollmentUrl || '',
        curriculum: card.nestedData?.curriculum || [''],
        instructor: card.nestedData?.instructor || '',
        rating: card.nestedData?.rating || 0,
        reviews: card.nestedData?.reviews || 0,
        courseDescription: card.nestedData?.courseDescription || ''
      }
    });
    setMessage('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingCard) return;
    
    setLoading(true);
    setMessage('');
    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('section', formData.section);
      if (formData.image) submitData.append('image', formData.image);

      // Include full nestedData for Women Corner entries
      if (['scholarship', 'internship', 'mentorship'].includes(formData.section)) {
        const nd = formData.nestedData || {};
        const nestedDataPayload = {
          videoUrl: nd.videoUrl || '',
          duration: nd.duration || '',
          price: nd.price || '',
          enrollmentUrl: nd.enrollmentUrl || '',
          curriculum: Array.isArray(nd.curriculum) ? nd.curriculum : [''],
          instructor: nd.instructor || '',
          rating: Number(nd.rating || 0),
          reviews: Number(nd.reviews || 0),
          courseDescription: nd.courseDescription || '',
          
        };
        submitData.append('nestedData', JSON.stringify(nestedDataPayload));
      }

      const res = await fetch(`${API_URL}/cards/${editingCard._id}`, {
        method: 'PUT',
        body: submitData,
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to update card');
      setMessage('Card updated successfully!');
      setEditingCard(null);
      resetForm();
      fetchCards();
      fetchParentCards();
    } catch (err) {
      setMessage('Error updating card');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this card?')) return;
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/cards/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to delete card');
      setMessage('Card deleted successfully!');
      fetchCards();
      fetchParentCards();
    } catch (err) {
      setMessage('Error deleting card');
    }
    setLoading(false);
  };

  const handleCardsUpdate = (updatedCard, oldId) => {
    if (oldId) {
      setNestedCards(prev => 
        prev.map(card => card._id === oldId ? updatedCard : card)
      );
    } else {
      setNestedCards(prev => [updatedCard, ...prev]);
    }
  };

  // Category card handlers
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    
    setLoading(true);
    setMessage('');
    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('section', 'category'); // Set a default section for category cards
      if (formData.image) submitData.append('image', formData.image);

      const res = await fetch(`${API_URL}/cards`, {
        method: 'POST',
        body: submitData,
        credentials: 'include'
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${res.status}: Failed to create category card`);
      }
      
      setMessage('Category card created successfully!');
      resetForm();
      setIsCreatingCategory(false);
      fetchCategoryCards();
    } catch (err) {
      console.error('Category creation error:', err);
      setMessage(`Error creating category card: ${err.message}`);
    }
    setLoading(false);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    fetchNestedCards(category._id);
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Delete this category card and all its nested content?')) return;
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/cards/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to delete category card');
      setMessage('Category card deleted successfully!');
      fetchCategoryCards();
      if (selectedCategory?._id === id) {
        setSelectedCategory(null);
        setNestedCards([]);
      }
    } catch (err) {
      setMessage('Error deleting category card');
    }
    setLoading(false);
  };

  const handleUpdateCourse = async (courseData) => {
    if (!editingCard) return;
    
    setLoading(true);
    setMessage('');
    try {
      const submitData = new FormData();
      
      // Handle both FormData and regular object formats
      if (courseData instanceof FormData) {
        // If it's already FormData, use it directly
        const res = await fetch(`${API_URL}/cards/${editingCard._id}`, {
          method: 'PUT',
          body: courseData,
          credentials: 'include'
        });
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${res.status}: Failed to update course`);
        }
      } else {
        // If it's a regular object, convert to FormData
        submitData.append('title', courseData.title);
        submitData.append('description', courseData.description);
        submitData.append('section', 'course');
        if (courseData.image) submitData.append('image', courseData.image);
        
        // Add nested data as JSON string
        const nestedData = { ...courseData.nestedData };
        submitData.append('nestedData', JSON.stringify(nestedData));

        const res = await fetch(`${API_URL}/cards/${editingCard._id}`, {
          method: 'PUT',
          body: submitData,
          credentials: 'include'
        });
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${res.status}: Failed to update course`);
        }
      }
      
      setMessage('Course updated successfully!');
      setEditingCard(null);
      setIsCreatingCourse(false);
      fetchCards();
    } catch (err) {
      console.error('Course update error:', err);
      setMessage(`Error updating course: ${err.message}`);
    }
    setLoading(false);
  };
  const handleCreateCourse = async (courseData) => {
    setLoading(true);
    setMessage('');
    try {
      console.log('handleCreateCourse received:', courseData);
      console.log('Is FormData?', courseData instanceof FormData);
      
      // Handle both FormData and regular object formats
      if (courseData instanceof FormData) {
        // If it's already FormData, use it directly
        console.log('Using FormData directly');
        const res = await fetch(`${API_URL}/cards`, {
          method: 'POST',
          body: courseData,
          credentials: 'include'
        });
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${res.status}: Failed to create course`);
        }
      } else {
        // If it's a regular object, convert to FormData
        console.log('Converting object to FormData');
        const submitData = new FormData();
        submitData.append('title', courseData.title);
        submitData.append('description', courseData.description);
        submitData.append('section', 'course');
        if (courseData.image) submitData.append('image', courseData.image);
        
        // Add nested data as JSON string
        const nestedData = { ...courseData.nestedData };
        submitData.append('nestedData', JSON.stringify(nestedData));

        const res = await fetch(`${API_URL}/cards`, {
          method: 'POST',
          body: submitData,
          credentials: 'include'
        });
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${res.status}: Failed to create course`);
        }
      }
      
      setMessage('Course created successfully!');
      setIsCreatingCourse(false);
      setCourseFormData({
        title: '',
        description: '',
        image: null,
        nestedData: {
          courseDescription: '',
          videoUrl: '',
          duration: '',
          level: 'Beginner',
          price: '',
          enrollmentUrl: '',
          curriculum: [''],
          instructor: '',
          rating: 0,
          reviews: 0
        }
      });
      fetchCards();
    } catch (err) {
      console.error('Course creation error:', err);
      setMessage(`Error creating course: ${err.message}`);
    }
    setLoading(false);
  };

  const resetForm = () => {
    const currentConfig = tabConfigurations[activeTab];
    setFormData({
      title: '',
      description: '',
      section: currentConfig.sectionOptions[0]?.value || '',
      image: null,
      nestedData: {
        videoUrl: '',
        duration: '',
        price: '',
        enrollmentUrl: '',
        curriculum: [''],
        instructor: '',
        rating: 0,
        reviews: 0,
        courseDescription: ''
      }
    });
  };

  // Get filtered cards based on active tab
  const getFilteredCards = () => {
    const currentConfig = tabConfigurations[activeTab];
    if (activeTab === 'nested-cards') {
      return []; // Nested cards are handled separately
    }
    return cards.filter(card => currentConfig.sections.includes(card.section));
  };

  // Get current tab configuration
  const getCurrentTabConfig = () => {
    return tabConfigurations[activeTab];
  };

  const cancelEdit = () => {
    setEditingCard(null);
    resetForm();
  };

  // Get filtered and grouped cards for current tab
  const getGroupedCards = () => {
    const filteredCards = getFilteredCards();
    return filteredCards.reduce((acc, card) => {
      acc[card.section] = acc[card.section] || [];
      acc[card.section].push(card);
      return acc;
    }, {});
  };

  const renderExploreTab = () => {
    return (
      <div className="space-y-6">
        {/* Category Cards Section */}
        <div className="bg-[#1a1f2a] rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-xl font-bold">Category Cards</h2>
            <button
              onClick={() => {
                setIsCreatingCategory(true);
                setIsCreatingContent(false);
                resetForm();
              }}
              className="bg-[#c1b2e5] text-[#17141f] px-4 py-2 rounded-lg font-medium hover:bg-[#a393c8] transition-colors"
            >
              Add Category Card
            </button>
          </div>

          {/* Category Creation Form */}
          {isCreatingCategory && (
            <div className="mb-6 p-4 bg-[#2b3240] rounded-lg">
              <h3 className="text-white font-semibold mb-3">Create New Category Card</h3>
              <form onSubmit={handleCreateCategory} className="space-y-3">
                <div>
                  <label className="block text-white font-medium mb-1">Category Title</label>
                  <input
                    type="text"
                    className="w-full bg-[#1a1f2a] text-white border border-[#3a4250] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#c1b2e5]"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g., Open Source Programs, Extracurricular Activities"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-1">Category Description</label>
                  <textarea
                    className="w-full bg-[#1a1f2a] text-white border border-[#3a4250] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#c1b2e5]"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    rows="2"
                    placeholder="Describe what this category contains..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-1">Category Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full bg-[#1a1f2a] text-white border border-[#3a4250] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#c1b2e5]"
                    onChange={e => setFormData({...formData, image: e.target.files[0]})}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-[#c1b2e5] text-[#17141f] px-4 py-2 rounded-lg font-medium hover:bg-[#a393c8] transition-colors"
                  >
                    Create Category
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreatingCategory(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Category Cards Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryCards.map(card => (
              <div
                key={card._id}
                onClick={() => handleSelectCategory(card)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedCategory?._id === card._id
                    ? 'bg-[#c1b2e5] text-[#17141f]'
                    : 'bg-[#2b3240] text-white hover:bg-[#3a4250]'
                }`}
              >
                {card.image && (
                  <img
                    src={`${API_URL}/uploads/${card.image}`}
                    alt={card.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}
                <h3 className="font-bold mb-2">{card.title}</h3>
                <p className={`text-sm mb-2 ${
                  selectedCategory?._id === card._id ? 'text-[#17141f]' : 'text-[#9da8be]'
                }`}>
                  {card.description}
                </p>
                <div className="flex justify-end items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(card._id);
                    }}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nested Cards Section */}
        {selectedCategory && (
          <div className="bg-[#1a1f2a] rounded-xl p-6">
            <h2 className="text-white text-xl font-bold mb-4">
              Nested Cards for: {selectedCategory.title}
            </h2>
            <p className="text-[#9da8be] mb-6">
              {nestedCards.length} nested card{nestedCards.length !== 1 ? 's' : ''} available
            </p>

            <NestedCardGrid
              parentCardId={selectedCategory._id}
              nestedCards={nestedCards}
              columns={3}
              gap={6}
              isAdmin={true}
              onCardsUpdate={handleCardsUpdate}
              emptyMessage={`No nested cards available for ${selectedCategory.title}.`}
            />
          </div>
        )}
      </div>
    );
  };

  const renderContentTab = () => {
    const currentConfig = getCurrentTabConfig();
    const groupedCards = getGroupedCards();

    return (
      <div className="space-y-6">
        {/* Form Section */}
        <div className="bg-[#1a1f2a] rounded-xl p-6">
          <h2 className="text-white text-xl font-bold mb-4">
            {editingCard ? 'Edit Card' : 'Create New Card'}
          </h2>
          
          {/* Special handling for course creation and editing */}
          {activeTab === 'course-page' && (!editingCard || editingCard.section === 'course') ? (
            <div>
              {!isCreatingCourse && !editingCard ? (
                <button
                  onClick={() => setIsCreatingCourse(true)}
                  className="bg-[#c1b2e5] text-[#17141f] px-6 py-2 rounded-lg font-medium hover:bg-[#a393c8] transition-colors"
                >
                  Create New Course
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-semibold">
                      {editingCard ? 'Edit Course' : 'Create New Course'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsCreatingCourse(false);
                        setEditingCard(null);
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                  <NestedCardForm
                    parentCardId={null}
                    onClose={() => {
                      setIsCreatingCourse(false);
                      setEditingCard(null);
                    }}
                    onSave={editingCard ? handleUpdateCourse : handleCreateCourse}
                    editCard={editingCard}
                    isEdit={!!editingCard}
                  />
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={editingCard ? handleUpdate : handleCreate} className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">Title</label>
              <input
                type="text"
                className="w-full bg-[#2b3240] text-white border border-[#3a4250] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#c1b2e5]"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Description</label>
              <textarea
                className="w-full bg-[#2b3240] text-white border border-[#3a4250] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#c1b2e5]"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                rows="3"
                required
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Section</label>
              <select
                className="w-full bg-[#2b3240] text-white border border-[#3a4250] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#c1b2e5]"
                value={formData.section}
                onChange={e => setFormData({...formData, section: e.target.value})}
                required
              >
                {currentConfig.sectionOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            {/* Extra fields for Women Corner entries - mirror course fields */}
            {(activeTab === 'women-corner') && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Video URL</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      className="w-full bg-[#2b3240] text-white border border-[#3a4250] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#c1b2e5]"
                      value={formData.nestedData?.videoUrl || ''}
                      onChange={e => setFormData({
                        ...formData,
                        nestedData: { ...(formData.nestedData || {}), videoUrl: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Duration</label>
                    <input
                      type="text"
                      placeholder="e.g., 8 hours"
                      className="w-full bg-[#2b3240] text-white border border-[#3a4250] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#c1b2e5]"
                      value={formData.nestedData?.duration || ''}
                      onChange={e => setFormData({
                        ...formData,
                        nestedData: { ...(formData.nestedData || {}), duration: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Price</label>
                    <input
                      type="text"
                      placeholder="e.g., $99 or Free"
                      className="w-full bg-[#2b3240] text-white border border-[#3a4250] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#c1b2e5]"
                      value={formData.nestedData?.price || ''}
                      onChange={e => setFormData({
                        ...formData,
                        nestedData: { ...(formData.nestedData || {}), price: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Enrollment URL</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      className="w-full bg-[#2b3240] text-white border border-[#3a4250] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#c1b2e5]"
                      value={formData.nestedData?.enrollmentUrl || ''}
                      onChange={e => setFormData({
                        ...formData,
                        nestedData: { ...(formData.nestedData || {}), enrollmentUrl: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Instructor</label>
                    <input
                      type="text"
                      placeholder="Instructor name"
                      className="w-full bg-[#2b3240] text-white border border-[#3a4250] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#c1b2e5]"
                      value={formData.nestedData?.instructor || ''}
                      onChange={e => setFormData({
                        ...formData,
                        nestedData: { ...(formData.nestedData || {}), instructor: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Rating (0-5)</label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full bg-[#2b3240] text-white border border-[#3a4250] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#c1b2e5]"
                      value={formData.nestedData?.rating ?? 0}
                      onChange={e => setFormData({
                        ...formData,
                        nestedData: { ...(formData.nestedData || {}), rating: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Reviews</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full bg-[#2b3240] text-white border border-[#3a4250] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#c1b2e5]"
                      value={formData.nestedData?.reviews ?? 0}
                      onChange={e => setFormData({
                        ...formData,
                        nestedData: { ...(formData.nestedData || {}), reviews: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Detailed Description</label>
                  <textarea
                    rows={4}
                    placeholder="Provide a detailed description..."
                    className="w-full bg-[#2b3240] text-white border border-[#3a4250] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#c1b2e5]"
                    value={formData.nestedData?.courseDescription || ''}
                    onChange={e => setFormData({
                      ...formData,
                      nestedData: { ...(formData.nestedData || {}), courseDescription: e.target.value }
                    })}
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Curriculum</label>
                  {(formData.nestedData?.curriculum || ['']).map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={item}
                        placeholder={`Curriculum item ${index + 1}`}
                        className="flex-1 bg-[#2b3240] text-white border border-[#3a4250] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#c1b2e5]"
                        onChange={e => {
                          const list = [...(formData.nestedData?.curriculum || [''])];
                          list[index] = e.target.value;
                          setFormData({
                            ...formData,
                            nestedData: { ...(formData.nestedData || {}), curriculum: list }
                          });
                        }}
                      />
                      {((formData.nestedData?.curriculum || ['']).length > 1) && (
                        <button
                          type="button"
                          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                          onClick={() => {
                            const list = [...(formData.nestedData?.curriculum || [''])];
                            list.splice(index, 1);
                            setFormData({
                              ...formData,
                              nestedData: { ...(formData.nestedData || {}), curriculum: list }
                            });
                          }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="mt-2 px-3 py-1 bg-[#c1b2e5] text-[#17141f] rounded-lg text-sm font-medium hover:bg-[#b0a1d4]"
                    onClick={() => {
                      const list = [...(formData.nestedData?.curriculum || [''])];
                      list.push('');
                      setFormData({
                        ...formData,
                        nestedData: { ...(formData.nestedData || {}), curriculum: list }
                      });
                    }}
                  >
                    + Add Item
                  </button>
                </div>
              </div>
            )}
            <div>
              <label className="block text-white font-medium mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full bg-[#2b3240] text-white border border-[#3a4250] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#c1b2e5]"
                onChange={e => setFormData({...formData, image: e.target.files[0]})}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-[#c1b2e5] text-[#17141f] px-6 py-2 rounded-lg font-medium hover:bg-[#a393c8] transition-colors"
              >
                {editingCard ? 'Update Card' : 'Create Card'}
              </button>
              {editingCard && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
          )}
        </div>

        {/* Cards Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentConfig.sections.map(section => (
            <div key={section} className="bg-[#1a1f2a] p-6 rounded-xl">
              <h3 className="text-white font-bold mb-4 text-lg">{sectionLabels[section]}</h3>
              {groupedCards[section]?.length ? (
                <div className="space-y-4">
                  {groupedCards[section].map(card => (
                    <div key={card._id} className="bg-[#2b3240] p-4 rounded-lg">
                      {card.image && (
                        <img
                          src={`${API_URL}/uploads/${card.image}`}
                          alt={card.title}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                      )}
                      <div className="text-white font-semibold mb-2">{card.title}</div>
                      <div className="text-[#9da8be] text-sm mb-3">{card.description}</div>
                      <div className="flex gap-2">
                        <button
                          className="text-[#c1b2e5] hover:text-white transition-colors"
                          onClick={() => handleEdit(card)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-400 hover:text-red-300 transition-colors"
                          onClick={() => handleDelete(card._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[#9da8be]">No cards</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderNestedCardsTab = () => (
    <div className="space-y-6">
      {/* Parent Card Selection */}
      <div className="bg-[#1a1f2a] rounded-xl p-6">
        <h2 className="text-white text-xl font-bold mb-4">Select Parent Card</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parentCards.map((card) => (
            <div
              key={card._id}
              onClick={() => setSelectedParentCard(card)}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedParentCard?._id === card._id
                  ? 'bg-[#c1b2e5] text-[#17141f]'
                  : 'bg-[#2b3240] text-white hover:bg-[#3a4250]'
              }`}
            >
              <h3 className="font-bold mb-2">{card.title}</h3>
              <p className={`text-sm ${
                selectedParentCard?._id === card._id ? 'text-[#17141f]' : 'text-[#9da8be]'
              }`}>
                {card.description}
              </p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                selectedParentCard?._id === card._id 
                  ? 'bg-[#17141f] text-[#c1b2e5]' 
                  : 'bg-[#c1b2e5] text-[#17141f]'
              }`}>
                {card.section}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Nested Cards Management */}
      {selectedParentCard && (
        <div className="bg-[#1a1f2a] rounded-xl p-6">
          <h2 className="text-white text-xl font-bold mb-4">
            Managing Nested Cards for: {selectedParentCard.title}
          </h2>
          <p className="text-[#9da8be] mb-4">
            Section: <span className="text-white font-medium">{selectedParentCard.section}</span>
          </p>
          <p className="text-[#9da8be] mb-6">
            {nestedCards.length} nested card{nestedCards.length !== 1 ? 's' : ''} available
          </p>

          <NestedCardGrid
            parentCardId={selectedParentCard._id}
            nestedCards={nestedCards}
            columns={3}
            gap={6}
            isAdmin={true}
            onCardsUpdate={handleCardsUpdate}
            emptyMessage={`No nested cards available for ${selectedParentCard.title}.`}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="relative flex min-h-screen flex-col bg-[#14181f] overflow-x-hidden">
      <Header />
      
      <main className="px-40 py-5 flex flex-1 justify-center">
        <div className="flex flex-col max-w-[1400px] w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-white text-[32px] font-bold mb-4">Unified Admin Dashboard</h1>
            <p className="text-[#9da8be] text-lg">
              Manage all cards, courses, and nested content from a single interface.
            </p>
          </div>

          {/* Message Display */}
          {message && (
            <div className="mb-6 p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-300">
              {message}
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="mb-6 p-4 bg-[#1a1f2a] rounded-lg text-white text-center">
              Loading...
            </div>
          )}

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-[#1a1f2a] p-1 rounded-lg overflow-x-auto">
              {Object.entries(tabConfigurations).map(([tabKey, config]) => (
                <button
                  key={tabKey}
                  onClick={() => {
                    setActiveTab(tabKey);
                    resetForm();
                  }}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tabKey
                      ? 'bg-[#c1b2e5] text-[#17141f]'
                      : 'text-[#9da8be] hover:text-white hover:bg-[#2b3240]'
                  }`}
                >
                  {config.title}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'explore' ? renderExploreTab() : 
           activeTab === 'nested-cards' ? renderNestedCardsTab() : 
           renderContentTab()}

          {/* Admin Instructions */}
          <div className="mt-8 bg-[#1a1f2a] rounded-xl p-6">
            <h3 className="text-white text-xl font-bold mb-4">Admin Instructions</h3>
            <div className="space-y-3 text-[#9da8be]">
              <div className="flex items-start gap-3">
                <span className="text-[#c1b2e5] font-bold">1.</span>
                <p><strong>Explore Section:</strong> Create category cards (Open Source Programs, Extracurricular Activities) and add nested cards under each category.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#c1b2e5] font-bold">2.</span>
                <p><strong>Women Corner:</strong> Manage scholarships, internships, and mentorship content specifically for women.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#c1b2e5] font-bold">3.</span>
                <p><strong>Course Page:</strong> Manage course-specific content and materials.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#c1b2e5] font-bold">4.</span>
                <p><strong>Nested Cards:</strong> Select a parent card to manage its nested content and course materials.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#c1b2e5] font-bold">5.</span>
                <p>Click on category cards to view and manage their nested cards. Use the "Add Category Card" button to create new categories and the nested card interface to add content.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#c1b2e5] font-bold">6.</span>
                <p>All changes are saved immediately and will be visible to users across the platform.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UnifiedAdminDashboard;
