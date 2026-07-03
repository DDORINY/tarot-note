import { BrandImage } from "@/components/brand/BrandImage";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { routes } from "@/lib/routes";

function HeroFallback() {
  return (
    <div className="grid h-full min-h-[320px] place-items-center rounded-lg border border-white/10 bg-black/25 p-6 shadow-glow">
      <div className="grid grid-cols-3 gap-3">
        {["과거", "현재", "미래", "감정", "가능성", "조언"].map((label, index) => (
          <div
            className="grid h-28 w-20 place-items-center rounded-md border border-gold/40 bg-plum text-xs text-softGold"
            key={label}
            style={{ transform: `rotate(${(index - 2) * 3}deg)` }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="grid min-h-[62vh] items-center gap-8 md:grid-cols-[1.02fr_0.98fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Story Tarot Reading</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-softGold sm:text-6xl">Tarot Note</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-mist">
            질문을 적고 스프레드를 선택하면, 카드의 위치와 의미를 하나의 흐름으로 엮어 스토리처럼 읽히는 타로 리딩을 제공합니다.
            감정 태그와 메모를 함께 남기며 고민의 변화를 기록해보세요.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={routes.spreads}>타로 리딩 시작하기</Button>
            <Button href={routes.history} variant="secondary">
              내 리딩 기록
            </Button>
          </div>
        </div>
        <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-white/10 bg-black/20 shadow-glow md:min-h-[460px]">
          <BrandImage
            alt="타로 카드가 놓인 테이블"
            fallback={<HeroFallback />}
            fill
            imageClassName="object-cover"
            priority
            sizes="(min-width: 768px) 520px, 100vw"
            src="/images/brand/hero-tarot-table.png"
          />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <p className="text-sm text-gold">오늘의 카드</p>
          <h2 className="mt-2 text-2xl font-semibold text-softGold">The Star</h2>
          <p className="mt-3 text-mist">희망과 회복의 흐름을 천천히 되찾는 카드입니다.</p>
        </Card>
        <Card>
          <p className="text-sm text-gold">리딩 기록</p>
          <p className="mt-2 text-mist">로그인 사용자는 Supabase에, 비로그인 사용자는 현재 브라우저에 기록이 저장됩니다.</p>
        </Card>
      </section>
    </div>
  );
}
