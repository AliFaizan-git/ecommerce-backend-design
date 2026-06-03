import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    itemQuery: {
      type: String,
      required: [true, 'What item do you need?'],
      trim: true,
    },
    details: {
      type: String,
      required: [true, 'Please provide specifications'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    unit: {
      type: String,
      default: 'pcs', // pcs, tons, liters, etc.
    }
  },
  { timestamps: true }
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;