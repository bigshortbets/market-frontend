import { EnrichedMarketType } from '@/types/marketTypes';
import { atom } from 'jotai';

/* MARKETS ATOM */

export const marketsAtom = atom<EnrichedMarketType[]>([]);

/* CHOSEN MARKET ATOM */

export const chosenMarketAtom = atom<EnrichedMarketType | undefined>(undefined);
