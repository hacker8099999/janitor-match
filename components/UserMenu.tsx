"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function UserMenu({ user }: { user: any }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-violet-500 bg-violet-500/15 px-3 py-2 text-sm text-violet-100 hover:border-violet-400"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
          {user?.name?.[0] || user?.email?.[0] || "U"}
        </div>
        {user?.name || user?.email}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg">
          <Link href="/preferences" className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-t-xl">
            Preferences
          </Link>
          <Link href="/library" className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white">
            My Library
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-800 rounded-b-xl"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
