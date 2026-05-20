import { FREE_SPREAD_IDS } from "@/lib/constants";
import { tarotSpreads } from "@/data/mock-spreads";

export function getSpreadById(spreadId: string) {
  return tarotSpreads.find((spread) => spread.id === spreadId) ?? tarotSpreads[0];
}

export function isFreeSpread(spreadId: string) {
  return FREE_SPREAD_IDS.includes(spreadId);
}
