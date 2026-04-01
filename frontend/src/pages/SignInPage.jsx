// frontend/src/pages/SignInPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaLock, FaEnvelope } from 'react-icons/fa';

// ✅ ADD THIS
const API = import.meta.env.VITE_API_URL;

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // ✅ FIXED API CALL
      const response = await fetch(`${API}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token);
        navigate('/');
      } else {
        setError(data.msg || 'Sign in failed');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-yellow-50">
      <div className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1974&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-gradient-to-b"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 text-center max-w-md mx-auto">
          <FaHome className="text-6xl mb-4 text-yellow-300" />
          <h1 className="text-5xl font-bold mb-4">Welcome Back</h1>
          <p className="text-xl">Sign in to access your dashboard.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-xl shadow-xl">
            <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full border p-3 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full border p-3 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="w-full bg-secondary py-3 rounded font-bold">
                Sign In
              </button>
            </form>

            <p className="mt-4 text-center">
              Don't have an account?{' '}
              <Link to="/signup" className="text-secondary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
