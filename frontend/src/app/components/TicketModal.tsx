import React, { useState } from "react";
// Trigger rebuild: dummy comment for Vercel cache

interface TicketModalProps {
  open: boolean;
  onClose: () => void;
  gameName: string;
}

const TicketModal: React.FC<TicketModalProps> = ({ open, onClose, gameName }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  const [error, setError] = useState<string | null>(null);
  const [ticket, setTicket] = useState<any>(null);

  const handleBuy = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/account/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ game: gameName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to buy ticket");
      setTicket(data);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl text-black">
        <h2 className="text-2xl font-bold mb-4 text-yellow-500">Buy Ticket for {gameName}</h2>
        {!success ? (
          <>
            <p className="mb-4">Each ticket costs <span className="font-bold text-green-600">₵5</span>. Proceed to payment?</p>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <button
              className="w-full py-2 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transition mb-2"
              onClick={handleBuy}
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay ₵5"}
            </button>
            <button
              className="w-full py-2 bg-gray-300 text-black font-bold rounded-full shadow hover:bg-gray-400 transition"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <div className="text-green-600 text-xl font-bold mb-2">Payment Successful!</div>
            {ticket && (
              <div className="mb-2 text-sm text-gray-700">Your ticket: <span className="font-mono">{ticket.id}</span> ({ticket.game})</div>
            )}
            <button
              className="w-full py-2 bg-yellow-400 text-black font-bold rounded-full shadow-lg hover:bg-yellow-500 transition"
              onClick={onClose}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TicketModal;
