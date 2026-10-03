"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      router.push("/auth/login?signup=success");
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create account</h1>
        <p className="text-zinc-400 mb-6">Join Janitor Match and find your perfect character</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-200 placeholder:text-zinc-500 outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-200 placeholder:text-zinc-500 outline-none focus:border-violet-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-200 placeholder:text-zinc-500 outline-none focus:border-violet-500"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-300 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-200 placeholder:text-zinc-500 outline-none focus:border-violet-500"
              required
            />
          </div>

          {error && <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-2 text-sm text-red-300">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-violet-600 px-4 py-3 font-medium text-white hover:bg-violet-700 disabled:opacity-50 transition"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-violet-300 hover:text-violet-200">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
