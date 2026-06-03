import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';

// Load environment variables
dotenv.config();

// Connect to the database
await connectDB();

const seedProducts = [
  { name: 'Canon camera 20x zoom, silver color', price: 9.99, category: 'Electronics', icon: '📷', discount: '-25%' },
  { name: 'Headset for gaming with mic', price: 8.99, category: 'Electronics', icon: '🎧', discount: '-15%' },
  { name: 'Smart watch silver color', price: 10.30, category: 'Electronics', icon: '⌚', discount: '-25%' },
  { name: 'Blue wallet for men', price: 10.30, category: 'Apparel', icon: '💼', discount: '0%' },
  { name: 'Leather bag for travel', price: 80.00, category: 'Outdoors', icon: '🧳', discount: '-10%' },
];

const importData = async () => {
  try {
    // 1. Wipe existing products to prevent duplicates
    await Product.deleteMany();
    console.log('Previous data wiped clean.');

    // 2. Insert the fresh data array
    await Product.insertMany(seedProducts);
    console.log('Database successfully seeded with new products!');

    process.exit();
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

// Execute the function
importData();