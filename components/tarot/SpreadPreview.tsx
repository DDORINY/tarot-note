import type { TarotSpread } from "@/features/tarot/types";

export function SpreadPreview({ spread }: { spread: TarotSpread }) {
  return (
    <div className="relative h-32 rounded-md border border-white/10 bg-black/20">
      {spread.positions.map((position) => (
        <span
          key={position.index}
          className="absolute grid h-8 w-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-sm border border-gold/50 bg-plum text-[9px] text-softGold"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: `translate(-50%, -50%) rotate(${position.rotation}deg)`,
            zIndex: position.zIndex
          }}
        >
          {position.index}
        </span>
      ))}
    </div>
  );
}
