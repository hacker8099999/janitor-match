import { NextResponse } from "next/server";
import { mockCharacters } from "@/lib/mockData";

export async function GET() {
  const characters = mockCharacters
    .map((character) => ({
      ...character,
      score: character.rating * 2 + character.popularity / 5000,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  return NextResponse.json({ recommendations: characters });
}
