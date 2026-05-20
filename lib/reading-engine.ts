import type { ReadingRequest, ReadingResult } from "@/features/tarot/types";

function orientationLabel(orientation: "upright" | "reversed") {
  return orientation === "upright" ? "정방향" : "역방향";
}

export function generateTemplateReading(input: ReadingRequest): ReadingResult {
  const cardLines = input.drawnCards.map(({ card, orientation, position }) => {
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
      interpretation: `${position.label} 자리에 놓인 ${card.nameKo}(${tone}) 카드는 "${cardMeaning}"의 흐름을 보여줍니다. ${position.meaning} 안에서 이 카드는 지금 당장 결론을 서두르기보다, 질문의 핵심을 조금 더 차분히 바라보라고 말합니다.`
    };
  });

  const first = input.drawnCards[0];
  const last = input.drawnCards[input.drawnCards.length - 1];
  const firstMeaning = first.orientation === "upright" ? first.card.uprightMeaning : first.card.reversedMeaning;
  const lastMeaning = last.orientation === "upright" ? last.card.uprightMeaning : last.card.reversedMeaning;

  return {
    summary: `${input.spread.name}은 "${input.question}"에 대해 ${first.position.label}의 ${first.card.nameKo}에서 시작해 ${last.position.label}의 ${last.card.nameKo}로 이어지는 흐름을 보여줍니다. ${input.category} 영역에서는 ${firstMeaning}을 출발점으로 보고, ${lastMeaning}을 앞으로 조율할 가능성으로 읽을 수 있습니다.`,
    keyMessage: `핵심 메시지는 ${first.card.nameKo}의 "${first.card.keywords.slice(0, 2).join(", ")}"와 ${last.card.nameKo}의 "${last.card.keywords.slice(0, 2).join(", ")}" 사이에서 균형을 찾는 것입니다. 필요한 것은 결론을 앞당기기보다 마음의 반응과 현실에서 확인 가능한 신호를 나누어 보는 태도입니다.`,
    connection: `카드 간 연결을 보면 초반 카드는 질문의 배경과 감정의 출발점을, 중간 카드는 지금 조정해야 할 태도를, 마지막 카드는 앞으로 열릴 가능성을 보여줍니다. 한 장의 강한 인상에만 매달리기보다 전체 배열이 만드는 방향을 함께 읽어보세요.`,
    current: `현재 상황은 감정과 현실 조건이 함께 움직이는 모습입니다. 특히 앞쪽 카드들은 바로 해결책을 붙잡기보다 질문의 배경과 반복되는 패턴을 먼저 확인하라고 조언합니다.`,
    flow: `앞으로의 가능성은 고정된 운명이라기보다 선택에 따라 달라질 여지가 큽니다. 카드가 보여주는 신호를 참고하면, 급한 판단보다 작은 확인과 조율을 통해 안정적인 변화를 만들 수 있습니다.`,
    advice: `현실적인 조언은 질문을 하나의 결론으로 몰아가지 않고 오늘 할 수 있는 행동 하나를 정하는 것입니다. 연락, 대화, 일정 정리, 휴식처럼 실제로 실행 가능한 선택부터 작게 잡아보세요.`,
    caution: `주의할 점은 불안 때문에 아직 확인되지 않은 내용을 사실처럼 받아들이는 것입니다. 카드는 예언보다 자기 이해에 가까운 도구이므로 감정과 현실 증거를 함께 보는 편이 좋습니다.`,
    oneLine: `오늘은 답을 확정하기보다 확인 가능한 작은 신호 하나를 차분히 따라가보세요.`,
    cards: cardLines
  };
}
