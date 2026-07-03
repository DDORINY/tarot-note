import type {
  CardInterpretation,
  DrawnCard,
  ReadingPositionNarrative,
  ReadingRequest,
  StoryReading,
  TarotSpread
} from "@/features/tarot/types";
import { cardLayer, cardMeaning, orientationLabel, orientationTone, positionAngle, SUIT_THEMES } from "@/lib/reading/card-language";
import { buildReadingProfile, type ReadingProfile } from "@/lib/reading/reading-profile";
import { detectQuestionTopic, topicAdviceFocus, topicSubject } from "@/lib/reading/question-topic";

function compact(text?: string | null) {
  return text?.trim() || "";
}

function sentence(text: string) {
  const value = compact(text);
  if (!value) return "";
  return /[.!?。]$/.test(value) ? value : `${value}.`;
}

function cardName(card: DrawnCard | CardInterpretation) {
  return "card" in card ? card.card.nameKo : card.cardName;
}

function cardNameEn(card: DrawnCard | CardInterpretation) {
  return "card" in card ? card.card.nameEn : (card.cardNameEn ?? card.cardId);
}

function cardId(card: DrawnCard | CardInterpretation) {
  return "card" in card ? card.card.id : card.cardId;
}

function positionLabel(card: DrawnCard | CardInterpretation) {
  return "position" in card ? card.position.label : card.positionLabel;
}

function positionMeaning(card: DrawnCard | CardInterpretation) {
  return "position" in card ? card.position.meaning : card.positionMeaning;
}

function meaning(card: DrawnCard | CardInterpretation) {
  if ("card" in card) return cardMeaning(card.card, card.orientation);
  return card.orientation === "upright" ? card.uprightMeaning || card.interpretation : card.reversedMeaning || card.interpretation;
}

function layer(card: DrawnCard | CardInterpretation) {
  if ("card" in card) return cardLayer(card.card);
  return cardLayer(card);
}

function positionHeadline(card: DrawnCard | CardInterpretation) {
  const label = positionLabel(card);
  const name = cardName(card);

  if (/(과거|배경|기반|원인)/.test(label)) return `${name}이 남긴 배경`;
  if (/(현재|상황|태도)/.test(label)) return `지금 드러나는 ${name}`;
  if (/(미래|결과|최종)/.test(label)) return `${name}이 여는 다음 가능성`;
  if (/(조언|해결|마스터)/.test(label)) return `${name}이 제안하는 태도`;
  if (/(장애|문제|방해|두려움|조심)/.test(label)) return `${name}으로 보이는 걸림돌`;

  return `${label}의 ${name}`;
}

function buildTransition(previous: DrawnCard | CardInterpretation, next: DrawnCard | CardInterpretation) {
  const previousSuit = "card" in previous ? previous.card.suit : previous.suit;
  const nextSuit = "card" in next ? next.card.suit : next.suit;
  const previousArcana = "card" in previous ? previous.card.arcana : previous.arcana;
  const nextArcana = "card" in next ? next.card.arcana : next.arcana;

  if (previousSuit && nextSuit && previousSuit === nextSuit) {
    return `이 흐름은 다음 ${positionLabel(next)}의 ${cardName(next)}에서도 같은 ${SUIT_THEMES[previousSuit]}의 영역으로 이어지며, 이 고민에서 그 주제가 반복해서 강조되고 있음을 보여줍니다.`;
  }

  if (previous.orientation === "reversed" && next.orientation === "reversed") {
    return `앞선 막힘은 다음 카드에서도 바로 풀리기보다 안쪽으로 한 번 더 접힙니다. 그래서 이 구간은 행동보다 원인 파악이 먼저입니다.`;
  }

  if (previous.orientation === "reversed" && next.orientation === "upright") {
    return `하지만 여기서 흐름이 조금 열립니다. 앞의 지연과 혼란이 다음 카드에서는 밖으로 드러나며, 해결의 실마리가 보이기 시작합니다.`;
  }

  if (previousArcana !== "major" && nextArcana === "major") {
    return `앞의 현실적인 신호는 다음 카드에서 더 큰 전환의 문제로 확대됩니다. 작은 사건처럼 보여도 이 고민은 중요한 방향 선택과 연결됩니다.`;
  }

  return `앞선 카드가 ${positionLabel(previous)}의 장면을 보여줬다면, 다음 ${positionLabel(next)}의 ${cardName(next)}는 그 흐름이 어떤 태도나 결과로 이어지는지를 더 분명하게 보여줍니다.`;
}

