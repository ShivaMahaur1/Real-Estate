// frontend/src/pages/AddPropertyPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPropertyPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    type: 'buy',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { title, description, price, location, bedrooms, bathrooms, sqft, type, contactName, contactEmail, contactPhone } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onImageChange = e => setImage(e.target.files[0]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError('');
    setSuccess('');

    const data = new FormData();
    data.append('image', image);
    data.append('title', title);
    data.append('description', description);
    data.append('price', price);
    data.append('location', location);
    data.append('bedrooms', bedrooms);
    data.append('bathrooms', bathrooms);
    data.append('sqft', sqft);
    data.append('type', type);
    data.append('contactName', contactName);
    data.append('contactEmail', contactEmail);
    data.append('contactPhone', contactPhone);

    try {
      const res = await axios.post('/api/properties', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setSuccess('Property added successfully!');
      console.log('Property added:', res.data);
      
      const managementLink = `${window.location.origin}/manage/${res.data.managementToken}`;
      alert(`Property added! Save this link to manage your listing: ${managementLink}`);
      
      setTimeout(() => navigate('/'), 2000);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Failed to add property.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Add New Property</h1>
      
      {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
      {success && <p className="text-green-500 bg-green-100 p-3 rounded-md mb-4">{success}</p>}
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Property Title</label>
          <input 
            type="text" 
            name="title"
            value={title}
            onChange={onChange} 
            required 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Description</label>
          <textarea 
            name="description" 
            value={description}
            onChange={onChange} 
            rows="4" 
            required 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Price</label>
            <input 
              type="number" 
              name="price" 
              value={price}
              onChange={onChange} 
              required 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Location</label>
            <input 
              type="text" 
              name="location" 
              value={location}
              onChange={onChange} 
              required 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Bedrooms</label>
            <input 
              type="number" 
              name="bedrooms" 
              value={bedrooms}
              onChange={onChange} 
              required 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Bathrooms</label>
            <input 
              type="number" 
              name="bathrooms" 
              value={bathrooms}
              onChange={onChange} 
              required 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Sqft</label>
            <input 
              type="number" 
              name="sqft" 
              value={sqft}
              onChange={onChange} 
              required 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Type</label>
          <select 
            name="type" 
            value={type}
            onChange={onChange} 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="buy">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Contact Name</label>
          <input 
            type="text" 
            name="contactName" 
            value={contactName}
            onChange={onChange} 
            required 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Contact Email</label>
          <input 
            type="email" 
            name="contactEmail" 
            value={contactEmail}
            onChange={onChange} 
            required 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Contact Phone (Optional)</label>
          <input 
            type="tel" 
            name="contactPhone" 
            value={contactPhone}
            onChange={onChange} 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Property Image</label>
          <input 
            type="file" 
            onChange={onImageChange} 
            accept="image/*"
            required 
            className="w-full px-3 py-2 border rounded-md" 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400" 
          disabled={uploading}
        >
          {uploading ? 'Adding Property...' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default AddPropertyPage;