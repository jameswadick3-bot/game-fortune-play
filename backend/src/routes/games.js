import express from 'express';
const router = express.Router();

// GET all games
// Dummy games data
const games = [
  { name: 'Chess' },
  { name: 'Poker' },
  { name: 'Fortuna Slots' }
];

router.get('/', (req, res) => {
  res.json(games);
});

// POST control game outcome
router.post('/:id/control', (req, res) => {
  // TODO: Set win/lose for a game
  res.json({ success: true });
});

export default router;
