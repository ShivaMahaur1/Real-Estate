// backend/models/Inquiry.js

const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  // Link the inquiry to a specific property
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  // Details from the inquiry form
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: { // 'buy' or 'rent'
    type: String,
    required: true,
    enum: ['buy', 'rent'],
  },
}, {
  // Automatically add 'createdAt' and 'updatedAt' fields
  timestamps: true,
});

module.exports = mongoose.model('Inquiry', InquirySchema);