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
  requiredDeposit: string;
  liquidationStatus: string;
}

export interface UserMargins {
  details: Record<string, MarginInfo>;
  totalMarginValue: number;
}

export function useUserMargin(
  markets: MarketType[],
  userAddress: string | null,
  selectedMarketId: string
) {
  const [, setUserMargins] = useAtom(userMarginsAtom);
  const [, setSelectedMarketMargin] = useAtom(selectedMarketMarginAtom);

  const POLLING_INTERVAL = 3000;

  useEffect(() => {
    const fetchAllMargins = async () => {
      if (!userAddress) {
        setUserMargins({ details: {}, totalMarginValue: 0 });
        setSelectedMarketMargin({
          margin: '',
          requiredDeposit: '',
          liquidationStatus: '',
        });
        return;
      }

      let totalMarginValue = 0;
      const allMargins: Record<string, MarginInfo> = {};
      for (const market of markets) {
        try {
          const marketId = market.id;
          const marginInfo = await fetchMarginInfo(userAddress, marketId);
          allMargins[marketId] = marginInfo;

          const marginValue = parseFloat(marginInfo.margin);
          if (!isNaN(marginValue)) {
            totalMarginValue += marginValue;
          }

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
      setUserMargins({ details: allMargins, totalMarginValue });
    };

    fetchAllMargins();
    if (userAddress) {
      const intervalId = setInterval(fetchAllMargins, POLLING_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [
    markets,
    userAddress,
    selectedMarketId,
    setUserMargins,
    setSelectedMarketMargin,
  ]);
}
