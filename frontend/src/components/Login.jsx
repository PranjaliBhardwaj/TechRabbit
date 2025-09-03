import React, { useState } from 'react';
import Header from './Header';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      navigate('/profile');
    } catch (e) {
      setError(e?.message || 'Authentication failed');
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#151122]">
      <Header />
      <main className="px-6 md:px-40 py-10 flex flex-1 justify-center items-center">
        <div className="w-full max-w-md bg-[#1a1f2a] rounded-xl p-6 shadow-lg">
          <h1 className="text-white text-2xl font-bold mb-4">{isRegister ? 'Create account' : 'Sign in'}</h1>
          {error && <div className="mb-4 p-3 rounded bg-red-600/20 text-red-300 border border-red-500/30">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-white mb-2">Username</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#2b3240] text-white border border-[#3a4250] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#c1b2e5]"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            {isRegister && (
              <div>
                <label className="block text-white mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#2b3240] text-white border border-[#3a4250] rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#c1b2e5]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute inset-y-0 right-2 my-auto h-8 px-2 rounded text-xs font-medium bg-[#3a4250] text-white hover:bg-[#4a5262]"
                    aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirm ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            )}
            <button type="submit" className="w-full bg-[#c1b2e5] text-[#17141f] px-4 py-2 rounded-lg font-medium hover:bg-[#a393c8] transition-colors">
              {isRegister ? 'Create account' : 'Sign in'}
            </button>
          </form>
          <button className="w-full mt-3 text-[#c1b2e5] hover:text-white" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;


