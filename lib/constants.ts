export const READING_CATEGORIES = [
  "연애",
  "속마음",
  "연락운",
  "재회",
  "진로",
  "인간관계",
  "오늘의 운세",
  "종합운"
] as const;

export type ReadingCategory = (typeof READING_CATEGORIES)[number];

export const FREE_SPREAD_IDS = ["three-card", "four-card"] as const;

export const ENABLE_PREMIUM_BYPASS = true;

export const EMOTION_TAGS = ["불안", "기대", "혼란", "설렘", "후회", "확신", "답답함", "평온함"] as const;

export type EmotionTag = (typeof EMOTION_TAGS)[number];

export const LOCAL_READING_KEY = "tarot-note:guest-readings";
