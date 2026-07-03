import type { TarotCard, TarotSuit } from "@/features/tarot/types";

type CardSeed = readonly [
  id: string,
  nameKo: string,
  nameEn: string,
  arcana: "major" | "minor",
  suit: TarotSuit | null,
  number: number,
  uprightMeaning: string,
  reversedMeaning: string,
  keywords: readonly string[],
  imageUrl: string
];

const majorArcanaSeeds: CardSeed[] = [
  ["the-fool", "바보", "The Fool", "major", null, 0, "새로운 시작과 자유로운 가능성", "준비 부족, 충동, 방향을 다시 점검할 필요", ["시작", "모험", "순수"], "/images/cards/major/fool.jpg"],
  ["the-magician", "마법사", "The Magician", "major", null, 1, "의지와 실행력, 가진 자원을 능숙하게 쓰는 힘", "집중력 부족, 말과 행동의 불일치", ["창조", "기술", "의지"], "/images/cards/major/magician.jpg"],
  ["the-high-priestess", "여사제", "The High Priestess", "major", null, 2, "직감과 내면의 지혜, 아직 드러나지 않은 정보", "혼란, 숨겨진 감정, 직감을 외면함", ["직감", "비밀", "침묵"], "/images/cards/major/high-priestess.jpg"],
  ["the-empress", "여황제", "The Empress", "major", null, 3, "풍요와 돌봄, 관계가 자라나는 흐름", "과잉보호, 의존, 감정의 소모", ["풍요", "애정", "성장"], "/images/cards/major/empress.jpg"],
  ["the-emperor", "황제", "The Emperor", "major", null, 4, "질서와 책임, 안정적인 구조를 세우는 힘", "완고함, 통제, 유연함 부족", ["질서", "책임", "안정"], "/images/cards/major/emperor.jpg"],
  ["the-hierophant", "교황", "The Hierophant", "major", null, 5, "조언과 전통, 신뢰할 수 있는 기준", "낡은 관습, 타인의 기준에 갇힘", ["조언", "전통", "신뢰"], "/images/cards/major/hierophant.jpg"],
  ["the-lovers", "연인", "The Lovers", "major", null, 6, "끌림과 선택, 진심을 확인하는 관계", "갈등, 우유부단, 가치의 불일치", ["사랑", "선택", "조화"], "/images/cards/major/lovers.jpg"],
  ["the-chariot", "전차", "The Chariot", "major", null, 7, "목표를 향한 추진력과 승리", "방향 상실, 조급함, 무리한 전진", ["추진", "승리", "의지"], "/images/cards/major/chariot.jpg"],
  ["strength", "힘", "Strength", "major", null, 8, "부드러운 용기와 인내, 감정을 다루는 힘", "불안, 자신감 저하, 감정 조절의 어려움", ["용기", "인내", "회복"], "/images/cards/major/strength.jpg"],
  ["the-hermit", "은둔자", "The Hermit", "major", null, 9, "혼자만의 성찰과 깊은 깨달음", "고립, 거리두기 과다, 답을 미룸", ["성찰", "탐구", "지혜"], "/images/cards/major/hermit.jpg"],
  ["wheel-of-fortune", "운명의 수레바퀴", "Wheel of Fortune", "major", null, 10, "전환점과 흐름의 변화, 기회", "반복되는 패턴, 통제하기 어려운 변화", ["전환", "운", "순환"], "/images/cards/major/wheel-of-fortune.jpg"],
  ["justice", "정의", "Justice", "major", null, 11, "균형 잡힌 판단과 책임 있는 결정", "불공정, 회피, 결과를 받아들이기 어려움", ["균형", "판단", "책임"], "/images/cards/major/justice.jpg"],
  ["the-hanged-man", "매달린 사람", "The Hanged Man", "major", null, 12, "멈춤 속의 관점 전환과 내려놓음", "정체, 희생감, 시선을 바꾸기 어려움", ["멈춤", "관점", "수용"], "/images/cards/major/hanged-man.jpg"],
  ["death", "죽음", "Death", "major", null, 13, "끝맺음과 새로운 단계로 넘어가는 변화", "미련, 변화 저항, 끝을 미룸", ["변화", "종료", "재생"], "/images/cards/major/death.jpg"],
  ["temperance", "절제", "Temperance", "major", null, 14, "조율과 회복, 서로 다른 요소의 균형", "불균형, 성급함, 조율 실패", ["조화", "회복", "절제"], "/images/cards/major/temperance.jpg"],
  ["the-devil", "악마", "The Devil", "major", null, 15, "집착과 욕망을 직면해야 하는 시기", "속박에서 벗어날 실마리, 욕망의 완화", ["집착", "욕망", "속박"], "/images/cards/major/devil.jpg"],
  ["the-tower", "탑", "The Tower", "major", null, 16, "갑작스러운 깨달음과 구조의 붕괴", "변화를 미룸, 불안하지만 필요한 정리", ["충격", "해체", "각성"], "/images/cards/major/tower.jpg"],
  ["the-star", "별", "The Star", "major", null, 17, "희망과 치유, 다시 믿어볼 수 있는 가능성", "기대 저하, 회복 지연, 자신감 부족", ["희망", "치유", "영감"], "/images/cards/major/star.jpg"],
  ["the-moon", "달", "The Moon", "major", null, 18, "불확실성과 감정의 파도, 무의식의 신호", "오해 해소, 두려움의 실체가 드러남", ["불안", "직감", "환상"], "/images/cards/major/moon.jpg"],
  ["the-sun", "태양", "The Sun", "major", null, 19, "명확함과 활력, 긍정적인 진전", "기쁨 지연, 과신, 에너지 저하", ["성공", "활력", "기쁨"], "/images/cards/major/sun.jpg"],
  ["judgement", "심판", "Judgement", "major", null, 20, "중요한 결단과 재평가, 다시 부름받는 순간", "결정 회피, 과거에 묶임, 자기비판", ["결단", "부활", "평가"], "/images/cards/major/judgement.jpg"],
  ["the-world", "세계", "The World", "major", null, 21, "완성과 통합, 한 주기의 성취", "마무리 부족, 다음 단계로 넘어가기 전 점검", ["완성", "통합", "성취"], "/images/cards/major/world.jpg"]
];