export function buildPositionNarrative(
  card: DrawnCard | CardInterpretation,
  next: DrawnCard | CardInterpretation | undefined,
  profile: ReadingProfile
): ReadingPositionNarrative {
  const label = positionLabel(card);
  const name = cardName(card);
  const baseMeaning = meaning(card);
  const positionRole = positionAngle(label);
  const repeatedSuitNote =
    profile.dominantSuit && ("card" in card ? card.card.suit : card.suit) === profile.dominantSuit
      ? `특히 이 카드는 이번 리딩에서 반복되는 ${SUIT_THEMES[profile.dominantSuit]}의 주제를 한 번 더 강조합니다.`
      : "";

  return {
    positionId: String("position" in card ? card.position.index : card.positionIndex),
    positionName: label,
    cardId: cardId(card),
    cardNameKo: name,
    cardNameEn: cardNameEn(card),
    orientation: card.orientation,
    headline: positionHeadline(card),
    narrative: `${label}은 ${positionMeaning(card)}을 뜻하는 자리입니다. 이 자리에 ${name}이 ${orientationLabel(card.orientation)}으로 놓였다는 것은 ${positionRole}에서 "${baseMeaning}"의 메시지가 작동한다는 뜻입니다. ${layer(card)}. 그래서 이 카드는 단순한 좋고 나쁨보다, 지금 흐름에서 무엇이 붙잡히고 무엇이 움직이려 하는지를 보여줍니다. ${repeatedSuitNote}`.trim(),
    transitionToNext: next ? buildTransition(card, next) : undefined
  };
}

export function buildConnectionNarrative(positionNarratives: ReadingPositionNarrative[], profile: ReadingProfile) {
  const first = positionNarratives[0];
  const last = positionNarratives[positionNarratives.length - 1];
  const suitLine = profile.dominantSuit
    ? `가장 많이 반복된 슈트는 ${SUIT_THEMES[profile.dominantSuit]}이라서, 이번 리딩은 그 영역을 중심으로 해석됩니다.`
    : "메이저 카드와 개별 위치의 흐름이 더 중요하게 읽힙니다.";
  const tensionLine = profile.hasCupsSwordsTension
    ? "컵과 소드가 함께 보여서 마음은 반응하지만 생각은 쉽게 결론을 내리지 못하는 긴장이 있습니다."
    : profile.hasWandsPentaclesBlend
      ? "완드와 펜타클의 조합은 하고 싶은 의지와 실제 조건을 함께 맞춰야 한다는 신호입니다."
      : profile.conflictTone;

  return `${first.positionName}의 ${first.cardNameKo}에서 시작된 흐름은 ${last.positionName}의 ${last.cardNameKo}로 모입니다. ${suitLine} ${tensionLine}`;
}

export function buildOneLineSummary(profile: ReadingProfile, question: string, spread: TarotSpread) {
  const resultName = cardName(profile.resultCard);
  const dominant = profile.dominantSuit ? SUIT_THEMES[profile.dominantSuit] : "큰 전환과 선택";
  const reversed = profile.hasManyReversed ? "아직 안쪽에서 정리되지 않은 마음이 많고" : "흐름은 바깥으로 조금씩 드러나고";

  return `${spread.name}은 "${question}"이라는 고민에 대해 ${dominant}의 주제가 강하며, ${reversed} 마지막에는 ${resultName}의 방향으로 가능성이 모인다고 말합니다.`;
}

export function buildAdvice(profile: ReadingProfile, narratives: ReadingPositionNarrative[], question: string, category: string) {
  const topic = detectQuestionTopic(question, category);
  const adviceCard = profile.adviceCard ? cardName(profile.adviceCard) : narratives[Math.floor(narratives.length / 2)]?.cardNameKo;
  const focus = topicAdviceFocus(topic);

  return `조언은 ${adviceCard ? `${adviceCard}의 메시지를 기준으로, ` : ""}${focus}입니다. 지금은 감정의 크기만으로 결정하기보다 카드들이 반복해서 보여준 흐름을 따라 가장 작고 구체적인 행동 하나를 정하는 편이 좋습니다.`;
}

export function buildClosing(profile: ReadingProfile) {
  if (profile.hasManyReversed) return "오늘의 리딩은 답을 빨리 확정하라는 뜻이 아니라, 막힌 지점을 먼저 알아차리라는 메시지에 가깝습니다.";
  if (profile.majorCount >= 3) return "이번 흐름은 가벼운 우연보다 큰 전환의 리듬에 가까우니, 서두르기보다 방향 자체를 점검해보세요.";
  if (profile.dominantSuit === "cups") return "마지막으로 기억할 문장은 이것입니다. 마음이 원하는 것과 관계가 실제로 주는 것을 함께 보세요.";
  if (profile.dominantSuit === "swords") return "마지막으로 기억할 문장은 이것입니다. 불안이 만든 추측과 실제로 확인된 사실을 분리하세요.";
  if (profile.dominantSuit === "wands") return "마지막으로 기억할 문장은 이것입니다. 움직이되, 충동이 아니라 방향을 가지고 움직이세요.";
  if (profile.dominantSuit === "pentacles") return "마지막으로 기억할 문장은 이것입니다. 안정감은 붙잡는 힘이 아니라 지속 가능한 선택에서 옵니다.";
  return "오늘은 모든 답을 한 번에 정하기보다, 다음 한 걸음을 분명히 하는 리딩으로 받아들이면 좋습니다.";
}

