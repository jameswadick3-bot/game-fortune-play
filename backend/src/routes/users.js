import express from 'express';
const router = express.Router();

// GET all users
router.get('/', (req, res) => {
  // TODO: Fetch users from DB
  res.json([]);
});

// GET user by ID
router.get('/:id', (req, res) => {
  // TODO: Fetch user by ID
  res.json({});
});

// GET user activity
router.get('/:id/activity', (req, res) => {
  // TODO: Fetch user activity
  res.json([]);
});

export default router;
