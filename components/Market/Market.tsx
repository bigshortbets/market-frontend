import React, { useEffect } from 'react';
import { MarketBar } from '../MarketBar';
import { Navbar } from '../Navbar/Navbar';
import { MarketType } from '@/types/marketTypes';
import { atom, useAtom } from 'jotai';
import { useOraclePrice } from '@/api/useOraclePrice';

interface MarketProps {
  markets: MarketType[];
}

export const selectedMarketIdAtom = atom<string>('');

export const Market = ({ markets }: MarketProps) => {
  const [selectedMarketId, setSelectedMarketId] = useAtom(selectedMarketIdAtom);
  const oraclePrice = useOraclePrice(selectedMarketId);

  useEffect(() => {
    setSelectedMarketId(markets[0].id);
  }, []);

  return (
    <div
      className={`min-h-screen bg-primary-bg flex flex-col`}
      onClick={() => console.log(oraclePrice)}
    >
      <Navbar />
      <MarketBar markets={markets} oraclePrice={oraclePrice!} />
    </div>
  );
};
