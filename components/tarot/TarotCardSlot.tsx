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
  const isEmpty = !drawnCard;

  return (
    <button
      aria-label={`${position.label} 카드 ${isEmpty ? "대기" : revealed ? "열림" : "뒤집기"}`}
      className="absolute -translate-x-1/2 -translate-y-1/2 text-left transition-transform duration-300 hover:scale-[1.03] disabled:cursor-default disabled:hover:scale-100"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) rotate(${position.rotation}deg)`,
        zIndex: position.zIndex
      }}
      disabled={isEmpty || revealed}
      onClick={() => {
        if (!isEmpty && !revealed) onReveal?.();
      }}
      type="button"
    >
      {isEmpty ? (
        <div className="grid h-36 w-24 place-items-center rounded-lg border border-dashed border-gold/30 bg-white/[0.03] text-center text-[11px] text-mist sm:h-44 sm:w-28">
          <span>
            {position.index}
            <br />
            대기
          </span>
        </div>
      ) : (
        <TarotCard card={drawnCard.card} orientation={drawnCard.orientation} flipped={revealed} />
      )}
      <span className="mt-2 block w-24 text-center text-xs text-softGold sm:w-28">{position.label}</span>
    </button>
  );
}
