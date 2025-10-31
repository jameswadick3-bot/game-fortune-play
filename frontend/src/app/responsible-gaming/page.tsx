import React from "react";

const tips = [
  "Set a budget and stick to it.",
  "Never chase losses.",
  "Take regular breaks from gaming.",
  "Only play for fun, not to make money.",
  "Keep track of your time and spending.",
  "Reach out for help if you feel gaming is becoming a problem."
];

const resources = [
  { name: "Gamblers Anonymous", url: "https://www.gamblersanonymous.org/ga/" },
  { name: "National Council on Problem Gambling", url: "https://www.ncpgambling.org/" },
  { name: "BeGambleAware", url: "https://www.begambleaware.org/" }
];

export default function ResponsibleGamingPage() {
  return (
    <main className="min-h-screen bg-black text-yellow-400 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Responsible Gaming</h1>
      <div className="w-full max-w-2xl flex flex-col gap-6 mb-12">
        <h2 className="text-2xl font-bold text-green-500 mb-4">Tips for Safe Play</h2>
        <ul className="list-disc pl-8">
          {tips.map((tip, idx) => (
            <li key={idx} className="mb-2 text-yellow-400 font-semibold">{tip}</li>
          ))}
        </ul>
      </div>
      <div className="w-full max-w-2xl flex flex-col gap-6 mb-12">
        <h2 className="text-2xl font-bold text-green-500 mb-4">Support Resources</h2>
        <ul className="list-disc pl-8">
          {resources.map((r, idx) => (
            <li key={idx} className="mb-2">
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-green-500 underline hover:text-yellow-400">{r.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full max-w-xl">
        <h2 className="text-2xl font-bold text-green-500 mb-4">Self-Exclusion</h2>
        <p className="mb-4">If you wish to take a break from gaming, you can self-exclude your account. This will temporarily disable your access to Fortuna Play.</p>
        <button className="px-6 py-2 bg-red-600 text-white rounded-full font-bold shadow hover:bg-red-700 transition">Request Self-Exclusion</button>
        <div className="mt-4 text-green-500">Contact support@fortunaplay.com for permanent exclusion or more help.</div>
      </div>
    </main>
  );
}