const wandsSeeds: CardSeed[] = [
  ["ace-of-wands", "완드 에이스", "Ace of Wands", "minor", "wands", 1, "새로운 열정과 시작, 창조적인 불씨", "동기 저하, 시작 지연, 에너지 분산", ["시작", "열정", "영감"], "/images/cards/minor/wands/ace-of-wands.jpg"],
  ["two-of-wands", "완드 2", "Two of Wands", "minor", "wands", 2, "가능성을 바라보며 방향을 계획하는 시기", "망설임, 시야 제한, 결정 지연", ["계획", "전망", "선택"], "/images/cards/minor/wands/two-of-wands.jpg"],
  ["three-of-wands", "완드 3", "Three of Wands", "minor", "wands", 3, "기다림 끝에 확장 가능성이 보이는 흐름", "기대 지연, 협력 부족, 시야 축소", ["확장", "기다림", "기회"], "/images/cards/minor/wands/three-of-wands.jpg"],
  ["four-of-wands", "완드 4", "Four of Wands", "minor", "wands", 4, "안정적인 기반, 축하와 관계의 기쁨", "불안정한 기반, 어색한 분위기, 완성 지연", ["안정", "축하", "기반"], "/images/cards/minor/wands/four-of-wands.jpg"],
  ["five-of-wands", "완드 5", "Five of Wands", "minor", "wands", 5, "경쟁과 의견 충돌 속에서 힘을 겨루는 상황", "갈등 회피, 에너지 낭비, 협력 실패", ["갈등", "경쟁", "마찰"], "/images/cards/minor/wands/five-of-wands.jpg"],
  ["six-of-wands", "완드 6", "Six of Wands", "minor", "wands", 6, "인정과 성취, 자신감 있는 전진", "인정 욕구, 자만, 성과 지연", ["승리", "인정", "자신감"], "/images/cards/minor/wands/six-of-wands.jpg"],
  ["seven-of-wands", "완드 7", "Seven of Wands", "minor", "wands", 7, "입장을 지키고 도전을 받아내는 힘", "방어 과잉, 지침, 자신감 흔들림", ["방어", "도전", "버티기"], "/images/cards/minor/wands/seven-of-wands.jpg"],
  ["eight-of-wands", "완드 8", "Eight of Wands", "minor", "wands", 8, "빠른 소식과 진행, 상황이 속도를 내는 흐름", "지연, 엇갈린 연락, 성급한 움직임", ["속도", "소식", "진행"], "/images/cards/minor/wands/eight-of-wands.jpg"],
  ["nine-of-wands", "완드 9", "Nine of Wands", "minor", "wands", 9, "상처가 있어도 마지막까지 버티는 인내", "경계심 과다, 피로 누적, 의심", ["인내", "경계", "회복력"], "/images/cards/minor/wands/nine-of-wands.jpg"],
  ["ten-of-wands", "완드 10", "Ten of Wands", "minor", "wands", 10, "무거운 책임을 지고 끝까지 밀고 가는 상황", "과부하, 책임 분산 필요, 부담의 한계", ["책임", "부담", "완주"], "/images/cards/minor/wands/ten-of-wands.jpg"],
  ["page-of-wands", "완드 시종", "Page of Wands", "minor", "wands", 11, "새로운 가능성을 향해 호기심 있게 움직이는 시작", "미숙함, 변덕, 준비되지 않은 열정", ["호기심", "소식", "시작"], "/images/cards/minor/wands/page-of-wands.jpg"],
  ["knight-of-wands", "완드 기사", "Knight of Wands", "minor", "wands", 12, "강한 추진력과 모험심, 빠르게 전진하는 에너지", "성급함, 충동, 오래 버티지 못하는 열정", ["추진", "모험", "속도"], "/images/cards/minor/wands/knight-of-wands.jpg"],
  ["queen-of-wands", "완드 여왕", "Queen of Wands", "minor", "wands", 13, "자신감과 매력, 따뜻하지만 주도적인 에너지", "질투, 자신감 흔들림, 과한 자기표현", ["자신감", "매력", "주도성"], "/images/cards/minor/wands/queen-of-wands.jpg"],
  ["king-of-wands", "완드 왕", "King of Wands", "minor", "wands", 14, "비전과 리더십, 큰 방향을 이끄는 힘", "독단, 성급한 지시, 책임 회피", ["리더십", "비전", "결단"], "/images/cards/minor/wands/king-of-wands.jpg"]
];

