const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');

exports.authMiddleware = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(400).json({ error: 'Token is required' });
        }

        // Verify the token using JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the seller based on the decoded ID from the token
        const seller = await Seller.findById(decoded.sellerId);  // Updated field to match token payload
        if (!seller) {
            throw new Error();
        }

        // Attach the seller to the request object for further use
        req.user = seller;
        
        next();
    } catch (error) {
        res.status(401).json({ error: 'Authentication required or invalid token' });
    }
};
