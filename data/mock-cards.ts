import type { TarotCard } from "@/features/tarot/types";

type MajorArcanaSeed = readonly [
  id: string,
  nameKo: string,
  nameEn: string,
  number: number,
  uprightMeaning: string,
  reversedMeaning: string,
  keywords: readonly string[]
];

const majorArcanaSeeds: MajorArcanaSeed[] = [
  ["the-fool", "바보", "The Fool", 0, "새로운 시작과 자유로운 가능성", "준비 부족, 충동, 방향을 다시 점검할 필요", ["시작", "모험", "순수"]],
  ["the-magician", "마법사", "The Magician", 1, "의지와 실행력, 가진 자원을 능숙하게 쓰는 힘", "집중력 부족, 말과 행동의 불일치", ["창조", "기술", "의지"]],
  ["the-high-priestess", "여사제", "The High Priestess", 2, "직관과 내면의 지혜, 아직 드러나지 않은 정보", "혼란, 숨겨진 감정, 직관을 외면함", ["직관", "비밀", "침묵"]],
  ["the-empress", "여황제", "The Empress", 3, "풍요와 돌봄, 관계가 자라나는 흐름", "과잉보호, 의존, 감정의 소모", ["풍요", "애정", "성장"]],
  ["the-emperor", "황제", "The Emperor", 4, "질서와 책임, 안정적인 구조를 세우는 힘", "완고함, 통제, 유연성 부족", ["질서", "책임", "안정"]],
  ["the-hierophant", "교황", "The Hierophant", 5, "조언과 전통, 신뢰할 수 있는 기준", "낡은 관습, 타인의 기준에 갇힘", ["조언", "전통", "신뢰"]],
  ["the-lovers", "연인", "The Lovers", 6, "끌림과 선택, 진심을 확인하는 관계", "갈등, 우유부단, 가치관 불일치", ["사랑", "선택", "조화"]],
  ["the-chariot", "전차", "The Chariot", 7, "목표를 향한 추진력과 승부수", "방향 상실, 조급함, 무리한 전진", ["추진", "승리", "의지"]],
  ["strength", "힘", "Strength", 8, "부드러운 용기와 인내, 감정을 다루는 힘", "불안, 자신감 저하, 감정 조절의 어려움", ["용기", "인내", "회복"]],
  ["the-hermit", "은둔자", "The Hermit", 9, "혼자만의 성찰과 깊은 깨달음", "고립, 거리두기 과다, 답을 미룸", ["성찰", "탐구", "지혜"]],
  ["wheel-of-fortune", "운명의 수레바퀴", "Wheel of Fortune", 10, "전환점과 흐름의 변화, 기회", "반복되는 패턴, 통제하기 어려운 변수", ["전환", "운", "순환"]],
  ["justice", "정의", "Justice", 11, "균형 잡힌 판단과 책임 있는 결정", "불공정, 회피, 결과를 받아들이기 어려움", ["균형", "판단", "책임"]],
  ["the-hanged-man", "매달린 사람", "The Hanged Man", 12, "멈춤 속의 관점 전환과 내려놓음", "정체, 희생감, 바꾸기 어려운 시선", ["멈춤", "관점", "수용"]],
  ["death", "죽음", "Death", 13, "끝맺음과 새로운 단계로 넘어가는 변화", "미련, 변화 저항, 끝을 미룸", ["변화", "종료", "재생"]],
  ["temperance", "절제", "Temperance", 14, "조율과 회복, 서로 다른 요소의 균형", "불균형, 성급함, 조율 실패", ["조화", "회복", "절제"]],
  ["the-devil", "악마", "The Devil", 15, "집착과 욕망을 직면해야 하는 시기", "속박에서 벗어남, 유혹의 약화", ["집착", "욕망", "속박"]],
  ["the-tower", "탑", "The Tower", 16, "갑작스러운 깨달음과 구조의 붕괴", "변화를 늦춤, 불안하지만 필요한 정리", ["충격", "해체", "각성"]],
  ["the-star", "별", "The Star", 17, "희망과 치유, 다시 믿어볼 수 있는 가능성", "기대 저하, 회복 지연, 자신감 부족", ["희망", "치유", "영감"]],
  ["the-moon", "달", "The Moon", 18, "불확실성과 감정의 파도, 무의식의 신호", "오해 해소, 두려움의 실체가 드러남", ["불안", "직감", "환상"]],
  ["the-sun", "태양", "The Sun", 19, "명확함과 활력, 긍정적인 진전", "기쁨의 지연, 과신, 에너지 저하", ["성공", "활력", "기쁨"]],
  ["judgement", "심판", "Judgement", 20, "중요한 결단과 재평가, 다시 부름받는 일", "결정 회피, 과거에 묶임, 자기비판", ["결단", "부활", "평가"]],
  ["the-world", "세계", "The World", 21, "완성과 통합, 한 주기의 성취", "마무리 부족, 다음 단계로 넘어가기 전 점검", ["완성", "통합", "성취"]]
];

export const majorArcanaCards: TarotCard[] = majorArcanaSeeds.map(
  ([id, nameKo, nameEn, number, uprightMeaning, reversedMeaning, keywords]) => ({
    id,
    nameKo,
    nameEn,
    arcana: "major",
    suit: null,
    number,
    uprightMeaning,
    reversedMeaning,
    keywords: [...keywords],
    imageUrl: null
  })
);
