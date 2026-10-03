import { Character } from "@/types/character";
import { mockCharacters } from "@/lib/mockData";

export function computeCharacterMatch(character: Character, preferredTags: string[], weights?: Record<string, number>) {
  let score = 0;

  // Tag overlap: highest weight
  const overlap = character.tags.filter((tag) => preferredTags.includes(tag)).length;
  score += overlap * 3.5;

  // Rating: moderate weight
  const ratingScore = (character.rating - 3) * 0.8;
  score += ratingScore;

  // Popularity: light weight
  const popularityScore = Math.min(character.popularity / 15000, 1) * 1.2;
  score += popularityScore;

  // Tone preference boost
  if (weights?.[`tone:${character.tone}`]) {
    score += weights[`tone:${character.tone}`] * 1.5;
  }

  // Relationship style preference boost
  if (weights?.[`relationship:${character.relationshipStyle}`]) {
    score += weights[`relationship:${character.relationshipStyle}`] * 1.3;
  }

  // Archetype preference boost
  if (weights?.[`archetype:${character.archetype}`]) {
    score += weights[`archetype:${character.archetype}`] * 1.2;
  }

  return Number(Math.max(0, score).toFixed(2));
}

export function getRecommendedCharactersForUser(
  preferredTags: string[] = ["fantasy", "mystic", "supportive", "cozy"],
  weights?: Record<string, number>
) {
  return [...mockCharacters]
    .map((character) => ({
      ...character,
      matchScore: computeCharacterMatch(character, preferredTags, weights),
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);
}

export function getCharacterBySlug(slug: string) {
  return mockCharacters.find((character) => character.slug === slug) ?? null;
}

export function getSortedAndFiltered(
  characters: Character[],
  sortBy: "match" | "rating" | "popularity" | "newest" = "popularity",
  preferredTags?: string[]
) {
  const sorted = [...characters].sort((a, b) => {
    if (sortBy === "match" && preferredTags) {
      const scoreA = computeCharacterMatch(a, preferredTags);
      const scoreB = computeCharacterMatch(b, preferredTags);
      return scoreB - scoreA;
    }
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "popularity") return b.popularity - a.popularity;
    return 0; // newest not implemented yet
  });
  return sorted;
}

export function getFilteredCharacters({
  query,
  tags,
  archetype,
  tone,
  relationshipStyle,
  includeNsfw,
  sortBy,
  preferredTags,
}: {
  query?: string;
  tags?: string[];
  archetype?: string;
  tone?: string;
  relationshipStyle?: string;
  includeNsfw?: boolean;
  sortBy?: "match" | "rating" | "popularity" | "newest";
  preferredTags?: string[];
}) {
  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const selectedTags = (tags ?? []).map((tag) => tag.toLowerCase());

  const filtered = mockCharacters.filter((character) => {
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

  return getSortedAndFiltered(filtered, sortBy || "popularity", preferredTags);
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

export function getWhyMatches(character: Character, preferredTags: string[]): { tags: string[]; reasons: string[] } {
  const matchTags = character.tags.filter((tag) => preferredTags.includes(tag));
  const reasons: string[] = [];

  if (matchTags.length > 0) {
    reasons.push(`Shares your vibe: ${matchTags.slice(0, 2).join(", ")}`);
  }

  if (character.rating >= 4.8) {
    reasons.push("Highly rated by users");
  }

  reasons.push(`${character.tone} tone`);
  reasons.push(`${character.relationshipStyle} relationship style`);

  return { tags: matchTags, reasons };
}
