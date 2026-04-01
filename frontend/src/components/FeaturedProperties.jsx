import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaHome, FaExclamationTriangle } from 'react-icons/fa';
import PropertyCard from './PropertyCard';

const FeaturedProperties = ({ featuredProperties = [], loading = false, error = null }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  // Effect for the "Late Appear" Animation (kept as it's a nice touch)
  useEffect(() => {
    if (featuredProperties.length === 0) return;
    
    setVisibleCards(new Array(featuredProperties.length).fill(false));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setVisibleCards((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [featuredProperties.length]);

  const PropertyCardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="relative h-72 bg-gray-200 overflow-hidden rounded-t-2xl">
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
      </div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="flex justify-between items-center pt-4">
          <div className="h-7 bg-gray-200 rounded w-1/2"></div>
          <div className="h-10 bg-secondary/30 rounded-lg w-24"></div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary font-semibold text-sm rounded-full mb-4">
            Handpicked For You
          </span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Featured Properties
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most sought-after homes, selected for their exceptional quality and unique appeal.
          </p>
        </div>

        {loading ? (
          // --- SIMPLE GRID FOR LOADING SKELETONS ---
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
            <PropertyCardSkeleton />
          </div>
        ) : error ? (
          <div className="text-center py-16 px-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <FaExclamationTriangle className="text-3xl text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Something Went Wrong</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : featuredProperties.length > 0 ? (
          // --- MAIN CHANGE: SIMPLE RESPONSIVE GRID FOR PROPERTIES ---
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <div
                key={property._id}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`transform transition-all duration-700 ease-out ${
                  visibleCards[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/20 rounded-full mb-4">
              <FaHome className="text-3xl text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Featured Properties Yet</h3>
            <p className="text-gray-600 mb-6">Our team is curating the best listings for you. Check back soon!</p>
          </div>
        )}

        {/* --- NEW: PROMINENT CALL-TO-ACTION BUTTON --- */}
        <div className="text-center mt-16">
          <Link
            to="/listings"
            className="inline-flex items-center px-8 py-4 bg-secondary text-gray-900 font-bold text-lg rounded-full hover:bg-yellow-400 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Explore All Properties
            <FaArrowRight className="ml-3" />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </section>
  );
};

export default FeaturedProperties;