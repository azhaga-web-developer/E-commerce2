import Order from '../models/Order.js';
import mongoose from 'mongoose';
import Product from '../models/Product.js';

export const createOrder = async (req, res, next) => {
  const reservedStock = [];
  try {
    const { items, shippingAddress, paymentMethod = 'cod' } = req.body;
    if (!Array.isArray(items) || !items.length) return res.status(400).json({ success: false, message: 'At least one item is required' });
    if (!shippingAddress?.fullName || !shippingAddress?.address || !shippingAddress?.city || !shippingAddress?.postalCode) return res.status(400).json({ success: false, message: 'Complete shipping address is required' });
    const orderItems = [];
    for (const item of items) {
      const quantity = Number(item.quantity);
      if (!mongoose.isValidObjectId(item.product) || !Number.isInteger(quantity) || quantity < 1) {
        throw Object.assign(new Error('The order contains an invalid product or quantity'), { statusCode: 400 });
      }
      const product = await Product.findOneAndUpdate(
        { _id: item.product, isActive: true, stock: { $gte: quantity } },
        { $inc: { stock: -quantity } },
        { new: true }
      );
      if (!product) throw Object.assign(new Error('A product is unavailable or does not have enough stock'), { statusCode: 400 });
      reservedStock.push({ productId: product._id, quantity });
      orderItems.push({ product: product._id, name: product.name, image: product.image, price: product.price, quantity, size: item.size, color: item.color });
    }
    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 999 ? 0 : 79;
    const order = await Order.create({ user: req.user._id, items: orderItems, shippingAddress, paymentMethod, subtotal, shipping, total: subtotal + shipping });
    return res.status(201).json({ success: true, order });
  } catch (error) {
    for (const reservation of reservedStock.reverse()) {
      try { await Product.findByIdAndUpdate(reservation.productId, { $inc: { stock: reservation.quantity } }); }
      catch (rollbackError) { console.error('Could not restore reserved stock:', rollbackError.message); }
    }
    return next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try { const orders = await Order.find({ user: req.user._id }).populate('items.product', 'name image').sort({ createdAt: -1 }); return res.json({ success: true, orders, count: orders.length }); } catch (error) { return next(error); }
};

export const getOrderById = async (req, res, next) => {
  try { const order = await Order.findOne({ _id: req.params.id, user: req.user._id }).populate('items.product', 'name image'); if (!order) return res.status(404).json({ success: false, message: 'Order not found' }); return res.json({ success: true, order }); } catch (error) { return next(error); }
};

export const getAdminOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    return res.json({ success: true, orders, count: orders.length });
  } catch (error) { return next(error); }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const allowed = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (!allowed.includes(req.body.status)) return res.status(400).json({ success: false, message: 'Choose a valid order status' });
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true }).populate('user', 'name email');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    return res.json({ success: true, order });
  } catch (error) { return next(error); }
};
