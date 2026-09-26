import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod = 'cod' } = req.body;
    if (!Array.isArray(items) || !items.length) return res.status(400).json({ success: false, message: 'At least one item is required' });
    if (!shippingAddress?.fullName || !shippingAddress?.address || !shippingAddress?.city || !shippingAddress?.postalCode) return res.status(400).json({ success: false, message: 'Complete shipping address is required' });
    const products = await Product.find({ _id: { $in: items.map((item) => item.product) }, isActive: true });
    const productMap = new Map(products.map((product) => [product._id.toString(), product]));
    const orderItems = items.map((item) => {
      const product = productMap.get(item.product);
      if (!product) throw Object.assign(new Error('One or more products were not found'), { statusCode: 400 });
      if (product.stock < item.quantity) throw Object.assign(new Error(`${product.name} does not have enough stock`), { statusCode: 400 });
      return { product: product._id, name: product.name, image: product.image, price: product.price, quantity: item.quantity, size: item.size, color: item.color };
    });
    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 999 ? 0 : 79;
    const order = await Order.create({ user: req.user._id, items: orderItems, shippingAddress, paymentMethod, subtotal, shipping, total: subtotal + shipping });
    await Promise.all(orderItems.map((item) => Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } })));
    return res.status(201).json({ success: true, order });
  } catch (error) { return next(error); }
};

export const getOrders = async (req, res, next) => {
  try { const orders = await Order.find({ user: req.user._id }).populate('items.product', 'name image').sort({ createdAt: -1 }); return res.json({ success: true, orders, count: orders.length }); } catch (error) { return next(error); }
};

export const getOrderById = async (req, res, next) => {
  try { const order = await Order.findOne({ _id: req.params.id, user: req.user._id }).populate('items.product', 'name image'); if (!order) return res.status(404).json({ success: false, message: 'Order not found' }); return res.json({ success: true, order }); } catch (error) { return next(error); }
};