export function generateStoryReading(input: ReadingRequest, cards: CardInterpretation[]): StoryReading {
  const topic = detectQuestionTopic(input.question, input.category);
  const profile = buildReadingProfile(input.drawnCards, input.spread);
  const positionNarratives = input.drawnCards.map((card, index) => buildPositionNarrative(card, input.drawnCards[index + 1], profile));
  const connectionNarrative = buildConnectionNarrative(positionNarratives, profile);
  const oneLineSummary = buildOneLineSummary(profile, input.question, input.spread);
  const advice = buildAdvice(profile, positionNarratives, input.question, input.category);
  const closing = buildClosing(profile);
  const middle = positionNarratives[Math.floor(positionNarratives.length / 2)] ?? positionNarratives[0];

  return {
    title: `${input.spread.name}으로 읽는 ${topicSubject(topic)}`,
    oneLineSummary,
    overallTheme: `이번 리딩은 단순히 좋다/나쁘다를 말하기보다, ${positionNarratives[0].positionName}에서 시작된 장면이 ${middle.positionName}을 지나 ${positionNarratives[positionNarratives.length - 1].positionName}으로 어떻게 이어지는지를 보여줍니다. ${profile.conflictTone}.`,
    emotionalFlow: `${topicSubject(topic)}을 기준으로 보면 ${profile.emotionalTone}. ${profile.practicalTone}.`,
    positionNarratives,
    connectionNarrative,
    advice,
    caution: profile.hasManyReversed
      ? "역방향 카드가 많기 때문에 지금 보이는 침묵, 지연, 망설임을 곧바로 거절이나 실패로 단정하지 않는 것이 중요합니다."
      : "카드 흐름이 열려 있더라도 확인되지 않은 기대를 사실처럼 앞당겨 해석하지 않는 것이 좋습니다.",
    closing,
    opening: oneLineSummary,
    storyFlow: connectionNarrative,
    emotionalInsight: `${profile.emotionalTone}. ${profile.practicalTone}.`,
    cardNarratives: cards.map((card, index) => ({
      positionIndex: card.positionIndex,
      positionLabel: card.positionLabel,
      cardName: card.cardName,
      orientation: card.orientation,
      scene: `${card.positionLabel} 자리의 ${card.cardName}은 ${card.positionMeaning}의 장면을 엽니다.`,
      interpretation: sentence(card.interpretation),
      connectionToNext: positionNarratives[index]?.transitionToNext
    })),
    turningPoint: middle ? `${middle.positionName}의 ${middle.cardNameKo}가 이번 리딩의 전환점입니다. ${middle.headline}` : undefined,
    possibleOutcome: `결과의 방향은 ${cardName(profile.resultCard)}로 모입니다. 이 카드는 지금의 선택이 앞으로 어떤 분위기를 만들지 보여줍니다.`,
    closingMessage: closing
  };
}

export function restoreStoryReading(input: {
  question: string;
  category: string;
  spreadName: string;
  cards: CardInterpretation[];
  advice: string;
  summary?: string;
}) {
  const spread: TarotSpread = {
    id: input.spreadName,
    name: input.spreadName,
    description: "",
    cardCount: input.cards.length,
    category: "saved",
    isPremium: false,
    positions: input.cards.map((card) => ({
      index: card.positionIndex,
      label: card.positionLabel,
      meaning: card.positionMeaning,
      x: 0,
      y: 0,
      rotation: 0,
      zIndex: card.positionIndex
    }))
  };

  const drawnCards: DrawnCard[] = input.cards.map((card) => ({
    position: spread.positions.find((position) => position.index === card.positionIndex) ?? spread.positions[0],
    orientation: card.orientation,
    card: {
      id: card.cardId,
      nameKo: card.cardName,
      nameEn: card.cardNameEn ?? card.cardId,
      arcana: card.arcana ?? "major",
      suit: card.suit ?? null,
      number: card.number ?? null,
      uprightMeaning: card.uprightMeaning ?? card.interpretation,
      reversedMeaning: card.reversedMeaning ?? card.interpretation,
      keywords: card.keywords ?? [],
      imageUrl: card.imageUrl ?? card.image_url ?? null
    }
  }));

  return generateStoryReading({ question: input.question, category: input.category, spread, drawnCards }, input.cards);
}
