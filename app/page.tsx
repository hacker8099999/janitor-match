import { CharacterGrid } from "@/components/CharacterGrid";
import { SearchBar } from "@/components/SearchBar";
import { getFilteredCharacters, getRecommendationRankings, getRecommendedCharactersForUser } from "@/lib/characters";

export default function HomePage() {
  const preferredTags = ["fantasy", "supportive", "cozy", "mystic"];
  const recommended = getRecommendedCharactersForUser(preferredTags);
  const trending = getRecommendationRankings();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="mb-12 rounded-3xl border border-zinc-800 bg-gradient-to-br from-violet-950 via-zinc-950 to-zinc-900 p-8">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-violet-300">Discover your next companion</p>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Find the character that matches your vibe.
            </h1>
            <p className="mt-5 max-w-xl text-base text-zinc-300 md:text-lg">
              Search JanitorAI characters by personality, tone, relationship style, and fantasy type.
              Get better recommendations and spend less time browsing aimlessly.
            </p>

            <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
              <SearchBar />
            </div>
          </div>

          <div className="rounded-2xl border border-violet-500/40 bg-zinc-950/70 p-5 shadow-glow">
            <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Your match</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600 text-xl font-bold">L</div>
              <div>
                <h3 className="text-xl font-semibold text-white">Luna Astra</h3>
                <p className="text-sm text-zinc-400">Mystic companion • Dreamy • Romantic</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-zinc-300">
              A gentle cosmic witch with a warm, poetic energy and beautifully tailored late-night conversations.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Recommended for you</h2>
          <a href="/search" className="text-sm text-violet-300 hover:text-violet-200">View all</a>
        </div>
        <CharacterGrid characters={recommended} />
      </section>

      <section className="mb-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Trending now</h2>
        </div>
        <CharacterGrid characters={trending} />
      </section>

      <section className="mb-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Popular picks</h2>
        </div>
        <CharacterGrid characters={getFilteredCharacters({ includeNsfw: false }).slice(0, 6)} />
      </section>
    </main>
  );
}
