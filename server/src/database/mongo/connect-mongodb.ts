import { Env } from '@config/env.config';
import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(Env.MONGO_DATABASE_URL, {
      family: 4, // IP v4
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Failed to connect mongodb', error);
    process.exit(1);
  }
};
