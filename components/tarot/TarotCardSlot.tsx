"use client";

import type { DrawnCard, SpreadPosition } from "@/features/tarot/types";
import { TarotCard } from "@/components/tarot/TarotCard";

type Props = {
  position: SpreadPosition;
  drawnCard?: DrawnCard;
  revealed: boolean;
  onReveal?: () => void;
};

export function TarotCardSlot({ position, drawnCard, revealed, onReveal }: Props) {
  return (
    <button
      aria-label={`${position.label} 카드 ${revealed ? "열림" : "선택"}`}
      className="absolute -translate-x-1/2 -translate-y-1/2 text-left transition-transform duration-300 hover:scale-[1.03] disabled:cursor-default disabled:hover:scale-100"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) rotate(${position.rotation}deg)`,
        zIndex: position.zIndex
      }}
      disabled={revealed}
      onClick={() => {
        if (!revealed) onReveal?.();
      }}
      type="button"
    >
      <TarotCard card={drawnCard?.card} orientation={drawnCard?.orientation} flipped={revealed} />
      <span className="mt-2 block w-24 text-center text-xs text-softGold sm:w-28">{position.label}</span>
    </button>
  );
}
