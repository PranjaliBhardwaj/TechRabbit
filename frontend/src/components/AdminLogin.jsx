import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to admin
    fetch(`${API_URL}/auth/me`, { credentials: 'include' })
      .then(r => r.json())
      .then(d => { if (d.isAdmin) navigate('/admin'); })
      .catch(() => {});
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error('Invalid credentials');
      navigate('/admin');
    } catch (err) {
      setMessage('Invalid credentials');
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#14181f]">
      <main className="px-6 md:px-40 py-10 flex flex-1 justify-center items-center">
        <div className="w-full max-w-md bg-[#1a1f2a] rounded-xl p-6 shadow-lg">
          <h1 className="text-white text-2xl font-bold mb-4">Admin Login</h1>
          {message && (
            <div className="mb-4 p-3 rounded bg-red-600/20 text-red-300 border border-red-500/30">{message}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#2b3240] text-white border border-[#3a4250] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#c1b2e5]"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#2b3240] text-white border border-[#3a4250] rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#c1b2e5]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 my-auto h-8 px-2 rounded text-xs font-medium bg-[#3a4250] text-white hover:bg-[#4a5262]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-[#c1b2e5] text-[#17141f] px-4 py-2 rounded-lg font-medium hover:bg-[#a393c8] transition-colors">Login</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;


