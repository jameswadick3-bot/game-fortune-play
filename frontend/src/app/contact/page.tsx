import React, { useState } from "react";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    // Simulate sending message (replace with backend integration)
    setTimeout(() => {
      setLoading(false);
      setStatus("Message sent! Our support team will reply soon.");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-black text-yellow-400 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Contact Us</h1>
      <div className="w-full max-w-xl mb-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="px-4 py-2 rounded bg-black text-yellow-400 border border-yellow-400 font-bold"
            required
          />
          <textarea
            placeholder="Your message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="px-4 py-2 rounded bg-black text-yellow-400 border border-yellow-400 font-bold"
            rows={4}
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-full font-bold shadow hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
        {status && (
          <div className="mt-4 text-green-500 font-bold">{status}</div>
        )}
      </div>
      <div className="w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-green-500">Support Contact</h2>
        <div className="mb-2">Email: <span className="text-yellow-400">support@fortunaplay.com</span></div>
        <div>Phone: <span className="text-yellow-400">+1-800-123-4567</span></div>
      </div>
    </main>
  );
}
