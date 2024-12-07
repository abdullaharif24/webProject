const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const Seller = mongoose.model('Seller', sellerSchema);
module.exports = Seller;
