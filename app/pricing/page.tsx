
import { Check, Lock } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { routes } from "@/lib/routes";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-sm text-gold">Premium</p>
        <h1 className="mt-2 text-3xl font-semibold text-softGold">프리미엄 준비 중</h1>
        <p className="mt-3 text-mist">실제 결제는 아직 연결하지 않았습니다. 지금은 잠금 UX와 요금제 화면 구조만 확인할 수 있습니다.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold text-softGold">무료</h2>
          <p className="mt-2 text-mist">3카드, 4카드 배열 사용 가능</p>
          <div className="mt-5 flex items-center gap-2 text-sm text-mist">
            <Check size={16} /> 기본 리딩 저장
          </div>
          <Button href={routes.spreads} className="mt-6 w-full" variant="secondary">
            무료로 시작
          </Button>
        </Card>
        <Card className="border-gold/40">
          <div className="flex items-center gap-2">
            <Lock size={18} className="text-gold" />
            <h2 className="text-xl font-semibold text-softGold">프리미엄</h2>
          </div>
          <p className="mt-2 text-mist">5장 배열, 매직 세븐, 켈틱 크로스, 12장 플라워 예정</p>
          <div className="mt-5 flex items-center gap-2 text-sm text-mist">
            <Check size={16} /> 정밀 배열과 기록 확장
          </div>
          <Button className="mt-6 w-full" disabled>
            곧 제공 예정
          </Button>
        </Card>
      </div>
    </div>
  );
}
