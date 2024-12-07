const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  customerName: { type: String, required: true },
  customerAddress: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'processing', 'shipped'], default: 'pending' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
