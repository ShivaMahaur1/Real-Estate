// This would typically be in your HomePage.jsx or a similar component

import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 flex items-center justify-center text-white">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Centered Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6">
          Find Your Perfect <span className="text-yellow-400">Dream Home</span>
        </h1>
        <p className="text-lg lg:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Discover an exclusive selection of properties. From cozy apartments to luxurious villas, your next home is just a click away.
        </p>
        <Link 
          to="/listings" 
          className="group bg-yellow-400 text-gray-900 font-bold py-4 px-8 rounded-full hover:bg-yellow-300 transition-all duration-300 inline-flex items-center text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Explore All Properties 
          <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;