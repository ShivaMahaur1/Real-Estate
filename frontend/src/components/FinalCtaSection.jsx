import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaArrowRight } from 'react-icons/fa';

const FinalCtaSection = () => {
  return (
    // --- Full-Bleed Background Image Section ---
    <section 
      className="relative bg-cover bg-center bg-no-repeat py-32"
      style={{ backgroundImage: `url('https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}
    >
      {/* --- Dark Overlay for Text Readability --- */}
      <div className="absolute inset-0 bg-gray-900/80"></div>

      {/* --- Content Container --- */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* --- Icon for Visual Interest --- */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary/20 rounded-full mb-6">
          <FaSearch className="text-4xl text-secondary" />
        </div>

        {/* --- Enhanced Header --- */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
          Your Journey to a New Home Starts Here
        </h2>
        
        {/* --- Improved Subtitle --- */}
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Let's find a place you'll love. Browse our exclusive listings and take the first step towards your dream property today.
        </p>

        {/* --- Primary Call-to-Action Button --- */}
        <Link
          to="/listings"
          className="group inline-flex items-center px-10 py-5 bg-secondary text-gray-900 font-bold text-xl rounded-xl hover:bg-yellow-400 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 transform hover:-translate-y-1"
        >
          Start Your Search
          <FaArrowRight className="ml-3 text-lg transition-transform group-hover:translate-x-1" />
        </Link>

        {/* --- Secondary, Subtle CTA --- */}
        <p className="mt-6 text-gray-400">
          Or <Link to="/contact" className="text-white font-semibold hover:underline">contact an agent</Link> for personalized assistance.
        </p>
      </div>
    </section>
  );
};

export default FinalCtaSection;