import type { CardInterpretation, DrawnCard, TarotSpread, TarotSuit } from "@/features/tarot/types";

type ProfileCard = DrawnCard | CardInterpretation;

function getArcana(item: ProfileCard) {
  return "card" in item ? item.card.arcana : item.arcana;
}

function getSuit(item: ProfileCard) {
  return "card" in item ? item.card.suit : item.suit;
}

function getPositionLabel(item: ProfileCard) {
  return "position" in item ? item.position.label : item.positionLabel;
}

function getCardName(item: ProfileCard) {
  return "card" in item ? item.card.nameKo : item.cardName;
}

export type ReadingProfile = {
  dominantSuit: TarotSuit | null;
  suitCounts: Partial<Record<TarotSuit, number>>;
  majorCount: number;
  reversedCount: number;
  hasManyReversed: boolean;
  resultCard: ProfileCard;
  adviceCard?: ProfileCard;
  hasRepeatedSuit: boolean;
  hasCupsSwordsTension: boolean;
  hasWandsPentaclesBlend: boolean;
  emotionalTone: string;
  practicalTone: string;
  conflictTone: string;
};

export function buildReadingProfile(cards: ProfileCard[], _spread?: TarotSpread): ReadingProfile {
  const suitCounts: Partial<Record<TarotSuit, number>> = {};

  for (const card of cards) {
    const suit = getSuit(card);
    if (suit) suitCounts[suit] = (suitCounts[suit] ?? 0) + 1;
  }

  const dominantSuit =
    (Object.entries(suitCounts).sort((a, b) => b[1] - a[1])[0]?.[0] as TarotSuit | undefined) ?? null;
  const majorCount = cards.filter((card) => getArcana(card) === "major").length;
  const reversedCount = cards.filter((card) => card.orientation === "reversed").length;
  const resultCard = [...cards].reverse().find((card) => /(결과|미래|최종)/.test(getPositionLabel(card))) ?? cards[cards.length - 1];
  const adviceCard = cards.find((card) => /(조언|해결|마스터|조절|조심)/.test(getPositionLabel(card)));
  const hasRepeatedSuit = Object.values(suitCounts).some((count) => (count ?? 0) >= Math.max(2, Math.ceil(cards.length / 3)));
  const hasCupsSwordsTension = Boolean((suitCounts.cups ?? 0) > 0 && (suitCounts.swords ?? 0) > 0);
  const hasWandsPentaclesBlend = Boolean((suitCounts.wands ?? 0) > 0 && (suitCounts.pentacles ?? 0) > 0);
  const hasManyReversed = reversedCount >= Math.ceil(cards.length / 2);

  return {
    dominantSuit,
    suitCounts,
    majorCount,
    reversedCount,
    hasManyReversed,
    resultCard,
    adviceCard,
    hasRepeatedSuit,
    hasCupsSwordsTension,
    hasWandsPentaclesBlend,
    emotionalTone: hasCupsSwordsTension
      ? "마음은 반응하지만 생각이 쉽게 결론을 허락하지 않는 흐름"
      : dominantSuit === "cups"
        ? "감정과 관계의 온도가 리딩의 중심에 놓인 흐름"
        : "감정보다 상황을 바라보는 태도가 더 크게 작용하는 흐름",
    practicalTone: hasWandsPentaclesBlend
      ? "하고 싶은 마음과 실제로 감당해야 할 조건을 함께 조율해야 하는 흐름"
      : dominantSuit === "pentacles"
        ? "현실 조건, 안정감, 지속 가능성이 중요한 흐름"
        : "현실적인 행동을 작게 정리할수록 방향이 선명해지는 흐름",
    conflictTone: hasManyReversed
      ? "겉으로 드러난 사건보다 안쪽의 망설임과 지연이 큰 흐름"
      : majorCount >= Math.ceil(cards.length / 3)
        ? `작은 사건보다 ${getCardName(resultCard)}로 모이는 큰 전환의 흐름`
        : "카드들이 단계적으로 이어지며 선택의 여지를 남기는 흐름"
  };
}
