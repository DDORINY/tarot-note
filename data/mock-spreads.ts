import type { SpreadPosition, TarotSpread } from "@/features/tarot/types";

const pos = (
  index: number,
  label: string,
  meaning: string,
  x: number,
  y: number,
  rotation = 0,
  zIndex = 1
): SpreadPosition => ({ index, label, meaning, x, y, rotation, zIndex });

export const tarotSpreads: TarotSpread[] = [
  {
    id: "three-card",
    name: "3카드 배열",
    description: "과거, 현재, 미래의 흐름을 빠르게 살피는 기본 배열입니다.",
    cardCount: 3,
    category: "basic",
    isPremium: false,
    positions: [
      pos(1, "과거", "현재 고민에 영향을 준 지나온 흐름", 25, 52, -6),
      pos(2, "현재", "지금 가장 강하게 작용하는 상황과 감정", 50, 48, 0, 2),
      pos(3, "미래", "이어질 가능성과 변화의 방향", 75, 52, 6)
    ]
  },
  {
    id: "four-card",
    name: "4카드 배열",
    description: "흐름과 조언을 함께 보며 현실적인 선택을 정리합니다.",
    cardCount: 4,
    category: "basic",
    isPremium: false,
    positions: [
      pos(1, "과거", "문제의 배경이 된 경험", 24, 38, -8),
      pos(2, "현재", "현재 드러난 핵심 흐름", 46, 38, -2),
      pos(3, "미래", "가까운 흐름의 가능성", 68, 38, 6),
      pos(4, "조언", "지금 취하면 좋은 태도와 선택", 50, 72, 0, 2)
    ]
  },
  {
    id: "five-card",
    name: "5장 배열",
    description: "문제의 원인부터 결과까지 균형 있게 보는 분석 배열입니다.",
    cardCount: 5,
    category: "insight",
    isPremium: true,
    positions: [
      pos(1, "현재 상황", "지금 질문을 둘러싼 표면 상황", 50, 20),
      pos(2, "문제점", "흐름을 어렵게 만드는 요인", 26, 48, -8),
      pos(3, "문제의 핵심", "가장 깊이 살펴야 할 본질", 50, 50, 0, 3),
      pos(4, "가까운 미래", "곧 나타날 가능성", 74, 48, 8),
      pos(5, "결과", "현재 흐름이 이어졌을 때의 방향", 50, 80)
    ]
  },
  {
    id: "magic-seven",
    name: "매직 세븐",
    description: "장애물과 해결책을 함께 읽는 7장 정밀 배열입니다.",
    cardCount: 7,
    category: "premium",
    isPremium: true,
    positions: [
      pos(1, "과거", "지나온 흐름과 원인", 18, 70, -10),
      pos(2, "현재", "현재의 중심 에너지", 30, 45, -6),
      pos(3, "가까운 미래", "곧 다가올 변화", 42, 28, -2),
      pos(4, "해결책", "상황을 풀기 위한 실질 조언", 54, 24, 2, 3),
      pos(5, "현재 태도의 영향", "지금 태도가 만드는 방향", 66, 34, 6),
      pos(6, "방해 요소", "주의해야 할 습관과 장애물", 78, 54, 10),
      pos(7, "결과", "전체 흐름의 가능성", 50, 78, 0, 4)
    ]
  },
  {
    id: "celtic-cross",
    name: "켈틱 크로스",
    description: "배경, 태도, 외부 영향, 결과를 깊게 살피는 종합 배열입니다.",
    cardCount: 10,
    category: "premium",
    isPremium: true,
    positions: [
      pos(1, "현재 상황", "질문을 둘러싼 현재 핵심", 36, 50, 0, 2),
      pos(2, "장애물", "가로막는 이슈와 긴장", 36, 50, 90, 3),
      pos(3, "기반", "깊은 동기와 배경", 36, 76),
      pos(4, "가까운 과거", "최근 지나온 영향", 16, 50, -6),
      pos(5, "목표", "의식하는 목표와 가능성", 36, 24),
      pos(6, "가까운 미래", "곧 펼쳐질 흐름", 56, 50, 6),
      pos(7, "나의 태도", "내가 취하고 있는 태도", 78, 82),
      pos(8, "외부 영향", "주변 사람과 환경", 78, 62),
      pos(9, "희망과 두려움", "기대와 불안", 78, 42),
      pos(10, "최종 결과", "전체 흐름의 최종 가능성", 78, 22)
    ]
  },
  {
    id: "flower-twelve",
    name: "12장 플라워",
    description: "월간 또는 연간 흐름을 꽃 모양으로 펼쳐 보는 장기 배열입니다.",
    cardCount: 12,
    category: "premium",
    isPremium: true,
    positions: [
      pos(1, "비전", "나 자신과 방향성의 흐름", 50, 18),
      pos(2, "생산", "표현과 결과물, 즐거움의 흐름", 68, 26, 8),
      pos(3, "재성", "돈과 현실 조건의 흐름", 78, 44, 12),
      pos(4, "관계", "책임과 사회적 역할의 흐름", 74, 64, 8),
      pos(5, "영성", "배움과 보호, 회복의 흐름", 60, 78, 4),
      pos(6, "1분기", "초반 흐름", 40, 78, -4),
      pos(7, "2분기", "봄에서 여름으로 넘어가는 흐름", 26, 64, -8),
      pos(8, "3분기", "중반 이후의 확장과 조정", 22, 44, -12),
      pos(9, "4분기", "마무리와 결실의 흐름", 32, 26, -8),
      pos(10, "조절할 것", "반복되기 쉬운 주의점", 50, 42, 0, 3),
      pos(11, "마스터 조언", "전체를 관통하는 조언", 40, 54, -5, 4),
      pos(12, "최종 결과", "현재 흐름이 모일 가능성", 60, 54, 5, 4)
    ]
  }
];
