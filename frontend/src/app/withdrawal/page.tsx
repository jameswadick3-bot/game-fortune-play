import React, { useEffect, useState } from "react";

interface AccountData {
  phone: string;
}

const fetchAccount = async (): Promise<AccountData | null> => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("fortuna_token") : null;
    const res = await fetch("/api/account", {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch account data");
    return await res.json();
  } catch {
    return null;
  }
};

const requestWithdrawal = async (amount: number): Promise<{ success: boolean; message: string }> => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("fortuna_token") : null;
    const res = await fetch("/api/account/withdrawal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();
    return { success: res.ok, message: data.message || (res.ok ? "Withdrawal successful" : "Withdrawal failed") };
  } catch {
    return { success: false, message: "Withdrawal failed" };
  }
};

export default function WithdrawalPage() {
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<AccountData | null>(null);
  const [accountLoading, setAccountLoading] = useState(true);

  useEffect(() => {
    fetchAccount().then((data) => {
      setAccount(data);
      setAccountLoading(false);
    });
  }, []);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    const result = await requestWithdrawal(amount);
    setStatus(result.message);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-yellow-400 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Withdraw Funds</h1>
      {accountLoading ? (
        <div className="text-green-500">Loading account info...</div>
      ) : !account ? (
        <div className="text-red-600">Unable to load account info.</div>
      ) : (
        <>
          <div className="mb-6 text-lg text-green-500 font-bold">Withdrawal will be sent to your registered phone number:</div>
          <div className="mb-8 text-2xl font-bold bg-yellow-400 text-black px-6 py-2 rounded-lg shadow">{account.phone}</div>
          <form onSubmit={handleWithdraw} className="w-full max-w-md flex flex-col items-center gap-6">
            <label className="text-lg font-bold text-green-500">Amount to Withdraw:</label>
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
              className="px-6 py-2 bg-red-600 text-white rounded-full font-bold shadow hover:bg-red-700 transition"
              disabled={loading}
            >
              {loading ? "Processing..." : "Withdraw"}
            </button>
          </form>
          {status && (
            <div className={`mt-4 font-bold ${status.includes("successful") ? "text-green-500" : "text-red-600"}`}>{status}</div>
          )}
        </>
      )}
    </main>
  );
}
