import { mockCharacters } from "@/lib/mockData";
import { getCharacterRecommendations } from "@/lib/search";

export function GET() {
  const preferredTags = ["fantasy", "mystic", "supportive", "cozy"];
  const recommendations = getCharacterRecommendations(preferredTags);

  return Response.json({
    summary: "Demo recommendation engine loaded.",
    characters: recommendations,
    count: recommendations.length,
  });
}
