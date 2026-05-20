"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Loading } from "@/components/common/Loading";
import { ReadingResult } from "@/components/tarot/ReadingResult";
import { getGuestReadingById, type GuestReading } from "@/features/tarot/reading-utils";
import type { ReadingResult as ReadingResultType, TarotOrientation } from "@/features/tarot/types";
import { routes } from "@/lib/routes";

type DbReadingCard = {
  id: string;
  position_index: number;
  position_label: string;
  position_meaning: string;
  card_id: string;
  orientation: TarotOrientation;
  interpretation: string;
  tarot_cards?: {
    name_ko: string;
    name_en: string;
    keywords: string[];
  } | null;
};

type DbDiary = {
  emotion: string | null;
  note: string | null;
  created_at: string;
};

type DbReading = {
  id: string;
  spread_id: string;
  category: string;
  question: string;
  result_summary: string;
  advice: string;
  created_at: string;
  spreads?: { name: string } | null;
  reading_cards: DbReadingCard[];
  diary_entries?: DbDiary[];
};

type DetailState =
  | { status: "loading" }
  | { status: "empty" }
  | {
      status: "ready";
      source: "db" | "guest";
      id: string;
      question: string;
      category: string;
      spreadName: string;
      createdAt: string;
      diary?: { emotion?: string | null; note?: string | null };
      result: ReadingResultType;
    };

function latestDiary(entries?: DbDiary[]) {
  return [...(entries ?? [])].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
}

function dbReadingToDetail(reading: DbReading): Extract<DetailState, { status: "ready" }> {
  const cards = [...(reading.reading_cards ?? [])].sort((a, b) => a.position_index - b.position_index);
  const diary = latestDiary(reading.diary_entries);

  return {
    status: "ready",
    source: "db",
    id: reading.id,
    question: reading.question,
    category: reading.category,
    spreadName: reading.spreads?.name ?? reading.spread_id ?? "저장된 스프레드",
    createdAt: reading.created_at,
    diary: diary ? { emotion: diary.emotion, note: diary.note } : undefined,
    result: {
      summary: reading.result_summary,
      keyMessage: "저장된 카드들의 위치와 방향을 기준으로 핵심 흐름을 다시 확인해보세요.",
      connection: "상세 기록에서는 각 카드가 놓인 위치와 해석을 이어 읽으며 당시의 고민 흐름을 복기할 수 있습니다.",
      current: "현재 상황은 카드별 해석과 위치 의미를 함께 보며 다시 정리할 수 있습니다.",
      flow: "앞으로의 가능성은 고정된 결론보다 당시 조언을 어떻게 실천했는지에 따라 달라질 수 있습니다.",
      advice: reading.advice,
      caution: "",
      oneLine: reading.advice,
      cards: cards.map((card) => ({
        positionIndex: card.position_index,
        positionLabel: card.position_label,
        positionMeaning: card.position_meaning,
        cardId: card.card_id,
        cardName: card.tarot_cards?.name_ko ?? card.card_id,
        cardNameEn: card.tarot_cards?.name_en,
        orientation: card.orientation,
        interpretation: card.interpretation,
        keywords: card.tarot_cards?.keywords ?? []
      }))
    }
  };
}

function guestReadingToDetail(reading: GuestReading): Extract<DetailState, { status: "ready" }> {
  return {
    status: "ready",
    source: "guest",
    id: reading.id,
    question: reading.question,
    category: reading.category,
    spreadName: reading.spreadName ?? "게스트 리딩",
    createdAt: reading.createdAt,
    diary: reading.diary,
    result: reading
  };
}

export default function ReadingDetailPage() {
  const params = useParams<{ id: string }>();
  const [detail, setDetail] = useState<DetailState>({ status: "loading" });

  useEffect(() => {
    const id = params.id;
    const guestReading = getGuestReadingById(id);

    if (guestReading) {
      setDetail(guestReadingToDetail(guestReading));
      return;
    }

    fetch(`/api/readings/${id}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: DbReading | null) => {
        setDetail(data ? dbReadingToDetail(data) : { status: "empty" });
      })
      .catch(() => setDetail({ status: "empty" }));
  }, [params.id]);

  if (detail.status === "loading") return <Loading />;

  if (detail.status === "empty") {
    return (
      <Card className="mx-auto max-w-xl text-center">
        <h1 className="text-xl font-semibold text-softGold">리딩 기록을 찾을 수 없습니다</h1>
        <p className="mt-3 text-mist">삭제되었거나 현재 로그인 계정에서 접근할 수 없는 기록입니다.</p>
        <Button href={routes.history} className="mt-5" variant="secondary">
          기록 목록으로 돌아가기
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-gold">{detail.source === "db" ? "로그인 기록" : "게스트 기록"}</p>
          <h1 className="mt-2 text-3xl font-semibold text-softGold">{detail.question}</h1>
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-mist">
            <span className="rounded-full border border-white/10 px-3 py-1">카테고리: {detail.category}</span>
            <span className="rounded-full border border-white/10 px-3 py-1">스프레드: {detail.spreadName}</span>
            <span className="rounded-full border border-white/10 px-3 py-1">생성일: {new Date(detail.createdAt).toLocaleString("ko-KR")}</span>
          </div>
        </div>
        <Button href={routes.history} variant="secondary">
          기록 목록으로 돌아가기
        </Button>
      </div>

      {(detail.diary?.emotion || detail.diary?.note) && (
        <Card>
          <h2 className="text-lg font-semibold text-softGold">감정 태그와 메모</h2>
          {detail.diary.emotion && <p className="mt-3 inline-flex rounded-full bg-gold/15 px-3 py-1 text-sm text-softGold">{detail.diary.emotion}</p>}
          {detail.diary.note && <p className="mt-3 text-sm leading-6 text-mist">{detail.diary.note}</p>}
        </Card>
      )}

      <ReadingResult result={detail.result} />
    </div>
  );
}
