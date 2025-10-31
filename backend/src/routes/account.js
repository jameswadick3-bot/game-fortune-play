import express from 'express';

const router = express.Router();

// Dummy user data for demonstration
const user = {
  name: "Ama Mensah",
  phone: "+233 24 123 4567",
  balance: 250,
  referralCode: "FORTUNA123",
  tickets: [
    { id: "TICKET-1001", game: "Spin 2 Win", status: "Won ₵50" },
    { id: "TICKET-1002", game: "Football Predictor", status: "Lost" },
    { id: "TICKET-1003", game: "Slot Machine", status: "Pending" },
  ],
  transactions: [
    { id: "TX-001", type: "Deposit", amount: 100, date: "2025-10-30" },
    { id: "TX-002", type: "Win", amount: 50, date: "2025-10-29" },
    { id: "TX-003", type: "Withdrawal", amount: 50, date: "2025-10-28" },
  ],
  referrals: [
    { name: "Kwame Boateng", joined: "2025-10-25", reward: 10 },
    { name: "Esi Owusu", joined: "2025-10-20", reward: 10 },
  ],
};

// GET /api/account/profile
router.get('/profile', (req, res) => {
  res.json({
    name: user.name,
    phone: user.phone,
    balance: user.balance,
    referralCode: user.referralCode,
  });
});

// GET /api/account/tickets
router.get('/tickets', (req, res) => {
  res.json(user.tickets);
});

// GET /api/account/transactions
router.get('/transactions', (req, res) => {
  res.json(user.transactions);
});


// GET /api/account/referrals
router.get('/referrals', (req, res) => {
  res.json(user.referrals);
});

// POST /api/account/tickets - Buy a ticket
router.post('/tickets', (req, res) => {
  const { game } = req.body;
  if (!game) return res.status(400).json({ error: 'Game is required' });
  if (user.balance < 5) return res.status(400).json({ error: 'Insufficient balance' });
  const newTicket = {
    id: 'TICKET-' + Math.floor(Math.random() * 1000000),
    game,
    status: 'Pending',
  };
  user.tickets.push(newTicket);
  user.balance -= 5;
  user.transactions.push({
    id: 'TX-' + Math.floor(Math.random() * 1000000),
    type: 'Ticket Purchase',
    amount: 5,
    date: new Date().toISOString().slice(0, 10),
  });
  res.json(newTicket);
});

// POST /api/account/withdraw - Withdraw funds
router.post('/withdraw', (req, res) => {
  const { amount } = req.body;
  if (!amount || amount < 1) return res.status(400).json({ error: 'Invalid amount' });
  if (user.balance < amount) return res.status(400).json({ error: 'Insufficient balance' });
  user.balance -= amount;
  user.transactions.push({
    id: 'TX-' + Math.floor(Math.random() * 1000000),
    type: 'Withdrawal',
    amount,
    date: new Date().toISOString().slice(0, 10),
  });
  res.json({ success: true, balance: user.balance });
});

export default router;
