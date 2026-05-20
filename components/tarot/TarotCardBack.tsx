"use client";

import Image from "next/image";
import { useState } from "react";

export function TarotCardBack() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="tarot-card-face tarot-card-back overflow-hidden rounded-lg border border-gold/60 bg-[radial-gradient(circle,#3b2358_0%,#12091f_70%)] p-2">
      {!imageFailed && (
        <div className="relative h-full w-full overflow-hidden rounded-md">
          <Image
            alt="타로 카드 뒷면"
            className="object-cover"
            fill
            onError={() => setImageFailed(true)}
            sizes="112px"
            src="/images/card-back.png"
          />
        </div>
      )}
      {imageFailed && (
        <div className="grid h-full place-items-center rounded-md border border-gold/30">
          <div className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-softGold">Tarot</div>
        </div>
      )}
    </div>
  );
}
