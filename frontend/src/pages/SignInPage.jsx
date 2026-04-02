// frontend/src/pages/SignInPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaLock, FaEnvelope, FaSpinner } from 'react-icons/fa';

const API = import.meta.env.VITE_API_URL;

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    // Main container with a conditional background
    <div className="min-h-screen flex lg:bg-yellow-50" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1974&auto=format&fit=crop')",
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      {/* Mobile-only dark overlay for text contrast */}
      <div className="lg:hidden absolute inset-0 bg-black bg-opacity-50"></div>

      {/* =================== DESKTOP VIEW (Unchanged) =================== */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 text-center max-w-md mx-auto">
          <FaHome className="text-6xl mb-4 text-yellow-300" />
          <h1 className="text-5xl font-bold mb-4">Welcome Back</h1>
          <p className="text-xl">Sign in to access your dashboard.</p>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-xl shadow-xl">
            <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="email" placeholder="Email" className="w-full border p-3 rounded" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
              <input type="password" placeholder="Password" className="w-full border p-3 rounded" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
              <button type="submit" disabled={loading} className="w-full bg-secondary py-3 rounded font-bold text-white flex items-center justify-center disabled:bg-gray-400 transition-colors">
                {loading ? (<><FaSpinner className="animate-spin mr-2" /> Signing In...</>) : ('Sign In')}
              </button>
            </form>
            <p className="mt-4 text-center">Don't have an account? <Link to="/signup" className="text-secondary">Sign up</Link></p>
          </div>
        </div>
      </div>
      {/* =================== END DESKTOP VIEW =================== */}


      {/* =================== MOBILE VIEW (New Design) =================== */}
      <div className="lg:hidden relative z-10 flex flex-col justify-center min-h-screen p-6">
        {/* Mobile Branding */}
        <div className="text-center mb-8">
          <FaHome className="text-6xl mx-auto text-yellow-300 mb-3" />
          <h1 className="text-4xl font-extrabold text-white">EstateHub</h1>
        </div>

        {/* Mobile Form Card */}
        <div className="w-full max-w-sm mx-auto bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome Back</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input with Icon */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-300 bg-gray-50 p-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            {/* Password Input with Icon */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 bg-gray-50 p-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-secondary to-yellow-400 text-gray-900 py-4 rounded-xl font-bold text-lg flex items-center justify-center disabled:from-gray-400 disabled:to-gray-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-3" /> Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-secondary hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      {/* =================== END MOBILE VIEW =================== */}
    </div>
  );
};

export default SignInPage;