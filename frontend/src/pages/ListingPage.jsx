// frontend/src/pages/ListingPage.jsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import { FaSearch, FaFilter, FaHome, FaTimes } from 'react-icons/fa';

const ListingsPage = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({}); // Will now only hold bedrooms/bathrooms
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        // NOTE: Replace with your actual API endpoint
        const { data } = await axios.get('/api/properties');
        setAllProperties(data);
        setFilteredProperties(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setError('Failed to load properties. Please try again later.');
        setAllProperties([]);
        setFilteredProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Apply filters
  const applyFilters = useCallback((filters) => {
    setFiltering(true);
    setActiveFilters(filters);
    
    let result = [...allProperties];

    // Search term filter
    if (filters.searchTerm || searchTerm) {
      const term = (filters.searchTerm || searchTerm).toLowerCase();
      result = result.filter(p =>
        p.location?.toLowerCase().includes(term) ||
        p.title?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
      );
    }

    // --- REMOVED: Property Type Filter ---
    // if (filters.type && filters.type !== 'all') {
    //   result = result.filter(p => p.type === filters.type);
    // }

    // --- REMOVED: Price Range Filter ---
    // if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
    //   result = result.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);
    // }

    // Bedrooms filter
    if (filters.bedrooms && filters.bedrooms !== 'all') {
      result = result.filter(p => p.bedrooms >= parseInt(filters.bedrooms));
    }

    // Bathrooms filter
    if (filters.bathrooms && filters.bathrooms !== 'all') {
      result = result.filter(p => p.bathrooms >= parseInt(filters.bathrooms));
    }

    setFilteredProperties(result);
    setCurrentPage(1);
    setTimeout(() => setFiltering(false), 300);
  }, [allProperties, searchTerm]);

  // Handle filter changes from sidebar
  const handleFilterChange = useCallback((filters) => {
    applyFilters(filters);
  }, [applyFilters]);

  // Handle search input
  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    applyFilters({ ...activeFilters, searchTerm: value });
  }, [activeFilters, applyFilters]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setActiveFilters({});
    setFilteredProperties(allProperties);
    setCurrentPage(1);
  }, [allProperties]);

  // Get current properties for pagination
  const currentProperties = useMemo(() => {
    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    return filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  }, [currentPage, filteredProperties]);

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Object.keys(activeFilters).some(key => 
      activeFilters[key] && activeFilters[key] !== 'all' && activeFilters[key] !== ''
    ) || searchTerm;
  }, [activeFilters, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FaHome className="text-secondary" />
                Property Listings
              </h1>
              <p className="text-gray-600 mt-1">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by location, title..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    applyFilters({ ...activeFilters, searchTerm: '' });
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-secondary text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              <FaFilter />
              Filters
            </button>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && (
                <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-medium">
                  Search: "{searchTerm}"
                </span>
              )}
              {/* This will now only display bedrooms/bathrooms if they are active */}
              {Object.entries(activeFilters).map(([key, value]) => {
                if (value && value !== 'all' && value !== '') {
                  const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
                  return (
                    <span key={key} className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-medium">
                      {formattedKey}: {value}+
                    </span>
                  );
                }
                return null;
              })}
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside className={`${showMobileFilters ? 'block' : 'hidden'} lg:block lg:w-1/4`}>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FaFilter className="text-secondary" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
              {/* NOTE: The 'properties' prop is no longer needed */}
              <FilterSidebar 
                onFilterChange={handleFilterChange} 
                activeFilters={activeFilters}
              />
            </div>
          </aside>

          {/* Property Grid */}
          <main className="lg:w-3/4">
            {loading && allProperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Spinner size="large" />
                <p className="mt-4 text-gray-600">Loading properties...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                {filtering && (
                  <div className="flex items-center justify-center py-4">
                    <Spinner size="small" />
                    <span className="ml-2 text-gray-600">Applying filters...</span>
                  </div>
                )}
                
                {currentProperties.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {currentProperties.map((property, index) => (
                        <div
                          key={property._id}
                          className="transform transition-all duration-500 ease-out"
                          style={{
                            animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                          }}
                        >
                          <PropertyCard property={property} />
                        </div>
                      ))}
                    </div>
                    
                    {totalPages > 1 && (
                      <div className="mt-12 flex justify-center">
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={onPageChange}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                    <div className="text-gray-400 text-6xl mb-4">🏠</div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">No properties found</h3>
                    <p className="text-gray-600 mb-6">
                      {hasActiveFilters 
                        ? "Try adjusting your filters or search terms" 
                        : "Check back later for new properties"}
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="px-6 py-3 bg-secondary text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ListingsPage;