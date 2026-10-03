"use client";

import { useEffect, useMemo, useState } from "react";
import { CharacterGrid } from "@/components/CharacterGrid";
import { mockCharacters } from "@/lib/mockData";
import { getFavoriteSlugs } from "@/lib/storage";

export default function LibraryPage() {
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteSlugs(getFavoriteSlugs());

    const onStorage = () => setFavoriteSlugs(getFavoriteSlugs());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const favoriteCharacters = useMemo(
    () => mockCharacters.filter((character) => favoriteSlugs.includes(character.slug)),
    [favoriteSlugs]
  );

  const savedForLater = useMemo(
    () => mockCharacters.filter((character) => !favoriteSlugs.includes(character.slug)).slice(0, 3),
    [favoriteSlugs]
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Your library</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Saved and favorite companions</h1>
      </div>

      <section className="mb-12">
        <h2 className="mb-5 text-2xl font-semibold text-white">Favorites</h2>
        {favoriteCharacters.length > 0 ? (
          <CharacterGrid characters={favoriteCharacters} />
        ) : (
          <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-950 p-8 text-zinc-400">
            You haven’t saved any characters yet. Start browsing and tap Save on the characters you love.
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-semibold text-white">Suggested from your taste</h2>
        <CharacterGrid characters={savedForLater} />
      </section>
    </main>
  );
}
