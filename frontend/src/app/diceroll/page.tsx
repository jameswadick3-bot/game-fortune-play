import React, { useState } from "react";
import TicketModal from "../components/TicketModal";

const prizes = [
  { name: "Double your ticket!", color: "bg-yellow-400" },
  { name: "Win 5x!", color: "bg-green-500" },
  { name: "Lose", color: "bg-red-500" },
  { name: "Win 10x!", color: "bg-yellow-400" },
  { name: "Lose", color: "bg-red-500" },
  { name: "Win 2x!", color: "bg-green-500" },
];

export default function DiceRoll() {
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6);
    setResult(prizes[roll].name);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-yellow-400 drop-shadow-lg">Dice Roll</h1>
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 flex items-center justify-center text-5xl font-bold border-4 border-yellow-400 rounded-full mb-4 bg-gray-900">
          🎲
        </div>
        <button
          className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-full shadow-lg hover:bg-yellow-500 transition mb-2"
          onClick={rollDice}
        >
          Roll Dice
        </button>
        <button
          className="px-6 py-2 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transition"
          onClick={() => setShowModal(true)}
        >
          Buy Ticket
        </button>
      </div>
      {result && (
        <div className="text-2xl font-bold mt-4">
          Result: <span className="text-yellow-400">{result}</span>
        </div>
      )}
      <TicketModal open={showModal} onClose={() => setShowModal(false)} gameName="Dice Roll" />
    </div>
  );
}
