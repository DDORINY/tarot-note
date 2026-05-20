# DB Schema

주요 테이블은 `profiles`, `tarot_cards`, `spreads`, `spread_positions`, `readings`, `reading_cards`, `diary_entries`입니다.

`readings`는 리딩의 질문, 카테고리, 스프레드, 요약과 조언을 저장하고, `reading_cards`는 각 포지션별 카드와 해석을 저장합니다.

자세한 DDL과 RLS 정책은 `supabase/migrations/001_init.sql`에 있습니다.
