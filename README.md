# tarot-note

Next.js App Router와 Supabase로 만드는 AI 타로 리딩 MVP입니다.

## 로컬 개발

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

## 배포 구조

사용자 브라우저 → Vercel Next.js 앱 → Next.js Route Handler → Supabase PostgreSQL

MVP에서는 별도 FastAPI/Flask 서버와 로컬 파일 저장을 사용하지 않습니다.
