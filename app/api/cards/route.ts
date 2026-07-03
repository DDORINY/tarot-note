import { NextResponse } from "next/server";
import { tarotCards } from "@/data/mock-cards";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createSupabaseServiceClient();

  if (!supabase) return NextResponse.json(tarotCards);

  const { data, error } = await supabase.from("tarot_cards").select("*").order("number");

  if (error || !data) return NextResponse.json(tarotCards);

  return NextResponse.json(
    data.map((card) => ({
      id: card.id,
      nameKo: card.name_ko,
      nameEn: card.name_en,
      arcana: card.arcana,
      suit: card.suit,
      number: card.number,
      uprightMeaning: card.upright_meaning,
      reversedMeaning: card.reversed_meaning,
      keywords: card.keywords,
      imageUrl: card.image_url
    }))
  );
}
