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
    <div className="space-y-6">
      {result.story && (
        <section className="space-y-4">
          <Card className="border-gold/30 bg-gold/[0.07]">
            <p className="text-sm text-gold">Story Reading</p>
            <h2 className="mt-2 text-2xl font-semibold text-softGold">{result.story.title}</h2>
            <p className="mt-4 text-base leading-8 text-mist">{result.story.opening}</p>
            <p className="mt-4 text-base leading-8 text-mist">{result.story.storyFlow}</p>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <h3 className="text-lg font-semibold text-softGold">감정의 흐름</h3>
              <p className="mt-3 text-sm leading-7 text-mist">{result.story.emotionalInsight}</p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-softGold">전환점</h3>
              <p className="mt-3 text-sm leading-7 text-mist">{result.story.turningPoint}</p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-softGold">가능한 결과</h3>
              <p className="mt-3 text-sm leading-7 text-mist">{result.story.possibleOutcome}</p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-softGold">리딩 조언</h3>
              <p className="mt-3 text-sm leading-7 text-mist">{result.story.advice}</p>
            </Card>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-softGold">카드가 이어지는 장면</h3>
            <div className="grid gap-4">
              {result.story.cardNarratives.map((card) => (
                <Card key={`${card.positionIndex}-${card.cardName}`} className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-softGold">
                      {card.positionIndex}. {card.positionLabel}
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-mist">
                      {card.cardName} · {card.orientation === "upright" ? "정방향" : "역방향"}
                    </span>
                  </div>
                  <p className="text-sm leading-7 text-mist">{card.scene}</p>
                  <p className="text-sm leading-7 text-mist">{card.interpretation}</p>
                  {card.connectionToNext && <p className="text-sm leading-7 text-gold">{card.connectionToNext}</p>}
                </Card>
              ))}
            </div>
          </div>

          <Card>
            <h3 className="text-lg font-semibold text-softGold">마무리 메시지</h3>
            <p className="mt-3 text-base leading-8 text-mist">{result.story.closingMessage}</p>
          </Card>
        </section>
      )}

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-softGold">리딩 핵심 정리</h2>
          <p className="mt-2 text-sm text-mist">서사형 리딩을 바탕으로 핵심 섹션을 다시 정리했습니다.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {sections.map(([title, text], index) => (
            <Card key={title} className={index === 0 ? "md:col-span-2" : undefined}>
              <h3 className="text-lg font-semibold text-softGold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-mist">{text}</p>
            </Card>
          ))}
        </div>
      </section>

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
