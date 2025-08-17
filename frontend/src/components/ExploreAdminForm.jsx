import React, { useState } from 'react';

const sectionOptions = [
  { value: 'scholarship', label: 'Scholarship' },
  { value: 'internship', label: 'Internship' },
  { value: 'course', label: 'Course' },
  { value: 'opensource', label: 'Open Source Programs' },
  { value: 'extracurricular', label: 'Extracurricular Activities' },
];

const ExploreAdminForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [section, setSection] = useState(initialData?.section || sectionOptions[0].value);
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !section) return;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('section', section);
    if (image) formData.append('image', image);
    onSubmit && onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Explore Admin Card Form</h2>
      <div className="mb-2">
        <label className="block font-medium">Title</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="block font-medium">Description</label>
        <textarea
          className="w-full border rounded p-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="block font-medium">Section</label>
        <select
          className="w-full border rounded p-2"
          value={section}
          onChange={e => setSection(e.target.value)}
          required
        >
          {sectionOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-medium">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default ExploreAdminForm;