const cupsSeeds: CardSeed[] = [
  ["ace-of-cups", "컵 에이스", "Ace of Cups", "minor", "cups", 1, "새로운 감정의 시작, 마음이 열리는 흐름", "감정 억제, 마음의 고갈, 표현 지연", ["감정", "시작", "사랑"], "/images/cards/minor/cups/ace-of-cups.jpg"],
  ["two-of-cups", "컵 2", "Two of Cups", "minor", "cups", 2, "서로의 마음이 맞닿는 관계와 화해", "엇갈림, 불균형한 관계, 감정의 불일치", ["관계", "교감", "화해"], "/images/cards/minor/cups/two-of-cups.jpg"],
  ["three-of-cups", "컵 3", "Three of Cups", "minor", "cups", 3, "기쁨을 나누는 모임과 정서적 지지", "소외감, 관계의 과잉, 진심 없는 어울림", ["축하", "우정", "기쁨"], "/images/cards/minor/cups/three-of-cups.jpg"],
  ["four-of-cups", "컵 4", "Four of Cups", "minor", "cups", 4, "권태와 망설임 속에서 마음을 다시 살피는 시간", "닫힌 마음이 열림, 새로운 제안 수용", ["권태", "성찰", "제안"], "/images/cards/minor/cups/four-of-cups.jpg"],
  ["five-of-cups", "컵 5", "Five of Cups", "minor", "cups", 5, "상실감과 후회, 아직 남은 가능성을 보지 못함", "회복, 미련 정리, 남은 것을 다시 봄", ["상실", "후회", "회복"], "/images/cards/minor/cups/five-of-cups.jpg"],
  ["six-of-cups", "컵 6", "Six of Cups", "minor", "cups", 6, "추억과 순수한 마음, 과거에서 오는 따뜻함", "과거 집착, 미성숙한 감정, 회상에서 벗어남", ["추억", "순수", "재회"], "/images/cards/minor/cups/six-of-cups.jpg"],
  ["seven-of-cups", "컵 7", "Seven of Cups", "minor", "cups", 7, "많은 가능성과 상상, 선택이 필요한 상태", "환상에서 깨어남, 선택지 정리, 현실화", ["선택", "상상", "혼란"], "/images/cards/minor/cups/seven-of-cups.jpg"],
  ["eight-of-cups", "컵 8", "Eight of Cups", "minor", "cups", 8, "익숙한 감정을 뒤로하고 떠나는 결심", "미련, 떠나지 못함, 정리 지연", ["이별", "정리", "탐색"], "/images/cards/minor/cups/eight-of-cups.jpg"],
  ["nine-of-cups", "컵 9", "Nine of Cups", "minor", "cups", 9, "만족과 소망 성취, 감정적 충만함", "겉으로만 만족, 과한 기대, 공허함", ["만족", "소원", "충만"], "/images/cards/minor/cups/nine-of-cups.jpg"],
  ["ten-of-cups", "컵 10", "Ten of Cups", "minor", "cups", 10, "정서적 완성, 가족과 관계의 행복", "이상과 현실의 차이, 관계 안의 불화", ["행복", "완성", "가족"], "/images/cards/minor/cups/ten-of-cups.jpg"],
  ["page-of-cups", "컵 시종", "Page of Cups", "minor", "cups", 11, "순수한 감정 표현과 뜻밖의 다정한 소식", "감정 미숙, 과민함, 표현의 서툼", ["소식", "순수", "감수성"], "/images/cards/minor/cups/page-of-cups.jpg"],
  ["knight-of-cups", "컵 기사", "Knight of Cups", "minor", "cups", 12, "마음을 전하러 다가오는 낭만적인 움직임", "감정 기복, 이상화, 말뿐인 약속", ["고백", "낭만", "접근"], "/images/cards/minor/cups/knight-of-cups.jpg"],
  ["queen-of-cups", "컵 여왕", "Queen of Cups", "minor", "cups", 13, "깊은 공감과 직관, 감정을 품어주는 힘", "감정 과잉, 경계 부족, 의존", ["공감", "직관", "돌봄"], "/images/cards/minor/cups/queen-of-cups.jpg"],
  ["king-of-cups", "컵 왕", "King of Cups", "minor", "cups", 14, "감정을 성숙하게 다스리는 안정된 마음", "감정 통제 과잉, 회피, 속마음 숨김", ["성숙", "안정", "조율"], "/images/cards/minor/cups/king-of-cups.jpg"]
];

