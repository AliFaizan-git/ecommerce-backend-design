import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js'; 
import authRouter from './routes/authRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// API Routes
app.use('/api/products', productRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/auth', authRouter);
app.get('/', (req, res) => {
  res.send('B2B Marketplace API is running...');
});

const PORT = process.env.PORT || 5000;

// 🚀 Start listening immediately so the server boots up first
app.listen(PORT, async () => {
  console.log(`🚀 Backend Server running on Port${PORT}`);
  console.log('🔄 Attempting to connect to MongoDB Atlas...');
  
  await connectDB();
});