import React, { useEffect, useState } from "react";

interface Notification {
  _id: string;
  message: string;
  type: "info" | "success" | "error";
  date: string;
}

const fetchNotifications = async (): Promise<Notification[]> => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("fortuna_token") : null;
    const res = await fetch("/api/account/notifications", {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch notifications");
    return await res.json();
  } catch {
    return [];
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications().then((data) => {
      setNotifications(data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="min-h-screen bg-black text-yellow-400 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Notifications</h1>
      {loading ? (
        <div className="text-green-500">Loading...</div>
      ) : notifications.length === 0 ? (
        <div className="text-red-600">No notifications found.</div>
      ) : (
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={`p-4 rounded-lg shadow font-bold text-lg ${
                n.type === "success"
                  ? "bg-green-600 text-white"
                  : n.type === "error"
                  ? "bg-red-600 text-white"
                  : "bg-yellow-400 text-black"
              }`}
            >
              <div>{n.message}</div>
              <div className="text-xs mt-2 text-black/60">{new Date(n.date).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
