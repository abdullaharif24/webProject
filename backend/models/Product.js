const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  status: { type: String, enum: ['approved', 'rejected', 'pending'], default: 'pending' },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
