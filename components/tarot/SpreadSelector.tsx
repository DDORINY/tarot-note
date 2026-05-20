"use client";

import { BadgeCheck, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import type { TarotSpread } from "@/features/tarot/types";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { SpreadPreview } from "@/components/tarot/SpreadPreview";
import { ENABLE_PREMIUM_BYPASS } from "@/lib/constants";
import { routes } from "@/lib/routes";

const spreadRecommendations: Record<string, string> = {
  "three-card": "오늘의 흐름, 간단한 고민",
  "four-card": "조언이 필요한 고민",
  "five-card": "문제 분석, 관계 흐름",
  "magic-seven": "연애, 재회, 진로 정밀 리딩",
  "celtic-cross": "종합 정밀 리딩",
  "flower-twelve": "월간/연간 운세"
};

export function SpreadSelector({ spreads }: { spreads: TarotSpread[] }) {
  const router = useRouter();

  function selectSpread(spread: TarotSpread) {
    if (spread.isPremium && !ENABLE_PREMIUM_BYPASS) {
      router.push(routes.pricing);
      return;
    }

    window.sessionStorage.setItem("tarot-note:selected-spread", JSON.stringify(spread));
    router.push(routes.tarot);
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {spreads.map((spread) => {
        const locked = spread.isPremium && !ENABLE_PREMIUM_BYPASS;

        return (
          <Card key={spread.id} className="flex flex-col gap-4">
            <SpreadPreview spread={spread} />
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-softGold">{spread.name}</h3>
                  <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-mist">{spread.cardCount}장</span>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${spread.isPremium ? "bg-gold/15 text-softGold" : "bg-emerald-400/15 text-emerald-200"}`}>
                    {spread.isPremium ? "프리미엄" : "무료"}
                  </span>
                  {locked && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 px-2 py-1 text-xs text-softGold">
                      <Lock size={12} />
                      잠금
                    </span>
                  )}
                </div>
                <p className="mt-2 flex items-center gap-2 text-sm text-gold">
                  <BadgeCheck size={15} />
                  {spreadRecommendations[spread.id]}
                </p>
                <p className="mt-2 text-sm leading-6 text-mist">{spread.description}</p>
              </div>
            </div>
            <Button variant={locked ? "secondary" : "primary"} onClick={() => selectSpread(spread)}>
              {locked ? "프리미엄 보기" : "선택하기"}
            </Button>
          </Card>
        );
      })}
    </div>
  );
}
