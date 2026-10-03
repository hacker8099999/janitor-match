import { Character } from "@/types/character";
import { CharacterCard } from "@/components/CharacterCard";

export function CharacterGrid({ characters }: { characters: Character[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}
