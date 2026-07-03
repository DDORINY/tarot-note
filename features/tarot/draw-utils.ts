import type { DrawnCard, TarotCard, TarotSpread } from "@/features/tarot/types";

function randomIndex(maxExclusive: number) {
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % maxExclusive;
  }

  return Math.floor(Math.random() * maxExclusive);
}

export function shuffleDeck(deck: TarotCard[]) {
  const shuffled = [...deck];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = randomIndex(index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export function drawCards(spread: TarotSpread, deck: TarotCard[]): DrawnCard[] {
  const shuffled = shuffleDeck(deck);

  return spread.positions.slice(0, spread.cardCount).map((position, index) => ({
    position,
    card: shuffled[index],
    orientation: Math.random() > 0.5 ? "upright" : "reversed"
  }));
}
