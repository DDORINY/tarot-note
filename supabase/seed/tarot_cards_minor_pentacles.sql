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
('ace-of-pentacles','펜타클 에이스','Ace of Pentacles','minor','pentacles',1,'현실적인 기회와 새로운 기반의 시작','기회 지연, 준비 부족, 현실 감각 점검',array['기회','기반','현실'],'/images/cards/minor/pentacles/ace-of-pentacles.jpg'),
('two-of-pentacles','펜타클 2','Two of Pentacles','minor','pentacles',2,'여러 일을 조율하며 균형을 맞추는 흐름','균형 상실, 과부하, 우선순위 혼란',array['균형','조율','우선순위'],'/images/cards/minor/pentacles/two-of-pentacles.jpg'),
('three-of-pentacles','펜타클 3','Three of Pentacles','minor','pentacles',3,'협업과 기술, 함께 완성도를 높이는 과정','협력 부족, 인정 지연, 역할 혼선',array['협업','기술','성장'],'/images/cards/minor/pentacles/three-of-pentacles.jpg'),
('four-of-pentacles','펜타클 4','Four of Pentacles','minor','pentacles',4,'가진 것을 지키려는 안정 욕구와 보수성','집착 완화, 통제 내려놓기, 나눔의 필요',array['보존','안정','집착'],'/images/cards/minor/pentacles/four-of-pentacles.jpg'),
('five-of-pentacles','펜타클 5','Five of Pentacles','minor','pentacles',5,'결핍감과 소외, 도움을 청해야 하는 시기','회복의 실마리, 지원 수용, 어려움 완화',array['결핍','소외','지원'],'/images/cards/minor/pentacles/five-of-pentacles.jpg'),
('six-of-pentacles','펜타클 6','Six of Pentacles','minor','pentacles',6,'주고받음의 균형, 도움과 보상의 흐름','불공정한 교환, 의존, 계산적인 관계',array['나눔','균형','보상'],'/images/cards/minor/pentacles/six-of-pentacles.jpg'),
('seven-of-pentacles','펜타클 7','Seven of Pentacles','minor','pentacles',7,'기다림과 점검, 노력의 결과를 살피는 시간','조급함, 성과 지연, 방향 재검토',array['기다림','점검','성과'],'/images/cards/minor/pentacles/seven-of-pentacles.jpg'),
('eight-of-pentacles','펜타클 8','Eight of Pentacles','minor','pentacles',8,'꾸준한 연습과 집중, 실력을 쌓는 과정','반복에 지침, 완성도 부족, 집중력 저하',array['노력','숙련','집중'],'/images/cards/minor/pentacles/eight-of-pentacles.jpg'),
('nine-of-pentacles','펜타클 9','Nine of Pentacles','minor','pentacles',9,'자립과 여유, 스스로 만든 안정감','외로움, 과시, 독립의 부담',array['자립','여유','성취'],'/images/cards/minor/pentacles/nine-of-pentacles.jpg'),
('ten-of-pentacles','펜타클 10','Ten of Pentacles','minor','pentacles',10,'장기적인 안정, 가족과 자산의 기반','불안정한 기반, 세대 갈등, 장기 계획 점검',array['안정','가족','유산'],'/images/cards/minor/pentacles/ten-of-pentacles.jpg'),
('page-of-pentacles','펜타클 시종','Page of Pentacles','minor','pentacles',11,'배움과 준비, 현실적인 가능성을 탐색하는 시작','준비 부족, 산만함, 실천 지연',array['배움','준비','가능성'],'/images/cards/minor/pentacles/page-of-pentacles.jpg'),
('knight-of-pentacles','펜타클 기사','Knight of Pentacles','minor','pentacles',12,'느리지만 성실하게 목표를 향해 가는 힘','정체, 고집, 변화에 둔감함',array['성실','책임','지속'],'/images/cards/minor/pentacles/knight-of-pentacles.jpg'),
('queen-of-pentacles','펜타클 여왕','Queen of Pentacles','minor','pentacles',13,'돌봄과 실용성, 삶을 안정시키는 따뜻한 힘','소진, 과한 책임, 현실 부담',array['돌봄','실용','안정'],'/images/cards/minor/pentacles/queen-of-pentacles.jpg'),
('king-of-pentacles','펜타클 왕','King of Pentacles','minor','pentacles',14,'성취와 안정, 현실을 다스리는 책임감','물질 집착, 완고함, 안전지대 고착',array['성취','안정','책임'],'/images/cards/minor/pentacles/king-of-pentacles.jpg')
on conflict (id) do update set
name_ko = excluded.name_ko,
name_en = excluded.name_en,
upright_meaning = excluded.upright_meaning,
reversed_meaning = excluded.reversed_meaning,
keywords = excluded.keywords,
image_url = excluded.image_url;
