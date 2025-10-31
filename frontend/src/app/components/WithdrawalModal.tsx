import React, { useState } from "react";

interface WithdrawalModalProps {
  open: boolean;
  onClose: () => void;
}

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({ open, onClose }) => {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  if (!open) return null;

  const handleWithdraw = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/account/withdrawal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Withdrawal failed");
      setResult(data);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Withdraw Funds</h2>
        {!success ? (
          <>
            <input
              type="number"
              min={1}
              className="w-full mb-4 p-2 border rounded"
              placeholder="Enter amount to withdraw"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              disabled={loading}
            />
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <button
              className="w-full py-2 bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-600 transition mb-2"
              onClick={handleWithdraw}
              disabled={loading || amount < 1}
            >
              {loading ? "Processing..." : "Withdraw"}
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
            <div className="text-green-600 text-xl font-bold mb-2">Withdrawal Successful!</div>
            {result && (
              <div className="mb-2 text-sm text-gray-700">Reference: <span className="font-mono">{result.id}</span></div>
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

export default WithdrawalModal;
