import { Character } from "@/types/character";
import { mockCharacters } from "@/lib/mockData";

export function scoreCharacterRecommendation(candidate: Character, preferredTags: string[]) {
  const overlap = candidate.tags.filter((tag) => preferredTags.includes(tag)).length;
  const metadataScore = overlap * 0.7 + (candidate.rating - 3) * 0.8;
  const popularityScore = candidate.popularity / 10000;
  return Number((metadataScore + popularityScore).toFixed(2));
}

export function getRecommendationFeed() {
  const preferredTags = ["fantasy", "mystic", "supportive", "cozy"];

  return [...mockCharacters]
    .map((character) => ({
      ...character,
      matchScore: scoreCharacterRecommendation(character, preferredTags),
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);
}
