const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON bodies

// --- NEW: Serve Static Files ---
// This makes the 'uploads' folder publicly accessible.
// Any file in the 'uploads' folder can be accessed via http://your-server/uploads/filename.jpg
app.use('/uploads', express.static('uploads'));
// --------------------------------

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define Routes
app.use('/api/auth', require('./routes/auth'));

// --- NEW: Add Properties Route ---
// This connects all the property-related API endpoints (create, get, inquire, manage)
app.use('/api/properties', require('./routes/properties'));
// ---------------------------------

// A simple route for testing
app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('GLOBAL ERROR:', err.stack);

  res.status(500).json({
    msg: err.message || 'Server Error',
  });
});
