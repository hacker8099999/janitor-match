"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CharacterGrid } from "@/components/CharacterGrid";
import { SearchBar } from "@/components/SearchBar";
import { getFilteredCharacters, getPreferenceWeights, getRecommendedCharactersForUser, CharacterSort } from "@/lib/characters";
import { getPreferenceTags } from "@/lib/storage";

const TONE_OPTIONS = ["dreamy", "gentle", "playful", "calm", "moody", "comforting", "warm"];
const RELATIONSHIP_OPTIONS = ["romantic", "supportive", "friendly", "intellectual"];
const ARCHETYPE_OPTIONS = ["mystic companion", "guardian", "adventurer", "navigator", "healer", "artist", "dark lover", "rogue"];
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
    sort?: CharacterSort;
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
  const sortBy = searchParams?.sort ?? "match";

  const preferredTags = useMemo(
    () => (preferences.length > 0 ? preferences : ["fantasy", "supportive", "cozy", "mystic"]),
    [preferences]
  );

  const filteredCharacters = getFilteredCharacters({
    query: q,
    tags,
    tone,
    relationshipStyle,
    archetype,
    includeNsfw,
    sortBy,
    preferredTags,
  });

  const buildUrl = (overrides: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (tags.length) params.set("tags", tags.join(","));
    if (tone) params.set("tone", tone);
    if (relationshipStyle) params.set("relationshipStyle", relationshipStyle);
    if (archetype) params.set("archetype", archetype);
    if (includeNsfw) params.set("nsfw", "true");
    if (sortBy && sortBy !== "match") params.set("sort", sortBy);

    Object.entries(overrides).forEach(([key, value]) => {
      if (value && value !== "") params.set(key, value);
      else params.delete(key);
    });

    return "/search?" + params.toString();
  };

  const clearHref = "/search";
  const hasActiveFilters = Boolean(q || tags.length || tone || relationshipStyle || archetype || includeNsfw);

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
          const slug = tag.toLowerCase();
          const active = tags.includes(slug);
          return (
            <Link
              key={tag}
              href={buildUrl({ tags: active ? tags.filter((item) => item !== slug).join(",") : [...tags, slug].join(",") })}
              className={[
                "rounded-full border px-3 py-1.5 transition",
                active ? "border-violet-500 bg-violet-500/15 text-violet-100" : "border-zinc-700 bg-zinc-900 hover:border-violet-500",
              ].join(" ")}
            >
              {tag}
            </Link>
          );
        })}

        {hasActiveFilters && (
          <Link href={clearHref} className="rounded-full border border-zinc-700 bg-transparent px-3 py-1.5 text-zinc-300 hover:border-zinc-500">
            Clear
          </Link>
        )}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs uppercase tracking-[0.15em] text-zinc-400">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => {
              const url = buildUrl({ sort: e.target.value });
              window.location.href = url;
            }}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-200 outline-none"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => setFilterOpen((value) => !value)}
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-200 hover:border-violet-500"
        >
          {filterOpen ? "Hide filters" : "Show filters"}
        </button>
      </div>

      {filterOpen && (
        <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-300">Tone</p>
              <div className="flex flex-wrap gap-2">
                {TONE_OPTIONS.map((option) => {
                  const active = tone === option;
                  return (
                    <Link
                      key={option}
                      href={buildUrl({ tone: active ? "" : option })}
                      className={[
                        "rounded-full border px-2 py-1 text-xs transition",
                        active ? "border-violet-500 bg-violet-500/15 text-violet-100" : "border-zinc-700 bg-zinc-800 hover:border-violet-500",
                      ].join(" ")}
                    >
                      {option}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-300">Relationship Style</p>
              <div className="flex flex-wrap gap-2">
                {RELATIONSHIP_OPTIONS.map((option) => {
                  const active = relationshipStyle === option;
                  return (
                    <Link
                      key={option}
                      href={buildUrl({ relationshipStyle: active ? "" : option })}
                      className={[
                        "rounded-full border px-2 py-1 text-xs transition",
                        active ? "border-violet-500 bg-violet-500/15 text-violet-100" : "border-zinc-700 bg-zinc-800 hover:border-violet-500",
                      ].join(" ")}
                    >
                      {option}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-300">Archetype</p>
              <div className="flex flex-wrap gap-2">
                {ARCHETYPE_OPTIONS.map((option) => {
                  const active = archetype === option;
                  return (
                    <Link
                      key={option}
                      href={buildUrl({ archetype: active ? "" : option })}
                      className={[
                        "rounded-full border px-2 py-1 text-xs transition",
                        active ? "border-violet-500 bg-violet-500/15 text-violet-100" : "border-zinc-700 bg-zinc-800 hover:border-violet-500",
                      ].join(" ")}
                    >
                      {option}
                    </Link>
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
