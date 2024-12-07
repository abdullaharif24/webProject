const Product = require('../models/Product');
const Order = require('../models/Order');

exports.getSalesAnalytics = async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $match: { sellerId: req.user.id } },
      { $group: { _id: null, total: { $sum: '$quantity' } } },
    ]);

    const topProducts = await Order.aggregate([
      { $match: { sellerId: req.user.id } },
      {
        $group: {
          _id: '$productId',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({ totalSales: totalSales[0]?.total || 0, topProducts });
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch sales analytics.' });
  }
};
