"use client";

import { useEffect, useMemo, useState } from "react";
import { getPreferenceTags, setPreferenceTags } from "@/lib/storage";

const OPTION_TAGS = [
  "fantasy",
  "romance",
  "cozy",
  "supportive",
  "dark",
  "mystic",
  "adventure",
  "sci-fi",
];

export default function PreferencesPage() {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setSelected(getPreferenceTags());
  }, []);

  const toggleTag = (tag: string) => {
    const next = selected.includes(tag)
      ? selected.filter((item) => item !== tag)
      : [...selected, tag];

    setSelected(next);
    setPreferenceTags(next);
  };

  const summary = useMemo(() => {
    if (selected.length === 0) return "No vibe preferences saved yet.";
    return `Your current vibe: ${selected.join(", ")}`;
  }, [selected]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Your vibe</p>
        <h1 className="mt-3 text-3xl font-bold text-white">Personalize recommendations</h1>
        <p className="mt-3 text-zinc-300">Choose the moods and archetypes you enjoy most. These preferences influence future character matches.</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {OPTION_TAGS.map((tag) => {
            const active = selected.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={[
                  "rounded-full border px-3 py-2 text-sm transition",
                  active ? "border-violet-500 bg-violet-500/15 text-violet-100" : "border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-violet-500",
                ].join(" ")}
              >
                {tag}
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 text-sm text-zinc-300">
          {summary}
        </div>
      </div>
    </main>
  );
}
