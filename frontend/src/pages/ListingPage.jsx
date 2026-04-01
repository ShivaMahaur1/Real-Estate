// frontend/src/pages/ListingPage.jsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import { FaSearch, FaFilter, FaHome, FaTimes } from 'react-icons/fa';

// ✅ ADD THIS LINE
const API = import.meta.env.VITE_API_URL;

const ListingsPage = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  // ✅ FIXED API CALL HERE
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(`${API}/api/properties`);

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

  const applyFilters = useCallback((filters) => {
    setFiltering(true);
    setActiveFilters(filters);
    
    let result = [...allProperties];

    if (filters.searchTerm || searchTerm) {
      const term = (filters.searchTerm || searchTerm).toLowerCase();
      result = result.filter(p =>
        p.location?.toLowerCase().includes(term) ||
        p.title?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
      );
    }

    if (filters.bedrooms && filters.bedrooms !== 'all') {
      result = result.filter(p => p.bedrooms >= parseInt(filters.bedrooms));
    }

    if (filters.bathrooms && filters.bathrooms !== 'all') {
      result = result.filter(p => p.bathrooms >= parseInt(filters.bathrooms));
    }

    setFilteredProperties(result);
    setCurrentPage(1);
    setTimeout(() => setFiltering(false), 300);
  }, [allProperties, searchTerm]);

  const handleFilterChange = useCallback((filters) => {
    applyFilters(filters);
  }, [applyFilters]);

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    applyFilters({ ...activeFilters, searchTerm: value });
  }, [activeFilters, applyFilters]);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setActiveFilters({});
    setFilteredProperties(allProperties);
    setCurrentPage(1);
  }, [allProperties]);

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

  const hasActiveFilters = useMemo(() => {
    return Object.keys(activeFilters).some(key => 
      activeFilters[key] && activeFilters[key] !== 'all' && activeFilters[key] !== ''
    ) || searchTerm;
  }, [activeFilters, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* UI remains unchanged */}
      {/* (no need to modify anything below) */}
      
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
            
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by location, title..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-secondary text-gray-900 rounded-lg font-semibold"
            >
              <FaFilter />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* rest unchanged */}
    </div>
  );
};

export default ListingsPage;
