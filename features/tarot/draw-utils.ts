import type { DrawnCard, TarotCard, TarotSpread } from "@/features/tarot/types";

export function drawCards(spread: TarotSpread, deck: TarotCard[]): DrawnCard[] {
  const shuffled = [...deck].sort(() => Math.random() - 0.5);

  return spread.positions.slice(0, spread.cardCount).map((position, index) => ({
    position,
    card: shuffled[index],
    orientation: Math.random() > 0.5 ? "upright" : "reversed"
  }));
}
