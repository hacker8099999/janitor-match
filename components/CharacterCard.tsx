import { Character } from "@/types/character";
import { FavoriteButton } from "@/components/FavoriteButton";

export function CharacterCard({ character }: { character: Character & { matchScore?: number } }) {
  return (
    <div className="group block h-full">
      <div className="h-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition duration-200 hover:-translate-y-1 hover:border-violet-500 hover:shadow-glow">
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-violet-900 via-zinc-900 to-zinc-950">
          {character.avatarUrl ? (
            <img src={character.avatarUrl} alt={character.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl font-bold text-violet-200">{character.name.charAt(0)}</div>
          )}
        </div>

        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-white">{character.name}</h3>
            <span className="text-sm text-violet-300">★ {character.rating.toFixed(1)}</span>
          </div>

          <p className="line-clamp-3 text-sm text-zinc-300">{character.summary}</p>

          <div className="flex flex-wrap gap-2">
            {character.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full border border-zinc-700 bg-zinc-900 px-2 py-1 text-[10px] uppercase tracking-wide text-zinc-300">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              {typeof character.matchScore === "number" ? `Match ${character.matchScore.toFixed(1)}` : `Popularity ${Math.round(character.popularity / 1000)}k`}
            </span>
            <FavoriteButton slug={character.slug} compact />
          </div>
        </div>
      </div>
    </div>
  );
}
