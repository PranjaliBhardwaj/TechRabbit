import React, { useState } from 'react';

const CourseAdminForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [section, setSection] = useState(initialData?.section || 'course');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('section', section);
    if (image) formData.append('image', image);
    onSubmit && onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Course Admin Form</h2>
      <div className="mb-2">
        <label className="block font-medium">Course Title</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="block font-medium">Course Description</label>
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
          <option value="course">Course</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-medium">Course Image</label>
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

export default CourseAdminForm;
