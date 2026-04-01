import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// No longer need testimonials here
 import { testimonials } from '../data/testimonials'; 

// Keep other component imports
import HowItWorks from '../components/HowItWorks';
import HeroSection from '../components/HeroSection';
import FeaturedProperties from '../components/FeaturedProperties';
import MeetOurAgents from '../components/MeetOurAgents';

// --- Import the NEW ClientTestimonials component ---
import ClientTestimonials from '../components/ClientTestimonials';
import FinalCtaSection from '../components/FinalCtaSection';

const HomePage = () => {
  // State for fetching properties (NO CHANGES NEEDED)
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect to fetch data (NO CHANGES NEEDED)
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/properties');
        setFeaturedProperties(res.data.slice(0, 3));
        setError(null);
      } catch (err) {
        console.error("Error fetching featured properties:", err);
        setError('Failed to load featured properties.');
        setFeaturedProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <FeaturedProperties 
        featuredProperties={featuredProperties}
        loading={loading}
        error={error}
      />
      <MeetOurAgents />

      {/* --- NEW Testimonials Section --- */}
      {/* We pass the testimonials data as a prop */}
      <ClientTestimonials testimonials={testimonials} />

      {/* --- The rest of your page remains the same --- */}
      <FinalCtaSection/>
    </div>
  );
};

export default HomePage;