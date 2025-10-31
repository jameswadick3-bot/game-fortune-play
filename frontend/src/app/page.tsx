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
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-green-700 mb-6">Welcome to Fortuna Play</h1>
      {!loggedIn ? (
        <>
          <button
            className="px-6 py-3 bg-blue-500 text-white font-bold rounded-full shadow hover:bg-blue-600 transition"
            onClick={() => setAuthOpen(true)}
          >
            Login / Sign Up
          </button>
          <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
        </>
      ) : (
        <div className="flex flex-col items-center gap-4">
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
      {/* Additional homepage content can go here */}
    </main>
  );
}
