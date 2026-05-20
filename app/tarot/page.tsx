import { QuestionForm } from "@/components/tarot/QuestionForm";

export default function TarotQuestionPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-gold">Question</p>
        <h1 className="mt-2 text-3xl font-semibold text-softGold">고민을 적어주세요</h1>
        <p className="mt-3 text-mist">질문이 구체적일수록 카드의 조언도 더 선명해집니다.</p>
      </div>
      <QuestionForm />
    </div>
  );
}
