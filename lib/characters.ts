import { Character } from "@/types/character";
import { mockCharacters } from "@/lib/mockData";

export function computeCharacterMatch(character: Character, preferredTags: string[]) {
  const overlap = character.tags.filter((tag) => preferredTags.includes(tag)).length;
  const popularityBoost = Math.min(character.popularity / 15000, 1);
  const ratingBoost = character.rating / 5;
  return Number((overlap * 2 + popularityBoost + ratingBoost).toFixed(2));
}

export function getRecommendedCharactersForUser(
  preferredTags: string[] = ["fantasy", "mystic", "supportive", "cozy"]
) {
  return [...mockCharacters]
    .map((character) => ({
      ...character,
      matchScore: computeCharacterMatch(character, preferredTags),
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);
}

export function getCharacterBySlug(slug: string) {
  return mockCharacters.find((character) => character.slug === slug) ?? null;
}
