// server/routes/productRoutes.js
import express from 'express';
import Product from '../models/Product.js'; // Ensure path matches your setup

const router = express.Router();

// 🔍 GET ALL PRODUCTS WITH PAGINATION
router.get('/', async (req, res) => {
  try {
    // 💡 Read page and limit from URL query params (e.g., ?page=1&limit=6)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6; 
    const skip = (page - 1) * limit;

    // Fetch only the specific chunk of data requested for the active view
    const products = await Product.find().skip(skip).limit(limit);
    
    // Get total count to calculate total pages needed on frontend
    const totalProducts = await Product.countDocuments();

    // 🚀 Return pure JSON data back to the client
    return res.json({
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts
    });
  } catch (error) {
    console.error("Backend fetch error:", error);
    return res.status(500).json({ message: "Failed to fetch products" });
  }
});

// Make sure your POST route or other routes stay right below this...
export default router;