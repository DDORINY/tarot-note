"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Loading } from "@/components/common/Loading";
import { ReadingResult } from "@/components/tarot/ReadingResult";
import { saveGuestReading, updateGuestReadingDiary } from "@/features/tarot/reading-utils";
import type { DrawnCard, ReadingResult as ReadingResultType, TarotSpread } from "@/features/tarot/types";
import { EMOTION_TAGS } from "@/lib/constants";
import { generateTemplateReading } from "@/lib/reading-engine";
import { routes } from "@/lib/routes";

export default function ResultPage() {
  const [result, setResult] = useState<ReadingResultType | null>(null);
  const [readingId, setReadingId] = useState<string | null>(null);
  const [guestReadingId, setGuestReadingId] = useState<string | null>(null);
  const [emotion, setEmotion] = useState("");
  const [note, setNote] = useState("");
  const [diaryMessage, setDiaryMessage] = useState("");

  useEffect(() => {
    const spread = JSON.parse(window.sessionStorage.getItem("tarot-note:selected-spread") ?? "null") as TarotSpread | null;
    const question = JSON.parse(window.sessionStorage.getItem("tarot-note:question") ?? "null") as
      | { category: string; question: string }
      | null;
    const drawnCards = JSON.parse(window.sessionStorage.getItem("tarot-note:drawn-cards") ?? "[]") as DrawnCard[];

    if (!spread || !question || !drawnCards.length) return;

    const nextResult = generateTemplateReading({ ...question, spread, drawnCards });
    setResult(nextResult);

    fetch("/api/readings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        spreadId: spread.id,
        category: question.category,
        question: question.question,
        resultSummary: nextResult.summary,
        advice: nextResult.advice,
        cards: nextResult.cards
      })
    })
      .then((response) => {
        if (!response.ok) {
          const id = saveGuestReading({
            ...nextResult,
            question: question.question,
            category: question.category,
            spreadId: spread.id,
            spreadName: spread.name
          });
          if (id) setGuestReadingId(id);
          return;
        }
        response.json().then((data: { id?: string }) => {
          if (data.id) setReadingId(data.id);
        });
      })
      .catch(() => {
        const id = saveGuestReading({
          ...nextResult,
          question: question.question,
          category: question.category,
          spreadId: spread.id,
          spreadName: spread.name
        });
        if (id) setGuestReadingId(id);
      });
  }, []);

  async function saveDiary() {
    setDiaryMessage("");

    if (!emotion && !note.trim()) {
      setDiaryMessage("감정 태그나 메모를 입력하면 저장할 수 있습니다.");
      return;
    }

    if (readingId) {
      const response = await fetch("/api/diary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ readingId, emotion, note })
      });
      setDiaryMessage(response.ok ? "감정 메모가 저장되었습니다." : "리딩은 저장됐지만 감정 메모 저장은 실패했습니다.");
      return;
    }

    if (guestReadingId) {
      updateGuestReadingDiary(guestReadingId, { emotion, note });
      setDiaryMessage("이 브라우저에 감정 메모가 저장되었습니다.");
      return;
    }

    setDiaryMessage("리딩 저장이 끝난 뒤 다시 시도해주세요.");
  }

  if (!result) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-gold">Reading</p>
          <h1 className="mt-2 text-3xl font-semibold text-softGold">리딩 결과</h1>
        </div>
        <Button href={routes.spreads} variant="secondary">
          새 리딩 시작
        </Button>
      </div>
      <ReadingResult result={result} />
      <Card>
        <h2 className="text-lg font-semibold text-softGold">감정 태그와 메모</h2>
        <p className="mt-2 text-sm text-mist">선택 입력입니다. 리딩을 보고 난 지금의 감정과 짧은 기록을 남겨보세요.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {EMOTION_TAGS.map((tag) => (
            <button
              key={tag}
              className={`rounded-full border px-3 py-2 text-sm transition ${
                emotion === tag ? "border-gold bg-gold text-night" : "border-white/10 bg-white/5 text-mist hover:border-gold/50"
              }`}
              onClick={() => setEmotion((current) => (current === tag ? "" : tag))}
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>
        <textarea
          className="mt-4 min-h-28 w-full rounded-md border border-white/10 bg-black/25 p-4 text-sm text-mist outline-none focus:border-gold"
          maxLength={500}
          onChange={(event) => setNote(event.target.value)}
          placeholder="예: 불안했지만 조언 카드를 보고 오늘 연락보다 내 마음을 먼저 정리해보기로 했다."
          value={note}
        />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button onClick={saveDiary}>감정 메모 저장</Button>
          {diaryMessage && <p className="text-sm text-gold">{diaryMessage}</p>}
        </div>
      </Card>
    </div>
  );
}
