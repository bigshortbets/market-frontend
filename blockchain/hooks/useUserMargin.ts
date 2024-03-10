import {
  selectedMarketMarginAtom,
  userMarginsAtom,
} from '@/components/Market/Market';
import { MarketType } from '@/types/marketTypes';
import { fetchMarginInfo } from '@/utils/fetchMarginInfo';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export interface MarginInfo {
  margin: string;
  collateral: string;
}

export function useUserMargin(
  markets: MarketType[],
  userAddress: string,
  selectedMarketId: string
) {
  const [, setUserMargins] = useAtom(userMarginsAtom);
  const [, setSelectedMarketMargin] = useAtom(selectedMarketMarginAtom);

  const POLLING_INTERVAL = 60000; // big due to rpc limit limitations

  useEffect(() => {
    const fetchAllMargins = async () => {
      const allMargins: Record<string, MarginInfo> = {};
      for (const market of markets) {
        try {
          const marketId = market.id;
          const marginInfo = await fetchMarginInfo(userAddress, marketId);
          allMargins[marketId] = marginInfo;
          if (marketId === selectedMarketId) {
            setSelectedMarketMargin(marginInfo);
          }
        } catch (error) {
          console.error(
            `Error fetching margin information for market ${market.id}:`,
            error
          );
        }
      }
      setUserMargins(allMargins);
    };

    fetchAllMargins();
    const intervalId = setInterval(fetchAllMargins, POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, [
    markets,
    userAddress,
    selectedMarketId,
    setUserMargins,
    setSelectedMarketMargin,
  ]); // Zależności
}
