"use client";
import { useState, useEffect } from "react";
import AuthModal from "./components/AuthModal";

export default function HomePage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('fortuna_token');
    setLoggedIn(!!token);
    if (token) {
      fetch("http://localhost:5000/api/auth/session", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data.user && data.user.name) setUser({ name: data.user.name });
          else setUser(null);
        })
        .catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, [authOpen, loggedIn]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-yellow-400">
      <h1 className="text-5xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg">Welcome to Fortuna Play!</h1>
      <p className="mb-8 text-lg text-green-500">Your gaming hub for fun, rewards, and excitement.</p>
      <a href="/games" className="px-8 py-4 bg-gradient-to-r from-red-600 via-yellow-400 to-green-600 text-black font-bold rounded-full shadow-lg hover:scale-105 transition mb-8">Play Games</a>
      <div className="w-full max-w-xl mt-8">
        <h2 className="text-2xl font-bold mb-4 text-green-500">Featured Games</h2>
        <ul className="grid grid-cols-2 gap-4">
          <li><a href="/dice" className="block p-4 rounded-lg bg-yellow-400 text-black font-bold shadow hover:bg-yellow-500 transition">Dice Roll</a></li>
          <li><a href="/footballpredictor" className="block p-4 rounded-lg bg-green-500 text-white font-bold shadow hover:bg-green-600 transition">Football Predictor</a></li>
          <li><a href="/luckycardpick" className="block p-4 rounded-lg bg-red-600 text-white font-bold shadow hover:bg-red-700 transition">Lucky Card Pick</a></li>
          <li><a href="/slotmachine" className="block p-4 rounded-lg bg-black text-yellow-400 font-bold shadow hover:bg-gray-900 transition">Slot Machine</a></li>
          <li><a href="/wheeloffortune" className="block p-4 rounded-lg bg-green-600 text-white font-bold shadow hover:bg-green-700 transition">Wheel of Fortune</a></li>
        </ul>
      </div>
      {!loggedIn ? (
        <>
          <button
            className="px-6 py-3 bg-blue-500 text-white font-bold rounded-full shadow hover:bg-blue-600 transition mt-8"
            onClick={() => setAuthOpen(true)}
          >
            Login / Sign Up
          </button>
          <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 mt-8">
          {user && (
            <div className="text-lg font-bold text-green-700">Welcome, {user.name}!</div>
          )}
          <button
            className="px-6 py-3 bg-red-500 text-white font-bold rounded-full shadow hover:bg-red-600 transition"
            onClick={() => {
              localStorage.removeItem('fortuna_token');
              setLoggedIn(false);
              setUser(null);
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </main>
  );
}
