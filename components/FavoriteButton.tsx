"use client";

import { useEffect, useState } from "react";
import { isFavorite, toggleFavorite } from "@/lib/storage";

export function FavoriteButton({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isFavorite(slug));
  }, [slug]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const favorites = toggleFavorite(slug);
    setSaved(favorites.includes(slug));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={[
        "rounded-full border px-3 py-1.5 text-xs font-medium transition",
        saved ? "border-violet-500 bg-violet-500/15 text-violet-100" : "border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-violet-500",
        compact ? "px-2.5 py-1 text-[10px]" : "",
      ].join(" ")}
    >
      {saved ? "Saved" : "Save"}
    </button>
  );
}
