"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
import { Loading } from "@/components/common/Loading";
import { PositionMeaningPanel } from "@/components/tarot/PositionMeaningPanel";
import { SpreadBoard } from "@/components/tarot/SpreadBoard";
import { TarotCard } from "@/components/tarot/TarotCard";
import { tarotCards } from "@/data/mock-cards";
import { tarotSpreads } from "@/data/mock-spreads";
import { shuffleDeck } from "@/features/tarot/draw-utils";
import type { DrawnCard, TarotCard as TarotCardType, TarotSpread } from "@/features/tarot/types";
import { routes } from "@/lib/routes";

function deckCardRotation(index: number, shuffleCount: number) {
  return ((index * 7 + shuffleCount * 11) % 17) - 8;
}

function deckCardLift(index: number, shuffleCount: number) {
  return ((index * 5 + shuffleCount * 3) % 9) - 4;
}

function deckCardLeft(index: number, total: number) {
  if (total <= 1) return 50;

  const start = 7;
  const end = 93;
  return start + (index / (total - 1)) * (end - start);
}

export default function DrawPage() {
  const router = useRouter();
  const [spread, setSpread] = useState<TarotSpread | null>(null);
  const [deck, setDeck] = useState<TarotCardType[]>([]);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [shuffleCount, setShuffleCount] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  useEffect(() => {
    const storedSpread = window.sessionStorage.getItem("tarot-note:selected-spread");
    const nextSpread = storedSpread ? (JSON.parse(storedSpread) as TarotSpread) : tarotSpreads[0];
    setSpread(nextSpread);
    setDeck(shuffleDeck(tarotCards));
  }, []);

  const pickedCount = drawnCards.length;
  const remainingDeck = useMemo(() => deck.filter((card) => !selectedCardIds.includes(card.id)), [deck, selectedCardIds]);
  const allPicked = useMemo(() => Boolean(spread && pickedCount >= spread.cardCount), [pickedCount, spread]);

  function pickCard(card: TarotCardType) {
    if (!spread || allPicked || selectedCardIds.includes(card.id)) return;

    const nextPosition = spread.positions[pickedCount];
    if (!nextPosition) return;

    setDrawnCards((current) => [
      ...current,
      {
        position: nextPosition,
        card,
        orientation: Math.random() > 0.5 ? "upright" : "reversed"
      }
    ]);
    setSelectedCardIds((current) => [...current, card.id]);
  }

  function reveal(index: number) {
    if (!drawnCards[index]) return;
    setRevealed((current) => (current.includes(index) ? current : [...current, index]));
  }

  function reshuffle() {
    setDeck(shuffleDeck(tarotCards));
    setDrawnCards([]);
    setSelectedCardIds([]);
    setRevealed([]);
    setHoveredCardId(null);
    setShuffleCount((current) => current + 1);
  }

  function finish() {
    window.sessionStorage.setItem("tarot-note:drawn-cards", JSON.stringify(drawnCards));
    router.push(routes.result);
  }

  if (!spread) return <Loading />;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-gold">{spread.name}</p>
            <h1 className="mt-2 text-3xl font-semibold text-softGold">섞인 덱에서 직접 뽑기</h1>
            <p className="mt-2 text-sm text-mist">
              카드 뒷면만 보고 {spread.cardCount}장을 고르세요. 마우스를 올리면 그 카드만 앞으로 떠오릅니다.
            </p>
          </div>
          <Button className="gap-2" onClick={reshuffle} variant="secondary">
            <RotateCcw size={16} />
            다시 셔플
          </Button>
        </div>

        <div className="overflow-hidden rounded-lg border border-white/10 bg-black/20 p-4 shadow-glow">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-mist">
              뽑은 카드 {pickedCount} / {spread.cardCount}
            </p>
            {allPicked && <p className="text-sm text-gold">모든 카드를 뽑았습니다. 보드에서 카드를 뒤집어 확인하세요.</p>}
          </div>

          <div className="relative h-52 sm:h-64">
            <div className="absolute inset-x-0 top-8 h-36 sm:top-10 sm:h-44">
              {remainingDeck.map((card, index) => {
                const isHovered = hoveredCardId === card.id;

                return (
                  <button
                    aria-label={`${index + 1}번째 섞인 카드 뽑기`}
                    className="group absolute top-0 rounded-lg outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-gold disabled:cursor-default"
                    disabled={allPicked}
                    key={card.id}
                    onBlur={() => setHoveredCardId(null)}
                    onClick={() => pickCard(card)}
                    onFocus={() => setHoveredCardId(card.id)}
                    onMouseEnter={() => setHoveredCardId(card.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    style={{
                      left: `${deckCardLeft(index, remainingDeck.length)}%`,
                      transform: `translateX(-50%) translateY(${isHovered ? -28 : deckCardLift(index, shuffleCount)}px) rotate(${
                        isHovered ? 0 : deckCardRotation(index, shuffleCount)
                      }deg) scale(${isHovered ? 1.18 : 1})`,
                      zIndex: isHovered ? 1000 : index
                    }}
                    type="button"
                  >
                    <div className="transition duration-200 group-hover:drop-shadow-[0_24px_36px_rgba(246,200,107,0.28)]">
                      <TarotCard card={card} orientation="upright" flipped={false} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <SpreadBoard spread={spread} drawnCards={drawnCards} revealedIndexes={revealed} onReveal={reveal} />
        <Button className="w-full" disabled={!allPicked} onClick={finish}>
          리딩 결과 보기
        </Button>
      </div>
      <PositionMeaningPanel spread={spread} />
    </div>
  );
}
