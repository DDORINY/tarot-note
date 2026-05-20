import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ReadingCardPayload = {
  positionIndex: number;
  positionLabel: string;
  positionMeaning: string;
  cardId: string;
  orientation: string;
  interpretation: string;
};

export async function GET() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json([]);

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json([], { status: 401 });

  const { data, error } = await supabase
    .from("readings")
    .select("*, spreads(name), reading_cards(*, tarot_cards(name_ko, name_en, keywords, image_url)), diary_entries(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ message: "Supabase is not configured." }, { status: 500 });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ message: "Login required." }, { status: 401 });

  const body = await request.json();
  const { data: reading, error } = await supabase
    .from("readings")
    .insert({
      user_id: user.id,
      spread_id: body.spreadId,
      category: body.category,
      question: body.question,
      result_summary: body.resultSummary,
      advice: body.advice
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  if (body.cards?.length) {
    const { error: cardsError } = await supabase.from("reading_cards").insert(
      body.cards.map((card: ReadingCardPayload) => ({
        reading_id: reading.id,
        position_index: card.positionIndex,
        position_label: card.positionLabel,
        position_meaning: card.positionMeaning,
        card_id: card.cardId,
        orientation: card.orientation,
        interpretation: card.interpretation
      }))
    );

    if (cardsError) return NextResponse.json({ message: cardsError.message }, { status: 500 });
  }

  return NextResponse.json({ id: reading.id });
}
