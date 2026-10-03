import { NextRequest, NextResponse } from "next/server";
import { getCharacterBySlug, getRecommendedCharactersForUser } from "@/lib/characters";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const character = getCharacterBySlug(slug);
    return character
      ? NextResponse.json({ character })
      : NextResponse.json({ error: "Character not found" }, { status: 404 });
  }

  const preferredTags = ["fantasy", "supportive", "cozy", "mystic"];

  return NextResponse.json({
    recommendations: getRecommendedCharactersForUser(preferredTags),
  });
}
