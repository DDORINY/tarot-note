"use client";

import type { DrawnCard, TarotSpread } from "@/features/tarot/types";
import { TarotCardSlot } from "@/components/tarot/TarotCardSlot";

type Props = {
  spread: TarotSpread;
  drawnCards?: DrawnCard[];
  revealedIndexes?: number[];
  onReveal?: (index: number) => void;
};

export function SpreadBoard({ spread, drawnCards = [], revealedIndexes = [], onReveal }: Props) {
  return (
    <div className="relative min-h-[520px] w-full overflow-hidden rounded-lg border border-white/10 bg-black/20 shadow-glow">
      {spread.positions.map((position, index) => (
        <TarotCardSlot
          key={position.index}
          position={position}
          drawnCard={drawnCards[index]}
          revealed={revealedIndexes.includes(index)}
          onReveal={() => onReveal?.(index)}
        />
      ))}
    </div>
  );
}
