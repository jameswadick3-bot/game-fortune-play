import React, { useState } from "react";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'signup') {
        const res = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, password, referralCode: referralCode || undefined }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Sign up failed");
        setSuccess(true);
      } else {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Login failed");
        // Save token to localStorage for session management
        localStorage.setItem('fortuna_token', data.token);
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
        {success ? (
          <div className="text-green-600 text-lg font-semibold mb-4">
            {mode === 'login' ? 'Login successful!' : 'Sign up successful!'}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <>
                <input
                  type="text"
                  className="w-full mb-3 p-2 border rounded"
                  placeholder="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  disabled={loading}
                />
                <input
                  type="text"
                  className="w-full mb-3 p-2 border rounded"
                  placeholder="Referral Code (optional)"
                  value={referralCode}
                  onChange={e => setReferralCode(e.target.value)}
                  disabled={loading}
                />
              </>
            )}
            <input
              type="text"
              className="w-full mb-3 p-2 border rounded"
              placeholder="Phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              disabled={loading}
            />
            <input
              type="password"
              className="w-full mb-3 p-2 border rounded"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <button
              type="submit"
              className="w-full py-2 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transition mb-2"
              disabled={loading}
            >
              {loading ? (mode === 'login' ? 'Logging in...' : 'Signing up...') : (mode === 'login' ? 'Login' : 'Sign Up')}
            </button>
          </form>
        )}
        <div className="flex justify-between mt-2">
          <button className="text-blue-600 underline" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
            {mode === 'login' ? 'Create an account' : 'Already have an account? Login'}
          </button>
          <button className="text-gray-600 underline" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
