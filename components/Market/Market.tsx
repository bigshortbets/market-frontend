import React, { useEffect } from 'react';
import { MarketBar } from '../MarketBar';
import { Navbar } from '../Navbar/Navbar';
import { MarketType } from '@/types/marketTypes';
import { atom, useAtom } from 'jotai';

interface MarketProps {
  markets: MarketType[];
}

export const selectedMarketIdAtom = atom<string>('');

export const Market = ({ markets }: MarketProps) => {
  const [, setSelectedMarketId] = useAtom(selectedMarketIdAtom);

  useEffect(() => {
    setSelectedMarketId(markets[0].id);
  }, []);

  return (
    <div className={`min-h-screen bg-primary-bg flex flex-col`}>
      <Navbar />
      <MarketBar markets={markets} />
    </div>
  );
};
