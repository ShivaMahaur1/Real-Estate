import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // If not authenticated, redirect to the sign-in page
    return <Navigate to="/signin" replace />;
  }

  // If authenticated, render the child components (the actual page)
  return children;
};

export default ProtectedRoute;