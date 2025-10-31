import express from 'express';
import { generateOTP } from '../utils/otp.js';
import { sendOtpEmail } from '../utils/mailer.js';
import Otp from '../models/Otp.js';
const router = express.Router();

// POST: Request OTP for user authentication
router.post('/auth', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email address required' });
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry
  try {
    await sendOtpEmail(email, otp);
    await Otp.create({ email, code: otp, expiresAt });
    res.json({ success: true, message: 'OTP sent to your email address' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send OTP', details: err.message });
  }
});

// POST: Request OTP for payment approval
router.post('/payment', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email address required' });
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry
  try {
    await sendOtpEmail(email, otp);
    await Otp.create({ email, code: otp, expiresAt });
    res.json({ success: true, message: 'OTP sent to your email address' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send OTP', details: err.message });
  }
});

// POST: Verify OTP
router.post('/verify', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: 'Email and OTP required' });
  const record = await Otp.findOne({ email, code: otp, used: false });
  if (!record) return res.status(400).json({ error: 'Invalid OTP' });
  if (record.expiresAt < new Date()) return res.status(400).json({ error: 'OTP expired' });
  record.used = true;
  await record.save();
  res.json({ success: true, message: 'OTP verified.' });
});

export default router;
