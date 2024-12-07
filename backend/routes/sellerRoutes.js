const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');

// Example of POST routes for seller registration and login
router.post('/register', sellerController.register);
router.post('/login', sellerController.login);

// Example of PUT route for updating seller profile
router.put('/update-profile', sellerController.updateProfile);

// Other routes for product management, inventory, and analytics
router.post('/add-product', sellerController.addProduct);
router.put('/update-product/:id', sellerController.updateProduct);
router.delete('/delete-product/:id', sellerController.deleteProduct);

module.exports = router;
