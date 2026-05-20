import type { CardInterpretation, ReadingRequest, ReadingResult, StoryReading, TarotOrientation } from "@/features/tarot/types";

function orientationLabel(orientation: TarotOrientation) {
  return orientation === "upright" ? "정방향" : "역방향";
}

function meaningTone(orientation: TarotOrientation) {
  return orientation === "upright" ? "자연스럽게 드러나는 힘" : "아직 정리되지 않았거나 안쪽으로 눌린 힘";
}

function categoryLens(category: string) {
  if (category.includes("연애") || category.includes("재회") || category.includes("속마음") || category.includes("연락")) {
    return {
      subject: "이 관계",
      emotion: "감정의 온도와 표현 방식",
      action: "바로 밀어붙이기보다 상대의 반응과 나의 기준을 함께 확인하는 태도"
    };
  }

  if (category.includes("진로")) {
    return {
      subject: "지금의 방향",
      emotion: "기대와 부담이 섞인 마음",
      action: "큰 결론보다 다음 선택지를 검증하는 태도"
    };
  }

  if (category.includes("인간관계")) {
    return {
      subject: "이 관계의 거리감",
      emotion: "서로에게 기대하는 역할과 실제로 주고받는 에너지",
      action: "상대의 몫과 나의 몫을 나누어 보는 태도"
    };
  }

  return {
    subject: "이번 흐름",
    emotion: "마음이 반응하는 지점과 현실의 조건",
    action: "서두르지 않고 확인 가능한 것부터 정리하는 태도"
  };
}

