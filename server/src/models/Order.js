import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  image: String,
  price: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, min: 1 },
  size: String,
  color: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: { type: [orderItemSchema], required: true, validate: (items) => items.length > 0 },
  shippingAddress: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, trim: true },
    country: { type: String, default: 'India' }
  },
  paymentMethod: { type: String, enum: ['cod', 'card', 'upi'], default: 'cod' },
  subtotal: { type: Number, required: true, min: 0 },
  shipping: { type: Number, default: 0, min: 0 },
  total: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
