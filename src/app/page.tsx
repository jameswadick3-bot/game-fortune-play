"use client";
import Header from './components/Header';
import RecentWinners from './components/RecentWinners';
import GamesList from './components/GamesList';
import AuthModal from './components/AuthModal';
import { useState } from 'react';

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);

  // Custom Header with button click handler
  const CustomHeader = () => (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow">
      <div>
        <h1 className="text-2xl font-bold text-green-700">Welcome to Fortuna Play</h1>
        <p className="text-sm text-gray-600 mt-1">
          Ghana&apos;s most exciting game of chance platform!
        </p>
      </div>
      <div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
          onClick={() => setAuthOpen(true)}
        >
          Login / Sign Up
        </button>
      </div>
    </header>
  );

  // GamesList with Play Now button click handler
  const games = [
    { name: 'Spin 2 Win', color: 'bg-yellow-400', entry: '₵5', prize: 'Win cash, gadgets, pizza, airtime', link: '/spin2win' },
    { name: 'Dice Roll', color: 'bg-green-600', entry: '₵5', prize: 'Correct dice pick wins ₵20!', link: '/diceroll' },
    { name: 'Football Predictor', color: 'bg-red-600', entry: '₵5', prize: 'Win ₵50 per match', link: '/footballpredictor' },
    { name: 'Mystery Box', color: 'bg-black', entry: '₵50', prize: 'Win ₵1,000, iPhone, wigs, etc.', link: '/mysterybox' },
    { name: 'Fortuna Lucky 2', color: 'bg-pink-500', entry: '₵5', prize: 'Pick 2 numbers, win ₵50', link: '/fortunucky2' },
    { name: 'Fortuna Daily & Weekly Jackpot Draw', color: 'bg-yellow-500', entry: '₵5+', prize: 'Win ₵250, ₵500, pizza, airtime', link: '/jackpotdraw' },
    { name: 'Scratch & Win', color: 'bg-green-700', entry: '₵5', prize: 'Scratch to win ₵500, ₵200, ₵100, etc.', link: '/scratchwin' },
  ];
  const CustomGamesList = () => {
    const Link = require('next/link').default;
    return (
      <div className="overflow-x-auto py-4 px-2 flex space-x-6 bg-gradient-to-r from-yellow-400 via-black via-green-600 to-red-600 rounded-lg shadow-lg">
        {games.map((game, idx) => (
          <div
            key={idx}
            className={`min-w-[220px] p-4 rounded-xl shadow-lg text-white flex flex-col items-center justify-between ${game.color}`}
          >
            <h3 className="text-xl font-bold mb-2">{game.name}</h3>
            <p className="text-sm mb-2">Entry: <span className="font-semibold">{game.entry}</span></p>
            <p className="text-xs mb-4">{game.prize}</p>
            <Link href={game.link}>
              <button className="bg-white text-black font-bold px-4 py-2 rounded hover:bg-yellow-300 transition">Play Now</button>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-400 via-black via-green-600 to-red-600">
      <CustomHeader />
      <section className="px-8 py-6">
        <h2 className="text-lg font-semibold text-white mb-2">
          Buy a ticket, play fun games, and win real rewards — from instant cash prizes to amazing gadgets and experiences.
        </h2>
        <RecentWinners />
        <div className="mt-8">
          <CustomGamesList />
        </div>
      </section>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </main>
  );
}

