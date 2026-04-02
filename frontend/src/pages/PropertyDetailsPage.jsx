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
  FaPaperPlane,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

// ✅ API BASE URL
const API = import.meta.env.VITE_API_URL;

// Simple Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-300 h-96 rounded-lg mb-4"></div>
    <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
    <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
    <div className="h-20 bg-gray-300 rounded mb-4"></div>
  </div>
);

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
  
  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
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

  if (loading) return (
    <div className="container mx-auto px-4 py-8">
      <LoadingSkeleton />
    </div>
  );
  if (error) return <div className="container mx-auto px-4 py-10 text-center text-red-500 text-xl font-semibold">{error}</div>;

  const currentImageUrl = `${API}${allImages[currentImageIndex]}`;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Grid Layout */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        
        {/* LEFT COLUMN: Image Gallery & Property Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Image Gallery */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg bg-gray-200 aspect-video">
              <img src={currentImageUrl} alt={`Property ${currentImageIndex + 1}`} className="w-full h-full object-cover" />
              
              {/* Navigation Buttons */}
              {allImages.length > 1 && (
                <>
                  <button onClick={goToPreviousImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition">
                    <FaChevronLeft />
                  </button>
                  <button onClick={goToNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition">
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition ${index === currentImageIndex ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img src={`${API}${img}`} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Info Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-dark">{property.title}</h1>
                <p className="text-gray-600 flex items-center mt-2">
                  <FaMapMarkerAlt className="mr-2 text-secondary" />
                  {property.location}
                </p>
              </div>
              <button onClick={handleFavoriteClick} className="mt-4 sm:mt-0 p-3 rounded-full border-2 border-gray-300 hover:border-red-500 transition self-start sm:self-auto">
                {favorited ? <FaHeart className="text-2xl text-red-500" /> : <FaRegHeart className="text-2xl text-gray-600" />}
              </button>
            </div>
            <h2 className="text-3xl font-bold text-primary mt-4">
              ₹{property.price.toLocaleString('en-IN')}
            </h2>
          </div>

          {/* Property Features */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Property Features</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center p-3 bg-light rounded-lg">
                <FaBed className="text-2xl text-secondary mb-2" />
                <span className="font-semibold">{property.bedrooms}</span>
                <span className="text-sm text-gray-600">Bedrooms</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-light rounded-lg">
                <FaBath className="text-2xl text-secondary mb-2" />
                <span className="font-semibold">{property.bathrooms}</span>
                <span className="text-sm text-gray-600">Bathrooms</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-light rounded-lg">
                <FaRulerCombined className="text-2xl text-secondary mb-2" />
                <span className="font-semibold">{property.sqft}</span>
                <span className="text-sm text-gray-600">Sq. Ft.</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{property.description}</p>
          </div>

        </div>

        {/* RIGHT COLUMN: Sticky Inquiry Form */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-8 space-y-6">
            
            {/* Contact Agent Card */}
            {property.contactName && (
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Listed By</h3>
                <p className="font-bold text-lg">{property.contactName}</p>
                {property.contactPhone && (
                  <p className="flex items-center text-gray-600 mt-2">
                    <FaPhone className="mr-2 text-secondary" /> {property.contactPhone}
                  </p>
                )}
                <p className="flex items-center text-gray-600 mt-1">
                  <FaEnvelope className="mr-2 text-secondary" /> {property.contactEmail}
                </p>
              </div>
            )}

            {/* Inquiry Form Card */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Send an Inquiry</h3>
              
              {inquirySuccess && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
                  <FaCheckCircle className="mr-2" /> Inquiry sent successfully!
                </div>
              )}
              {inquiryError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
                  <FaExclamationCircle className="mr-2" /> {inquiryError}
                </div>
              )}

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    value={inquiry.name}
                    onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    value={inquiry.email}
                    onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">I am interested to</label>
                  <select 
                    value={inquiryType} 
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="buy">Buy</option>
                    <option value="rent">Rent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    required
                    rows="4"
                    value={inquiry.message}
                    onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={inquiryLoading}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-md transition duration-300 flex items-center justify-center"
                >
                  {inquiryLoading ? (
                    "Sending..."
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" /> Send Inquiry
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;