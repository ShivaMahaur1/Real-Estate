// frontend/src/pages/ListingPage.jsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import { FaSearch, FaFilter, FaHome, FaTimes } from 'react-icons/fa';

// ✅ API URL
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

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(`${API}/api/properties`);
        console.log("Fetched:", data);

        setAllProperties(data);
        setFilteredProperties(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setError('Failed to load properties.');
        setAllProperties([]);
        setFilteredProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // ✅ FILTER LOGIC
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

  // ✅ PAGINATION
  const currentProperties = useMemo(() => {
    const indexOfLast = currentPage * propertiesPerPage;
    const indexOfFirst = indexOfLast - propertiesPerPage;
    return filteredProperties.slice(indexOfFirst, indexOfLast);
  }, [currentPage, filteredProperties]);

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasActiveFilters = useMemo(() => {
    return Object.keys(activeFilters).some(key =>
      activeFilters[key] && activeFilters[key] !== 'all' && activeFilters[key] !== ''
    ) || searchTerm;
  }, [activeFilters, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <FaHome className="text-secondary" />
                Property Listings
              </h1>
              <p className="text-gray-600">
                {filteredProperties.length} properties found
              </p>
            </div>

            {/* SEARCH */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 border rounded-lg"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* MOBILE FILTER */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden px-4 py-2 bg-secondary rounded-lg"
            >
              <FaFilter />
            </button>

          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-4 py-8 flex gap-8">

        {/* SIDEBAR */}
        <aside className={`${showMobileFilters ? 'block' : 'hidden'} lg:block w-1/4`}>
          <FilterSidebar
            onFilterChange={handleFilterChange}
            activeFilters={activeFilters}
          />
        </aside>

        {/* MAIN */}
        <main className="flex-1">

          {loading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : currentProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentProperties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                  />
                </div>
              )}
            </>
          ) : (
            <p className="text-center">No properties found</p>
          )}

        </main>
      </div>
    </div>
  );
};

export default ListingsPage;
