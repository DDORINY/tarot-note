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
('ace-of-cups','컵 에이스','Ace of Cups','minor','cups',1,'새로운 감정의 시작, 마음이 열리는 흐름','감정 억제, 마음의 고갈, 표현 지연',array['감정','시작','사랑'],'/images/cards/minor/cups/ace-of-cups.jpg'),
('two-of-cups','컵 2','Two of Cups','minor','cups',2,'서로의 마음이 맞닿는 관계와 화해','엇갈림, 불균형한 관계, 감정의 불일치',array['관계','교감','화해'],'/images/cards/minor/cups/two-of-cups.jpg'),
('three-of-cups','컵 3','Three of Cups','minor','cups',3,'기쁨을 나누는 모임과 정서적 지지','소외감, 관계의 과잉, 진심 없는 어울림',array['축하','우정','기쁨'],'/images/cards/minor/cups/three-of-cups.jpg'),
('four-of-cups','컵 4','Four of Cups','minor','cups',4,'권태와 망설임 속에서 마음을 다시 살피는 시간','닫힌 마음이 열림, 새로운 제안 수용',array['권태','성찰','제안'],'/images/cards/minor/cups/four-of-cups.jpg'),
('five-of-cups','컵 5','Five of Cups','minor','cups',5,'상실감과 후회, 아직 남은 가능성을 보지 못함','회복, 미련 정리, 남은 것을 다시 봄',array['상실','후회','회복'],'/images/cards/minor/cups/five-of-cups.jpg'),
('six-of-cups','컵 6','Six of Cups','minor','cups',6,'추억과 순수한 마음, 과거에서 오는 따뜻함','과거 집착, 미성숙한 감정, 회상에서 벗어남',array['추억','순수','재회'],'/images/cards/minor/cups/six-of-cups.jpg'),
('seven-of-cups','컵 7','Seven of Cups','minor','cups',7,'많은 가능성과 상상, 선택이 필요한 상태','환상에서 깨어남, 선택지 정리, 현실화',array['선택','상상','혼란'],'/images/cards/minor/cups/seven-of-cups.jpg'),
('eight-of-cups','컵 8','Eight of Cups','minor','cups',8,'익숙한 감정을 뒤로하고 떠나는 결심','미련, 떠나지 못함, 정리 지연',array['이별','정리','탐색'],'/images/cards/minor/cups/eight-of-cups.jpg'),
('nine-of-cups','컵 9','Nine of Cups','minor','cups',9,'만족과 소망 성취, 감정적 충만함','겉으로만 만족, 과한 기대, 공허함',array['만족','소원','충만'],'/images/cards/minor/cups/nine-of-cups.jpg'),
('ten-of-cups','컵 10','Ten of Cups','minor','cups',10,'정서적 완성, 가족과 관계의 행복','이상과 현실의 차이, 관계 안의 불화',array['행복','완성','가족'],'/images/cards/minor/cups/ten-of-cups.jpg'),
('page-of-cups','컵 시종','Page of Cups','minor','cups',11,'순수한 감정 표현과 뜻밖의 다정한 소식','감정 미숙, 과민함, 표현의 서툼',array['소식','순수','감수성'],'/images/cards/minor/cups/page-of-cups.jpg'),
('knight-of-cups','컵 기사','Knight of Cups','minor','cups',12,'마음을 전하러 다가오는 낭만적인 움직임','감정 기복, 이상화, 말뿐인 약속',array['고백','낭만','접근'],'/images/cards/minor/cups/knight-of-cups.jpg'),
('queen-of-cups','컵 여왕','Queen of Cups','minor','cups',13,'깊은 공감과 직관, 감정을 품어주는 힘','감정 과잉, 경계 부족, 의존',array['공감','직관','돌봄'],'/images/cards/minor/cups/queen-of-cups.jpg'),
('king-of-cups','컵 왕','King of Cups','minor','cups',14,'감정을 성숙하게 다스리는 안정된 마음','감정 통제 과잉, 회피, 속마음 숨김',array['성숙','안정','조율'],'/images/cards/minor/cups/king-of-cups.jpg')
on conflict (id) do update set
name_ko = excluded.name_ko,
name_en = excluded.name_en,
upright_meaning = excluded.upright_meaning,
reversed_meaning = excluded.reversed_meaning,
keywords = excluded.keywords,
image_url = excluded.image_url;
