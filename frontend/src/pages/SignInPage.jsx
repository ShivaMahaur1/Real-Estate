// frontend/src/pages/SignInPage.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaLock, FaEnvelope } from 'react-icons/fa';

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
      const response = await fetch('http://localhost:5000/api/auth/signin', {
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
    // CHANGE: Main background changed to a light yellow to match the secondary theme
    <div className="min-h-screen flex flex-col lg:flex-row bg-yellow-50">
      {/* Left Panel - Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1974&auto=format&fit=crop')" }}>
        {/* CHANGE: Overlay gradient updated to match the secondary theme */}
        <div className="absolute inset-0 bg-gradient-to-b"></div>
        {/* CHANGE: Content is now more explicitly centered with max-width and auto margins */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 text-center max-w-md mx-auto">
          <FaHome className="text-6xl mb-4 text-yellow-300" />
          <h1 className="text-5xl font-bold mb-4">Welcome Back</h1>
          <p className="text-xl">Sign in to access your personalized real estate dashboard and continue your journey to finding the perfect home.</p>
        </div>
      </div>

      {/* Right Panel - Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Branding */}
          <div className="lg:hidden text-center mb-8">
            {/* CHANGE: Mobile logo color updated to secondary theme */}
            <FaHome className="text-5xl text-secondary mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-gray-800">EstateHub</h2>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Sign In to EstateHub</h2>
            <p className="text-center text-gray-600 mb-6">Enter your credentials to access your account</p>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaEnvelope className="text-gray-400" />
                  </span>
                  <input
                    type="email"
                    id="email"
                    // CHANGE: Input focus ring updated to secondary theme
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition duration-200"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaLock className="text-gray-400" />
                  </span>
                  <input
                    type="password"
                    id="password"
                    // CHANGE: Input focus ring updated to secondary theme
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition duration-200"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* CHANGE: Checkbox color updated to secondary theme */}
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  {/* CHANGE: Link color updated to secondary theme */}
                  <a href="#" className="font-medium text-secondary hover:text-yellow-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                // CHANGE: Button color updated to secondary theme
                className="w-full bg-secondary text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transform transition-all duration-200 hover:scale-[1.02]"
              >
                Sign In
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              Don't have an account?{' '}
              {/* CHANGE: Link color updated to secondary theme */}
              <Link to="/signup" className="font-semibold text-secondary hover:text-yellow-500 hover:underline">
                Sign Up Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;