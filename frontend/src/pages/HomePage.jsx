import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { testimonials } from '../data/testimonials';

import HowItWorks from '../components/HowItWorks';
import HeroSection from '../components/HeroSection';
import FeaturedProperties from '../components/FeaturedProperties';
import MeetOurAgents from '../components/MeetOurAgents';
import ClientTestimonials from '../components/ClientTestimonials';
import FinalCtaSection from '../components/FinalCtaSection';

// ✅ ADD THIS (important for deployment)
const API = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);

        // ✅ FIXED API CALL
        const res = await axios.get(`${API}/api/properties`);

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

      <ClientTestimonials testimonials={testimonials} />

      <FinalCtaSection/>
    </div>
  );
};

export default HomePage;
