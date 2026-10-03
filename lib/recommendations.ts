import { Character } from "@/types/character";

export function scoreCharacterRecommendation(candidate: Character, preferredTags: string[]) {
  const overlap = candidate.tags.filter((tag) => preferredTags.includes(tag)).length;
  const metadataScore = overlap * 0.7 + (candidate.rating - 3) * 0.8;
  const popularityScore = candidate.popularity / 10000;
  return metadataScore + popularityScore;
}
