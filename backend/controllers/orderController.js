const Order = require('../models/Order');

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.user.id }).populate('productId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch orders.' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update order status.' });
  }
};
