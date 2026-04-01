// frontend/src/components/FilterSidebar.jsx

import React from 'react';

// NOTE: The 'properties' prop has been removed as it's no longer needed
const FilterSidebar = ({ onFilterChange, activeFilters }) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Pass the updated filter object back to the parent
    onFilterChange({ ...activeFilters, [name]: value });
  };

  return (
    <div className="space-y-6">
      {/* --- REMOVED: Property Type Filter --- */}

      {/* --- REMOVED: Price Range Filter --- */}
      
      {/* Bedrooms Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
        <select
          name="bedrooms"
          value={activeFilters.bedrooms || 'all'}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary"
        >
          <option value="all">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>
      </div>

      {/* Bathrooms Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
        <select
          name="bathrooms"
          value={activeFilters.bathrooms || 'all'}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary"
        >
          <option value="all">Any</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;