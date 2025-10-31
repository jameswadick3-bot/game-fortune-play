"use client";

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  function handleSignOut() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("fortuna_token");
      window.location.href = "/";
    }
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-yellow-400">
        <nav className="w-full flex items-center justify-center py-4 bg-gradient-to-r from-red-600 via-yellow-400 to-green-600 shadow-lg mb-8">
          <div className="flex gap-8 text-lg font-bold">
            <a href="/" className="hover:text-red-600 transition">Home</a>
            <a href="/games" className="hover:text-green-500 transition">Games</a>
            <a href="/account/profile" className="hover:text-yellow-400 transition">Profile</a>
            <a href="/transactions" className="hover:text-green-500 transition">Transactions</a>
            <a href="/game-results" className="hover:text-yellow-400 transition">Game Results</a>
            <a href="/notifications" className="hover:text-green-500 transition">Notifications</a>
            <a href="/faq" className="hover:text-yellow-400 transition">FAQ / Help</a>
            <a href="/responsible-gaming" className="hover:text-green-500 transition">Responsible Gaming</a>
            <a href="/contact" className="hover:text-yellow-400 transition">Contact</a>
            <a href="/terms-privacy" className="hover:text-green-500 transition">Terms / Privacy</a>
            <a href="/withdrawal" className="hover:text-red-600 transition">Withdrawal</a>
            <a href="/tickets" className="hover:text-yellow-400 transition">Tickets</a>
            <a href="/referral" className="hover:text-green-500 transition">Referral</a>
            <a href="/admin/dashboard" className="hover:text-red-600 transition">Admin Dashboard</a>
            <button onClick={handleSignOut} className="ml-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition">Sign Out</button>
          </div>
        </nav>
        <header className="w-full py-6 bg-gradient-to-r from-red-600 via-yellow-400 to-green-600 text-center font-bold text-2xl shadow-lg">
          Fortuna Play
        </header>
        <main className="max-w-4xl mx-auto p-6">
          {children}
        </main>
        <footer className="w-full py-4 bg-black text-green-500 text-center text-sm">
          &copy; {new Date().getFullYear()} Fortuna Play. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
