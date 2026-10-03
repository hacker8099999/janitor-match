import { Character } from "@/types/character";
import { mockCharacters } from "@/lib/mockData";

export function computeCharacterMatch(character: Character, preferredTags: string[]) {
  const overlap = character.tags.filter((tag) => preferredTags.includes(tag)).length;
  const popularityBoost = Math.min(character.popularity / 15000, 1);
  const ratingBoost = character.rating / 5;
  const toneBoost = ["dreamy", "gentle", "comforting", "warm", "calm"].includes(character.tone) ? 0.4 : 0.1;
  return Number((overlap * 2 + popularityBoost + ratingBoost + toneBoost).toFixed(2));
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

export function getFilteredCharacters({
  query,
  tags,
  archetype,
  tone,
  relationshipStyle,
  includeNsfw,
}: {
  query?: string;
  tags?: string[];
  archetype?: string;
  tone?: string;
  relationshipStyle?: string;
  includeNsfw?: boolean;
}) {
  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const selectedTags = (tags ?? []).map((tag) => tag.toLowerCase());

  return mockCharacters.filter((character) => {
    const searchable = [
      character.name,
      character.summary,
      character.description,
      character.personality,
      character.tags.join(" "),
      character.archetype,
      character.tone,
      character.relationshipStyle,
    ]
      .join(" ")
      .toLowerCase();

    if (normalizedQuery && !searchable.includes(normalizedQuery)) {
      return false;
    }

    if (archetype && character.archetype.toLowerCase() !== archetype.toLowerCase()) {
      return false;
    }

    if (tone && character.tone.toLowerCase() !== tone.toLowerCase()) {
      return false;
    }

    if (relationshipStyle && character.relationshipStyle.toLowerCase() !== relationshipStyle.toLowerCase()) {
      return false;
    }

    if (selectedTags.length > 0) {
      const matches = selectedTags.every((tag) =>
        character.tags.some((characterTag) => characterTag.toLowerCase() === tag)
      );
      if (!matches) return false;
    }

    if (!includeNsfw && character.isNsfw) {
      return false;
    }

    return true;
  });
}

export function getRecommendationRankings() {
  return [...mockCharacters]
    .map((character) => ({
      ...character,
      matchScore: Number((character.rating * 18 + character.popularity / 1000).toFixed(1)),
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);
}
