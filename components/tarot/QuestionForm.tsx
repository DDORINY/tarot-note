"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { READING_CATEGORIES, type ReadingCategory } from "@/lib/constants";
import { routes } from "@/lib/routes";

export function QuestionForm() {
  const router = useRouter();
  const [category, setCategory] = useState<ReadingCategory>(READING_CATEGORIES[0]);
  const [question, setQuestion] = useState("");

  function submit() {
    if (!question.trim()) return;
    window.sessionStorage.setItem("tarot-note:question", JSON.stringify({ category, question }));
    router.push(routes.draw);
  }

  return (
    <div className="mx-auto max-w-2xl rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-glow">
      <label className="text-sm font-medium text-softGold">리딩 카테고리</label>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {READING_CATEGORIES.map((item) => (
          <button
            key={item}
            className={`rounded-md border px-3 py-2 text-sm transition ${
              item === category ? "border-gold bg-gold text-night" : "border-white/10 bg-white/5 text-mist"
            }`}
            onClick={() => setCategory(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <label className="mt-6 block text-sm font-medium text-softGold">지금 묻고 싶은 고민</label>
      <textarea
        className="mt-3 min-h-36 w-full rounded-md border border-white/10 bg-black/25 p-4 text-mist outline-none focus:border-gold"
        placeholder="예: 이 관계가 앞으로 어떤 흐름으로 이어질까요?"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
      />
      <Button className="mt-5 w-full" onClick={submit}>
        카드 뽑으러 가기
      </Button>
    </div>
  );
}
