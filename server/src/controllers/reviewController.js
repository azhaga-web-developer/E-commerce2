import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Review from '../models/Review.js';

const getSummary = async (productId) => {
  const [summary] = await Review.aggregate([
    { $match: { productId } },
    { $group: { _id: '$productId', averageRating: { $avg: '$rating' }, reviewCount: { $sum: 1 } } }
  ]);
  return { averageRating: summary ? Math.round(summary.averageRating * 10) / 10 : 0, reviewCount: summary?.reviewCount || 0 };
};

export const getProductReviews = async (req, res, next) => {
  try {
    const productId = String(req.params.productId);
    const [reviews, summary] = await Promise.all([
      Review.find({ productId }).populate('user', 'name').sort({ createdAt: -1 }).limit(100).lean(),
      getSummary(productId)
    ]);
    return res.json({ success: true, reviews, ...summary });
  } catch (error) { return next(error); }
};

export const createProductReview = async (req, res, next) => {
  try {
    const productId = String(req.params.productId);
    const rating = Number(req.body.rating);
    const title = String(req.body.title || '').trim();
    const comment = String(req.body.comment || '').trim();
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) return res.status(400).json({ success: false, message: 'Choose a rating from 1 to 5 stars.' });
    if (comment.length < 10 || comment.length > 1000) return res.status(400).json({ success: false, message: 'Your review must be between 10 and 1000 characters.' });
    if (title.length > 100) return res.status(400).json({ success: false, message: 'The review title must be 100 characters or fewer.' });
    const review = await Review.create({ productId, user: req.user._id, rating, title, comment });
    if (mongoose.isValidObjectId(productId)) {
      const summary = await getSummary(productId);
      await Product.findByIdAndUpdate(productId, { rating: summary.averageRating, reviews: summary.reviewCount });
    }
    const populated = await review.populate('user', 'name');
    return res.status(201).json({ success: true, review: populated, ...(await getSummary(productId)) });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ success: false, message: 'You have already reviewed this product.' });
    return next(error);
  }
};
