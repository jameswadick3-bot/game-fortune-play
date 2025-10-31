import React, { useState } from "react";
import TicketModal from "../components/TicketModal";

const outcomes = [
  { name: "Home Win", color: "bg-green-500" },
  { name: "Draw", color: "bg-yellow-400" },
  { name: "Away Win", color: "bg-red-500" },
];

export default function FootballPredictor() {
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const predict = () => {
    if (!selected) return;
    const random = Math.floor(Math.random() * 3);
    setResult(outcomes[random].name);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-green-500 drop-shadow-lg">Football Predictor</h1>
      <div className="flex flex-col items-center mb-8">
        <div className="mb-4 text-lg">Predict the outcome of the match:</div>
        <div className="flex gap-4 mb-4">
          {outcomes.map((o) => (
            <button
              key={o.name}
              className={`px-4 py-2 rounded-full font-bold shadow-lg transition ${o.color} ${selected === o.name ? "ring-4 ring-yellow-400" : ""}`}
              onClick={() => setSelected(o.name)}
            >
              {o.name}
            </button>
          ))}
        </div>
        <button
          className="px-6 py-2 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transition mb-2"
          onClick={predict}
          disabled={!selected}
        >
          Predict
        </button>
        <button
          className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-full shadow-lg hover:bg-yellow-500 transition"
          onClick={() => setShowModal(true)}
        >
          Buy Ticket
        </button>
      </div>
      {result && (
        <div className="text-2xl font-bold mt-4">
          Result: <span className="text-green-500">{result}</span>
        </div>
      )}
      <TicketModal open={showModal} onClose={() => setShowModal(false)} gameName="Football Predictor" />
    </div>
  );
}
