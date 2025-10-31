'use client';
export default function RecentWinners() {
  // Dummy data
  const winners = [
    { name: 'Ama', prize: '₵50', game: 'Spin 2 Win' },
    { name: 'Kwame', prize: 'iPhone', game: 'Mystery Box' },
    { name: 'Esi', prize: '₵500', game: 'Jackpot' },
  ];
  return (
    <div className="overflow-x-auto whitespace-nowrap py-2 my-4 bg-black rounded shadow">
      <div className="flex items-center animate-pulse">
        {winners.map((winner, idx) => (
          <span
            key={idx}
            className="mx-4 px-4 py-2 rounded-full bg-green-600 text-white font-bold shadow-lg"
            style={{ boxShadow: '0 0 10px #39ff14, 0 0 20px #39ff14' }}
          >
            {winner.name} won {winner.prize} in {winner.game}
          </span>
        ))}
      </div>
    </div>
  );
}
