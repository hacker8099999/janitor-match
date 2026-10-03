import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 font-bold text-white">
            J
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">Janitor Match</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
          <Link href="/">Home</Link>
          <Link href="/search">Discover</Link>
          <Link href="/library">Library</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button className="rounded-full border border-zinc-700 px-3 py-2 text-sm text-zinc-200">Log in</button>
          <button className="rounded-full bg-violet-600 px-3 py-2 text-sm font-medium text-white">Get started</button>
        </div>
      </div>
    </header>
  );
}
