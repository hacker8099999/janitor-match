import { CharacterGrid } from "@/components/CharacterGrid";
import { mockCharacters } from "@/lib/mockData";

export default function SearchPage() {
  const filteredCharacters = mockCharacters.filter((character) => !character.isNsfw);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Discover</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Find your next favorite AI companion</h1>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-3 text-sm text-zinc-300">
        {[
          "Fantasy",
          "Romance",
          "Cozy",
          "Supportive",
          "Dark",
          "Mystic",
          "Adventure",
          "Sci-Fi",
        ].map((tag) => (
          <button key={tag} className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 hover:border-violet-500">
            {tag}
          </button>
        ))}
      </div>

      <CharacterGrid characters={filteredCharacters} />
    </main>
  );
}
