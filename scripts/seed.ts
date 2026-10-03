import { mockCharacters } from "@/lib/mockData";

export function GET() {
  const data = mockCharacters
    .slice(0, 4)
    .map((character) => ({
      ...character,
      matchScore: (character.rating * 20 + character.popularity / 100).toFixed(1),
    }));

  return Response.json({ recommendations: data });
}
