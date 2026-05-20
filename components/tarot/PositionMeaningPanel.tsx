import type { TarotSpread } from "@/features/tarot/types";

export function PositionMeaningPanel({ spread }: { spread: TarotSpread }) {
  return (
    <aside className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <h2 className="font-semibold text-softGold">포지션 의미</h2>
      <div className="mt-4 space-y-3">
        {spread.positions.map((position) => (
          <div key={position.index}>
            <p className="text-sm text-gold">
              {position.index}. {position.label}
            </p>
            <p className="text-sm text-mist">{position.meaning}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
