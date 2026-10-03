export function SearchBar() {
  return (
    <div className="flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-900/80 p-3 shadow-glow">
      <span className="text-lg text-violet-300">⌕</span>
      <input
        placeholder="Search fantasy, cozy, dark, supportive..."
        className="w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-500"
      />
      <button className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white">Search</button>
    </div>
  );
}
