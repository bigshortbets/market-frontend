import { TradingHubStateType } from '@/components/Market/TradingHub/TradingHub';
import { EnrichedMarketType } from '@/types/marketTypes';
import { atom } from 'jotai';

/* MARKETS ATOM */

export const marketsAtom = atom<EnrichedMarketType[]>([]);

/* CHOSEN MARKET ATOM */

export const chosenMarketAtom = atom<EnrichedMarketType | undefined>(undefined);

/* TRADING HUB */

export const tradingHubStateAtom = atom<TradingHubStateType>('positions');

/* CHAT */

export const chosenInterlocutorAtom = atom<string>(
  '0x26C494d6526Df0c43c01480Ee07a870d4Eb0B647'
);
