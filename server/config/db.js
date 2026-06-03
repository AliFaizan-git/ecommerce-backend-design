import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // 🚀 This line right here is what pings your database!
    // It reads the hidden MONGO_URI from your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); 
  }
};

export default connectDB;