import { BrandImage } from "@/components/brand/BrandImage";
import { QuestionForm } from "@/components/tarot/QuestionForm";

export default function TarotQuestionPage() {
  return (
    <div className="space-y-6">
      <div className="grid items-center gap-6 md:grid-cols-[1fr_280px]">
        <div className="text-center md:text-left">
          <p className="text-sm text-gold">Question</p>
          <h1 className="mt-2 text-3xl font-semibold text-softGold">고민을 적어주세요</h1>
          <p className="mt-3 text-mist">질문이 구체적일수록 카드의 조언도 더 선명해집니다.</p>
        </div>
        <div className="relative hidden min-h-40 overflow-hidden rounded-lg md:block">
          <BrandImage
            alt="타로 리딩 테이블"
            fill
            imageClassName="rounded-lg object-cover shadow-glow"
            sizes="280px"
            src="/images/brand/hero-tarot-table.png"
          />
        </div>
      </div>
      <QuestionForm />
    </div>
  );
}
