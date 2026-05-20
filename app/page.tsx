import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { routes } from "@/lib/routes";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="grid min-h-[62vh] items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">AI Tarot Reading Note</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-softGold sm:text-6xl">tarot-note</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-mist">
            고민을 적고 스프레드를 선택하면, 카드 의미와 위치 의미를 조합해 상담처럼 읽히는 리딩을 제공합니다.
            MVP는 템플릿 리딩 엔진으로 동작하며 Vercel과 Supabase만으로 배포됩니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={routes.spreads}>타로 리딩 시작하기</Button>
            <Button href={routes.history} variant="secondary">
              내 리딩 기록
            </Button>
          </div>
        </div>
        <div className="grid gap-4">
          <Card>
            <p className="text-sm text-gold">오늘의 카드</p>
            <h2 className="mt-2 text-2xl font-semibold text-softGold">The Star</h2>
            <p className="mt-3 text-mist">희망과 회복의 흐름이 조금씩 살아나는 날입니다.</p>
          </Card>
          <Card>
            <p className="text-sm text-gold">최근 리딩</p>
            <p className="mt-2 text-mist">“이 관계의 다음 흐름은?” · 3카드 배열</p>
          </Card>
        </div>
      </section>
    </div>
  );
}
