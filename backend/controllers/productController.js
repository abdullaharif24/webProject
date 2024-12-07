const Product = require('../models/Product');

exports.getLowStockProducts = async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.user.id, stock: { $lt: 10 } });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch low stock products.' });
  }
};
