insert into public.tarot_cards (
  id,
  name_ko,
  name_en,
  arcana,
  suit,
  number,
  upright_meaning,
  reversed_meaning,
  keywords,
  image_url
) values
('ace-of-swords','소드 에이스','Ace of Swords','minor','swords',1,'명확한 판단과 진실을 가르는 새로운 생각','혼란, 오해, 결론을 내리기 어려움',array['진실','판단','시작'],'/images/cards/minor/swords/ace-of-swords.jpg'),
('two-of-swords','소드 2','Two of Swords','minor','swords',2,'결정을 미루며 균형을 잡으려는 상태','회피 끝, 선택 압박, 마음의 장벽 해소',array['선택','보류','균형'],'/images/cards/minor/swords/two-of-swords.jpg'),
('three-of-swords','소드 3','Three of Swords','minor','swords',3,'상처와 실망, 아픈 진실을 마주하는 순간','상처 회복, 용서, 아픔의 정리',array['상처','실망','진실'],'/images/cards/minor/swords/three-of-swords.jpg'),
('four-of-swords','소드 4','Four of Swords','minor','swords',4,'잠시 멈춰 회복하고 생각을 정리하는 시간','휴식 부족, 회복 지연, 다시 움직일 준비',array['휴식','회복','정리'],'/images/cards/minor/swords/four-of-swords.jpg'),
('five-of-swords','소드 5','Five of Swords','minor','swords',5,'이겨도 상처가 남는 갈등과 말의 충돌','갈등 수습, 자존심 내려놓기, 후회',array['갈등','논쟁','손실'],'/images/cards/minor/swords/five-of-swords.jpg'),
('six-of-swords','소드 6','Six of Swords','minor','swords',6,'어려운 상황을 지나 더 나은 곳으로 이동','이동 지연, 과거에 머묾, 변화 저항',array['이동','전환','회복'],'/images/cards/minor/swords/six-of-swords.jpg'),
('seven-of-swords','소드 7','Seven of Swords','minor','swords',7,'전략과 숨겨진 의도, 조심스러운 움직임','비밀 노출, 정직함 필요, 계획 수정',array['전략','비밀','주의'],'/images/cards/minor/swords/seven-of-swords.jpg'),
('eight-of-swords','소드 8','Eight of Swords','minor','swords',8,'생각의 감옥에 갇힌 듯한 제한감','제한에서 벗어남, 관점 전환, 선택권 회복',array['제한','불안','관점'],'/images/cards/minor/swords/eight-of-swords.jpg'),
('nine-of-swords','소드 9','Nine of Swords','minor','swords',9,'걱정과 후회가 커지는 밤의 불안','불안 완화, 도움 요청, 생각 정리',array['불안','걱정','후회'],'/images/cards/minor/swords/nine-of-swords.jpg'),
('ten-of-swords','소드 10','Ten of Swords','minor','swords',10,'끝났다고 느껴지는 고통과 마침표','최악의 고비를 지남, 회복의 시작',array['종료','고통','회복'],'/images/cards/minor/swords/ten-of-swords.jpg'),
('page-of-swords','소드 시종','Page of Swords','minor','swords',11,'호기심과 관찰, 조심스러운 소식 탐색','성급한 말, 의심, 정보 부족',array['관찰','정보','호기심'],'/images/cards/minor/swords/page-of-swords.jpg'),
('knight-of-swords','소드 기사','Knight of Swords','minor','swords',12,'빠르게 밀고 들어오는 말과 행동','무모함, 공격적인 태도, 서두름',array['돌파','속도','결단'],'/images/cards/minor/swords/knight-of-swords.jpg'),
('queen-of-swords','소드 여왕','Queen of Swords','minor','swords',13,'감정보다 진실을 보는 명료함과 경계','차가움, 날 선 판단, 방어적 태도',array['명료함','경계','진실'],'/images/cards/minor/swords/queen-of-swords.jpg'),
('king-of-swords','소드 왕','King of Swords','minor','swords',14,'이성과 원칙으로 판단하는 권위','완고함, 냉정함, 말의 압박',array['원칙','판단','권위'],'/images/cards/minor/swords/king-of-swords.jpg')
on conflict (id) do update set
name_ko = excluded.name_ko,
name_en = excluded.name_en,
upright_meaning = excluded.upright_meaning,
reversed_meaning = excluded.reversed_meaning,
keywords = excluded.keywords,
image_url = excluded.image_url;
