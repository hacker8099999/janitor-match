import { CharacterGrid } from "@/components/CharacterGrid";
import { getFilteredCharacters } from "@/lib/characters";
import { SearchBar } from "@/components/SearchBar";

export default function SearchPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    tags?: string;
    tone?: string;
    relationshipStyle?: string;
    archetype?: string;
    nsfw?: string;
  };
}) {
  const q = searchParams?.q ?? "";
  const tags = searchParams?.tags ? searchParams.tags.split(",").map((tag) => tag.trim()) : [];
  const tone = searchParams?.tone ?? "";
  const relationshipStyle = searchParams?.relationshipStyle ?? "";
  const archetype = searchParams?.archetype ?? "";
  const includeNsfw = searchParams?.nsfw === "true";

  const filteredCharacters = getFilteredCharacters({
    query: q,
    tags,
    tone,
    relationshipStyle,
    archetype,
    includeNsfw,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Discover</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Find your perfect character</h1>
        </div>
        <SearchBar />
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
          <a key={tag} href={`/search?q=${encodeURIComponent(tag.toLowerCase())}`} className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 hover:border-violet-500">
            {tag}
          </a>
        ))}
      </div>

      <CharacterGrid characters={filteredCharacters} />
    </main>
  );
}
