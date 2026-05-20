# 배포 개요

MVP는 Vercel Hobby 플랜과 Supabase Free 플랜을 기준으로 합니다.

- Next.js App Router가 화면과 `/app/api/*` 백엔드 기능을 함께 제공합니다.
- Supabase Auth로 이메일 로그인과 회원가입을 처리합니다.
- Supabase PostgreSQL에 로그인 사용자의 리딩 기록을 저장합니다.
- 로컬 파일 저장과 별도 Python 서버는 사용하지 않습니다.
