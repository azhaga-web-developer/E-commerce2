import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = Number(process.env.PORT) || 5000;

if (!process.env.JWT_SECRET || Buffer.byteLength(process.env.JWT_SECRET) < 32) {
  throw new Error('JWT_SECRET must be configured with at least 32 characters');
}
if (process.env.NODE_ENV === 'production' && !process.env.CLIENT_URL?.trim()) {
  throw new Error('CLIENT_URL must be configured in production');
}

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
