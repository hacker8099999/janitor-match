import { NextRequest, NextResponse } from "next/server";
import { mockCharacters } from "@/lib/mockData";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const character = mockCharacters.find((entry) => entry.slug === slug);

  if (!character) {
    return NextResponse.json({ error: "Character not found" }, { status: 404 });
  }

  return NextResponse.json({ character });
}
