import React, { useEffect, useState } from 'react';
import CourseAdminForm from './CourseAdminForm';

const API_URL = 'http://localhost:5000';

const CourseAdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/cards?section=course`);
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      setMessage('Failed to fetch courses');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreate = async (formData) => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/cards`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to create course');
      setMessage('Course created successfully!');
      fetchCourses();
    } catch (err) {
      setMessage('Error creating course');
    }
    setLoading(false);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setMessage('');
  };

  const handleUpdate = async (formData) => {
    if (!editingCourse) return;
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/cards/${editingCourse._id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to update course');
      setMessage('Course updated successfully!');
      setEditingCourse(null);
      fetchCourses();
    } catch (err) {
      setMessage('Error updating course');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return;
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/cards/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete course');
      setMessage('Course deleted successfully!');
      fetchCourses();
    } catch (err) {
      setMessage('Error deleting course');
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Course Hub Admin Dashboard</h1>
      {message && <div className="mb-4 text-blue-700">{message}</div>}
      {editingCourse ? (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Edit Course</h2>
          <CourseAdminForm
            initialData={editingCourse}
            onSubmit={handleUpdate}
          />
          <button className="mt-2 text-red-600" onClick={() => setEditingCourse(null)}>
            Cancel Edit
          </button>
        </div>
      ) : (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Create New Course</h2>
          <CourseAdminForm onSubmit={handleCreate} />
        </div>
      )}
      {loading && <div>Loading...</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map(course => (
            <div key={course._id} className="bg-gray-100 p-4 rounded shadow">
              {course.image && (
                <img
                  src={`${API_URL}/uploads/${course.image}`}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded mb-2"
                />
              )}
              <div className="font-semibold">{course.title}</div>
              <div className="text-sm mb-2">{course.description}</div>
              <button
                className="mr-2 text-blue-600"
                onClick={() => handleEdit(course)}
              >
                Edit
              </button>
              <button
                className="text-red-600"
                onClick={() => handleDelete(course._id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No courses available</div>
        )}
      </div>
    </div>
  );
};

export default CourseAdminDashboard;
