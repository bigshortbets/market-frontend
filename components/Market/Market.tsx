import { useEffect } from 'react';
import { MarketBar } from '../MarketBar';
import { Navbar } from '../Navbar/Navbar';
import { MarketType } from '@/types/marketTypes';
import { atom, useAtom } from 'jotai';
import { ContractDetails } from './ContractDetails/ContractDetails';
import { OrderManager } from './OrderManager/OrderManager';
import { TradingHub } from './TradingHub/TradingHub';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { Mobile } from '../Mobile';
import { OrderBookContainer } from './OrderBook/OrderBookContainer';
import { FinanceManager } from './FinanceManager/FinanceManager';
import { MarketInterface } from './MarketInteface/MarketInterface';
import { useCurrentBlock } from '@/api/useCurrentBlock';
import { RecentPositionType } from '@/types/positionTypes';
import { useRecentTrades } from '@/api/useRecentTrades';
import { bigshortbetsChain } from '@/blockchain/chain';
import { switchToBigShortBetsChain } from '@/utils/switchToBigShortBetsChain';

interface MarketProps {
  markets: MarketType[];
}

export type UIConfigurationType = 'HubOrder' | 'OrderHub';

const tabletViewArr = ['market', 'positions'];
export type TabletViewType = (typeof tabletViewArr)[number];

const mobileViewArr = ['manager', 'orderbook', 'portfolio'];
export type MobileViewType = (typeof tabletViewArr)[number];

export const selectedMarketIdAtom = atom<string>('');
export const UIConfigurationAtom = atom<UIConfigurationType>('HubOrder');
export const currentBlockAtom = atom<number | undefined>(undefined);
export const tabletViewAtom = atom<TabletViewType>('market');
export const mobileViewAtom = atom<MobileViewType>('manager');
export const recentTradesAtom = atom<RecentPositionType[]>([]);

export const Market = ({ markets }: MarketProps) => {
  const [selectedMarketId, setSelectedMarketId] = useAtom(selectedMarketIdAtom);
  const [tabletView, setTabletView] = useAtom(tabletViewAtom);
  const [mobileView, setMobileView] = useAtom(mobileViewAtom);
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { loading, error } = useCurrentBlock();
  const { loading: recentTradesLoading, error: recentTradesError } =
    useRecentTrades(selectedMarketId);

  useEffect(() => {
    setSelectedMarketId(markets[0].id);
    if (chain?.id != bigshortbetsChain.id) {
      switchToBigShortBetsChain();
    }
  }, []);

  const [UIConfiguration] = useAtom(UIConfigurationAtom);

  return (
    <div className="h-screen  w-full bg-[#111217] flex flex-col">
      <Navbar />
      <div className="flex-grow p-6 lg:flex gap-6 hidden">
        <MarketInterface markets={markets} />
        <TradingHub />
      </div>
      <div>
        <div className="p-6 flex-col flex-grow lg:hidden">
          {tabletView === 'market' && <MarketInterface markets={markets} />}
          {tabletView === 'positions' && <TradingHub />}
        </div>
      </div>
      {/* Tablet tab */}
      <div className="w-full h-[54px] bg-[#23252E] justify-center gap-2 items-center hidden md:flex lg:hidden">
        {tabletViewArr.map((view, key) => (
          <button
            className={`h-8 w-[120px] rounded-lg  flex items-center capitalize justify-center font-semibold text-[13px] ${
              tabletView === view && 'bg-[#444650]'
            }`}
            onClick={() => setTabletView(view)}
          >
            {view}
          </button>
        ))}
      </div>
      {/* Mobile tab */}
      <div className="w-full h-[54px] bg-[#23252E] flex justify-center gap-2 items-center md:hidden">
        {mobileViewArr.map((view, key) => (
          <button
            className={`h-8 w-[120px] rounded-lg  flex items-center capitalize justify-center font-semibold text-[13px] ${
              mobileView === view && 'bg-[#444650]'
            }`}
            onClick={() => setTabletView(view)}
          >
            {view}
          </button>
        ))}
      </div>
    </div>
  );
};
