import type { QuestionTopic } from "@/features/tarot/types";

export function detectQuestionTopic(question: string, category = ""): QuestionTopic {
  const text = `${category} ${question}`.toLowerCase();

  if (/(연애|재회|상대|그 사람|연락|마음|관계|사랑|이별|썸|결혼)/.test(text)) return "relationship";
  if (/(진로|직장|회사|이직|취업|커리어|일|사업|프로젝트|공부|시험)/.test(text)) return "career";
  if (/(돈|금전|재물|수입|월급|투자|매출|계약|집|부동산)/.test(text)) return "money";
  if (/(나 자신|내 마음|자기|성장|방향|불안|우울|회복|감정)/.test(text)) return "self";
  if (/(선택|결정|해야 할까|갈까|말까|둘 중|어느|고민)/.test(text)) return "choice";

  return "general";
}

export function topicSubject(topic: QuestionTopic) {
  const subjects: Record<QuestionTopic, string> = {
    relationship: "관계의 감정선",
    career: "일과 방향성",
    money: "현실 조건과 안정감",
    self: "내면의 상태",
    choice: "선택의 기준",
    general: "이번 고민의 흐름"
  };

  return subjects[topic];
}

export function topicAdviceFocus(topic: QuestionTopic) {
  const focuses: Record<QuestionTopic, string> = {
    relationship: "상대의 반응보다 말과 행동이 실제로 일치했는지 확인하는 것",
    career: "큰 결론보다 다음 한 단계에서 검증할 수 있는 행동을 정하는 것",
    money: "감정적 불안과 실제 숫자, 조건, 일정표를 분리해 보는 것",
    self: "지금 느끼는 감정에 이름을 붙이고 무리하게 결론내리지 않는 것",
    choice: "잃을 것과 얻을 것을 같은 기준으로 놓고 비교하는 것",
    general: "확인 가능한 신호부터 차분히 정리하는 것"
  };

  return focuses[topic];
}
