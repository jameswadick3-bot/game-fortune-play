import React, { useState } from "react";
import TicketModal from "../components/TicketModal";

const slots = [
  { emoji: "🍒", name: "Cherry", color: "bg-red-500" },
  { emoji: "🍋", name: "Lemon", color: "bg-yellow-400" },
  { emoji: "🍀", name: "Clover", color: "bg-green-500" },
  { emoji: "💎", name: "Diamond", color: "bg-blue-400" },
  { emoji: "7️⃣", name: "Lucky Seven", color: "bg-purple-500" },
  { emoji: "❌", name: "Lose", color: "bg-gray-900" },
];

export default function SlotMachine() {
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    setSpinning(true);
    setTimeout(() => {
      const random = Math.floor(Math.random() * slots.length);
      setResult(random);
      setSpinning(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-purple-500 drop-shadow-lg">Slot Machine</h1>
      <div className="flex flex-col items-center mb-8">
        <div className="mb-4 text-lg">Spin the slot and win big!</div>
        <button
          className="px-6 py-2 bg-purple-500 text-white font-bold rounded-full shadow-lg hover:bg-purple-600 transition mb-2"
          onClick={spin}
          disabled={spinning}
        >
          {spinning ? "Spinning..." : "Spin"}
        </button>
        <button
          className="px-6 py-2 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transition"
          onClick={() => setShowModal(true)}
        >
          Buy Ticket
        </button>
      </div>
      {result !== null && (
        <div className={`text-2xl font-bold mt-4 ${slots[result].color} px-4 py-2 rounded-full flex items-center gap-2`}>
          <span>{slots[result].emoji}</span> {slots[result].name}
        </div>
      )}
      <TicketModal open={showModal} onClose={() => setShowModal(false)} gameName="Slot Machine" />
    </div>
  );
}
