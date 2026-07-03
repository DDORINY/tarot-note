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
('ace-of-wands','완드 에이스','Ace of Wands','minor','wands',1,'새로운 열정과 시작, 창조적인 불씨','동기 저하, 시작 지연, 에너지 분산',array['시작','열정','영감'],'/images/cards/minor/wands/ace-of-wands.jpg'),
('two-of-wands','완드 2','Two of Wands','minor','wands',2,'가능성을 바라보며 방향을 계획하는 시기','망설임, 시야 제한, 결정 지연',array['계획','전망','선택'],'/images/cards/minor/wands/two-of-wands.jpg'),
('three-of-wands','완드 3','Three of Wands','minor','wands',3,'기다림 끝에 확장 가능성이 보이는 흐름','기대 지연, 협력 부족, 시야 축소',array['확장','기다림','기회'],'/images/cards/minor/wands/three-of-wands.jpg'),
('four-of-wands','완드 4','Four of Wands','minor','wands',4,'안정적인 기반, 축하와 관계의 기쁨','불안정한 기반, 어색한 분위기, 완성 지연',array['안정','축하','기반'],'/images/cards/minor/wands/four-of-wands.jpg'),
('five-of-wands','완드 5','Five of Wands','minor','wands',5,'경쟁과 의견 충돌 속에서 힘을 겨루는 상황','갈등 회피, 에너지 낭비, 협력 실패',array['갈등','경쟁','마찰'],'/images/cards/minor/wands/five-of-wands.jpg'),
('six-of-wands','완드 6','Six of Wands','minor','wands',6,'인정과 성취, 자신감 있는 전진','인정 욕구, 자만, 성과 지연',array['승리','인정','자신감'],'/images/cards/minor/wands/six-of-wands.jpg'),
('seven-of-wands','완드 7','Seven of Wands','minor','wands',7,'입장을 지키고 도전을 받아내는 힘','방어 과잉, 지침, 자신감 흔들림',array['방어','도전','버티기'],'/images/cards/minor/wands/seven-of-wands.jpg'),
('eight-of-wands','완드 8','Eight of Wands','minor','wands',8,'빠른 소식과 진행, 상황이 속도를 내는 흐름','지연, 엇갈린 연락, 성급한 움직임',array['속도','소식','진행'],'/images/cards/minor/wands/eight-of-wands.jpg'),
('nine-of-wands','완드 9','Nine of Wands','minor','wands',9,'상처가 있어도 마지막까지 버티는 인내','경계심 과다, 피로 누적, 의심',array['인내','경계','회복력'],'/images/cards/minor/wands/nine-of-wands.jpg'),
('ten-of-wands','완드 10','Ten of Wands','minor','wands',10,'무거운 책임을 지고 끝까지 밀고 가는 상황','과부하, 책임 분산 필요, 부담의 한계',array['책임','부담','완주'],'/images/cards/minor/wands/ten-of-wands.jpg'),
('page-of-wands','완드 시종','Page of Wands','minor','wands',11,'새로운 가능성을 향해 호기심 있게 움직이는 시작','미숙함, 변덕, 준비되지 않은 열정',array['호기심','소식','시작'],'/images/cards/minor/wands/page-of-wands.jpg'),
('knight-of-wands','완드 기사','Knight of Wands','minor','wands',12,'강한 추진력과 모험심, 빠르게 전진하는 에너지','성급함, 충동, 오래 버티지 못하는 열정',array['추진','모험','속도'],'/images/cards/minor/wands/knight-of-wands.jpg'),
('queen-of-wands','완드 여왕','Queen of Wands','minor','wands',13,'자신감과 매력, 따뜻하지만 주도적인 에너지','질투, 자신감 흔들림, 과한 자기표현',array['자신감','매력','주도성'],'/images/cards/minor/wands/queen-of-wands.jpg'),
('king-of-wands','완드 왕','King of Wands','minor','wands',14,'비전과 리더십, 큰 방향을 이끄는 힘','독단, 성급한 지시, 책임 회피',array['리더십','비전','결단'],'/images/cards/minor/wands/king-of-wands.jpg')
on conflict (id) do update set
name_ko = excluded.name_ko,
name_en = excluded.name_en,
upright_meaning = excluded.upright_meaning,
reversed_meaning = excluded.reversed_meaning,
keywords = excluded.keywords,
image_url = excluded.image_url;
