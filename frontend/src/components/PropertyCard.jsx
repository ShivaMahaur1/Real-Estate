// frontend/src/components/PropertyCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { FaHeart, FaRegHeart, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  const favorited = isFavorite(property._id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (favorited) {
      removeFromFavorites(property._id);
    } else {
      addToFavorites(property);
    }
  };

  const imageUrl = `http://localhost:5000${property.image}`;

  return (
    // --- FIX 2: Removed the 'group' class from the Link ---
    <Link to={`/property/${property._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative overflow-hidden">
          {/* --- FIX 2: Changed 'group-hover:scale-105' to 'hover:scale-105' --- */}
          <img src={imageUrl} alt={property.title} className="w-full h-72 object-cover hover:scale-105 transition-transform duration-300" />
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-secondary hover:text-white transition-colors"
          >
            {favorited ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          </button>
          <div className="absolute bottom-0 left-0 bg-primary text-white px-3 py-1 rounded-tr-lg text-sm font-semibold">
            ₹{property.price.toLocaleString('en-IN')}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-dark">{property.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{property.location}</p>
          <div className="flex justify-between text-gray-500 text-sm">
            <span className="flex items-center"><FaBed className="mr-1" /> {property.bedrooms} Beds</span>
            <span className="flex items-center"><FaBath className="mr-1" /> {property.bathrooms} Baths</span>
            <span className="flex items-center"><FaRulerCombined className="mr-1" /> {property.sqft} sqft</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;