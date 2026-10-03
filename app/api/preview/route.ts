import { mockCharacters } from "@/lib/mockData";
import { scoreCharacterRecommendation } from "@/lib/recommendations";

export function GET() {
  const preferredTags = ["fantasy", "mystic", "supportive", "cozy"];

  const recommendations = [...mockCharacters]
    .map((character) => ({
      character,
      score: scoreCharacterRecommendation(character, preferredTags),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ character, score }) => ({ ...character, matchScore: Number(score.toFixed(2)) }));

  return Response.json({ recommendations });
}
