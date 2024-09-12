import { useEffect, useState } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { atom, useAtom } from 'jotai';
import { TradingHub } from './TradingHub/TradingHub';
import { useAccount, useSwitchChain } from 'wagmi';
import { OrderBookContainer } from './OrderBook/OrderBookContainer';
import { FinanceManager } from './FinanceManager/FinanceManager';
import { MarketInterface } from './MarketInteface/MarketInterface';
import { useCurrentBlock } from '@/requests/useCurrentBlock';
import { RecentPositionType } from '@/types/positionTypes';
import { useRecentTrades } from '@/requests/useRecentTrades';
import { bigshortbetsChain } from '@/blockchain/chain';
import { switchToBigShortBetsChain } from '@/utils/switchToBigShortBetsChain';
import { MarketSelect } from './FinanceManager/MarketSelect';
import { OrderBookTop } from './OrderBook/OrderBookTop';
import { findMarketById } from '@/utils/findMarketById';
import {
  MarginInfo,
  UserMargins,
  useUserMargin,
} from '@/blockchain/hooks/useUserMargin';
import { OpponentData } from '@/blockchain/hooks/useOpponentsMargin';
import { UnsettledLosses } from '@/hooks/useUnsettledLosses';
import { Collateral } from '@/hooks/useCollateral';
import { calculateMarketClosing } from '@/utils/calculateMarketClosing';
import { useRouter } from 'next/router';
import { EnrichedMarketType } from '@/types/marketTypes';
import { EntryModal } from './EntryModal';
import { useCookies } from 'react-cookie';
import { chatStream, chatUserAtom } from '@/store/store';
import { addressMatcherApi } from '@/requests/bidgeApi/addressMatcherApi';

interface MarketProps {
  markets: EnrichedMarketType[];
}

export type UIConfigurationType = 'HubOrder' | 'OrderHub';

const tabletViewArr = ['market', 'positions'];
export type TabletViewType = (typeof tabletViewArr)[number];

const mobileViewArr = ['manager', 'orderbook', 'portfolio'];
export type MobileViewType = (typeof tabletViewArr)[number];

export const userMarginsAtom = atom<UserMargins>({
  details: {},
  totalMarginValue: 0,
});

export const selectedMarketMarginAtom = atom<MarginInfo | null>(null);
export const opponentsMarginsAtom = atom<OpponentData>({});

export const unsettledLossesAtom = atom<UnsettledLosses>({});
export const collateralAtom = atom<Collateral>({});
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
  const [blockHeight] = useAtom(currentBlockAtom);
  const { address, chain } = useAccount();
  const [chatUser, setChatUser] = useAtom(chatUserAtom);
  const [stream, setStream] = useAtom(chatStream);

  useUserMargin(markets, address!, selectedMarketId);
  const { loading: recentTradesLoading, error: recentTradesError } =
    useRecentTrades(selectedMarketId);
  const market = findMarketById(markets, selectedMarketId);
  const [recentTrades] = useAtom(recentTradesAtom);
  const router = useRouter();

  useEffect(() => {
    const { market: marketParam, chat } = router.query; // Destructure market and chat
    let isMarketFromURLProcessed = false;

    if (marketParam && markets && markets.length > 0) {
      const matchedMarket = markets.find(
        (market) => market.ticker === marketParam
      );

      if (matchedMarket) {
        setSelectedMarketId(matchedMarket.id);
        isMarketFromURLProcessed = true;
      }
    }

    if (!isMarketFromURLProcessed && markets && markets.length > 0) {
      const electionMarkets = markets.filter(
        (market) => market.category === 'election'
      );

      if (electionMarkets.length > 0) {
        const randomMarket =
          electionMarkets[Math.floor(Math.random() * electionMarkets.length)];
        setSelectedMarketId(randomMarket.id);

        const queryParams = {
          market: randomMarket.ticker,
          ...(chat && { chat }),
        };

        router.push(
          {
            pathname: '/',
            query: queryParams,
          },
          undefined,
          { shallow: true }
        );
      }
    }
  }, [blockHeight, markets, router]);

  useEffect(() => {
    if (!address) {
      if (stream) {
        stream.disconnect();
        setStream(undefined);
      }
      setChatUser(undefined);
    }
    const matchAddress = async () => {
      if (!address) return;
      try {
        const response = await addressMatcherApi.matchAddress({
          userAddress: address,
        });
      } catch (error) {
        console.error('Error matching address call:', error);
      }
    };

    matchAddress();
  }, [address]);

  return (
    <div className='h-[100dvh] bg-[#111217] '>
      <div className='h-full flex flex-col relative max-w-[2000px] mx-auto'>
        <p className='absolute bottom-1.5 text-[9px] left-6 text-[#555866]'>
          DOLARZ is a virtual asset used exclusively within our platform for
          trading in a simulated environment. It holds no real-world monetary
          value and cannot be used for any real financial transactions or
          billing.
        </p>
        <p className='absolute bottom-1.5 text-[9px] right-6 text-[#555866]'>
          Created on Substrate from Parity Technologies
        </p>
        <Navbar />
        <div className='flex-grow p-6 lg:flex gap-6 hidden'>
          <MarketInterface markets={markets} />
          <TradingHub />
        </div>
        <div>
          {/* Tablet view */}
          <div className='p-6 flex-col hidden sm:flex flex-grow lg:hidden'>
            {tabletView === 'market' && <MarketInterface markets={markets} />}
            {tabletView === 'positions' && <TradingHub />}
          </div>
        </div>

        <div className='w-full h-[54px] bg-[#23252E] justify-center gap-2 items-center hidden sm:flex lg:hidden z-50'>
          {tabletViewArr.map((view, key) => (
            <button
              key={key}
              className={`h-8 w-[120px] rounded-lg  flex items-center capitalize justify-center font-semibold text-[13px] ${
                tabletView === view && 'bg-[#444650]'
              }`}
              onClick={() => setTabletView(view)}
            >
              {view}
            </button>
          ))}
        </div>
        {/* Mobile view */}
        <div className='p-6 flex-col flex flex-grow sm:hidden overflow-auto'>
          {mobileView === 'manager' && (
            <div className='border rounded-lg border-[#444650] bg-[#191B24] h-[calc(100vh-166px)]'>
              <MarketSelect markets={markets} />
              <FinanceManager markets={markets} />
            </div>
          )}
          {mobileView === 'orderbook' && (
            <div className='border border-[#444650] rounded-lg bg-[#191B24] h-[calc(100vh-166px)]'>
              <OrderBookTop market={market!} recentTrades={recentTrades} />
              <OrderBookContainer />
            </div>
          )}
          {mobileView === 'portfolio' && <TradingHub />}
        </div>
        <div className='w-full h-[54px] bg-[#23252E] flex justify-center gap-2 items-center sm:hidden z-50'>
          {mobileViewArr.map((view, key) => (
            <button
              key={key}
              className={`h-8 w-[120px] rounded-lg  flex items-center capitalize justify-center font-semibold text-[13px] ${
                mobileView === view && 'bg-[#444650]'
              }`}
              onClick={() => setMobileView(view)}
            >
              {view}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
