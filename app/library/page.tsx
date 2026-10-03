import { CharacterGrid } from "@/components/CharacterGrid";
import { mockCharacters } from "@/lib/mockData";

export default function LibraryPage() {
  const favorites = mockCharacters.slice(0, 3);
  const saved = mockCharacters.slice(3, 6);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Your library</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Saved and favorite companions</h1>
      </section>

      <section className="mb-12">
        <h2 className="mb-5 text-2xl font-semibold text-white">Favorites</h2>
        <CharacterGrid characters={favorites} />
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-semibold text-white">Saved for later</h2>
        <CharacterGrid characters={saved} />
      </section>
    </main>
  );
}
