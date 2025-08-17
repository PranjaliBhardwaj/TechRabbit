import React, { useState, useEffect } from 'react';

const NestedCardForm = ({ 
  parentCardId, 
  onClose, 
  onSave, 
  editCard = null,
  isEdit = false 
}) => {
  const [formData, setFormData] = useState({
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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editCard && isEdit) {
      setFormData({
        title: editCard.title || '',
        description: editCard.description || '',
        image: null,
        nestedData: {
          videoUrl: editCard.nestedData?.videoUrl || '',
          duration: editCard.nestedData?.duration || '',
          level: editCard.nestedData?.level || 'Beginner',
          price: editCard.nestedData?.price || '',
          enrollmentUrl: editCard.nestedData?.enrollmentUrl || '',
          curriculum: editCard.nestedData?.curriculum || [''],
          instructor: editCard.nestedData?.instructor || '',
          rating: editCard.nestedData?.rating || 0,
          reviews: editCard.nestedData?.reviews || 0
        }
      });
    }
  }, [editCard, isEdit]);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleCurriculumChange = (index, value) => {
    const newCurriculum = [...formData.nestedData.curriculum];
    newCurriculum[index] = value;
    setFormData(prev => ({
      ...prev,
      nestedData: {
        ...prev.nestedData,
        curriculum: newCurriculum
      }
    }));
  };

  const addCurriculumItem = () => {
    setFormData(prev => ({
      ...prev,
      nestedData: {
        ...prev.nestedData,
        curriculum: [...prev.nestedData.curriculum, '']
      }
    }));
  };

  const removeCurriculumItem = (index) => {
    if (formData.nestedData.curriculum.length > 1) {
      const newCurriculum = formData.nestedData.curriculum.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        nestedData: {
          ...prev.nestedData,
          curriculum: newCurriculum
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('nestedData', JSON.stringify(formData.nestedData));
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await onSave(formDataToSend);
      onClose();
    } catch (error) {
      console.error('Error saving nested card:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1f2a] rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl font-bold">
            {isEdit ? 'Edit Nested Card' : 'Add New Nested Card'}
          </h2>
          <button
            onClick={onClose}
            className="text-[#9da8be] hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">Basic Information</h3>
            
            <div>
              <label className="block text-[#9da8be] text-sm font-medium mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 bg-[#2b3240] border border-[#3a4151] rounded-lg text-white focus:outline-none focus:border-[#c1b2e5]"
                required
              />
            </div>

            <div>
              <label className="block text-[#9da8be] text-sm font-medium mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-[#2b3240] border border-[#3a4151] rounded-lg text-white focus:outline-none focus:border-[#c1b2e5]"
                required
              />
            </div>

            <div>
              <label className="block text-[#9da8be] text-sm font-medium mb-2">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleInputChange('image', e.target.files[0])}
                className="w-full px-3 py-2 bg-[#2b3240] border border-[#3a4151] rounded-lg text-white focus:outline-none focus:border-[#c1b2e5]"
              />
            </div>
          </div>

          {/* Course Details */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">Course Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#9da8be] text-sm font-medium mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  value={formData.nestedData.videoUrl}
                  onChange={(e) => handleInputChange('nestedData.videoUrl', e.target.value)}
                  className="w-full px-3 py-2 bg-[#2b3240] border border-[#3a4151] rounded-lg text-white focus:outline-none focus:border-[#c1b2e5]"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-[#9da8be] text-sm font-medium mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={formData.nestedData.duration}
                  onChange={(e) => handleInputChange('nestedData.duration', e.target.value)}
                  className="w-full px-3 py-2 bg-[#2b3240] border border-[#3a4151] rounded-lg text-white focus:outline-none focus:border-[#c1b2e5]"
                  placeholder="e.g., 8 hours"
                />
              </div>

              <div>
                <label className="block text-[#9da8be] text-sm font-medium mb-2">
                  Level
                </label>
                <select
                  value={formData.nestedData.level}
                  onChange={(e) => handleInputChange('nestedData.level', e.target.value)}
                  className="w-full px-3 py-2 bg-[#2b3240] border border-[#3a4151] rounded-lg text-white focus:outline-none focus:border-[#c1b2e5]"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-[#9da8be] text-sm font-medium mb-2">
                  Price
                </label>
                <input
                  type="text"
                  value={formData.nestedData.price}
                  onChange={(e) => handleInputChange('nestedData.price', e.target.value)}
                  className="w-full px-3 py-2 bg-[#2b3240] border border-[#3a4151] rounded-lg text-white focus:outline-none focus:border-[#c1b2e5]"
                  placeholder="e.g., $99 or Free"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#9da8be] text-sm font-medium mb-2">
                Enrollment URL
              </label>
              <input
                type="url"
                value={formData.nestedData.enrollmentUrl}
                onChange={(e) => handleInputChange('nestedData.enrollmentUrl', e.target.value)}
                className="w-full px-3 py-2 bg-[#2b3240] border border-[#3a4151] rounded-lg text-white focus:outline-none focus:border-[#c1b2e5]"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-[#9da8be] text-sm font-medium mb-2">
                Instructor
              </label>
              <input
                type="text"
                value={formData.nestedData.instructor}
                onChange={(e) => handleInputChange('nestedData.instructor', e.target.value)}
                className="w-full px-3 py-2 bg-[#2b3240] border border-[#3a4151] rounded-lg text-white focus:outline-none focus:border-[#c1b2e5]"
                placeholder="Instructor name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#9da8be] text-sm font-medium mb-2">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.nestedData.rating}
                  onChange={(e) => handleInputChange('nestedData.rating', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-[#2b3240] border border-[#3a4151] rounded-lg text-white focus:outline-none focus:border-[#c1b2e5]"
                />
              </div>

              <div>
                <label className="block text-[#9da8be] text-sm font-medium mb-2">
                  Number of Reviews
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.nestedData.reviews}
                  onChange={(e) => handleInputChange('nestedData.reviews', parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-[#2b3240] border border-[#3a4151] rounded-lg text-white focus:outline-none focus:border-[#c1b2e5]"
                />
              </div>
            </div>
          </div>

          {/* Curriculum */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-white text-lg font-semibold">Curriculum</h3>
              <button
                type="button"
                onClick={addCurriculumItem}
                className="px-3 py-1 bg-[#c1b2e5] text-[#17141f] rounded-lg text-sm font-medium hover:bg-[#b0a1d4]"
              >
                + Add Item
              </button>
            </div>
            
            {formData.nestedData.curriculum.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleCurriculumChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#2b3240] border border-[#3a4151] rounded-lg text-white focus:outline-none focus:border-[#c1b2e5]"
                  placeholder={`Curriculum item ${index + 1}`}
                />
                {formData.nestedData.curriculum.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCurriculumItem(index)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-[#2b3240] text-white rounded-lg hover:bg-[#3a4151] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-[#c1b2e5] text-[#17141f] rounded-lg font-medium hover:bg-[#b0a1d4] transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : (isEdit ? 'Update Card' : 'Create Card')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NestedCardForm;
