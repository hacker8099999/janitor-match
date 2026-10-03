import { Character } from "@/types/character";

export function getCharacterBySlug(slug: string) {
  return mockCharacters.find((character) => character.slug === slug);
}

export function getCharacterRecommendations(preferredTags: string[] = []) {
  return mockCharacters
    .map((character) => {
      const overlap = character.tags.filter((tag) => preferredTags.includes(tag)).length;
      const score = overlap * 0.8 + character.rating * 2 + character.popularity / 5000;
      return { ...character, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

export { mockCharacters } from "@/lib/mockData";
