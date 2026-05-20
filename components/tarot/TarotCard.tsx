import type { TarotCard as TarotCardType, TarotOrientation } from "@/features/tarot/types";
import { TarotCardBack } from "@/components/tarot/TarotCardBack";

type Props = {
  card?: TarotCardType;
  orientation?: TarotOrientation;
  flipped?: boolean;
};

export function TarotCard({ card, orientation = "upright", flipped = false }: Props) {
  return (
    <div className="h-36 w-24 perspective-1000 sm:h-44 sm:w-28">
      <div className={`tarot-card-3d relative h-full w-full drop-shadow-[0_18px_28px_rgba(0,0,0,0.35)] ${flipped ? "is-flipped" : ""}`}>
        <TarotCardBack />
        <div className="tarot-card-face tarot-card-front absolute inset-0 rounded-lg border border-gold/70 bg-gradient-to-b from-[#f7edd0] to-[#caa85d] p-2 text-night">
          <div className="flex h-full flex-col items-center justify-between rounded-md border border-night/20 p-2 text-center">
            <span className="rounded-full bg-night/10 px-2 py-1 text-[10px] font-semibold uppercase text-night/70">
              {orientation === "upright" ? "Upright" : "Reversed"}
            </span>
            <div>
              <p className="text-sm font-bold">{card?.nameKo ?? "카드"}</p>
              <p className="mt-1 text-[10px] text-night/70">{card?.nameEn ?? "Unknown"}</p>
            </div>
            <p className="text-[10px] leading-snug text-night/70">{card?.keywords.slice(0, 2).join(" · ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
