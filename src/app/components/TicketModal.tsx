'use client';
import { useState } from 'react';

interface TicketModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  gameName: string;
}

export default function TicketModal({ open, onClose, onSuccess, gameName }: TicketModalProps) {
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');

  function handleBuyTicket() {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTicketId('TICKET-' + Math.floor(Math.random() * 1000000));
      if (onSuccess) onSuccess();
    }, 25000); // 25 seconds
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
        <h2 className="text-2xl font-bold mb-4 text-green-700">Buy Ticket for {gameName}</h2>
        {!processing && !success && (
          <>
            <p className="mb-4 text-gray-700">Ticket price: <span className="font-bold">₵5</span></p>
            <button
              className="bg-green-600 text-white font-bold py-2 px-6 rounded hover:bg-green-700 transition"
              onClick={handleBuyTicket}
            >
              Buy from Main Balance
            </button>
          </>
        )}
        {processing && (
          <div className="text-yellow-600 text-lg font-semibold animate-pulse mt-4">Please wait, payment is processing...</div>
        )}
        {success && (
          <div className="text-green-600 text-lg font-semibold mt-4">
            Payment successful!<br />
            Your ticket: <span className="font-mono">{ticketId}</span><br />
            <span className="text-sm text-gray-600">Keep this for your records.</span>
          </div>
        )}
      </div>
    </div>
  ) : null;
}
