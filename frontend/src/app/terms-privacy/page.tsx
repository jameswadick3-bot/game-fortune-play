import React from "react";

export default function TermsPrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-yellow-400 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Terms of Service & Privacy Policy</h1>
      <div className="w-full max-w-3xl flex flex-col gap-8">
        <section className="bg-yellow-400 text-black rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
          <p className="mb-2">By using Fortuna Play, you agree to abide by all site rules and local laws. You must be of legal age to play. All games are for entertainment purposes only. Abuse, fraud, or cheating will result in account suspension.</p>
          <p className="mb-2">Tickets, winnings, and withdrawals are subject to verification. Fortuna Play reserves the right to modify site features and terms at any time.</p>
        </section>
        <section className="bg-yellow-400 text-black rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
          <p className="mb-2">We value your privacy. Your personal information (name, email, phone) is securely stored and never shared with third parties except as required by law.</p>
          <p className="mb-2">We use cookies and analytics to improve your experience. You may request account deletion or data export by contacting support@fortunaplay.com.</p>
        </section>
      </div>
      <div className="mt-12 text-green-500">For questions, contact support@fortunaplay.com</div>
    </main>
  );
}
