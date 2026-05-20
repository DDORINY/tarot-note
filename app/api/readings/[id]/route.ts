import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ message: "Supabase is not configured." }, { status: 500 });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ message: "Login required." }, { status: 401 });

  const { data, error } = await supabase
    .from("readings")
    .select("*, spreads(name), reading_cards(*, tarot_cards(name_ko, name_en, keywords, image_url)), diary_entries(*)")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (error) return NextResponse.json({ message: error.message }, { status: error.code === "PGRST116" ? 404 : 500 });

  return NextResponse.json(data);
}
