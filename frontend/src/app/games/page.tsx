'use client';
import { useEffect, useState } from 'react';

interface Game {
  name: string;
  // Add other properties if needed
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/games')
      .then((res) => res.json())
      .then((data) => setGames(data as Game[]))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Games List</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <ul>
        {games.length > 0 ? (
          games.map((game, idx) => (
            <li key={idx} className="mb-2 p-2 bg-gray-100 rounded">
              {game.name || JSON.stringify(game)}
            </li>
          ))
        ) : (
          <li>No games found.</li>
        )}
      </ul>
    </main>
  );
}

