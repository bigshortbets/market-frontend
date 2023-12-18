import React, { useEffect } from 'react';
import { MarketBar } from '../MarketBar';
import { Navbar } from '../Navbar/Navbar';
import { MarketType } from '@/types/marketTypes';
import { atom, useAtom } from 'jotai';
import { useOraclePrice } from '@/api/useOraclePrice';
import { ContractDetails } from './ContractDetails/ContractDetails';
import { findMarketById } from '@/utils/findMarketById';
import { OrderManager } from './OrderManager/OrderManager';
import { Toaster } from 'react-hot-toast';
import { TradingHub } from './TradingHub/TradingHub';

interface MarketProps {
  markets: MarketType[];
}

export type UIConfigurationType = 'HubOrder' | 'OrderHub';

export const selectedMarketIdAtom = atom<string>('');
export const UIConfigurationAtom = atom<UIConfigurationType>('HubOrder');

export const Market = ({ markets }: MarketProps) => {
  const [selectedMarketId, setSelectedMarketId] = useAtom(selectedMarketIdAtom);
  const oraclePrice = useOraclePrice(selectedMarketId);

  useEffect(() => {
    setSelectedMarketId(markets[0].id);
  }, []);

  const [UIConfiguration] = useAtom(UIConfigurationAtom);

  return (
    <div className={`h-screen bg-primary-bg flex flex-col`}>
      <Navbar />
      <MarketBar markets={markets} oraclePrice={oraclePrice!} />
      <div className="h-[(100vh-120px)] px-6 py-6">
        <div
          className={`flex justify-between gap-6 ${
            UIConfiguration === 'HubOrder' ? 'flex-row' : 'flex-row-reverse'
          }`}
        >
          <TradingHub />
          <div className="flex flex-col gap-6">
            <OrderManager markets={markets} />
            <ContractDetails markets={markets} />
          </div>
        </div>
      </div>
    </div>
  );
};
