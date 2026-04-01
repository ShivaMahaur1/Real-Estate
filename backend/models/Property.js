// backend/models/Property.js

const mongoose = require('mongoose');
const crypto = require('crypto'); // Built-in Node.js module

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['buy', 'rent'], required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  bedrooms: Number,
  bathrooms: Number,
  sqft: Number,
  image: { type: String, default: 'https://via.placeholder.com/400x300.png?text=No+Image' },
  // Lister's contact information
  contactName: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: String,
  // This is the secret token to manage the property
  managementToken: { type: String, required: true, unique: true },
  // Arrays to store inquiries
  interestedBuyers: [{
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
  }],
  interestedRenters: [{
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
  }],
}, { timestamps: true });

// Pre-save hook to generate a unique management token
PropertySchema.pre('save', async function () {
  if (this.isNew) {
    this.managementToken = crypto.randomBytes(32).toString('hex');
  }
});


module.exports = mongoose.model('property', PropertySchema);