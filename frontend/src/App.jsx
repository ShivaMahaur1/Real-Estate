// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// --- CONTEXT ---
import { AuthProvider, useAuth } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';

// --- COMPONENTS ---
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// --- PAGES ---
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import FavoritesPage from './pages/FavoritesPage';
import AddPropertyPage from './pages/AddPropertyPage';
import ManagePropertyPage from './pages/ManagePropertyPage';

import './App.css';

// --- LAYOUT ---
const AppLayout = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const hideLayoutPaths = ['/signin', '/signup'];

  return (
    <div className="flex flex-col min-h-screen">

      {/* HEADER */}
      {!hideLayoutPaths.includes(location.pathname) && <Header />}

      <main className="flex-grow">
        <Routes>

          {/* ✅ DEFAULT ROUTE */}
          <Route
            path="/"
            element={
              isAuthenticated ? <HomePage /> : <Navigate to="/signin" replace />
            }
          />

          {/* PUBLIC ROUTES */}
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* AUTH ROUTES */}
          <Route
            path="/signin"
            element={
              !isAuthenticated ? <SignInPage /> : <Navigate to="/" replace />
            }
          />

          <Route
            path="/signup"
            element={
              !isAuthenticated ? <SignUpPage /> : <Navigate to="/" replace />
            }
          />

          {/* TOKEN ROUTE */}
          <Route path="/manage-property/:token" element={<ManagePropertyPage />} />

          {/* PROTECTED */}
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-property"
            element={
              <ProtectedRoute>
                <AddPropertyPage />
              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </main>

      {/* FOOTER */}
      {!hideLayoutPaths.includes(location.pathname) && <Footer />}

    </div>
  );
};

// --- MAIN APP ---
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
