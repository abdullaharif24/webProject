// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// require('dotenv').config();

// const sellerRoutes = require('./routes/sellerRoutes');

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('Connected to MongoDB Atlas'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api/sellers', sellerRoutes);

// app.get('/', (req, res) => {
//   res.send('Seller Panel Backend is Running!');
// });

// module.exports = app;
