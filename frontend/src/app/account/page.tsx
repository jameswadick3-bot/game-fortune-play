"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import WithdrawalModal from "../components/WithdrawalModal";

type Profile = {
  name: string;
  phone: string;
  balance: number;
  referralCode: string;
  reward?: number;
};
type Ticket = {
  id: string;
  game: string;
  status: string;
};
type Transaction = {
  id: string;
  type: string;
  amount: number;
  date: string;
};
type Referral = {
  name: string;
  joined: string;
  reward: number;
};

export default function AccountPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [reward, setReward] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  // Remove old withdrawal state, now handled in WithdrawalModal

  useEffect(() => {
    const token = localStorage.getItem('fortuna_token');
    if (!token) {
      router.replace("/");
      return;
    }
    async function fetchData() {
      setLoading(true);
      const [profileRes, ticketsRes, transactionsRes, referralsRes, authReferralsRes] = await Promise.all([
        fetch("http://localhost:5000/api/account/profile", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
        fetch("http://localhost:5000/api/account/tickets", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
        fetch("http://localhost:5000/api/account/transactions", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
        fetch("http://localhost:5000/api/account/referrals", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
        fetch("http://localhost:5000/api/auth/referrals", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      ]);
      setProfile(profileRes);
      setTickets(ticketsRes);
      setTransactions(transactionsRes);
      setReferrals(referralsRes);
      setReward(authReferralsRes.reward || 0);
      setLoading(false);
    }
    fetchData();
  }, [router]);

  // Remove old handleWithdraw function

  if (loading || !profile) {
    return <main className="min-h-screen flex items-center justify-center"><div>Loading account...</div></main>;
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl mb-8">
        <h1 className="text-2xl font-bold text-green-700 mb-2">Account Dashboard</h1>
        <div className="mb-4">
          <div className="font-semibold">Name:</div> {profile.name}
          <div className="font-semibold">Phone:</div> {profile.phone}
          <div className="font-semibold">Balance:</div> <span className="text-green-600 font-bold">₵{profile.balance}</span>
        </div>
        <button className="bg-yellow-400 text-black font-bold px-4 py-2 rounded shadow hover:bg-yellow-500 transition mb-4" onClick={() => setWithdrawOpen(true)}>
          Withdraw Funds
        </button>
        <div className="mb-4">
          <div className="font-semibold">Referral Code:</div>
          <span className="bg-green-100 px-2 py-1 rounded font-mono">{profile.referralCode}</span>
          <button
            className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold"
            onClick={() => {
              navigator.clipboard.writeText(profile.referralCode);
              alert("Referral code copied!");
            }}
          >Copy</button>
          <div className="text-xs text-gray-500">Share with friends to earn rewards!</div>
          <div className="mt-2 text-sm text-green-700">Referral Reward: ₵{reward}</div>
        </div>
        <div className="mb-4">
          <div className="font-semibold mb-2">Your Tickets</div>
          <ul className="list-disc pl-6">
            {tickets.map((t) => (
              <li key={t.id} className="mb-1">{t.id} - {t.game} <span className="text-xs text-gray-600">({t.status})</span></li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <div className="font-semibold mb-2">Transaction History</div>
          <ul className="list-disc pl-6">
            {transactions.map((tx) => (
              <li key={tx.id} className="mb-1">{tx.date}: {tx.type} <span className="font-bold">₵{tx.amount}</span></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Referrals</div>
          <ul className="list-disc pl-6">
            {referrals.map((r, idx) => (
              <li key={idx} className="mb-1">{r.name} (Joined: {r.joined}) - Reward: <span className="font-bold">₵{r.reward}</span></li>
            ))}
          </ul>
        </div>
      </div>
      <WithdrawalModal open={withdrawOpen} onClose={() => setWithdrawOpen(false)} />
    </main>
  );
}
