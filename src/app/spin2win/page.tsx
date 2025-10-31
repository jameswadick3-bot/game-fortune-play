
'use client';
import { useState } from 'react';
import AuthModal from '../components/AuthModal';
import TicketModal from '../components/TicketModal';

const prizes = [
  '₵5', '₵50', '₵100', 'Pizza', '₵2 Airtime', 'Free Spin', 'Better Luck Next Time'
];

export default function Spin2WinPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState('');
  const [canSpin, setCanSpin] = useState(false);

  function handleSpin() {
    setSpinning(true);
    setTimeout(() => {
      const prize = prizes[Math.floor(Math.random() * prizes.length)];
      setResult(prize);
      setSpinning(false);
      setCanSpin(false);
    }, 3000); // 3 seconds spin
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-red-600 via-green-600 to-yellow-400">
      <h1 className="text-3xl font-bold text-white mb-2">Spin 2 Win</h1>
      <p className="text-lg text-yellow-300 mb-4">Spin the wheel for amazing prizes. Entry fee: ₵5</p>
      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        {prizes.map((prize, idx) => (
          <span key={idx} className="px-3 py-1 rounded-full bg-white text-black font-semibold shadow">{prize}</span>
        ))}
      </div>
      <div className="w-64 h-64 flex items-center justify-center mb-6">
        <div className="w-56 h-56 rounded-full border-8 border-black flex items-center justify-center"
          style={{ background: 'conic-gradient(black 0% 20%, red 20% 50%, green 50% 80%, yellow 80% 100%)' }}>
          <span className="text-2xl font-bold text-white">🎯</span>
        </div>
      </div>
      {!canSpin ? (
        <button
          className="bg-yellow-400 text-black font-bold px-6 py-3 rounded shadow hover:bg-yellow-500 transition"
          onClick={() => setAuthOpen(true)}
        >
          Play Spin Now
        </button>
      ) : (
        <button
          className="bg-green-600 text-white font-bold px-6 py-3 rounded shadow hover:bg-green-700 transition"
          onClick={handleSpin}
        >
          Spin Now
        </button>
      )}
      {spinning && <div className="mt-4 text-white text-xl animate-pulse">Spinning...</div>}
      {result && !spinning && (
        <div className="mt-4 text-green-300 text-2xl font-bold">Result: {result}</div>
      )}
      <AuthModal open={authOpen} onClose={() => { setAuthOpen(false); setTicketOpen(true); }} />
      <TicketModal open={ticketOpen} onClose={() => setTicketOpen(false)} onSuccess={() => { setTicketOpen(false); setCanSpin(true); }} />
    </main>
  );
}
