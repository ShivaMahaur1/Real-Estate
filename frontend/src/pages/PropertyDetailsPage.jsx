// frontend/src/pages/PropertyDetailsPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { 
  FaHeart, 
  FaRegHeart, 
  FaBed, 
  FaBath, 
  FaRulerCombined, 
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaExclamationCircle,
  FaPaperPlane
} from 'react-icons/fa';

// ✅ API BASE URL
const API = import.meta.env.VITE_API_URL;

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [inquiryLoading, setInquiryLoading] = useState(false);

  const [allImages, setAllImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [inquiry, setInquiry] = useState({ name: '', email: '', message: '' });
  const [inquiryType, setInquiryType] = useState('buy');
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryError, setInquiryError] = useState('');

  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const favorited = isFavorite(id);

  useEffect(() => {
    emailjs.init("U1YtXLk5sSgXcd7PQ");
  }, []);

  // ✅ FETCH PROPERTY
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${API}/api/properties/${id}`);
        setProperty(res.data);

        const imagesArray = res.data.images || [res.data.image];
        setAllImages(imagesArray);
        setCurrentImageIndex(0);

        setLoading(false);
      } catch (err) {
        setError('Property not found or failed to load.');
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  useEffect(() => {
    if (isAuthenticated && user) {
      setInquiry(prev => ({ ...prev, name: user.name, email: user.email }));
    }
  }, [isAuthenticated, user]);

  const goToPreviousImage = () => {
    const isFirstImage = currentImageIndex === 0;
    const newIndex = isFirstImage ? allImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const goToNextImage = () => {
    const isLastImage = currentImageIndex === allImages.length - 1;
    const newIndex = isLastImage ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  const handleFavoriteClick = () => {
    if (favorited) {
      removeFromFavorites(id);
    } else {
      addToFavorites(property);
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setInquiryLoading(true);
    setInquiryError('');

    try {
      const emailData = {
        name: inquiry.name,
        email: inquiry.email,
        message: inquiry.message,
        inquiryType,
        propertyTitle: property.title,
        propertyLocation: property.location,
        propertyPrice: `₹${property.price.toLocaleString('en-IN')}`,
        propertyType: property.type,
        propertyBedrooms: property.bedrooms,
        propertyBathrooms: property.bathrooms,
        propertySqft: property.sqft,
        propertyUrl: window.location.href,
        contactName: property.contactName,
        contactEmail: property.contactEmail,
        contactPhone: property.contactPhone || 'Not provided'
      };

      await emailjs.send(
        "service_w3xru4y",
        "template_zwc8lib",
        emailData
      );

      setInquirySuccess(true);
      setInquiry(prev => ({ ...prev, message: '' }));
      setTimeout(() => setInquirySuccess(false), 5000);

    } catch (err) {
      console.error(err);
      setInquiryError("Failed to send inquiry.");
    } finally {
      setInquiryLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  // ✅ FIXED IMAGE URL
  const currentImageUrl = `${API}${allImages[currentImageIndex]}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <img src={currentImageUrl} alt="property" className="w-full h-96 object-cover rounded-lg" />

      <h1 className="text-3xl font-bold mt-4">{property.title}</h1>
      <p className="text-gray-600 flex items-center">
        <FaMapMarkerAlt className="mr-2" />
        {property.location}
      </p>

      <h2 className="text-2xl font-bold mt-2">
        ₹{property.price.toLocaleString('en-IN')}
      </h2>

      <div className="flex gap-4 mt-4">
        <span><FaBed /> {property.bedrooms}</span>
        <span><FaBath /> {property.bathrooms}</span>
        <span><FaRulerCombined /> {property.sqft} sqft</span>
      </div>

      <p className="mt-4">{property.description}</p>

      <button onClick={handleFavoriteClick} className="mt-4 text-xl">
        {favorited ? <FaHeart color="red" /> : <FaRegHeart />}
      </button>

      <form onSubmit={handleInquirySubmit} className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={inquiry.name}
          onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
          className="w-full border p-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={inquiry.email}
          onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
          className="w-full border p-2"
        />
        <textarea
          placeholder="Message"
          value={inquiry.message}
          onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
          className="w-full border p-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2">
          {inquiryLoading ? "Sending..." : "Send Inquiry"}
        </button>
      </form>
    </div>
  );
};

export default PropertyDetailsPage;
