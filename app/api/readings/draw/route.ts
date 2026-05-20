import { NextResponse } from "next/server";
import { generateTemplateReading } from "@/lib/reading-engine";
import type { ReadingRequest } from "@/features/tarot/types";

export async function POST(request: Request) {
  const body = (await request.json()) as ReadingRequest;

  if (!body.question || !body.category || !body.spread || !body.drawnCards?.length) {
    return NextResponse.json({ message: "Invalid reading request" }, { status: 400 });
  }

  return NextResponse.json(generateTemplateReading(body));
}
