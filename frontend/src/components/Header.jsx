// src/components/Header.jsx

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaHome, 
  FaBars, 
  FaTimes, 
  FaList, 
  FaHeart, 
  FaPlusCircle, 
  FaUserCircle,
  FaSignOutAlt
} from 'react-icons/fa';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const isActiveLink = (path) => location.pathname === path;

  return (
    <>
      {/* IMPROVEMENT: Changed shadow to shadow-lg for better separation */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* CHANGE: Logo and branding now use the secondary theme */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-secondary hover:text-yellow-500 transition-colors duration-200 pl-4">
            <FaHome />
            <span>EstateHub</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            <Link 
              to="/listings" 
              className={`flex items-center space-x-1 font-medium ${isActiveLink('/listings') ? 'text-secondary' : 'text-gray-700'} hover:text-secondary transition-colors duration-200`}
            >
              <FaList />
              <span>Listings</span>
            </Link>
            <Link 
              to="/about" 
              className={`flex items-center space-x-1 font-medium ${isActiveLink('/about') ? 'text-secondary' : 'text-gray-700'} hover:text-secondary transition-colors duration-200`}
            >
              <FaUserCircle />
              <span>About</span>
            </Link>
            <Link 
              to="/contact" 
              className={`flex items-center space-x-1 font-medium ${isActiveLink('/contact') ? 'text-secondary' : 'text-gray-700'} hover:text-secondary transition-colors duration-200`}
            >
              <FaUserCircle />
              <span>Contact</span>
            </Link>
            {isAuthenticated && (
              <Link 
                to="/favorites" 
                className={`flex items-center space-x-1 font-medium ${isActiveLink('/favorites') ? 'text-secondary' : 'text-gray-700'} hover:text-secondary transition-colors duration-200`}
              >
                <FaHeart />
                <span>Favorites</span>
              </Link>
            )}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4 pr-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/add-property"
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                >
                  <FaPlusCircle />
                  <span>Add Property</span>
                </Link>
                <button 
                  onClick={logout} 
                  className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-gray-700 hover:text-secondary font-semibold transition-colors duration-200">
                  Sign In
                </Link>
                {/* CHANGE: Sign Up button now uses the secondary theme */}
                <Link to="/signup" className="bg-secondary text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-400 transition-all duration-200 font-semibold shadow-sm hover:shadow-md">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button 
            onClick={toggleSidebar} 
            className="lg:hidden text-gray-700 hover:text-secondary focus:outline-none transition-colors duration-200"
          >
            <FaBars className="text-2xl" />
          </button>
        </nav>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex justify-between items-center p-4 border-b">
          {/* CHANGE: Mobile logo also uses secondary theme */}
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-secondary" onClick={closeSidebar}>
            <FaHome />
            <span>EstateHub</span>
          </Link>
          <button 
            onClick={closeSidebar} 
            className="text-gray-700 hover:text-secondary focus:outline-none transition-colors duration-200"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>
        
        <nav className="flex flex-col p-4 space-y-2">
          <Link 
            to="/listings" 
            onClick={closeSidebar}
            className={`flex items-center space-x-3 p-3 rounded-md transition-colors duration-200 ${isActiveLink('/listings') ? 'bg-yellow-100 text-secondary font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-secondary'}`}
          >
            <FaList />
            <span>Listings</span>
          </Link>
          <Link 
            to="/about" 
            onClick={closeSidebar}
            className={`flex items-center space-x-3 p-3 rounded-md transition-colors duration-200 ${isActiveLink('/about') ? 'bg-yellow-100 text-secondary font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-secondary'}`}
          >
            <FaUserCircle />
            <span>About</span>
          </Link>
          <Link 
            to="/contact" 
            onClick={closeSidebar}
            className={`flex items-center space-x-3 p-3 rounded-md transition-colors duration-200 ${isActiveLink('/contact') ? 'bg-yellow-100 text-secondary font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-secondary'}`}
          >
            <FaUserCircle />
            <span>Contact</span>
          </Link>
          {isAuthenticated && (
            <>
              <Link 
                to="/favorites" 
                onClick={closeSidebar}
                className={`flex items-center space-x-3 p-3 rounded-md transition-colors duration-200 ${isActiveLink('/favorites') ? 'bg-yellow-100 text-secondary font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-secondary'}`}
              >
                <FaHeart />
                <span>Favorites</span>
              </Link>
              <div className="border-t pt-4 mt-2 space-y-3">
                <Link 
                  to="/add-property"
                  onClick={closeSidebar}
                  className="flex items-center space-x-3 bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition-colors duration-200"
                >
                  <FaPlusCircle />
                  <span>Add Property</span>
                </Link>
                <button 
                  onClick={() => { logout(); closeSidebar(); }} 
                  className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition-colors duration-200"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}

          {!isAuthenticated && (
            <div className="border-t pt-4 mt-2 space-y-3">
              <Link 
                to="/signin" 
                onClick={closeSidebar}
                className="block text-center text-gray-700 hover:text-secondary font-semibold p-3 rounded-md hover:bg-gray-100 transition-colors duration-200"
              >
                Sign In
              </Link>
              {/* CHANGE: Mobile Sign Up button also uses secondary theme */}
              <Link 
                to="/signup" 
                onClick={closeSidebar}
                className="block text-center bg-secondary text-gray-900 p-3 rounded-md hover:bg-yellow-400 font-semibold transition-colors duration-200"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;