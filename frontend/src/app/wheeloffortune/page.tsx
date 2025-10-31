import React, { useState } from "react";
import TicketModal from "../components/TicketModal";

const segments = [
  { name: "Win 2x!", color: "bg-green-500" },
  { name: "Win 5x!", color: "bg-yellow-400" },
  { name: "Lose", color: "bg-red-500" },
  { name: "Win 10x!", color: "bg-yellow-400" },
  { name: "Lose", color: "bg-red-500" },
  { name: "Win 3x!", color: "bg-green-500" },
];

export default function WheelOfFortune() {
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);

  const spinWheel = () => {
    setSpinning(true);
    setTimeout(() => {
      const random = Math.floor(Math.random() * segments.length);
      setResult(segments[random].name);
      setSpinning(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-yellow-400 drop-shadow-lg">Wheel of Fortune</h1>
      <div className="flex flex-col items-center mb-8">
        <div className="mb-4 text-lg">Spin the wheel and test your luck!</div>
        <button
          className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-full shadow-lg hover:bg-yellow-500 transition mb-2"
          onClick={spinWheel}
          disabled={spinning}
        >
          {spinning ? "Spinning..." : "Spin Wheel"}
        </button>
        <button
          className="px-6 py-2 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transition"
          onClick={() => setShowModal(true)}
        >
          Buy Ticket
        </button>
      </div>
      {result && (
        <div className="text-2xl font-bold mt-4 text-yellow-400">
          Result: {result}
        </div>
      )}
      <TicketModal open={showModal} onClose={() => setShowModal(false)} gameName="Wheel of Fortune" />
    </div>
  );
}
