import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import paymentsRouter from './routes/payments.js';
import gamesRouter from './routes/games.js';
import adminRouter from './routes/admin.js';
import analyticsRouter from './routes/analytics.js';
import otpRouter from './routes/otp.js';
import accountRouter from './routes/account.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fortuna';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/users', usersRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/games', gamesRouter);
app.use('/api/admin', adminRouter);
app.use('/api/analytics', analyticsRouter);

app.use('/api/account', accountRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Fortuna backend API running');
});

app.use('/api/users', usersRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/games', gamesRouter);
app.use('/api/admin', adminRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/otp', otpRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
