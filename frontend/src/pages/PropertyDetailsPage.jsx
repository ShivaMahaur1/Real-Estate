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

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("U1YtXLk5sSgXcd7PQ");
  }, []);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`/api/properties/${id}`);
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
      // Prepare email data with property details
      const emailData = {
        name: inquiry.name,
        email: inquiry.email,
        message: inquiry.message,
        inquiryType: inquiryType,
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

      // Send email using EmailJS
      await emailjs.send(
        "service_w3xru4y",
        "template_zwc8lib",
        emailData
      );
      
      setInquirySuccess(true);
      setInquiry(prev => ({ ...prev, message: '' }));
      setTimeout(() => setInquirySuccess(false), 5000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setInquiryError("Failed to send inquiry. Please try again later.");
      setTimeout(() => setInquiryError(''), 5000);
    } finally {
      setInquiryLoading(false);
    }
  };

  const resetInquiryForm = () => {
    setInquirySuccess(false);
    setInquiryError('');
  };

  if (loading) return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div>;

  const currentImageUrl = `http://localhost:5000${allImages[currentImageIndex]}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative group">
          <img 
            src={currentImageUrl} 
            alt={`${property.title} ${currentImageIndex + 1}`} 
            className="w-full h-96 md:h-[500px] object-cover" 
          />
          
          {allImages.length > 1 && (
            <>
              <button onClick={goToPreviousImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70" aria-label="Previous image">
                <FaChevronLeft size={20} />
              </button>
              <button onClick={goToNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70" aria-label="Next image">
                <FaChevronRight size={20} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {allImages.map((_, index) => (
                  <button 
                    key={index} 
                    onClick={() => setCurrentImageIndex(index)} 
                    className={`h-2 w-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'}`} 
                    aria-label={`Go to image ${index + 1}`} 
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-dark mb-2">{property.title}</h1>
              <p className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2 text-secondary" /> 
                {property.location}
              </p>
            </div>
            <button 
              onClick={handleFavoriteClick} 
              className="text-3xl text-secondary hover:scale-110 transition-transform"
              aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
            >
              {favorited ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
          </div>
          
          <div className="text-3xl font-bold text-primary mb-6">
            ₹{property.price.toLocaleString('en-IN')} 
            {property.type === 'rent' && <span className="text-lg font-normal">/ month</span>}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 text-center">
            <div className="bg-light p-4 rounded-lg">
              <FaBed className="mx-auto text-2xl text-secondary mb-2" />
              <p className="font-semibold">{property.bedrooms} Bedrooms</p>
            </div>
            <div className="bg-light p-4 rounded-lg">
              <FaBath className="mx-auto text-2xl text-secondary mb-2" />
              <p className="font-semibold">{property.bathrooms} Bathrooms</p>
            </div>
            <div className="bg-light p-4 rounded-lg">
              <FaRulerCombined className="mx-auto text-2xl text-secondary mb-2" />
              <p className="font-semibold">{property.sqft} sqft</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-dark">Description</h2>
            <p className="text-gray-700 leading-relaxed">{property.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-dark">Contact Information</h2>
            <p className="text-gray-700"><strong>Listed by:</strong> {property.contactName}</p>
            <p className="text-gray-700"><strong>Email:</strong> {property.contactEmail}</p>
            {property.contactPhone && <p className="text-gray-700"><strong>Phone:</strong> {property.contactPhone}</p>}
          </div>

          <div className="border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4 text-dark">Interested in this property?</h2>
            
            {inquirySuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center" role="alert">
                <FaCheckCircle className="mr-2" />
                <div>
                  <strong className="font-bold">Success!</strong>
                  <span className="block sm:inline"> Your inquiry has been sent. We'll contact you soon.</span>
                </div>
              </div>
            )}
            
            {inquiryError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center" role="alert">
                <FaExclamationCircle className="mr-2" />
                <span>{inquiryError}</span>
              </div>
            )}
            
            <form onSubmit={handleInquirySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  id="name"
                  placeholder="Your Name" 
                  value={inquiry.name} 
                  onChange={(e) => setInquiry({...inquiry, name: e.target.value})} 
                  required 
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" 
                  disabled={!isAuthenticated || inquiryLoading} 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <input 
                  type="email" 
                  name="email" 
                  id="email"
                  placeholder="Your Email" 
                  value={inquiry.email} 
                  onChange={(e) => setInquiry({...inquiry, email: e.target.value})} 
                  required 
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" 
                  disabled={!isAuthenticated || inquiryLoading} 
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea 
                  name="message" 
                  id="message"
                  rows="4" 
                  placeholder="Tell us why you're interested in this property..." 
                  value={inquiry.message} 
                  onChange={(e) => setInquiry({...inquiry, message: e.target.value})} 
                  required 
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary" 
                  disabled={!isAuthenticated || inquiryLoading}
                ></textarea>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am interested to:
                </label>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="buyRadio" 
                      name="inquiryType" 
                      value="buy" 
                      checked={inquiryType === 'buy'} 
                      onChange={(e) => setInquiryType(e.target.value)} 
                      disabled={!isAuthenticated || inquiryLoading} 
                    />
                    <label htmlFor="buyRadio" className="cursor-pointer">Buy</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      id="rentRadio" 
                      name="inquiryType" 
                      value="rent" 
                      checked={inquiryType === 'rent'} 
                      onChange={(e) => setInquiryType(e.target.value)} 
                      disabled={!isAuthenticated || inquiryLoading} 
                    />
                    <label htmlFor="rentRadio" className="cursor-pointer">Rent</label>
                  </div>
                </div>
              </div>

              {!isAuthenticated && (
                <div className="md:col-span-2 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    Please <button onClick={() => navigate('/signin')} className="text-secondary font-semibold underline hover:no-underline">sign in</button> to submit an inquiry.
                  </p>
                </div>
              )}
              
              <div className="md:col-span-2">
                <button 
                  type="submit" 
                  className="w-full bg-secondary text-white font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={!isAuthenticated || inquiryLoading}
                >
                  {inquiryLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Inquiry...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Send Inquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;