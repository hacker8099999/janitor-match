import Link from "next/link";

const tags = [
  "Fantasy",
  "Romance",
  "Dark",
  "Cozy",
  "Supportive",
  "Adventure",
  "SFW",
  "NSFW",
  "Mystic",
  "Sci-Fi",
];

export function FilterSidebar() {
  return (
    <aside className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <h3 className="text-lg font-semibold text-white">Filters</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button key={tag} className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-200">
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <div>
          <p className="text-sm text-zinc-400">Character type</p>
          <div className="mt-2 space-y-2 text-sm text-zinc-300">
            <Link href="#">Guardian</Link>
            <Link href="#">Mystic Companion</Link>
            <Link href="#">Adventurer</Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
