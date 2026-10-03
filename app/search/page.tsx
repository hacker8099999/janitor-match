import { CharacterGrid } from "@/components/CharacterGrid";
import { FilterSidebar } from "@/components/FilterSidebar";
import { SearchBar } from "@/components/SearchBar";
import { mockCharacters } from "@/lib/mockData";

export default function SearchPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Discover</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Find your perfect character</h1>
        </div>
        <SearchBar />
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <FilterSidebar />
        <CharacterGrid characters={mockCharacters} />
      </div>
    </main>
  );
}
