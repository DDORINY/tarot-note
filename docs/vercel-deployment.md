# Vercel 배포

1. GitHub에 `tarot-note` repository를 생성하고 코드를 push합니다.
2. Vercel에서 New Project를 선택하고 GitHub repository를 연결합니다.
3. Environment Variables에 다음 값을 등록합니다.
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Build Command는 `npm run build`를 사용합니다.
5. Output 설정은 Next.js 기본값을 사용합니다.
6. 배포 후 `/`, `/tarot/spreads`, `/login`, `/tarot/history`에 접속해 화면과 API 응답을 확인합니다.

Hobby 플랜에서도 사용자의 로컬 컴퓨터와 무관하게 Vercel에서 앱이 실행됩니다.
