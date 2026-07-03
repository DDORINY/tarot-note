import type { CardInterpretation, ReadingRequest, ReadingResult } from "@/features/tarot/types";
import { cardLayer, cardMeaning, orientationLabel, orientationTone, positionAngle } from "@/lib/reading/card-language";
import { buildReadingProfile } from "@/lib/reading/reading-profile";
import { detectQuestionTopic, topicSubject } from "@/lib/reading/question-topic";
import {
  buildAdvice,
  buildConnectionNarrative,
  buildOneLineSummary,
  generateStoryReading,
  restoreStoryReading
} from "@/lib/reading/narrative-builder";

function createCardInterpretations(input: ReadingRequest): CardInterpretation[] {
  return input.drawnCards.map(({ card, orientation, position }) => {
    const meaning = cardMeaning(card, orientation);

    return {
      positionIndex: position.index,
      positionLabel: position.label,
      positionMeaning: position.meaning,
      cardId: card.id,
      cardName: card.nameKo,
      cardNameEn: card.nameEn,
      arcana: card.arcana,
      suit: card.suit,
      number: card.number,
      orientation,
      keywords: card.keywords,
      imageUrl: card.imageUrl ?? card.image_url ?? null,
      uprightMeaning: card.uprightMeaning,
      reversedMeaning: card.reversedMeaning,
      interpretation: `${position.label}은 ${position.meaning}을 뜻합니다. 이 자리에 ${card.nameKo}이 ${orientationLabel(orientation)}으로 놓이면 "${meaning}"의 의미가 ${positionAngle(position.label)}에 작용합니다. ${cardLayer(card)}. ${orientationTone(orientation)}이므로, 같은 카드라도 이 위치에서는 지금 붙잡을 것과 내려놓을 것을 구분하라는 메시지로 읽힙니다.`
    };
  });
}

export function generateTemplateReading(input: ReadingRequest): ReadingResult {
  const cards = createCardInterpretations(input);
  const story = generateStoryReading(input, cards);
  const profile = buildReadingProfile(input.drawnCards, input.spread);
  const topic = detectQuestionTopic(input.question, input.category);
  const connection = buildConnectionNarrative(story.positionNarratives, profile);
  const advice = buildAdvice(profile, story.positionNarratives, input.question, input.category);
  const first = story.positionNarratives[0];
  const last = story.positionNarratives[story.positionNarratives.length - 1];

  return {
    summary: story.overallTheme,
    keyMessage: `${topicSubject(topic)}의 핵심은 ${first.cardNameKo}에서 시작된 장면이 ${last.cardNameKo}로 어떻게 이어지는지에 있습니다. ${story.oneLineSummary}`,
    connection,
    current: first.narrative,
    flow: `${last.positionName}의 ${last.cardNameKo}는 현재 흐름이 어디로 모일 수 있는지를 보여줍니다. ${last.narrative}`,
    advice,
    caution: story.caution,
    oneLine: story.closing,
    cards,
    story
  };
}

export const buildStoryReading = restoreStoryReading;