function sentence(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return "";
  return /[.!?。]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function createCardInterpretations(input: ReadingRequest): CardInterpretation[] {
  return input.drawnCards.map(({ card, orientation, position }) => {
    const cardMeaning = orientation === "upright" ? card.uprightMeaning : card.reversedMeaning;
    const tone = orientationLabel(orientation);

    return {
      positionIndex: position.index,
      positionLabel: position.label,
      positionMeaning: position.meaning,
      cardId: card.id,
      cardName: card.nameKo,
      cardNameEn: card.nameEn,
      orientation,
      keywords: card.keywords,
      interpretation: `${position.label} 위치의 ${card.nameKo}(${tone}) 카드는 ${position.meaning} 안에서 "${cardMeaning}"의 흐름을 보여줍니다. 이 카드는 결론을 단정하기보다 지금 질문에서 무엇이 움직이고, 무엇이 아직 멈춰 있는지 차분히 구분하라고 말합니다.`
    };
  });
}

export function buildStoryReading(input: {
  question: string;
  category: string;
  spreadName: string;
  cards: CardInterpretation[];
  advice: string;
  summary?: string;
}): StoryReading {
  const lens = categoryLens(input.category);
  const cards = input.cards;
  const first = cards[0];
  const middle = cards[Math.floor(cards.length / 2)] ?? first;
  const last = cards[cards.length - 1] ?? first;
  const reversedCount = cards.filter((card) => card.orientation === "reversed").length;
  const dominantTone =
    reversedCount > cards.length / 2
      ? "겉으로 드러난 사건보다 마음속에서 아직 정리되지 않은 감정이 더 크게 작용하고 있습니다"
      : "흐름은 비교적 밖으로 드러나기 시작했고, 작은 신호들이 이미 표면으로 올라오고 있습니다";

  const cardNarratives = cards.map((card, index) => {
    const next = cards[index + 1];
    const orientationTone = meaningTone(card.orientation);

    return {
      positionIndex: card.positionIndex,
      positionLabel: card.positionLabel,
      cardName: card.cardName,
      orientation: card.orientation,
      scene: `${card.positionLabel} 자리에서는 ${card.cardName}이 ${orientationLabel(card.orientation)}으로 놓이며, ${card.positionMeaning}의 장면을 열어줍니다.`,
      interpretation: `여기서 중요한 것은 ${orientationTone}입니다. ${sentence(card.interpretation)}`,
      connectionToNext: next
        ? `${card.cardName}이 만든 분위기는 다음 ${next.positionLabel} 자리의 ${next.cardName}으로 이어지며, 흐름이 단순한 한 장의 의미가 아니라 단계적으로 변하고 있음을 보여줍니다.`
        : undefined
    };
  });

  return {
    title: `${input.spreadName}으로 읽는 ${input.category}의 흐름`,
    opening: `"${input.question}"이라는 질문에서 가장 먼저 보이는 것은 ${lens.subject}이 이미 한 방향으로만 움직이고 있지는 않다는 점입니다. 이번 배열은 답을 단번에 확정하기보다, 질문 안에 섞여 있는 감정과 현실의 속도를 나누어 보여줍니다.`,
    storyFlow: `흐름의 시작은 ${first.positionLabel} 위치의 ${first.cardName}에서 열립니다. 이 카드는 ${first.positionMeaning}을 통해 질문의 배경을 보여주고, 중간의 ${middle.cardName}은 지금 가장 예민하게 반응하는 지점을 드러냅니다. 마지막으로 ${last.positionLabel} 위치의 ${last.cardName}은 앞으로 상황이 어디로 기울 수 있는지 암시합니다. ${dominantTone}.`,
    emotionalInsight: `감정적으로는 ${lens.emotion}이 핵심입니다. 특히 ${middle.cardName}이 놓인 자리는 마음이 이미 알고 있지만 말로 정리하지 못한 부분을 건드립니다. 그래서 지금 느끼는 불안이나 기대는 틀린 신호가 아니라, 아직 이름 붙이지 못한 욕구가 올라오는 과정으로 볼 수 있습니다.`,
    cardNarratives,
    turningPoint: `전환점은 ${middle.positionLabel} 위치에 있습니다. ${middle.cardName}이 보여주는 메시지는 지금의 흐름을 억지로 바꾸라는 뜻이 아니라, 무엇을 더 붙잡고 무엇을 내려놓아야 하는지 구분하라는 신호에 가깝습니다.`,
    possibleOutcome: `앞으로의 가능성은 ${last.cardName}이 말해줍니다. 이 카드는 ${last.positionMeaning}의 자리에서 결과가 완전히 닫혀 있지 않으며, 지금 어떤 태도로 움직이느냐에 따라 결론의 온도가 달라질 수 있음을 보여줍니다.`,
    advice: `${input.advice} 특히 이 질문에서는 ${lens.action}가 중요합니다.`,
    closingMessage: `오늘의 한 문장으로 정리하면, 답을 서둘러 끌어내기보다 이미 드러난 작은 신호를 믿고 다음 한 걸음을 차분히 선택해보라는 리딩입니다.`
  };
}

export function generateTemplateReading(input: ReadingRequest): ReadingResult {
  const cards = createCardInterpretations(input);
  const first = input.drawnCards[0];
  const last = input.drawnCards[input.drawnCards.length - 1];
  const firstMeaning = first.orientation === "upright" ? first.card.uprightMeaning : first.card.reversedMeaning;
  const lastMeaning = last.orientation === "upright" ? last.card.uprightMeaning : last.card.reversedMeaning;
  const advice = `현실적인 조언은 질문을 하나의 결론으로 몰아가지 않고 오늘 할 수 있는 행동 하나를 정하는 것입니다. 연락, 대화, 일정 정리, 휴식처럼 실제로 실행 가능한 선택부터 작게 잡아보세요.`;
  const summary = `${input.spread.name}은 "${input.question}"에 대해 ${first.position.label}의 ${first.card.nameKo}에서 시작해 ${last.position.label}의 ${last.card.nameKo}로 이어지는 흐름을 보여줍니다. ${input.category} 영역에서는 ${firstMeaning}을 출발점으로 보고, ${lastMeaning}을 앞으로 조율할 가능성으로 읽을 수 있습니다.`;

  return {
    summary,
    keyMessage: `핵심 메시지는 ${first.card.nameKo}의 "${first.card.keywords.slice(0, 2).join(", ")}"와 ${last.card.nameKo}의 "${last.card.keywords.slice(0, 2).join(", ")}" 사이에서 균형을 찾는 것입니다. 필요한 것은 결론을 앞당기기보다 마음의 반응과 현실에서 확인 가능한 신호를 나누어 보는 태도입니다.`,
    connection: `카드 간 연결을 보면 초반 카드는 질문의 배경과 감정의 출발점을, 중간 카드는 지금 조정해야 할 태도를, 마지막 카드는 앞으로 열릴 가능성을 보여줍니다. 한 장의 강한 인상에만 매달리기보다 전체 배열이 만드는 방향을 함께 읽어보세요.`,
    current: `현재 상황은 감정과 현실 조건이 함께 움직이는 모습입니다. 특히 앞쪽 카드들은 바로 해결책을 붙잡기보다 질문의 배경과 반복되는 패턴을 먼저 확인하라고 조언합니다.`,
    flow: `앞으로의 가능성은 고정된 운명이라기보다 선택에 따라 달라질 여지가 큽니다. 카드가 보여주는 신호를 참고하면, 급한 판단보다 작은 확인과 조율을 통해 안정적인 변화를 만들 수 있습니다.`,
    advice,
    caution: `주의할 점은 불안 때문에 아직 확인되지 않은 내용을 사실처럼 받아들이는 것입니다. 카드는 예언보다 자기 이해에 가까운 도구이므로 감정과 현실 증거를 함께 보는 편이 좋습니다.`,
    oneLine: `오늘은 답을 확정하기보다 확인 가능한 작은 신호 하나를 차분히 따라가보세요.`,
    cards,
    story: buildStoryReading({
      question: input.question,
      category: input.category,
      spreadName: input.spread.name,
      cards,
      advice,
      summary
    })
  };
}
