require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const sellerRoutes = require('./routes/sellerRoutes'); // Your seller routes

const app = express();

// Enable CORS
app.use(cors());

// Parse incoming requests with JSON payload
app.use(express.json()); // This is built-in now, no need for body-parser

// // Log the incoming request body before routes
// app.use((req, res, next) => {
//   console.log('Request Body:', req.body);  // Log the parsed body
//   next();
// });

// Set up routes
app.use('/seller', sellerRoutes); // Seller routes are prefixed with '/seller'

// Sample test route
app.post('/seller/register', (req, res) => {
  console.log('Request Body:', req.body);  // Log the parsed body
  res.status(200).json({ message: 'Body received successfully' });
});


// Connect to MongoDB using the URI from the .env file
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
