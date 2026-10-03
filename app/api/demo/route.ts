import { mockCharacters } from "@/lib/mockData";

export function GET() {
  return Response.json({
    app: "janitor-match",
    mode: "demo",
    count: mockCharacters.length,
    characters: mockCharacters.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
    })),
  });
}
