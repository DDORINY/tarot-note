"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { TarotCard as TarotCardType, TarotOrientation } from "@/features/tarot/types";
import { TarotCardBack } from "@/components/tarot/TarotCardBack";

type Props = {
  card?: TarotCardType;
  orientation?: TarotOrientation;
  flipped?: boolean;
};

function getCardImageUrl(card?: TarotCardType) {
  return card?.imageUrl ?? card?.image_url ?? null;
}

function TextCardFace({ card, orientationText }: { card?: TarotCardType; orientationText: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-between rounded-md border border-night/20 p-2 text-center">
      <span className="rounded-full bg-night/10 px-2 py-1 text-[10px] font-semibold text-night/70">{orientationText}</span>
      <div>
        <p className="text-sm font-bold">{card?.nameKo ?? "카드"}</p>
        <p className="mt-1 text-[10px] text-night/70">{card?.nameEn ?? "Unknown"}</p>
      </div>
      <p className="text-[10px] leading-snug text-night/70">{card?.keywords.slice(0, 2).join(" · ")}</p>
    </div>
  );
}

export function TarotCard({ card, orientation = "upright", flipped = false }: Props) {
  const orientationText = orientation === "upright" ? "정방향" : "역방향";
  const imageUrl = getCardImageUrl(card);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [imageUrl]);

  const showImage = Boolean(imageUrl && !imageFailed);

  return (
    <div className="h-36 w-24 perspective-1000 sm:h-44 sm:w-28">
      <div className={`tarot-card-3d h-full w-full drop-shadow-[0_18px_28px_rgba(0,0,0,0.35)] ${flipped ? "is-flipped" : ""}`}>
        <TarotCardBack />
        <div className="tarot-card-face tarot-card-front overflow-hidden rounded-lg border border-gold/70 bg-gradient-to-b from-[#f7edd0] to-[#caa85d] p-2 text-night">
          {showImage ? (
            <div className="relative h-full overflow-hidden rounded-md border border-night/20 bg-[#f7edd0]">
              <Image
                alt={card ? `${card.nameKo} 카드` : "타로 카드"}
                className={`object-cover ${orientation === "reversed" ? "rotate-180" : ""}`}
                fill
                onError={() => setImageFailed(true)}
                sizes="112px"
                src={imageUrl ?? ""}
              />
              <div className="absolute left-1.5 top-1.5 rounded-full bg-night/75 px-2 py-1 text-[10px] font-semibold text-softGold">
                {orientationText}
              </div>
              <div className="absolute inset-x-1.5 bottom-1.5 rounded bg-night/75 px-2 py-1 text-center">
                <p className="truncate text-[11px] font-semibold text-softGold">{card?.nameKo ?? "카드"}</p>
              </div>
            </div>
          ) : (
            <TextCardFace card={card} orientationText={orientationText} />
          )}
        </div>
      </div>
    </div>
  );
}
