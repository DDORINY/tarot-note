"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { TarotCard } from "@/components/tarot/TarotCard";
import { getGuestReadings, type GuestReading } from "@/features/tarot/reading-utils";
import type { TarotOrientation } from "@/features/tarot/types";

type DbReadingCard = {
  id: string;
  position_index: number;
  card_id: string;
  orientation: TarotOrientation;
  tarot_cards?: {
    name_ko: string;
    name_en: string;
    keywords: string[];
    image_url: string | null;
  } | null;
};

type DbReading = {
  id: string;
  category: string;
  question: string;
  result_summary: string;
  created_at: string;
  spreads?: { name: string } | null;
  reading_cards?: DbReadingCard[];
};

export default function HistoryPage() {
  const [guestReadings, setGuestReadings] = useState<GuestReading[]>([]);
  const [dbReadings, setDbReadings] = useState<DbReading[]>([]);

  useEffect(() => {
    setGuestReadings(getGuestReadings() as GuestReading[]);
    fetch("/api/readings")
      .then((response) => (response.ok ? response.json() : []))
      .then((data) => setDbReadings(data))
      .catch(() => setDbReadings([]));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gold">History</p>
        <h1 className="mt-2 text-3xl font-semibold text-softGold">내 리딩 기록</h1>
        <p className="mt-3 text-mist">비로그인 리딩은 현재 브라우저의 localStorage에 임시 저장됩니다.</p>
      </div>
      <div className="grid gap-4">
        {dbReadings.length === 0 && guestReadings.length === 0 && <Card>아직 저장된 리딩이 없습니다.</Card>}
        {dbReadings.map((reading) => {
          const cards = [...(reading.reading_cards ?? [])].sort((a, b) => a.position_index - b.position_index).slice(0, 3);

          return (
            <Card key={reading.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-gold">
                    {reading.category}
                    {reading.spreads?.name ? ` · ${reading.spreads.name}` : ""}
                  </p>
                  <h2 className="mt-1 font-semibold text-softGold">{reading.question}</h2>
                </div>
                <Link
                  className="inline-flex min-h-9 items-center gap-2 rounded-md border border-gold/40 px-3 text-sm text-softGold hover:bg-white/10"
                  href={`/tarot/history/${reading.id}`}
                >
                  <Eye size={15} />
                  상세
                </Link>
              </div>
              {cards.length > 0 && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                  {cards.map((card) => (
                    <div key={card.id} className="w-16 shrink-0 sm:w-20">
                      <TarotCard
                        card={{
                          id: card.card_id,
                          nameKo: card.tarot_cards?.name_ko ?? card.card_id,
                          nameEn: card.tarot_cards?.name_en ?? card.card_id,
                          arcana: "major",
                          suit: null,
                          number: null,
                          uprightMeaning: "",
                          reversedMeaning: "",
                          keywords: card.tarot_cards?.keywords ?? [],
                          imageUrl: card.tarot_cards?.image_url ?? null
                        }}
                        orientation={card.orientation}
                        flipped
                      />
                    </div>
                  ))}
                </div>
              )}
              <p className="mt-3 text-sm leading-6 text-mist">{reading.result_summary}</p>
              <p className="mt-3 text-xs text-mist">{new Date(reading.created_at).toLocaleString("ko-KR")}</p>
            </Card>
          );
        })}
        {guestReadings.map((reading, index) => (
          <Card key={`${reading.createdAt}-${index}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm text-gold">
                  {reading.category}
                  {reading.spreadName ? ` · ${reading.spreadName}` : ""}
                </p>
                <h2 className="mt-1 font-semibold text-softGold">{reading.question}</h2>
              </div>
              {reading.id && (
                <Button href={`/tarot/history/${reading.id}`} variant="secondary" className="min-h-9 gap-2 px-3">
                  <Eye size={15} />
                  상세
                </Button>
              )}
            </div>
            {reading.cards.length > 0 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {reading.cards.slice(0, 3).map((card) => (
                  <div key={`${card.positionIndex}-${card.cardId}`} className="w-16 shrink-0 sm:w-20">
                    <TarotCard
                      card={{
                        id: card.cardId,
                        nameKo: card.cardName,
                        nameEn: card.cardNameEn ?? card.cardId,
                        arcana: "major",
                        suit: null,
                        number: null,
                        uprightMeaning: "",
                        reversedMeaning: "",
                        keywords: card.keywords ?? [],
                        imageUrl: card.imageUrl ?? card.image_url ?? null
                      }}
                      orientation={card.orientation}
                      flipped
                    />
                  </div>
                ))}
              </div>
            )}
            <p className="mt-3 text-sm leading-6 text-mist">{reading.summary}</p>
            <p className="mt-3 text-xs text-mist">{new Date(reading.createdAt).toLocaleString("ko-KR")}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