const swordsSeeds: CardSeed[] = [
  ["ace-of-swords", "소드 에이스", "Ace of Swords", "minor", "swords", 1, "명확한 판단과 진실을 가르는 새로운 생각", "혼란, 오해, 결론을 내리기 어려움", ["진실", "판단", "시작"], "/images/cards/minor/swords/ace-of-swords.jpg"],
  ["two-of-swords", "소드 2", "Two of Swords", "minor", "swords", 2, "결정을 미루며 균형을 잡으려는 상태", "회피 끝, 선택 압박, 마음의 장벽 해소", ["선택", "보류", "균형"], "/images/cards/minor/swords/two-of-swords.jpg"],
  ["three-of-swords", "소드 3", "Three of Swords", "minor", "swords", 3, "상처와 실망, 아픈 진실을 마주하는 순간", "상처 회복, 용서, 아픔의 정리", ["상처", "실망", "진실"], "/images/cards/minor/swords/three-of-swords.jpg"],
  ["four-of-swords", "소드 4", "Four of Swords", "minor", "swords", 4, "잠시 멈춰 회복하고 생각을 정리하는 시간", "휴식 부족, 회복 지연, 다시 움직일 준비", ["휴식", "회복", "정리"], "/images/cards/minor/swords/four-of-swords.jpg"],
  ["five-of-swords", "소드 5", "Five of Swords", "minor", "swords", 5, "이겨도 상처가 남는 갈등과 말의 충돌", "갈등 수습, 자존심 내려놓기, 후회", ["갈등", "논쟁", "손실"], "/images/cards/minor/swords/five-of-swords.jpg"],
  ["six-of-swords", "소드 6", "Six of Swords", "minor", "swords", 6, "어려운 상황을 지나 더 나은 곳으로 이동", "이동 지연, 과거에 머묾, 변화 저항", ["이동", "전환", "회복"], "/images/cards/minor/swords/six-of-swords.jpg"],
  ["seven-of-swords", "소드 7", "Seven of Swords", "minor", "swords", 7, "전략과 숨겨진 의도, 조심스러운 움직임", "비밀 노출, 정직함 필요, 계획 수정", ["전략", "비밀", "주의"], "/images/cards/minor/swords/seven-of-swords.jpg"],
  ["eight-of-swords", "소드 8", "Eight of Swords", "minor", "swords", 8, "생각의 감옥에 갇힌 듯한 제한감", "제한에서 벗어남, 관점 전환, 선택권 회복", ["제한", "불안", "관점"], "/images/cards/minor/swords/eight-of-swords.jpg"],
  ["nine-of-swords", "소드 9", "Nine of Swords", "minor", "swords", 9, "걱정과 후회가 커지는 밤의 불안", "불안 완화, 도움 요청, 생각 정리", ["불안", "걱정", "후회"], "/images/cards/minor/swords/nine-of-swords.jpg"],
  ["ten-of-swords", "소드 10", "Ten of Swords", "minor", "swords", 10, "끝났다고 느껴지는 고통과 마침표", "최악의 고비를 지남, 회복의 시작", ["종료", "고통", "회복"], "/images/cards/minor/swords/ten-of-swords.jpg"],
  ["page-of-swords", "소드 시종", "Page of Swords", "minor", "swords", 11, "호기심과 관찰, 조심스러운 소식 탐색", "성급한 말, 의심, 정보 부족", ["관찰", "정보", "호기심"], "/images/cards/minor/swords/page-of-swords.jpg"],
  ["knight-of-swords", "소드 기사", "Knight of Swords", "minor", "swords", 12, "빠르게 밀고 들어오는 말과 행동", "무모함, 공격적인 태도, 서두름", ["돌파", "속도", "결단"], "/images/cards/minor/swords/knight-of-swords.jpg"],
  ["queen-of-swords", "소드 여왕", "Queen of Swords", "minor", "swords", 13, "감정보다 진실을 보는 명료함과 경계", "차가움, 날 선 판단, 방어적 태도", ["명료함", "경계", "진실"], "/images/cards/minor/swords/queen-of-swords.jpg"],
  ["king-of-swords", "소드 왕", "King of Swords", "minor", "swords", 14, "이성과 원칙으로 판단하는 권위", "완고함, 냉정함, 말의 압박", ["원칙", "판단", "권위"], "/images/cards/minor/swords/king-of-swords.jpg"]
];

