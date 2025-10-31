import React, { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}
interface Transaction {
  _id: string;
  user: string;
  type: string;
  amount: number;
  date: string;
  status: string;
}
interface Game {
  _id: string;
  name: string;
  active: boolean;
}

const fetchAdminData = async () => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("fortuna_token") : null;
    const res = await fetch("/api/admin/dashboard", {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch admin data");
    return await res.json();
  } catch {
    return { users: [], transactions: [], games: [] };
  }
};

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetchAdminData().then((data) => {
      setUsers(data.users || []);
      setTransactions(data.transactions || []);
      setGames(data.games || []);
      setLoading(false);
    });
  }, []);

  return (
    <main className="min-h-screen bg-black text-yellow-400 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Admin Dashboard</h1>
      {loading ? (
        <div className="text-green-500">Loading...</div>
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-green-500">Users</h2>
            <table className="w-full text-left rounded-lg overflow-hidden shadow-lg mb-6">
              <thead className="bg-yellow-400 text-black">
                <tr>
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Email</th>
                  <th className="py-2 px-3">Phone</th>
                  <th className="py-2 px-3">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b border-yellow-400">
                    <td className="py-2 px-3">{u.name}</td>
                    <td className="py-2 px-3">{u.email}</td>
                    <td className="py-2 px-3">{u.phone}</td>
                    <td className="py-2 px-3">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-green-500">Transactions</h2>
            <table className="w-full text-left rounded-lg overflow-hidden shadow-lg mb-6">
              <thead className="bg-yellow-400 text-black">
                <tr>
                  <th className="py-2 px-3">User</th>
                  <th className="py-2 px-3">Type</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t._id} className="border-b border-yellow-400">
                    <td className="py-2 px-3">{t.user}</td>
                    <td className="py-2 px-3">{t.type}</td>
                    <td className="py-2 px-3">${t.amount.toFixed(2)}</td>
                    <td className="py-2 px-3">{new Date(t.date).toLocaleString()}</td>
                    <td className={`py-2 px-3 font-bold ${t.status === "success" ? "text-green-500" : "text-red-600"}`}>{t.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-green-500">Games</h2>
            <table className="w-full text-left rounded-lg overflow-hidden shadow-lg mb-6">
              <thead className="bg-yellow-400 text-black">
                <tr>
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Active</th>
                </tr>
              </thead>
              <tbody>
                {games.map((g) => (
                  <tr key={g._id} className="border-b border-yellow-400">
                    <td className="py-2 px-3">{g.name}</td>
                    <td className="py-2 px-3">{g.active ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      )}
    </main>
  );
}
