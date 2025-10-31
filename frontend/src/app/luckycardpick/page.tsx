import React, { useState } from "react";
import TicketModal from "../components/TicketModal";

const cards = [
  { name: "Ace of Spades", emoji: "🂡", color: "bg-yellow-400" },
  { name: "King of Hearts", emoji: "🂾", color: "bg-red-500" },
  { name: "Queen of Clubs", emoji: "🃑", color: "bg-green-500" },
  { name: "Joker", emoji: "🃏", color: "bg-gray-700" },
  { name: "Lose", emoji: "❌", color: "bg-gray-900" },
];

export default function LuckyCardPick() {
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [picked, setPicked] = useState<number | null>(null);

  const pickCard = () => {
    const random = Math.floor(Math.random() * cards.length);
    setPicked(random);
    setResult(cards[random].name);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-yellow-400 drop-shadow-lg">Lucky Card Pick</h1>
      <div className="flex flex-col items-center mb-8">
        <div className="mb-4 text-lg">Pick a card and test your luck!</div>
        <button
          className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-full shadow-lg hover:bg-yellow-500 transition mb-2"
          onClick={pickCard}
        >
          Pick Card
        </button>
        <button
          className="px-6 py-2 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transition"
          onClick={() => setShowModal(true)}
        >
          Buy Ticket
        </button>
      </div>
      {picked !== null && (
        <div className={`text-2xl font-bold mt-4 ${cards[picked].color} px-4 py-2 rounded-full flex items-center gap-2`}>
          <span>{cards[picked].emoji}</span> {result}
        </div>
      )}
      <TicketModal open={showModal} onClose={() => setShowModal(false)} gameName="Lucky Card Pick" />
    </div>
  );
}
