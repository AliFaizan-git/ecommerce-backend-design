import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: ['Electronics', 'Home', 'Apparel', 'Automobile', 'Outdoors'], 
    },
    icon: {
      type: String,
      required: true,
      default: '📦', // Fallback emoji/icon based on your frontend design
    },
    description: {
      type: String,
      required: false,
    },
    discount: {
      type: String,
      default: '0%',
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;