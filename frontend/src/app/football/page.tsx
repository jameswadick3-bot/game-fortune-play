"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FootballGamePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('fortuna_token');
    if (!token) {
      router.replace("/");
    }
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Football Predictor Game</h1>
      {/* Game UI goes here */}
      <div className="text-gray-600">Welcome to the Football Predictor game! (Only visible to logged-in users)</div>
    </main>
  );
}
