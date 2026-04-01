// backend/middleware/upload.js

const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
  // Destination for files
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  // Add extension to file
  filename: function (req, file, cb) {
    // Create a unique filename to avoid overwriting
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
};

// Initialize upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: fileFilter,
});

module.exports = upload;