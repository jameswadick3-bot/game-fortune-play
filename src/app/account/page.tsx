"use client";
import { useState } from "react";

export default function AccountPage() {
  // Dummy user data
  const user = {
    name: "Ama Mensah",
    phone: "+233 24 123 4567",
    balance: 250,
    referralCode: "FORTUNA123",
    tickets: [
      { id: "TICKET-1001", game: "Spin 2 Win", status: "Won ₵50" },
      { id: "TICKET-1002", game: "Football Predictor", status: "Lost" },
      { id: "TICKET-1003", game: "Slot Machine", status: "Pending" },
    ],
    transactions: [
      { id: "TX-001", type: "Deposit", amount: 100, date: "2025-10-30" },
      { id: "TX-002", type: "Win", amount: 50, date: "2025-10-29" },
      { id: "TX-003", type: "Withdrawal", amount: 50, date: "2025-10-28" },
    ],
    referrals: [
      { name: "Kwame Boateng", joined: "2025-10-25", reward: 10 },
      { name: "Esi Owusu", joined: "2025-10-20", reward: 10 },
    ],
  };
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  function handleWithdraw() {
    setWithdrawSuccess(true);
    setTimeout(() => {
      setWithdrawOpen(false);
      setWithdrawSuccess(false);
      setWithdrawAmount(0);
    }, 2000);
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl mb-8">
        <h1 className="text-2xl font-bold text-green-700 mb-2">Account Dashboard</h1>
        <div className="mb-4">
          <div className="font-semibold">Name:</div> {user.name}
          <div className="font-semibold">Phone:</div> {user.phone}
          <div className="font-semibold">Balance:</div> <span className="text-green-600 font-bold">₵{user.balance}</span>
        </div>
        <button className="bg-yellow-400 text-black font-bold px-4 py-2 rounded shadow hover:bg-yellow-500 transition mb-4" onClick={() => setWithdrawOpen(true)}>
          Withdraw Funds
        </button>
        <div className="mb-4">
          <div className="font-semibold">Referral Code:</div> <span className="bg-green-100 px-2 py-1 rounded font-mono">{user.referralCode}</span>
          <div className="text-xs text-gray-500">Share with friends to earn rewards!</div>
        </div>
        <div className="mb-4">
          <div className="font-semibold mb-2">Your Tickets</div>
          <ul className="list-disc pl-6">
            {user.tickets.map((t) => (
              <li key={t.id} className="mb-1">{t.id} - {t.game} <span className="text-xs text-gray-600">({t.status})</span></li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <div className="font-semibold mb-2">Transaction History</div>
          <ul className="list-disc pl-6">
            {user.transactions.map((tx) => (
              <li key={tx.id} className="mb-1">{tx.date}: {tx.type} <span className="font-bold">₵{tx.amount}</span></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Referrals</div>
          <ul className="list-disc pl-6">
            {user.referrals.map((r, idx) => (
              <li key={idx} className="mb-1">{r.name} (Joined: {r.joined}) - Reward: <span className="font-bold">₵{r.reward}</span></li>
            ))}
          </ul>
        </div>
      </div>
      {withdrawOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl" onClick={() => setWithdrawOpen(false)}>&times;</button>
            <h2 className="text-xl font-bold mb-4 text-green-700">Withdraw Funds</h2>
            {!withdrawSuccess ? (
              <>
                <input
                  type="number"
                  min={1}
                  max={user.balance}
                  value={withdrawAmount}
                  onChange={e => setWithdrawAmount(Number(e.target.value))}
                  className="border rounded px-3 py-2 w-full mb-4"
                  placeholder="Amount to withdraw"
                />
                <button
                  className="bg-green-600 text-white font-bold py-2 px-6 rounded hover:bg-green-700 transition w-full"
                  onClick={handleWithdraw}
                  disabled={withdrawAmount < 1 || withdrawAmount > user.balance}
                >
                  Withdraw ₵{withdrawAmount}
                </button>
              </>
            ) : (
              <div className="text-green-600 text-lg font-semibold mt-4">Withdrawal successful!</div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
