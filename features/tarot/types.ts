export type TarotOrientation = "upright" | "reversed";

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
  arcana: string;
  suit: string | null;
  number: number | null;
  uprightMeaning: string;
  reversedMeaning: string;
  keywords: string[];
  imageUrl: string | null;
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
  orientation: TarotOrientation;
  interpretation: string;
  keywords?: string[];
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
};

export type DiaryNote = {
  emotion?: string;
  note?: string;
};
