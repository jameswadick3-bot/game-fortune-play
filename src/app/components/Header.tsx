'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow">
      <div>
        <h1 className="text-2xl font-bold text-green-700">Welcome to Fortuna Play</h1>
        <p className="text-sm text-gray-600 mt-1">
          Ghana&apos;s most exciting game of chance platform!
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/account">
          <button className="bg-yellow-400 text-black px-4 py-2 rounded shadow hover:bg-yellow-500 font-bold">
            Account
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
            Login / Sign Up
          </button>
        </Link>
      </div>
    </header>
  );
}
