import React, { useEffect, useState } from "react";

interface ReferralData {
  code: string;
  referredUsers: Array<{ name: string; email: string; joined: string }>;
}

const fetchReferral = async (): Promise<ReferralData | null> => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("fortuna_token") : null;
    const res = await fetch("/api/account/referral", {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch referral data");
    return await res.json();
  } catch {
    return null;
  }
};

export default function ReferralPage() {
  const [referral, setReferral] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchReferral().then((data) => {
      setReferral(data);
      setLoading(false);
    });
  }, []);

  const handleCopy = () => {
    if (referral?.code) {
      navigator.clipboard.writeText(referral.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-black text-yellow-400 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Referral Program</h1>
      {loading ? (
        <div className="text-green-500">Loading...</div>
      ) : !referral ? (
        <div className="text-red-600">Unable to load referral data.</div>
      ) : (
        <div className="w-full max-w-xl flex flex-col items-center gap-6">
          <div className="flex flex-col items-center">
            <div className="text-lg mb-2">Your Referral Code:</div>
            <div className="text-2xl font-bold bg-yellow-400 text-black px-6 py-2 rounded-lg shadow mb-2">{referral.code}</div>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-green-600 text-white rounded-full font-bold shadow hover:bg-green-700 transition"
            >
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>
          <div className="w-full">
            <h2 className="text-xl font-bold mb-2 text-green-500">Referred Users</h2>
            {referral.referredUsers.length === 0 ? (
              <div className="text-red-600">No users referred yet.</div>
            ) : (
              <table className="w-full text-left rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-yellow-400 text-black">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {referral.referredUsers.map((user, idx) => (
                    <tr key={idx} className="border-b border-yellow-400">
                      <td className="py-2 px-4 font-bold text-green-500">{user.name}</td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4">{new Date(user.joined).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
