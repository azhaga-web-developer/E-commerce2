import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  productId: { type: String, required: true, index: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, trim: true, maxlength: 100, default: '' },
  comment: { type: String, required: true, trim: true, minlength: 10, maxlength: 1000 }
}, { timestamps: true });

reviewSchema.index({ productId: 1, user: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);
