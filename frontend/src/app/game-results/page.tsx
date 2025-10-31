import React, { useEffect, useState } from "react";

interface GameResult {
  _id: string;
  game: string;
  result: string;
  amount: number;
  date: string;
}

const fetchGameResults = async (): Promise<GameResult[]> => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("fortuna_token") : null;
    const res = await fetch("/api/account/game-results", {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch game results");
    return await res.json();
  } catch {
    return [];
  }
};

export default function GameResultsPage() {
  const [results, setResults] = useState<GameResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGameResults().then((data) => {
      setResults(data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="min-h-screen bg-black text-yellow-400 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Game Result History</h1>
      {loading ? (
        <div className="text-green-500">Loading...</div>
      ) : results.length === 0 ? (
        <div className="text-red-600">No game results found.</div>
      ) : (
        <div className="w-full max-w-2xl">
          <table className="w-full text-left rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-yellow-400 text-black">
              <tr>
                <th className="py-3 px-4">Game</th>
                <th className="py-3 px-4">Result</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r._id} className="border-b border-yellow-400">
                  <td className="py-2 px-4 font-bold text-green-500">{r.game}</td>
                  <td className={`py-2 px-4 font-bold ${r.result === "win" ? "text-green-500" : "text-red-600"}`}>{r.result}</td>
                  <td className="py-2 px-4">${r.amount.toFixed(2)}</td>
                  <td className="py-2 px-4">{new Date(r.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