const pentaclesSeeds: CardSeed[] = [
  ["ace-of-pentacles", "펜타클 에이스", "Ace of Pentacles", "minor", "pentacles", 1, "현실적인 기회와 새로운 기반의 시작", "기회 지연, 준비 부족, 현실 감각 점검", ["기회", "기반", "현실"], "/images/cards/minor/pentacles/ace-of-pentacles.jpg"],
  ["two-of-pentacles", "펜타클 2", "Two of Pentacles", "minor", "pentacles", 2, "여러 일을 조율하며 균형을 맞추는 흐름", "균형 상실, 과부하, 우선순위 혼란", ["균형", "조율", "우선순위"], "/images/cards/minor/pentacles/two-of-pentacles.jpg"],
  ["three-of-pentacles", "펜타클 3", "Three of Pentacles", "minor", "pentacles", 3, "협업과 기술, 함께 완성도를 높이는 과정", "협력 부족, 인정 지연, 역할 혼선", ["협업", "기술", "성장"], "/images/cards/minor/pentacles/three-of-pentacles.jpg"],
  ["four-of-pentacles", "펜타클 4", "Four of Pentacles", "minor", "pentacles", 4, "가진 것을 지키려는 안정 욕구와 보수성", "집착 완화, 통제 내려놓기, 나눔의 필요", ["보존", "안정", "집착"], "/images/cards/minor/pentacles/four-of-pentacles.jpg"],
  ["five-of-pentacles", "펜타클 5", "Five of Pentacles", "minor", "pentacles", 5, "결핍감과 소외, 도움을 청해야 하는 시기", "회복의 실마리, 지원 수용, 어려움 완화", ["결핍", "소외", "지원"], "/images/cards/minor/pentacles/five-of-pentacles.jpg"],
  ["six-of-pentacles", "펜타클 6", "Six of Pentacles", "minor", "pentacles", 6, "주고받음의 균형, 도움과 보상의 흐름", "불공정한 교환, 의존, 계산적인 관계", ["나눔", "균형", "보상"], "/images/cards/minor/pentacles/six-of-pentacles.jpg"],
  ["seven-of-pentacles", "펜타클 7", "Seven of Pentacles", "minor", "pentacles", 7, "기다림과 점검, 노력의 결과를 살피는 시간", "조급함, 성과 지연, 방향 재검토", ["기다림", "점검", "성과"], "/images/cards/minor/pentacles/seven-of-pentacles.jpg"],
  ["eight-of-pentacles", "펜타클 8", "Eight of Pentacles", "minor", "pentacles", 8, "꾸준한 연습과 집중, 실력을 쌓는 과정", "반복에 지침, 완성도 부족, 집중력 저하", ["노력", "숙련", "집중"], "/images/cards/minor/pentacles/eight-of-pentacles.jpg"],
  ["nine-of-pentacles", "펜타클 9", "Nine of Pentacles", "minor", "pentacles", 9, "자립과 여유, 스스로 만든 안정감", "외로움, 과시, 독립의 부담", ["자립", "여유", "성취"], "/images/cards/minor/pentacles/nine-of-pentacles.jpg"],
  ["ten-of-pentacles", "펜타클 10", "Ten of Pentacles", "minor", "pentacles", 10, "장기적인 안정, 가족과 자산의 기반", "불안정한 기반, 세대 갈등, 장기 계획 점검", ["안정", "가족", "유산"], "/images/cards/minor/pentacles/ten-of-pentacles.jpg"],
  ["page-of-pentacles", "펜타클 시종", "Page of Pentacles", "minor", "pentacles", 11, "배움과 준비, 현실적인 가능성을 탐색하는 시작", "준비 부족, 산만함, 실천 지연", ["배움", "준비", "가능성"], "/images/cards/minor/pentacles/page-of-pentacles.jpg"],
  ["knight-of-pentacles", "펜타클 기사", "Knight of Pentacles", "minor", "pentacles", 12, "느리지만 성실하게 목표를 향해 가는 힘", "정체, 고집, 변화에 둔감함", ["성실", "책임", "지속"], "/images/cards/minor/pentacles/knight-of-pentacles.jpg"],
  ["queen-of-pentacles", "펜타클 여왕", "Queen of Pentacles", "minor", "pentacles", 13, "돌봄과 실용성, 삶을 안정시키는 따뜻한 힘", "소진, 과한 책임, 현실 부담", ["돌봄", "실용", "안정"], "/images/cards/minor/pentacles/queen-of-pentacles.jpg"],
  ["king-of-pentacles", "펜타클 왕", "King of Pentacles", "minor", "pentacles", 14, "성취와 안정, 현실을 다스리는 책임감", "물질 집착, 완고함, 안전지대 고착", ["성취", "안정", "책임"], "/images/cards/minor/pentacles/king-of-pentacles.jpg"]
];

function toTarotCard([id, nameKo, nameEn, arcana, suit, number, uprightMeaning, reversedMeaning, keywords, imageUrl]: CardSeed): TarotCard {
  return {
    id,
    nameKo,
    nameEn,
    arcana,
    suit,
    number,
    uprightMeaning,
    reversedMeaning,
    keywords: [...keywords],
    imageUrl
  };
}

export const majorArcanaCards: TarotCard[] = majorArcanaSeeds.map(toTarotCard);
export const minorWandsCards: TarotCard[] = wandsSeeds.map(toTarotCard);
export const minorCupsCards: TarotCard[] = cupsSeeds.map(toTarotCard);
export const minorSwordsCards: TarotCard[] = swordsSeeds.map(toTarotCard);
export const minorPentaclesCards: TarotCard[] = pentaclesSeeds.map(toTarotCard);
export const tarotCards: TarotCard[] = [
  ...majorArcanaCards,
  ...minorWandsCards,
  ...minorCupsCards,
  ...minorSwordsCards,
  ...minorPentaclesCards
];
