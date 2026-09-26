import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

export const getDashboardSummary = async (req, res, next) => {
  try {
    const [revenue, orderCount, customers, productCount, lowStockCount, lowStock, recentOrders, statusCounts] = await Promise.all([
      Order.aggregate([{ $match: { status: { $ne: 'Cancelled' } } }, { $group: { _id: null, amount: { $sum: '$total' } } }]),
      Order.countDocuments(),
      User.countDocuments({ isAdmin: { $ne: true }, role: 'customer' }),
      Product.countDocuments({ isActive: true }),
      Product.countDocuments({ isActive: true, stock: { $lte: 5 } }),
      Product.find({ isActive: true, stock: { $lte: 5 } }).select('name brand image stock').sort({ stock: 1 }).limit(5),
      Order.find().populate('user', 'name email').sort({ createdAt: -1 }).limit(6),
      Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }])
    ]);
    return res.json({
      success: true,
      metrics: { revenue: revenue[0]?.amount || 0, orderCount, customers, productCount, lowStockCount },
      lowStock,
      recentOrders,
      statusCounts: Object.fromEntries(statusCounts.map(({ _id, count }) => [_id, count]))
    });
  } catch (error) { return next(error); }
};
