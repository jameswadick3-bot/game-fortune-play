import express from 'express';
const router = express.Router();

// GET all payments
router.get('/', (req, res) => {
  // TODO: Fetch payments from DB
  res.json([]);
});

// POST approve payment
router.post('/:id/approve', (req, res) => {
  // TODO: Approve payment by ID
  res.json({ success: true });
});

export default router;
