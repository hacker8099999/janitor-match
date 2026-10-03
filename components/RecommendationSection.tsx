import { Character } from "@/types/character";
import { CharacterCard } from "@/components/CharacterCard";

export function RecommendationSection({
  title,
  characters,
}: {
  title: string;
  characters: Character[];
}) {
  return (
    <section className="mb-10">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <button className="text-sm text-violet-300">View all</button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </section>
  );
}
