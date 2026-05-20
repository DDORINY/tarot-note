import type { ReadingResult as ReadingResultType } from "@/features/tarot/types";
import { Card } from "@/components/common/Card";
import { TarotCard } from "@/components/tarot/TarotCard";

export function ReadingResult({ result }: { result: ReadingResultType }) {
  const sections = [
    ["전체 흐름 요약", result.summary],
    ["핵심 카드 메시지", result.keyMessage],
    ["카드 간 연결 해석", result.connection],
    ["현재 상황", result.current],
    ["앞으로의 가능성", result.flow],
    ["현실적인 조언", result.advice],
    ["오늘의 한 문장", result.oneLine]
  ] as const;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map(([title, text], index) => (
          <Card key={title} className={index === 0 ? "md:col-span-2" : undefined}>
            <h2 className="text-lg font-semibold text-softGold">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-mist">{text}</p>
          </Card>
        ))}
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-softGold">카드별 해석</h2>
          <p className="mt-2 text-sm text-mist">각 위치의 의미와 카드 메시지를 함께 확인하세요.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {result.cards.map((card) => (
            <Card key={`${card.positionIndex}-${card.cardId}`} className="grid gap-4 sm:grid-cols-[112px_1fr]">
              <div className="flex justify-center sm:justify-start">
                <TarotCard
                  card={{
                    id: card.cardId,
                    nameKo: card.cardName,
                    nameEn: card.cardNameEn ?? card.cardId,
                    arcana: "major",
                    suit: null,
                    number: null,
                    uprightMeaning: "",
                    reversedMeaning: "",
                    keywords: card.keywords ?? [],
                    imageUrl: null
                  }}
                  orientation={card.orientation}
                  flipped
                />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-softGold">
                    {card.positionIndex}. {card.positionLabel}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-mist">
                    {card.orientation === "upright" ? "정방향" : "역방향"}
                  </span>
                </div>
                <h3 className="mt-3 font-semibold text-softGold">{card.cardName}</h3>
                <p className="mt-2 text-xs leading-5 text-gold">{card.positionMeaning}</p>
                <p className="mt-3 text-sm leading-6 text-mist">{card.interpretation}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
