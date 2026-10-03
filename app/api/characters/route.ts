import { NextRequest, NextResponse } from "next/server";
import { mockCharacters } from "@/lib/mockData";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() ?? "";
  const tags = (searchParams.get("tags") ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  let results = [...mockCharacters];

  if (q) {
    results = results.filter((character) => {
      const haystack = [
        character.name,
        character.summary,
        character.description,
        character.personality,
        character.tags.join(" "),
        character.archetype,
        character.tone,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }

  if (tags.length > 0) {
    results = results.filter((character) =>
      tags.every((tag) => character.tags.some((characterTag) => characterTag.toLowerCase() === tag.toLowerCase()))
    );
  }

  return NextResponse.json({ characters: results });
}
