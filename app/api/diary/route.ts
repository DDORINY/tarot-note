import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ message: "Supabase is not configured." }, { status: 500 });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ message: "Login required." }, { status: 401 });

  const body = await request.json();
  const emotion = typeof body.emotion === "string" && body.emotion.length > 0 ? body.emotion : null;
  const note = typeof body.note === "string" && body.note.trim().length > 0 ? body.note.trim() : "";

  if (!body.readingId) return NextResponse.json({ message: "readingId is required." }, { status: 400 });
  if (!emotion && !note) return NextResponse.json({ skipped: true });

  const { error } = await supabase.from("diary_entries").insert({
    user_id: user.id,
    reading_id: body.readingId,
    emotion,
    note
  });

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
