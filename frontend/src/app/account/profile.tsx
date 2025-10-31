import React, { useEffect, useState } from "react";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
}

const fetchProfile = async (): Promise<ProfileData | null> => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("fortuna_token") : null;
    const res = await fetch("/api/account", {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch profile");
    return await res.json();
  } catch {
    return null;
  }
};

const updateProfile = async (profile: ProfileData): Promise<{ success: boolean; message: string }> => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("fortuna_token") : null;
    const res = await fetch("/api/account/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(profile),
    });
    const data = await res.json();
    return { success: res.ok, message: data.message || (res.ok ? "Profile updated" : "Update failed") };
  } catch {
    return { success: false, message: "Update failed" };
  }
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<ProfileData>({ name: "", email: "", phone: "" });

  useEffect(() => {
    fetchProfile().then((data) => {
      setProfile(data);
      setForm(data || { name: "", email: "", phone: "" });
      setLoading(false);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const result = await updateProfile(form);
    setStatus(result.message);
    if (result.success) {
      setProfile(form);
      setEdit(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-yellow-400 flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Profile</h1>
      {loading ? (
        <div className="text-green-500">Loading...</div>
      ) : !profile ? (
        <div className="text-red-600">Unable to load profile.</div>
      ) : (
        <div className="w-full max-w-md flex flex-col items-center gap-6">
          {!edit ? (
            <>
              <div className="text-lg font-bold text-green-500">Name: <span className="text-yellow-400">{profile.name}</span></div>
              <div className="text-lg font-bold text-green-500">Email: <span className="text-yellow-400">{profile.email}</span></div>
              <div className="text-lg font-bold text-green-500">Phone: <span className="text-yellow-400">{profile.phone}</span></div>
              <button
                className="px-6 py-2 bg-yellow-400 text-black rounded-full font-bold shadow hover:bg-yellow-500 transition"
                onClick={() => setEdit(true)}
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 items-center">
              <label className="text-lg font-bold text-green-500">Name:</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-64 px-4 py-2 rounded bg-black text-yellow-400 border border-yellow-400 text-center font-bold"
                required
              />
              <label className="text-lg font-bold text-green-500">Email:</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-64 px-4 py-2 rounded bg-black text-yellow-400 border border-yellow-400 text-center font-bold"
                required
              />
              <label className="text-lg font-bold text-green-500">Phone:</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-64 px-4 py-2 rounded bg-black text-yellow-400 border border-yellow-400 text-center font-bold"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-full font-bold shadow hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-red-600 text-white rounded-full font-bold shadow hover:bg-red-700 transition"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
            </form>
          )}
          {status && (
            <div className={`mt-4 font-bold ${status.includes("updated") ? "text-green-500" : "text-red-600"}`}>{status}</div>
          )}
        </div>
      )}
    </main>
  );
}
