import { CharacterGrid } from "@/components/CharacterGrid";
import { SearchBar } from "@/components/SearchBar";
import { getFilteredCharacters } from "@/lib/characters";

const FILTER_TAGS = [
  "Fantasy",
  "Romance",
  "Cozy",
  "Supportive",
  "Dark",
  "Mystic",
  "Adventure",
  "Sci-Fi",
];

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

  const makeTagHref = (tag: string) => {
    const next = new URLSearchParams();
    if (q) next.set("q", q);
    const nextTags = tags.includes(tag.toLowerCase())
      ? tags.filter((item) => item.toLowerCase() !== tag.toLowerCase())
      : [...tags, tag.toLowerCase()];
    if (nextTags.length) next.set("tags", nextTags.join(","));
    if (tone) next.set("tone", tone);
    if (relationshipStyle) next.set("relationshipStyle", relationshipStyle);
    if (archetype) next.set("archetype", archetype);
    if (includeNsfw) next.set("nsfw", "true");
    return `/search?${next.toString()}`;
  };

  const clearHref = "/search";

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Discover</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Find your perfect character</h1>
        </div>
        <SearchBar defaultValue={q} />
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
        {FILTER_TAGS.map((tag) => {
          const active = tags.includes(tag.toLowerCase());
          return (
            <a
              key={tag}
              href={makeTagHref(tag)}
              className={[
                "rounded-full border px-3 py-1.5 transition",
                active ? "border-violet-500 bg-violet-500/15 text-violet-100" : "border-zinc-700 bg-zinc-900 hover:border-violet-500",
              ].join(" ")}
            >
              {tag}
            </a>
          );
        })}

        {(q || tags.length > 0 || tone || relationshipStyle || archetype || includeNsfw) && (
          <a href={clearHref} className="rounded-full border border-zinc-700 bg-transparent px-3 py-1.5 text-zinc-300 hover:border-zinc-500">
            Clear filters
          </a>
        )}
      </div>

      <p className="mb-5 text-sm text-zinc-400">
        Showing {filteredCharacters.length} character{filteredCharacters.length === 1 ? "" : "s"}
      </p>

      <CharacterGrid characters={filteredCharacters} />
    </main>
  );
}
