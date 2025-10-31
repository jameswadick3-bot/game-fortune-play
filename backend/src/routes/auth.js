const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Dummy user store (replace with MongoDB integration)
const users = [];
const JWT_SECRET = process.env.JWT_SECRET || 'fortuna_secret_key';

// Helper to generate referral code
function generateReferralCode(name, id) {
  return (name.slice(0, 3) + id + Math.floor(Math.random() * 1000)).toUpperCase();
}

// Register endpoint with referral
router.post('/register', async (req, res) => {
  const { name, phone, password, referralCode } = req.body;
  if (!name || !phone || !password) {
    return res.status(400).json({ error: 'All fields required' });
  }
  const existing = users.find(u => u.phone === phone);
  if (existing) {
    return res.status(409).json({ error: 'Phone already registered' });
  }
  const hash = await bcrypt.hash(password, 10);
  const id = users.length + 1;
  const userReferralCode = generateReferralCode(name, id);
  const user = { id, name, phone, password: hash, referralCode: userReferralCode, referrals: [], reward: 0 };
  // If referralCode is provided, add referral
  if (referralCode) {
    const referrer = users.find(u => u.referralCode === referralCode);
    if (referrer) {
      referrer.referrals.push({ name, joined: new Date().toISOString(), reward: 5 });
      referrer.reward = (referrer.reward || 0) + 5;
    }
  }
  users.push(user);
  res.json({ success: true, referralCode: userReferralCode });
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { phone, password } = req.body;
  const user = users.find(u => u.phone === phone);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, phone: user.phone }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user.id, name: user.name, phone: user.phone } });
});

// Session check endpoint
router.get('/session', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(auth.replace('Bearer ', ''), JWT_SECRET);
    const user = users.find(u => u.id === decoded.id);
    if (!user) return res.status(401).json({ error: 'User not found' });
    res.json({ user: { id: user.id, name: user.name, phone: user.phone, referralCode: user.referralCode, reward: user.reward } });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Get referrals for a user
router.get('/referrals', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(auth.replace('Bearer ', ''), JWT_SECRET);
    const user = users.find(u => u.id === decoded.id);
    if (!user) return res.status(401).json({ error: 'User not found' });
    res.json({ referrals: user.referrals || [], reward: user.reward || 0 });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
