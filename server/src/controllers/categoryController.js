import Category from '../models/Category.js';

const slugify = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    return res.json({ success: true, categories, count: categories.length });
  } catch (error) {
    return next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, description, image, slug } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Category name is required' });

    const category = await Category.create({ name, description, image, slug: slug || slugify(name) });
    return res.status(201).json({ success: true, category });
  } catch (error) {
    return next(error);
  }
};

export const getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug, isActive: true });
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    return res.json({ success: true, category });
  } catch (error) {
    return next(error);
  }
};
