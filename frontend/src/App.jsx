// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// --- CONTEXT & PROVIDERS ---
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';

// --- COMPONENTS ---
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute'; // Assumes this component exists and works

// --- PAGES ---
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingPage'; // Corrected typo
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import FavoritesPage from './pages/FavoritesPage';
import AddPropertyPage from './pages/AddPropertyPage';
import ManagePropertyPage from './pages/ManagePropertyPage';

import './App.css';

// --- Layout Component to Handle Conditional Header/Footer ---
const AppLayout = () => {
  const location = useLocation();
  
  // Define paths where the header and footer should be hidden
  const hideLayoutPaths = ['/signin', '/signup'];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render Header and Footer */}
      {!hideLayoutPaths.includes(location.pathname) && <Header />}
      
      <main className="flex-grow">
        <Routes>
          {/* --- PUBLIC ROUTES (Accessible to everyone) --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* --- AUTHENTICATION ROUTES (No Header/Footer) --- */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          {/* --- PUBLIC PROPERTY MANAGEMENT ROUTES --- */}
          {/* This route is public because the :token acts as a secret key */}
          <Route path="/manage-property/:token" element={<ManagePropertyPage />} />
          
          {/* --- PROTECTED ROUTES (Require user to be logged in) --- */}
          {/* These routes are for user-specific actions */}
          <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
          
          {/* RECOMMENDATION: Make 'Add Property' a protected route for logged-in users */}
          <Route path="/add-property" element={<ProtectedRoute><AddPropertyPage /></ProtectedRoute>} />
          
          {/* Catch-all route for any undefined paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      {/* Conditionally render Header and Footer */}
      {!hideLayoutPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};


function App() {
  return (
    <Router>
      <AuthProvider>
        <FavoritesProvider>
          <AppLayout />
        </FavoritesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;