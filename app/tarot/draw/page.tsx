"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
import { Loading } from "@/components/common/Loading";
import { PositionMeaningPanel } from "@/components/tarot/PositionMeaningPanel";
import { SpreadBoard } from "@/components/tarot/SpreadBoard";
import { majorArcanaCards } from "@/data/mock-cards";
import { tarotSpreads } from "@/data/mock-spreads";
import { drawCards } from "@/features/tarot/draw-utils";
import type { DrawnCard, TarotSpread } from "@/features/tarot/types";
import { routes } from "@/lib/routes";

export default function DrawPage() {
  const router = useRouter();
  const [spread, setSpread] = useState<TarotSpread | null>(null);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [revealed, setRevealed] = useState<number[]>([]);

  useEffect(() => {
    const storedSpread = window.sessionStorage.getItem("tarot-note:selected-spread");
    const nextSpread = storedSpread ? (JSON.parse(storedSpread) as TarotSpread) : tarotSpreads[0];
    setSpread(nextSpread);
    setDrawnCards(drawCards(nextSpread, majorArcanaCards));
  }, []);

  const allRevealed = useMemo(() => Boolean(spread && revealed.length >= spread.cardCount), [revealed.length, spread]);

  function reveal(index: number) {
    setRevealed((current) => (current.includes(index) ? current : [...current, index]));
  }

  function finish() {
    window.sessionStorage.setItem("tarot-note:drawn-cards", JSON.stringify(drawnCards));
    router.push(routes.result);
  }

  if (!spread) return <Loading />;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gold">{spread.name}</p>
          <h1 className="mt-2 text-3xl font-semibold text-softGold">카드를 선택하세요</h1>
        </div>
        <SpreadBoard spread={spread} drawnCards={drawnCards} revealedIndexes={revealed} onReveal={reveal} />
        <Button className="w-full" disabled={!allRevealed} onClick={finish}>
          리딩 결과 보기
        </Button>
      </div>
      <PositionMeaningPanel spread={spread} />
    </div>
  );
}
