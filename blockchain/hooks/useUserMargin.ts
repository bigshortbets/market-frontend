import {
  selectedMarketMarginAtom,
  userMarginsAtom,
} from '@/components/Market/Market';
import { MarketType } from '@/types/marketTypes';
import { fetchMarginInfo } from '@/utils/fetchMarginInfo';
import { scaleNumber } from '@/utils/scaleNumber';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export type LiquidationStatusType =
  | 'EverythingFine'
  | 'MarginCall'
  | 'Liquidation'
  | 'Underwater';

export interface MarginInfo {
  margin: string;
  requiredDeposit: string;
  liquidationStatus: LiquidationStatusType; // Adjusted for clarity
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
        setSelectedMarketMargin(null); // Set to null if no user address, adjust according to your data handling strategy
        return;
      }

      let totalMarginValue = 0;
      const allMargins: Record<string, MarginInfo> = {};
      for (const market of markets) {
        try {
          const marketId = market.id;
          const marginInfo = await fetchMarginInfo(userAddress, marketId);
          // Convert numeric values to strings to align with the MarginInfo interface
          allMargins[marketId] = {
            margin: marginInfo.margin.toString(),
            requiredDeposit: marginInfo.requiredDeposit.toString(),
            liquidationStatus:
              marginInfo.liquidationStatus as LiquidationStatusType,
          };

          const marginValue = parseFloat(marginInfo.margin.toString());
          if (!isNaN(marginValue)) {
            totalMarginValue += marginValue;
          }

          if (marketId === selectedMarketId) {
            setSelectedMarketMargin({
              margin: scaleNumber(marginInfo.margin),
              requiredDeposit: scaleNumber(marginInfo.requiredDeposit),
              liquidationStatus:
                marginInfo.liquidationStatus as LiquidationStatusType,
            });
          }
        } catch (error) {
          console.error(
            `Error fetching margin information for market ${market.id}:`,
            error
          );
        }
      }
      const formattedTotal = Number(scaleNumber(totalMarginValue));
      setUserMargins({ details: allMargins, totalMarginValue: formattedTotal });
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
