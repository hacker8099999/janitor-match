import { mockCharacters } from "@/lib/mockData";

export function GET() {
  return Response.json({ characters: mockCharacters.slice(0, 3) });
}
