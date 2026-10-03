import { NextRequest, NextResponse } from "next/server";
import { getFilteredCharacters, getRecommendedCharactersForUser } from "@/lib/characters";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const tags = searchParams.get("tags")?.split(",").map((tag) => tag.trim()) ?? [];
  const tone = searchParams.get("tone") ?? "";
  const relationshipStyle = searchParams.get("relationshipStyle") ?? "";
  const archetype = searchParams.get("archetype") ?? "";
  const includeNsfw = searchParams.get("nsfw") === "true";

  const characters = getFilteredCharacters({
    query: q,
    tags,
    tone,
    relationshipStyle,
    archetype,
    includeNsfw,
  });

  return NextResponse.json({
    characters,
    total: characters.length,
  });
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const tags = payload.preferredTags ?? ["fantasy", "supportive", "cozy", "mystic"];
  return NextResponse.json({
    recommendations: getRecommendedCharactersForUser(tags),
  });
}
