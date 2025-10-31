import React, { useEffect, useState } from "react";

interface TicketData {
  balance: number;
}

const fetchTickets = async (): Promise<TicketData | null> => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("fortuna_token") : null;
    const res = await fetch("/api/account/tickets", {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch ticket data");
    return await res.json();
  } catch {
    return null;
  }
};

const purchaseTickets = async (amount: number): Promise<{ success: boolean; message: string }> => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("fortuna_token") : null;
    const res = await fetch("/api/account/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();
    return { success: res.ok, message: data.message || (res.ok ? "Purchase successful" : "Purchase failed") };
  } catch {
    return { success: false, message: "Purchase failed" };
  }
};

export default function TicketsPage() {
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(1);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchTickets().then((data) => {
      setTicketData(data);
      setLoading(false);
    });
  }, []);

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const result = await purchaseTickets(amount);
    setStatus(result.message);
    if (result.success) {
      // Refresh ticket balance
      setLoading(true);
      fetchTickets().then((data) => {
        setTicketData(data);
        setLoading(false);
      });
    }
  };

  return (
    <main className="min-h-screen bg-black text-yellow-400 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Buy Tickets</h1>
      {loading ? (
        <div className="text-green-500">Loading...</div>
      ) : !ticketData ? (
        <div className="text-red-600">Unable to load ticket data.</div>
      ) : (
        <div className="w-full max-w-md flex flex-col items-center gap-6">
          <div className="text-lg mb-2">Your Ticket Balance:</div>
          <div className="text-2xl font-bold bg-yellow-400 text-black px-6 py-2 rounded-lg shadow mb-2">{ticketData.balance}</div>
          <form onSubmit={handlePurchase} className="w-full flex flex-col gap-4 items-center">
            <label className="text-lg font-bold text-green-500">Amount to Buy:</label>
            <input
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-32 px-4 py-2 rounded bg-black text-yellow-400 border border-yellow-400 text-center font-bold"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-full font-bold shadow hover:bg-green-700 transition"
            >
              Buy Tickets
            </button>
          </form>
          {status && (
            <div className={`mt-4 font-bold ${status.includes("success") ? "text-green-500" : "text-red-600"}`}>{status}</div>
          )}
        </div>
      )}
    </main>
  );
}
