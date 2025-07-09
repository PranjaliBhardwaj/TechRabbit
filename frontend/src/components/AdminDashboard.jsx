import React, { useEffect, useState } from 'react';
import AdminForm from './AdminForm';

const API_URL = 'http://localhost:5000';

const sectionLabels = {
  scholarship: 'Scholarships',
  internship: 'Internships',
  mentorship: 'Mentorships',
};

const AdminDashboard = () => {
  const [cards, setCards] = useState([]);
  const [editingCard, setEditingCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  useEffect(() => {
    fetchCards();
  }, []);

  const handleCreate = async (formData) => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/cards`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to create card');
      setMessage('Card created successfully!');
      fetchCards();
    } catch (err) {
      setMessage('Error creating card');
    }
    setLoading(false);
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setMessage('');
  };

  const handleUpdate = async (formData) => {
    if (!editingCard) return;
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/cards/${editingCard._id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to update card');
      setMessage('Card updated successfully!');
      setEditingCard(null);
      fetchCards();
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
      });
      if (!res.ok) throw new Error('Failed to delete card');
      setMessage('Card deleted successfully!');
      fetchCards();
    } catch (err) {
      setMessage('Error deleting card');
    }
    setLoading(false);
  };

  const grouped = cards.reduce((acc, card) => {
    acc[card.section] = acc[card.section] || [];
    acc[card.section].push(card);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {message && <div className="mb-4 text-blue-700">{message}</div>}
      {editingCard ? (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Edit Card</h2>
          <AdminForm
            initialData={editingCard}
            onSubmit={handleUpdate}
          />
          <button className="mt-2 text-red-600" onClick={() => setEditingCard(null)}>
            Cancel Edit
          </button>
        </div>
      ) : (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Create New Card</h2>
          <AdminForm onSubmit={handleCreate} />
        </div>
      )}
      {loading && <div>Loading...</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.keys(sectionLabels).map(section => (
          <div key={section} className="bg-gray-100 p-4 rounded shadow">
            <h3 className="font-bold mb-2">{sectionLabels[section]}</h3>
            {grouped[section]?.length ? (
              grouped[section].map(card => (
                <div key={card._id} className="mb-4 p-2 bg-white rounded shadow">
                  {card.image && (
                    <img
                      src={`${API_URL}/uploads/${card.image}`}
                      alt={card.title}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  )}
                  <div className="font-semibold">{card.title}</div>
                  <div className="text-sm mb-2">{card.description}</div>
                  <button
                    className="mr-2 text-blue-600"
                    onClick={() => handleEdit(card)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(card._id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No cards</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard; 