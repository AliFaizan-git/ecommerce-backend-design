import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const router = express.Router();

// Simple User Schema declared directly or imported
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

// 📝 SIGNUP ENDPOINT
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, isAdmin: email.includes('admin') });
    await newUser.save();

    res.status(201).json({ success: true, message: "Account created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
});

// 🔑 LOGIN ENDPOINT
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token (Secret can be a string fallback for now)
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 'SUPER_SECRET_KEY', { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      token,
      user: { email: user.email, isAdmin: user.isAdmin }
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;