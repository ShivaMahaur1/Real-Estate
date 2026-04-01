// backend/routes/properties.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const Property = require('../models/Property');
// --- NEW: Import the Inquiry model ---
const Inquiry = require('../models/Inquiry'); // <-- ADD THIS LINE

// Multer config (no changes)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// --- Get all properties (no changes) ---
router.get('/', async (req, res, next) => {
  try {
    const properties = await Property.find({}).sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (err) {
    next(err);
  }
});

// --- Get single property by ID (no changes) ---
router.get('/:id', async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ msg: 'Property not found' });
    }
    next(err);
  }
});

// ===================================================================
// --- NEW ROUTE: Create an inquiry for a property ---
// @desc    Create a new inquiry for a specific property
// @route   POST /api/properties/:id/inquire
// @access  Public (but frontend protects it for logged-in users)
router.post('/:id/inquire', async (req, res, next) => {
  try {
    const { name, email, message, type } = req.body;
    const propertyId = req.params.id;

    // Optional but good: Check if the property actually exists
    const propertyExists = await Property.findById(propertyId);
    if (!propertyExists) {
      return res.status(404).json({ msg: 'Property not found, cannot submit inquiry.' });
    }

    // Create the new inquiry
    const newInquiry = new Inquiry({
      property: propertyId,
      name,
      email,
      message,
      type,
    });

    await newInquiry.save();

    res.status(201).json({ msg: 'Inquiry submitted successfully!' });

  } catch (err) {
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ msg: messages.join(', ') });
    }
    next(err);
  }
});
// ===================================================================


// --- Create a property (no changes) ---
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    console.log('Received form data:', req.body);
    console.log('Received file:', req.file);
    const { title, description, price, location, bedrooms, bathrooms, sqft, type, contactName, contactEmail, contactPhone } = req.body;
    if (!req.file) {
      return res.status(400).json({ msg: 'No image uploaded' });
    }
    const managementToken = crypto.randomBytes(32).toString('hex');
    const newProperty = new Property({
      title, description, price, location, bedrooms, bathrooms, sqft, type, contactName, contactEmail, contactPhone,
      image: `/uploads/${req.file.filename}`,
      managementToken,
    });
    const property = await newProperty.save();
    res.status(201).json({ ...property.toObject(), managementToken });
  } catch (err) {
    next(err);
  }
});

module.exports = router;