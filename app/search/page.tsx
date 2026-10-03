"use client";

import { useEffect, useMemo, useState } from "react";
import { CharacterGrid } from "@/components/CharacterGrid";
import { getFilteredCharacters } from "@/lib/characters";
import { SearchBar } from "@/components/SearchBar";
import { getPreferenceTags } from "@/lib/storage";

const TONE_OPTIONS = ["dreamy", "gentle", "playful", "calm", "moody", "comforting"];
const RELATIONSHIP_OPTIONS = ["romantic", "supportive", "friendly", "intellectual"];
const ARCHETYPE_OPTIONS = ["mystic companion", "guardian", "adventurer", "navigator", "healer", "artist", "dark lover", "rogue"];
const SORT_OPTIONS: Array<{ label: string; value: "match" | "rating" | "popularity" | "newest" }> = [
  { label: "Popularity", value: "popularity" },
  { label: "Highest Rated", value: "rating" },
  { label: "Best Match", value: "match" },
];

const FILTER_TAGS = ["Fantasy", "Romance", "Cozy", "Supportive", "Dark", "Mystic", "Adventure", "Sci-Fi"];

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
    sort?: "match" | "rating" | "popularity" | "newest";
  };
}) {
  const [preferences, setPreferences] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    setPreferences(getPreferenceTags());
  }, []);

  const q = searchParams?.q ?? "";
  const tags = searchParams?.tags ? searchParams.tags.split(",").map((tag) => tag.trim()) : [];
  const tone = searchParams?.tone ?? "";
  const relationshipStyle = searchParams?.relationshipStyle ?? "";
  const archetype = searchParams?.archetype ?? "";
  const includeNsfw = searchParams?.nsfw === "true";
  const sortBy = searchParams?.sort ?? "popularity";

  const filteredCharacters = getFilteredCharacters({
    query: q,
    tags,
    tone,
    relationshipStyle,
    archetype,
    includeNsfw,
    sortBy,
    preferredTags: preferences,
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
    if (sortBy && sortBy !== "popularity") next.set("sort", sortBy);
    return `/search?${next.toString()}`;
  };

  const makeSortHref = (sort: string) => {
    const next = new URLSearchParams();
    if (q) next.set("q", q);
    if (tags.length) next.set("tags", tags.join(","));
    if (tone) next.set("tone", tone);
    if (relationshipStyle) next.set("relationshipStyle", relationshipStyle);
    if (archetype) next.set("archetype", archetype);
    if (includeNsfw) next.set("nsfw", "true");
    if (sort && sort !== "popularity") next.set("sort", sort);
    return `/search?${next.toString()}`;
  };

  const clearHref = "/search";
  const hasActiveFilters = q || tags.length > 0 || tone || relationshipStyle || archetype || includeNsfw;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Discover</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Find your perfect character</h1>
        </div>
        <SearchBar defaultValue={q} />
      </div>

      {/* Quick Filter Tags */}
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

        {hasActiveFilters && (
          <a href={clearHref} className="rounded-full border border-zinc-700 bg-transparent px-3 py-1.5 text-zinc-300 hover:border-zinc-500">
            Clear
          </a>
        )}
      </div>

      {/* Advanced Filters and Sort */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs uppercase tracking-[0.15em] text-zinc-400">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => {
              const url = makeSortHref(e.target.value);
              window.location.href = url;
            }}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-200 outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-200 hover:border-violet-500"
        >
          {filterOpen ? "Hide filters" : "Show filters"}
        </button>
      </div>

      {/* Expandable Filter Panel */}
      {filterOpen && (
        <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-300">Tone</p>
              <div className="flex flex-wrap gap-2">
                {TONE_OPTIONS.map((t) => {
                  const active = tone === t;
                  return (
                    <a
                      key={t}
                      href={`/search?tone=${active ? "" : t}${q ? "&q=" + q : ""}${tags.length ? "&tags=" + tags.join(",") : ""}`}
                      className={[
                        "rounded-full border px-2 py-1 text-xs transition",
                        active ? "border-violet-500 bg-violet-500/15 text-violet-100" : "border-zinc-700 bg-zinc-800 hover:border-violet-500",
                      ].join(" ")}
                    >
                      {t}
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-300">Relationship Style</p>
              <div className="flex flex-wrap gap-2">
                {RELATIONSHIP_OPTIONS.map((r) => {
                  const active = relationshipStyle === r;
                  return (
                    <a
                      key={r}
                      href={`/search?relationshipStyle=${active ? "" : r}${q ? "&q=" + q : ""}${tags.length ? "&tags=" + tags.join(",") : ""}`}
                      className={[
                        "rounded-full border px-2 py-1 text-xs transition",
                        active ? "border-violet-500 bg-violet-500/15 text-violet-100" : "border-zinc-700 bg-zinc-800 hover:border-violet-500",
                      ].join(" ")}
                    >
                      {r}
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-300">Archetype</p>
              <div className="flex flex-wrap gap-2">
                {ARCHETYPE_OPTIONS.map((a) => {
                  const active = archetype === a;
                  return (
                    <a
                      key={a}
                      href={`/search?archetype=${active ? "" : a}${q ? "&q=" + q : ""}${tags.length ? "&tags=" + tags.join(",") : ""}`}
                      className={[
                        "rounded-full border px-2 py-1 text-xs transition",
                        active ? "border-violet-500 bg-violet-500/15 text-violet-100" : "border-zinc-700 bg-zinc-800 hover:border-violet-500",
                      ].join(" ")}
                    >
                      {a}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="mb-5 text-sm text-zinc-400">
        Showing {filteredCharacters.length} character{filteredCharacters.length === 1 ? "" : "s"}
      </p>

      <CharacterGrid characters={filteredCharacters} />
    </main>
  );
}
