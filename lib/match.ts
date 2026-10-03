import { Character } from "@/types/character";
import { mockCharacters } from "@/lib/mockData";

export default function characterMatchScore(character: Character, preferredTags: string[] = []) {
  const overlap = character.tags.filter((tag) => preferredTags.includes(tag)).length;
  const tagCore = overlap * 2;
  const ratingCore = (character.rating - 3) * 0.9;
  const popularityCore = character.popularity / 15000;
  return Number((tagCore + ratingCore + popularityCore).toFixed(2));
}

export function getRecommendedCharacters(preferredTags: string[] = ["fantasy", "supportive", "cozy"]) {
  return [...mockCharacters]
    .map((character) => ({
      ...character,
      matchScore: characterMatchScore(character, preferredTags),
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);
}
