"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { saveUserProfile, getUserProfile } from "@/storage/user-profile";
import { UserProfile } from "@/types/types";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();

  const [user] = useState<UserProfile>(() => getUserProfile());
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-10 text-center shadow-2xl shadow-amber-500/5 ring-1 ring-white/5">
          <h1 className="bg-linear-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-4xl font-black tracking-tight text-transparent">
            Progress Forge
          </h1>

          <p className="mt-4 text-balance text-sm text-slate-400 leading-relaxed">
            Welcome back,{" "}
            <span className="font-semibold text-amber-400">{user.displayName}</span>.
            Ready to turn scattered goals into visible victories?
          </p>

          <Link
            href="/dashboard"
            className="mt-8 inline-block w-full rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-amber-400/30 active:translate-y-0"
          >
            Enter Dashboard
          </Link>
        </div>
      </main>
    );
  }

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setError("Please enter your name.");
      return;
    }

    setError(null);
    saveUserProfile(trimmedUsername);
    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center shadow-lg"
      >
        <h1 className="text-4xl font-black tracking-tight text-white">Progress Forge</h1>

        <p className="mt-3 text-sm text-slate-400">
          Turn scattered goals into visible progress.
        </p>

        <div className="mt-8 text-left">
          <label htmlFor="username" className="text-sm font-medium text-slate-300">
            Display name
          </label>

          <input
            id="username"
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="name"
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
          />

          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
        >
          Start Forging
        </button>
      </form>
    </main>
  );
}
