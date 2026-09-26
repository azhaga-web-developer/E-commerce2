import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const createToken = (userId) =>
  jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
  const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  isAdmin: user.isAdmin === true || user.role === 'admin'
});

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    if (password.length < 8) return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    const normalizedEmail = email.toLowerCase().trim();
    if (await User.exists({ email: normalizedEmail })) return res.status(409).json({ success: false, message: 'An account with this email already exists' });
    const user = await User.create({ name, email: normalizedEmail, password: await bcrypt.hash(password, 12) });
    return res.status(201).json({ success: true, user: publicUser(user), token: createToken(user._id.toString()) });
  } catch (error) { return next(error); }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required' });
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ success: false, message: 'Invalid email or password' });
    return res.json({ success: true, user: publicUser(user), token: createToken(user._id.toString()) });
  } catch (error) { return next(error); }
};

export const getCurrentUser = (req, res) => res.json({ success: true, user: publicUser(req.user) });
