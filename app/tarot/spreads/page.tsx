import { SpreadSelector } from "@/components/tarot/SpreadSelector";
import { tarotSpreads } from "@/data/mock-spreads";

export default function SpreadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gold">Spread</p>
        <h1 className="mt-2 text-3xl font-semibold text-softGold">스프레드 선택</h1>
        <p className="mt-3 max-w-2xl text-mist">무료 사용자는 3카드와 4카드 배열을 사용할 수 있습니다. 프리미엄 배열은 결제 화면만 mock 상태로 연결됩니다.</p>
      </div>
      <SpreadSelector spreads={tarotSpreads} />
    </div>
  );
}
