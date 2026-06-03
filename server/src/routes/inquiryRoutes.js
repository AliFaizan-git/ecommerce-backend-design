import express from 'express';
import Inquiry from '../../models/Inquiry.js';

const router = express.Router();

// POST /api/inquiries - Save a customer quote request
router.post('/', async (req, res) => {
  try {
    const { itemQuery, details, quantity, unit } = req.body;

    const newInquiry = new Inquiry({
      itemQuery,
      details,
      quantity,
      unit,
    });

    const savedInquiry = await newInquiry.save();
    res.status(201).json({ success: true, data: savedInquiry });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: 'Failed to process inquiry context' });
  }
});

export default router;
