import type { CardInterpretation, ReadingResult as ReadingResultType } from "@/features/tarot/types";
import { Card } from "@/components/common/Card";
import { TarotCard } from "@/components/tarot/TarotCard";

function CardThumb({ card }: { card: CardInterpretation }) {
  return (
    <TarotCard
      card={{
        id: card.cardId,
        nameKo: card.cardName,
        nameEn: card.cardNameEn ?? card.cardId,
        arcana: card.arcana ?? "major",
        suit: card.suit ?? null,
        number: card.number ?? null,
        uprightMeaning: card.uprightMeaning ?? "",
        reversedMeaning: card.reversedMeaning ?? "",
        keywords: card.keywords ?? [],
        imageUrl: card.imageUrl ?? card.image_url ?? null
      }}
      orientation={card.orientation}
      flipped
    />
  );
}

export function ReadingResult({ result }: { result: ReadingResultType }) {
  const story = result.story;

  return (
    <div className="space-y-8">
      {story && (
        <section className="space-y-5">
          <Card className="border-gold/30 bg-gold/[0.07]">
            <p className="text-sm text-gold">Story Reading</p>
            <h2 className="mt-2 text-2xl font-semibold text-softGold">{story.title}</h2>
            <p className="mt-4 text-lg leading-8 text-softGold">{story.oneLineSummary}</p>
            <p className="mt-4 text-base leading-8 text-mist">{story.overallTheme}</p>
            <p className="mt-4 text-base leading-8 text-mist">{story.emotionalFlow}</p>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-softGold">카드별 위치 해석</h3>
            <div className="grid gap-4">
              {story.positionNarratives.map((item) => {
                const matchingCard = result.cards.find((card) => card.positionIndex === Number(item.positionId) && card.cardId === item.cardId);

                return (
                  <Card key={`${item.positionId}-${item.cardId}`} className="grid gap-4 sm:grid-cols-[112px_1fr]">
                    {matchingCard && (
                      <div className="flex justify-center sm:justify-start">
                        <CardThumb card={matchingCard} />
                      </div>
                    )}
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-softGold">
                          {item.positionId}. {item.positionName}
                        </span>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-mist">
                          {item.cardNameKo} · {item.orientation === "upright" ? "정방향" : "역방향"}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-softGold">{item.headline}</h4>
                      <p className="text-sm leading-7 text-mist">{item.narrative}</p>
                      {item.transitionToNext && <p className="text-sm leading-7 text-gold">{item.transitionToNext}</p>}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <h3 className="text-lg font-semibold text-softGold">카드 간 연결 해석</h3>
              <p className="mt-3 text-sm leading-7 text-mist">{story.connectionNarrative}</p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-softGold">조언</h3>
              <p className="mt-3 text-sm leading-7 text-mist">{story.advice}</p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-softGold">주의할 점</h3>
              <p className="mt-3 text-sm leading-7 text-mist">{story.caution}</p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-softGold">마무리 문장</h3>
              <p className="mt-3 text-sm leading-7 text-mist">{story.closing}</p>
            </Card>
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-softGold">기존 카드별 의미 상세</h2>
          <p className="mt-2 text-sm text-mist">각 카드의 기본 의미와 위치 의미를 함께 다시 확인하세요.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {result.cards.map((card) => (
            <Card key={`${card.positionIndex}-${card.cardId}`} className="grid gap-4 sm:grid-cols-[112px_1fr]">
              <div className="flex justify-center sm:justify-start">
                <CardThumb card={card} />
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
                <p className="mt-3 text-sm leading-7 text-mist">{card.interpretation}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
