import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { seededProducts } from '../data/products.js';

export const getProducts = async (req, res, next) => {
  try {
    const { search, category, featured, page = 1, limit = 12 } = req.query;
    const pageSize = Math.min(Math.max(Number(limit), 1), 50);
    const filter = { isActive: true };
    if (search) filter.$text = { $search: String(search).trim() };
    if (category) filter.categoryName = new RegExp(`^${String(category).trim()}$`, 'i');
    if (featured === 'true') filter.isFeatured = true;
    const skip = (Math.max(Number(page), 1) - 1) * pageSize;
    const [products, total] = await Promise.all([Product.find(filter).populate('category', 'name slug').sort({ createdAt: -1 }).skip(skip).limit(pageSize), Product.countDocuments(filter)]);
    if (process.env.NODE_ENV !== 'production' && !total && !search && !category && featured !== 'true') return res.json({ success: true, products: seededProducts, count: seededProducts.length, total: seededProducts.length, page: 1, pages: 1, demo: true });
    return res.json({ success: true, products, count: products.length, total, page: Number(page), pages: Math.ceil(total / pageSize) });
  } catch (error) { return next(error); }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = mongoose.isValidObjectId(req.params.id) ? await Product.findById(req.params.id).populate('category', 'name slug') : null;
    if (product) return res.json({ success: true, product });
    const fallback = process.env.NODE_ENV === 'production' ? null : seededProducts.find((item) => item.id === req.params.id);
    if (!fallback) return res.status(404).json({ success: false, message: 'Product not found' });
    return res.json({ success: true, product: fallback, demo: true });
  } catch (error) { return next(error); }
};

export const createProduct = async (req, res, next) => {
  try { return res.status(201).json({ success: true, product: await Product.create(req.body) }); } catch (error) { return next(error); }
};

export const getAdminProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate('category', 'name slug').sort({ createdAt: -1 });
    return res.json({ success: true, products, count: products.length });
  } catch (error) { return next(error); }
};

export const deleteProduct = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid product ID' });
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    return res.json({ success: true, message: 'Product deleted', id: product._id });
  } catch (error) { return next(error); }
};
