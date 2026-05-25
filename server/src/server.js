import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Universal Server Middleware
app.use(cors());
app.use(express.json());

// API Base Verification Checking Point
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the eCommerce API Gateway" });
});

// Mount Week 1 Product Layout Routes
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server operating cleanly on port ${PORT}`);
});