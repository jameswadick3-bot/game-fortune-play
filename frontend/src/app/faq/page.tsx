import React from "react";

const faqs = [
  {
    question: "How do I buy tickets?",
    answer: "Go to the Tickets page, enter the amount, and click Buy Tickets. Your balance will update instantly."
  },
  {
    question: "How do I withdraw my winnings?",
    answer: "Go to the Withdrawal page, enter the amount, and submit. Withdrawals are sent to your registered phone number."
  },
  {
    question: "How do I refer friends?",
    answer: "Visit the Referral page to copy your referral code and share it. You can see referred users there."
  },
  {
    question: "How do I view my game results?",
    answer: "Check the Game Results page for your win/loss history and details."
  },
  {
    question: "How do I contact support?",
    answer: "Email support@fortunaplay.com or use the contact form on this page."
  },
  {
    question: "How do I edit my profile?",
    answer: "Go to the Profile page to update your name, email, or phone number."
  }
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-black text-yellow-400 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">FAQ & Help</h1>
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-yellow-400 text-black rounded-lg shadow p-6">
            <div className="font-bold text-lg mb-2">Q: {faq.question}</div>
            <div className="text-green-600 font-semibold">A: {faq.answer}</div>
          </div>
        ))}
      </div>
      <div className="mt-12 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-green-500">Contact Support</h2>
        <form className="flex flex-col gap-4">
          <input type="email" placeholder="Your email" className="px-4 py-2 rounded bg-black text-yellow-400 border border-yellow-400 font-bold" required />
          <textarea placeholder="Your message" className="px-4 py-2 rounded bg-black text-yellow-400 border border-yellow-400 font-bold" rows={4} required />
          <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-full font-bold shadow hover:bg-green-700 transition">Send Message</button>
        </form>
        <div className="mt-4 text-green-500">Or email support@fortunaplay.com</div>
      </div>
    </main>
  );
}
