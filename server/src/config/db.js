import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined');
  }

  try {
    await mongoose.connect(mongoUri);

    await mongoose.connection.collection('users').updateMany(
      { isAdmin: { $exists: false } },
      [{ $set: { isAdmin: { $eq: ['$role', 'admin'] } } }]
    );

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
};
