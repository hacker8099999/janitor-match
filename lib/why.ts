import { Character } from "@/types/character";
import { getRecommendedCharacters } from "@/lib/match";

export function getWhyCharacterMatches(character: Character) {
  const preferredTags = ["fantasy", "supportive", "cozy", "mystic"];
  const matchTags = character.tags.filter((tag) => preferredTags.includes(tag));
  return {
    summary: `This character matches you because it shares ${matchTags.length} of your preferred tags and has a ${character.tone} tone.`,
    tags: matchTags,
    recommendation: getRecommendedCharacters(preferredTags).find((entry) => entry.slug === character.slug),
  };
}
