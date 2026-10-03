import { getCharacterBySlug, getRecommendedCharactersForUser } from "@/lib/characters";
import { notFound } from "next/navigation";

export default function CharacterDetailPage({ params }: { params: { slug: string } }) {
  const character = getCharacterBySlug(params.slug);
  if (!character) return notFound();

  const similar = getRecommendedCharactersForUser(character.tags)
    .filter((entry) => entry.slug !== character.slug)
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4">
          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-violet-800 via-zinc-900 to-zinc-950">
            <img src={character.avatarUrl ?? ""} alt={character.name} className="h-80 w-full object-cover" />
          </div>

          <div className="mt-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-violet-300">{character.archetype}</p>
                <h1 className="mt-2 text-3xl font-bold text-white">{character.name}</h1>
              </div>
              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-1 text-sm text-violet-200">
                ★ {character.rating.toFixed(1)}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {character.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-[10px] uppercase tracking-wide text-zinc-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Summary</p>
            <p className="mt-4 text-lg text-zinc-200">{character.summary}</p>
          </section>

          <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Why it matches you</p>
            <p className="mt-4 text-zinc-300">
              This character shares your preferred vibes: {character.tags.slice(0, 3).join(", ")}. It fits a {character.tone} tone and a {character.relationshipStyle} relationship style.
            </p>
          </section>

          <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Greeting</p>
            <p className="mt-4 text-xl italic text-violet-100">“{character.greeting}”</p>
          </section>

          <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Similar characters</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {similar.map((entry) => (
                <a key={entry.slug} href={`/characters/${entry.slug}`} className="rounded-2xl border border-zinc-700 bg-zinc-900 p-3">
                  <p className="font-semibold text-white">{entry.name}</p>
                  <p className="mt-1 text-sm text-zinc-400">{entry.summary}</p>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
