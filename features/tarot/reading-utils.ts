import type { DiaryNote, ReadingResult } from "@/features/tarot/types";
import { LOCAL_READING_KEY } from "@/lib/constants";

export type GuestReading = ReadingResult & {
  id: string;
  question: string;
  category: string;
  spreadId?: string;
  spreadName?: string;
  createdAt: string;
  diary?: DiaryNote;
};

function createGuestReadingId() {
  return `guest-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function saveGuestReading(
  reading: ReadingResult & { question: string; category: string; spreadId?: string; spreadName?: string; diary?: DiaryNote }
) {
  if (typeof window === "undefined") return;
  const previous = getGuestReadings();
  const id = createGuestReadingId();
  window.localStorage.setItem(
    LOCAL_READING_KEY,
    JSON.stringify([{ ...reading, id, createdAt: new Date().toISOString() }, ...previous].slice(0, 20))
  );
  return id;
}

export function getGuestReadings(): GuestReading[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(window.localStorage.getItem(LOCAL_READING_KEY) ?? "[]");
}

export function getGuestReadingById(id: string) {
  return getGuestReadings().find((reading) => reading.id === id);
}

export function updateGuestReadingDiary(id: string, diary: DiaryNote) {
  if (typeof window === "undefined") return false;
  const readings = getGuestReadings();
  const nextReadings = readings.map((reading) => (reading.id === id ? { ...reading, diary } : reading));
  window.localStorage.setItem(LOCAL_READING_KEY, JSON.stringify(nextReadings));
  return readings.some((reading) => reading.id === id);
}
