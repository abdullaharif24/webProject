const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');
const Product = require('../models/Product');

// Register Seller
const register = async (req, res) => {
    console.log(req.body); // Debugging log

    const { email, password, name } = req.body;

    console.log("Here is the password", password);

    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    try {
        const existingSeller = await Seller.findOne({ email });
        if (existingSeller) {
            return res.status(400).json({ message: 'Seller already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newSeller = new Seller({ email, password: hashedPassword, name });
        await newSeller.save();

        res.status(201).json({ message: 'Seller registered successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Seller Login
const login = async (req, res) => {
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

// Get User by Email
const getUserByEmail = async (req, res) => {
    const { email } = req.params; // Assuming the email is passed as a URL parameter

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const user = await Seller.findOne({ email }); // Replace `Seller` with your model name
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by email:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Update Profile
const updateProfile = async (req, res) => {
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
const addProduct = async (req, res) => {
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
const updateProduct = async (req, res) => {
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
const deleteProduct = async (req, res) => {
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

// Export all the functions as an object
module.exports = {
    register,
    login,
    updateProfile,
    addProduct,
    updateProduct,
    deleteProduct,
    getUserByEmail
};
