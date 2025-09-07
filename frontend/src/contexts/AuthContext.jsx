import React, { createContext, useContext, useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const res = await fetch(`${API_URL}/user/me`, { credentials: 'include' });
      const data = await res.json();
      setUser(data.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      let msg = 'Login failed';
      try {
        const data = await res.json();
        msg = data?.error || msg;
      } catch {}
      if (res.status === 401) msg = 'Username or password is incorrect';
      throw new Error(msg);
    }
    await refresh();
  };

  const register = async (name, email, password) => {
    const res = await fetch(`${API_URL}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password })
    });
    if (!res.ok) {
      let msg = 'Register failed';
      try {
        const data = await res.json();
        msg = data?.error || msg;
      } catch {}
      throw new Error(msg);
    }
    await refresh();
  };

  const logout = async () => {
    await fetch(`${API_URL}/user/logout`, { method: 'POST', credentials: 'include' });
    setUser(null);
  };

  const value = { user, loading, login, register, logout, refresh };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


