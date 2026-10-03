export function SearchBar({
  defaultValue = "",
  compact = false,
}: {
  defaultValue?: string;
  compact?: boolean;
}) {
  return (
    <form action="/search" method="get" className={compact ? "w-full max-w-md" : "w-full max-w-2xl"}>
      <div className="flex items-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-900/80 p-3 shadow-glow">
        <span className="text-lg text-violet-300">⌕</span>
        <input
          name="q"
          defaultValue={defaultValue}
          placeholder="Search fantasy, cozy, dark, supportive..."
          className="w-full bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-500"
        />
        <button type="submit" className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white">
          Search
        </button>
      </div>
    </form>
  );
}
