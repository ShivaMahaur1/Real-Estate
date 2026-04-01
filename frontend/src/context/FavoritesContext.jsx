// frontend/src/context/FavoritesContext.js

import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (property) => {
    setFavorites(prevFavorites => {
      // --- CHANGE: Use _id for the check ---
      if (prevFavorites.some(p => p._id === property._id)) {
        return prevFavorites; // Already in favorites
      }
      return [...prevFavorites, property];
    });
  };

  const removeFromFavorites = (propertyId) => {
    setFavorites(prevFavorites => 
      // --- CHANGE: Use _id for the filter ---
      prevFavorites.filter(p => p._id !== propertyId)
    );
  };

  const isFavorite = (propertyId) => {
    // --- CHANGE: Use _id for the check ---
    return favorites.some(p => p._id === propertyId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};