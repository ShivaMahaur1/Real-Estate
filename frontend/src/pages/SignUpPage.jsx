// frontend/src/pages/SignUpPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaLock, FaEnvelope, FaUser, FaSpinner } from 'react-icons/fa';

const API = import.meta.env.VITE_API_URL;

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token);
        navigate('/');
      } else {
        setError(data.msg || 'Sign up failed');
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
      backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')",
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      {/* Mobile-only dark overlay for text contrast */}
      <div className="lg:hidden absolute inset-0 bg-black bg-opacity-50"></div>

      {/* =================== DESKTOP VIEW (Unchanged) =================== */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="flex items-center justify-center w-full text-white">
          <div className="text-center">
            <FaHome className="text-6xl mb-4 text-yellow-300" />
            <h1 className="text-4xl font-bold">Join EstateHub</h1>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full border p-3 rounded" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} />
            <input type="email" placeholder="Email" className="w-full border p-3 rounded" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
            <input type="password" placeholder="Password" className="w-full border p-3 rounded" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
            <input type="password" placeholder="Confirm Password" className="w-full border p-3 rounded" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading} />
            <button type="submit" disabled={loading} className="w-full bg-secondary py-3 rounded font-bold text-white flex items-center justify-center disabled:bg-gray-400 transition-colors">
              {loading ? (<><FaSpinner className="animate-spin mr-2" /> Creating Account...</>) : ('Create Account')}
            </button>
          </form>
          <p className="mt-4 text-center">Already have an account? <Link to="/signin" className="text-secondary">Sign in</Link></p>
        </div>
      </div>
      {/* =================== END DESKTOP VIEW =================== */}


      {/* =================== MOBILE VIEW (New Design) =================== */}
      <div className="lg:hidden relative z-10 flex flex-col justify-center min-h-screen p-6">
        {/* Mobile Branding */}
        <div className="text-center mb-8">
          <FaHome className="text-6xl mx-auto text-yellow-300 mb-3" />
          <h1 className="text-4xl font-extrabold text-white">Join EstateHub</h1>
        </div>

        {/* Mobile Form Card */}
        <div className="w-full max-w-sm mx-auto bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Create Account</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input with Icon */}
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 bg-gray-50 p-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                required
              />
            </div>

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

            {/* Confirm Password Input with Icon */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border border-gray-300 bg-gray-50 p-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                  <FaSpinner className="animate-spin mr-3" /> Creating Account...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="font-semibold text-secondary hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      {/* =================== END MOBILE VIEW =================== */}
    </div>
  );
};

export default SignUpPage;