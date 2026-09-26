import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5173'))
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(Object.assign(new Error('Origin is not allowed by CORS'), { statusCode: 403 }));
  }
}));
app.use(express.json({ limit: '8mb' }));

app.get('/api/health', (req, res) => {
  const databaseReady = mongoose.connection.readyState === 1;
  return res.status(databaseReady ? 200 : 503).json({
    status: databaseReady ? 'ok' : 'unavailable',
    database: databaseReady ? 'connected' : 'disconnected'
  });
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  const status = error.statusCode || (error.name === 'ValidationError' ? 400 : error.code === 11000 ? 409 : 500);
  const message = error.code === 11000 ? 'A record with this value already exists' : error.message || 'Internal server error';
  if (status >= 500) console.error(error);
  return res.status(status).json({ success: false, message });
});

export default app;
