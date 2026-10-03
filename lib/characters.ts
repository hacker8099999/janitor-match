import { Character } from "@/types/character";

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
  const selectedTags = tags ?? [];

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

    if (archetype && character.archetype !== archetype) {
      return false;
    }

    if (tone && character.tone !== tone) {
      return false;
    }

    if (relationshipStyle && character.relationshipStyle !== relationshipStyle) {
      return false;
    }

    if (selectedTags.length > 0) {
      const matches = selectedTags.every((tag) =>
        character.tags.some((characterTag) => characterTag.toLowerCase() === tag.toLowerCase())
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

export { mockCharacters } from "@/lib/mockData";
