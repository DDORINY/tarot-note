import { NextResponse } from "next/server";
import { tarotSpreads } from "@/data/mock-spreads";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createSupabaseServiceClient();

  if (!supabase) return NextResponse.json(tarotSpreads);

  const { data, error } = await supabase
    .from("spreads")
    .select("id,name,description,category,card_count,is_premium,spread_positions(position_index,label,meaning,x,y,rotation,z_index)")
    .order("card_count");

  if (error || !data) return NextResponse.json(tarotSpreads);

  return NextResponse.json(
    data.map((spread) => ({
      id: spread.id,
      name: spread.name,
      description: spread.description,
      category: spread.category,
      cardCount: spread.card_count,
      isPremium: spread.is_premium,
      positions: spread.spread_positions
        .sort((a, b) => a.position_index - b.position_index)
        .map((position) => ({
          index: position.position_index,
          label: position.label,
          meaning: position.meaning,
          x: Number(position.x),
          y: Number(position.y),
          rotation: Number(position.rotation),
          zIndex: position.z_index
        }))
    }))
  );
}
