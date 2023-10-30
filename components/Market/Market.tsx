import React, { useEffect } from 'react';
import { MarketBar } from '../MarketBar';
import { Navbar } from '../Navbar/Navbar';
import { MarketType } from '@/types/marketTypes';
import { atom, useAtom } from 'jotai';
import { useOraclePrice } from '@/api/useOraclePrice';
import { ContractDetails } from './ContractDetails/ContractDetails';
import { findMarketById } from '@/utils/findMarketById';

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
    <div className={`h-screen bg-primary-bg flex flex-col`}>
      <Navbar />
      <MarketBar markets={markets} oraclePrice={oraclePrice!} />
      <div className="h-[(100vh-120px)] px-6 py-3">
        <div className="flex justify-end">
          <ContractDetails markets={markets} oraclePrice={oraclePrice!} />
        </div>
      </div>
    </div>
  );
};
