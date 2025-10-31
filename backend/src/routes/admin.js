import express from 'express';
const router = express.Router();

// GET revenue dashboard
router.get('/revenue', (req, res) => {
  // TODO: Calculate and return revenue, payouts, tickets sold
  res.json({ revenue: 0, payouts: 0, ticketsSold: 0 });
});

// GET all user data
router.get('/users', (req, res) => {
  // TODO: Return all user data
  res.json([]);
});

// GET all activities
router.get('/activities', (req, res) => {
  // TODO: Return all user activities
  res.json([]);
});

export default router;
