# Supabase 설정

1. Supabase에서 새 프로젝트를 생성합니다.
2. SQL Editor에서 `supabase/migrations/001_init.sql`을 실행합니다.
3. Seed 데이터는 다음 순서로 실행합니다.
   - `supabase/seed/tarot_cards_major.sql`
   - `supabase/seed/spreads.sql`
4. Authentication > Providers에서 Email provider를 활성화합니다.
5. 필요하면 Confirm email 옵션을 프로젝트 정책에 맞게 조정합니다.
6. RLS는 migration에 포함되어 있습니다.
   - `tarot_cards`, `spreads`, `spread_positions`: 누구나 읽기 가능
   - `readings`: 본인만 읽기, 로그인 사용자만 생성
   - `reading_cards`: 해당 reading 소유자만 읽기/생성
   - `diary_entries`: 본인만 읽고 쓰기

비로그인 사용자는 DB에 저장하지 않고 브라우저 localStorage에 임시 저장합니다.
