'use client';

import Link from 'next/link';
const games = [
  { name: 'Spin 2 Win', color: 'bg-yellow-400', entry: '₵5', prize: 'Win cash, gadgets, pizza, airtime', link: '/spin2win' },
  { name: 'Dice Roll', color: 'bg-green-600', entry: '₵5', prize: 'Correct dice pick wins ₵20!', link: '/diceroll' },
  { name: 'Football Predictor', color: 'bg-red-600', entry: '₵5', prize: 'Win ₵50 per match', link: '/footballpredictor' },
  { name: 'Lucky Card Pick', color: 'bg-yellow-500', entry: '₵5', prize: 'Pick a card, win big!', link: '/luckycardpick' },
  { name: 'Slot Machine', color: 'bg-purple-500', entry: '₵5', prize: 'Spin and win cash or prizes!', link: '/slotmachine' },
  { name: 'Wheel of Fortune', color: 'bg-green-700', entry: '₵5', prize: 'Spin the wheel for rewards!', link: '/wheeloffortune' },
];

export default function GamesList() {
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
}
