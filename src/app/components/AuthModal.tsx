'use client';
import { useState } from 'react';

export default function AuthModal({ open, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}
  return open ? (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-green-700">Login / Sign Up</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Name" className="border rounded px-3 py-2" required />
          <input type="tel" placeholder="Phone Number" className="border rounded px-3 py-2" required />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password (10+ chars, symbols, letters, numbers)"
              className="border rounded px-3 py-2 w-full"
              minLength={10}
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>
          <button type="submit" className="bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700 transition">Login / Sign Up</button>
          <button type="button" className="text-blue-600 text-sm underline self-end">Forgot password?</button>
        </form>
      </div>
    </div>
  ) : null;
}
