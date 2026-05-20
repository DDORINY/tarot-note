import type { ReadingRequest, ReadingResult, TarotCard, TarotSpread } from "@/features/tarot/types";

export async function fetchSpreads(): Promise<TarotSpread[]> {
  const response = await fetch("/api/spreads");
  if (!response.ok) throw new Error("스프레드 목록을 불러오지 못했습니다.");
  return response.json();
}

export async function fetchCards(): Promise<TarotCard[]> {
  const response = await fetch("/api/cards");
  if (!response.ok) throw new Error("카드 목록을 불러오지 못했습니다.");
  return response.json();
}

export async function createReading(input: ReadingRequest): Promise<ReadingResult> {
  const response = await fetch("/api/readings/draw", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
  if (!response.ok) throw new Error("리딩을 생성하지 못했습니다.");
  return response.json();
}
