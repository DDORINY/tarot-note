export type TarotOrientation = "upright" | "reversed";
export type TarotArcana = "major" | "minor";
export type TarotSuit = "wands" | "cups" | "swords" | "pentacles";

export type SpreadPosition = {
  index: number;
  label: string;
  meaning: string;
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
};

export type TarotSpread = {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  category: string;
  isPremium: boolean;
  positions: SpreadPosition[];
};

export type TarotCard = {
  id: string;
  nameKo: string;
  nameEn: string;
  arcana: TarotArcana;
  suit: TarotSuit | null;
  number: number | null;
  uprightMeaning: string;
  reversedMeaning: string;
  keywords: string[];
  imageUrl: string | null;
  image_url?: string | null;
};

export type DrawnCard = {
  position: SpreadPosition;
  card: TarotCard;
  orientation: TarotOrientation;
};

export type ReadingRequest = {
  category: string;
  question: string;
  spread: TarotSpread;
  drawnCards: DrawnCard[];
};

export type CardInterpretation = {
  positionIndex: number;
  positionLabel: string;
  positionMeaning: string;
  cardId: string;
  cardName: string;
  cardNameEn?: string;
  arcana?: TarotArcana;
  suit?: TarotSuit | null;
  number?: number | null;
  orientation: TarotOrientation;
  interpretation: string;
  keywords?: string[];
  imageUrl?: string | null;
  image_url?: string | null;
  uprightMeaning?: string;
  reversedMeaning?: string;
};

export type CardNarrative = {
  positionIndex: number;
  positionLabel: string;
  cardName: string;
  orientation: TarotOrientation;
  scene: string;
  interpretation: string;
  connectionToNext?: string;
};

export type QuestionTopic = "relationship" | "career" | "money" | "self" | "choice" | "general";

export type ReadingPositionNarrative = {
  positionId: string;
  positionName: string;
  cardId: string;
  cardNameKo: string;
  cardNameEn: string;
  orientation: TarotOrientation;
  headline: string;
  narrative: string;
  transitionToNext?: string;
};

export type StoryReading = {
  title: string;
  oneLineSummary: string;
  overallTheme: string;
  emotionalFlow: string;
  positionNarratives: ReadingPositionNarrative[];
  connectionNarrative: string;
  advice: string;
  caution: string;
  closing: string;
  opening?: string;
  storyFlow?: string;
  emotionalInsight?: string;
  cardNarratives?: CardNarrative[];
  turningPoint?: string;
  possibleOutcome?: string;
  closingMessage?: string;
};

export type ReadingResult = {
  summary: string;
  keyMessage: string;
  connection: string;
  current: string;
  flow: string;
  advice: string;
  caution: string;
  oneLine: string;
  cards: CardInterpretation[];
  story?: StoryReading;
};

export type DiaryNote = {
  emotion?: string;
  note?: string;
};
