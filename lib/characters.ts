import { Character } from "@/types/character";
import { mockCharacters } from "@/lib/mockData";

export type CharacterSort = "match" | "rating" | "popularity" | "newest";

export function normalizeTagValue(tag: string) {
  return tag.trim().toLowerCase();
}

export function getPreferenceWeights(preferredTags: string[] = []) {
  const weights: Record<string, number> = {};

  for (const tag of preferredTags) {
    const value = normalizeTagValue(tag);
    if (!value) continue;

    if (["fantasy", "mystic", "romance", "cozy", "supportive", "dark"].includes(value)) {
      weights[`tag:${value}`] = 2.5;
    }
  }

  const toneWeights: Record<string, number> = {
    dreamy: 1.4,
    gentle: 1.4,
    playful: 1.1,
    comforting: 1.5,
    calm: 1.2,
    moody: 1.0,
    warm: 1.2,
  };

  const relationWeights: Record<string, number> = {
    romantic: 1.5,
    supportive: 1.6,
    friendly: 1.1,
    intellectual: 1.2,
  };

  const archetypeWeights: Record<string, number> = {
    "mystic companion": 1.6,
    guardian: 1.3,
    adventurer: 1.2,
    navigator: 1.2,
    healer: 1.5,
    artist: 1.1,
    "dark lover": 1.0,
    rogue: 1.1,
  };

  for (const [key, value] of Object.entries(toneWeights)) {
    weights[`tone:${key}`] = value;
  }

  for (const [key, value] of Object.entries(relationWeights)) {
    weights[`relationship:${key}`] = value;
  }

  for (const [key, value] of Object.entries(archetypeWeights)) {
    weights[`archetype:${key}`] = value;
  }

  return weights;
}

export function computeCharacterMatch(character: Character, preferredTags: string[] = [], weights?: Record<string, number>) {
  const normalizedPreferences = preferredTags.map(normalizeTagValue);
  const overlap = character.tags.filter((tag) => normalizedPreferences.includes(normalizeTagValue(tag))).length;
  const ratingScore = (character.rating - 3) * 0.9;
  const popularityScore = Math.min(character.popularity / 15000, 1) * 1.3;
  const tagBoost = overlap * 3.2;
  const toneBoost = weights?.[`tone:${character.tone}`] ?? 0;
  const relationshipBoost = weights?.[`relationship:${character.relationshipStyle}`] ?? 0;
  const archetypeBoost = weights?.[`archetype:${character.archetype}`] ?? 0;

  const total = tagBoost + ratingScore + popularityScore + toneBoost + relationshipBoost + archetypeBoost;
  return Number(Math.max(0, total).toFixed(2));
}

export function getRecommendedCharactersForUser(
  preferredTags: string[] = ["fantasy", "mystic", "supportive", "cozy"],
  weights?: Record<string, number>
) {
  return [...mockCharacters]
    .map((character) => ({
      ...character,
      matchScore: computeCharacterMatch(character, preferredTags, weights ?? getPreferenceWeights(preferredTags)),
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);
}

export function getCharacterBySlug(slug: string) {
  return mockCharacters.find((character) => character.slug === slug) ?? null;
}

export function getSortedAndFiltered(
  characters: Character[],
  sortBy: CharacterSort = "popularity",
  preferredTags: string[] = []
) {
  const sorted = [...characters].sort((a, b) => {
    if (sortBy === "match") {
      return computeCharacterMatch(b, preferredTags) - computeCharacterMatch(a, preferredTags);
    }
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "popularity") return b.popularity - a.popularity;
    return 0;
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
  sortBy = "popularity",
  preferredTags = [],
}: {
  query?: string;
  tags?: string[];
  archetype?: string;
  tone?: string;
  relationshipStyle?: string;
  includeNsfw?: boolean;
  sortBy?: CharacterSort;
  preferredTags?: string[];
}) {
  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const selectedTags = (tags ?? []).map(normalizeTagValue);

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
        character.tags.some((characterTag) => normalizeTagValue(characterTag) === tag)
      );
      if (!matches) return false;
    }

    if (!includeNsfw && character.isNsfw) {
      return false;
    }

    return true;
  });

  return getSortedAndFiltered(filtered, sortBy, preferredTags);
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

export function getWhyMatches(character: Character, preferredTags: string[]) {
  const matchTags = character.tags.filter((tag) => preferredTags.some((preference) => normalizeTagValue(preference) === normalizeTagValue(tag)));
  const reasons: string[] = [];

  if (matchTags.length > 0) {
    reasons.push(`Matches your vibe with ${matchTags.slice(0, 2).join(" + ")}`);
  }

  if (character.rating >= 4.8) {
    reasons.push("Strong user rating and consistency");
  }

  if (character.popularity >= 8000) {
    reasons.push("High popularity among similar users");
  }

  reasons.push(`${character.tone} tone fits the mood you tend to prefer`);
  reasons.push(`${character.relationshipStyle} relationship style matches your pattern`);

  return { tags: matchTags, reasons };
}

export { mockCharacters } from "@/lib/mockData";
