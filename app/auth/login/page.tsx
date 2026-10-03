"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else if (result?.ok) {
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-zinc-400 mb-6">Sign in to your Janitor Match account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {error && <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-2 text-sm text-red-300">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-violet-600 px-4 py-3 font-medium text-white hover:bg-violet-700 disabled:opacity-50 transition"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-violet-300 hover:text-violet-200">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
