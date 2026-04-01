import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import PropertyCard from '../components/PropertyCard';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-dark">Your Favorite Properties</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-500 mb-4">You haven't added any properties to your favorites yet.</p>
          <Link to="/listings" className="bg-secondary text-dark font-bold py-2 px-6 rounded-full hover:bg-yellow-400 transition-colors">
            Browse Properties
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;