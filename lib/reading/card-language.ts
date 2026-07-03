import type { CardInterpretation, TarotArcana, TarotCard, TarotOrientation, TarotSuit } from "@/features/tarot/types";

export const SUIT_THEMES: Record<TarotSuit, string> = {
  cups: "감정, 관계, 마음의 교류",
  swords: "생각, 갈등, 판단, 불안",
  wands: "의지, 행동, 열정, 추진력",
  pentacles: "현실, 돈, 일, 안정, 성과"
};

export const NUMBER_THEMES: Record<number, string> = {
  1: "새로운 시작",
  2: "선택과 균형",
  3: "확장과 협력",
  4: "안정 또는 정체",
  5: "갈등과 변화",
  6: "회복과 조정",
  7: "점검과 인내",
  8: "집중과 이동",
  9: "완성 직전의 상태",
  10: "마무리와 다음 단계"
};

export const COURT_THEMES: Record<string, string> = {
  page: "새롭게 배우는 태도, 미숙하지만 가능성 있는 시작",
  knight: "움직임, 추진, 감정 또는 의지의 방향성",
  queen: "내면화된 성숙함, 감정과 상황을 다루는 능력",
  king: "통제력, 결정권, 현실적인 판단과 책임"
};

export function orientationLabel(orientation: TarotOrientation) {
  return orientation === "upright" ? "정방향" : "역방향";
}

export function orientationTone(orientation: TarotOrientation) {
  return orientation === "upright" ? "겉으로 드러나는 힘" : "안쪽에서 막히거나 뒤집혀 나타나는 힘";
}

export function cardMeaning(card: TarotCard | CardInterpretation, orientation: TarotOrientation) {
  return orientation === "upright" ? card.uprightMeaning : card.reversedMeaning;
}

export function courtRank(card: Pick<TarotCard, "id" | "number"> | Pick<CardInterpretation, "cardId" | "number">) {
  const id = "id" in card ? card.id : card.cardId;
  if (id.startsWith("page-")) return "page";
  if (id.startsWith("knight-")) return "knight";
  if (id.startsWith("queen-")) return "queen";
  if (id.startsWith("king-")) return "king";
  if (card.number === 11) return "page";
  if (card.number === 12) return "knight";
  if (card.number === 13) return "queen";
  if (card.number === 14) return "king";
  return null;
}

export function cardLayer(card: Pick<TarotCard, "arcana" | "suit" | "number" | "id"> | CardInterpretation) {
  const arcana = card.arcana as TarotArcana | undefined;
  const suit = card.suit ?? null;
  const number = card.number ?? null;
  const court = courtRank("id" in card ? card : { cardId: card.cardId, number });

  if (arcana === "major") return "메이저 아르카나이므로 일시적인 기분보다 큰 전환점과 반복되는 삶의 패턴을 건드립니다";
  if (suit && court) return `${SUIT_THEMES[suit]}의 영역에서 ${COURT_THEMES[court]}을 강조합니다`;
  if (suit && number && NUMBER_THEMES[number]) return `${SUIT_THEMES[suit]}의 영역에서 ${NUMBER_THEMES[number]}을 보여줍니다`;
  if (suit) return `${SUIT_THEMES[suit]}의 영역이 두드러집니다`;
  return "카드의 기본 의미가 이 위치의 질문과 연결됩니다";
}

export function positionAngle(positionLabel: string) {
  if (/(과거|배경|기반|원인)/.test(positionLabel)) return "이미 지나온 흐름이 지금 고민에 남긴 흔적";
  if (/(현재|상황|태도)/.test(positionLabel)) return "지금 표면 위로 드러나는 상태";
  if (/(미래|결과|가능성|최종)/.test(positionLabel)) return "앞으로 흐름이 모일 수 있는 방향";
  if (/(조언|해결|마스터|조절|조심)/.test(positionLabel)) return "지금 선택할 수 있는 태도와 조정점";
  if (/(장애|문제|방해|두려움)/.test(positionLabel)) return "흐름을 막거나 불안을 키우는 지점";
  if (/(외부|주변|환경)/.test(positionLabel)) return "나 밖에서 작용하는 사람과 조건";
  return "이 스프레드에서 해당 위치가 맡은 역할";
}
