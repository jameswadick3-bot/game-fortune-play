import React, { useEffect, useState } from "react";

interface Transaction {
  _id: string;
  type: string;
  amount: number;
  date: string;
  status: string;
}

const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("fortuna_token") : null;
    const res = await fetch("/api/account/transactions", {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch transactions");
    return await res.json();
  } catch {
    return [];
  }
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions().then((data) => {
      setTransactions(data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="min-h-screen bg-black text-yellow-400 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Transaction History</h1>
      {loading ? (
        <div className="text-green-500">Loading...</div>
      ) : transactions.length === 0 ? (
        <div className="text-red-600">No transactions found.</div>
      ) : (
        <div className="w-full max-w-2xl">
          <table className="w-full text-left rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-yellow-400 text-black">
              <tr>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id} className="border-b border-yellow-400">
                  <td className="py-2 px-4 font-bold text-green-500">{tx.type}</td>
                  <td className="py-2 px-4">${tx.amount.toFixed(2)}</td>
                  <td className="py-2 px-4">{new Date(tx.date).toLocaleString()}</td>
                  <td className={`py-2 px-4 font-bold ${tx.status === "success" ? "text-green-500" : "text-red-600"}`}>{tx.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
