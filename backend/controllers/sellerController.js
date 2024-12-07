const bcrypt = require('bcryptjs'); // Use bcryptjs to handle hashing
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');
const Product = require('../models/Product');
// const nodemailer = require('nodemailer'); // Removed since no email verification is required

exports.register = async (req, res) => {
    console.log(req.body);  // Debugging line to log the incoming request

    const { email, password, name  } = req.body;

    console.log("Here is the password", password);
  
    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
      
    try {
        // Check if the seller already exists
        const existingSeller = await Seller.findOne({ email });
        if (existingSeller) {
            return res.status(400).json({ message: 'Seller already exists' });
        }
  
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new seller
        const newSeller = new Seller({ email, password: hashedPassword, name });
        await newSeller.save();
  
        // Send response without email verification
        res.status(201).json({ message: 'Seller registered successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Seller Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const seller = await Seller.findOne({ email });
        if (!seller) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, seller.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ sellerId: seller._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
    const { sellerId, name, email } = req.body;
    try {
        const updatedSeller = await Seller.findByIdAndUpdate(
            sellerId,
            { name, email },
            { new: true }
        );
        if (!updatedSeller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        res.json({ updatedSeller });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add Product
exports.addProduct = async (req, res) => {
    const { name, description, price, sellerId } = req.body;
    try {
        const newProduct = new Product({ name, description, price, seller: sellerId });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully!', product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
