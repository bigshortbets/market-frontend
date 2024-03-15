import { useEffect } from 'react';
import { useAtom } from 'jotai';

import { opponentsMarginsAtom } from '@/components/Market/Market';
import { PositionType } from '@/types/positionTypes';
import { fetchMarginInfo } from '@/utils/fetchMarginInfo';
import { convertToSS58 } from '@/utils/convertToSS58';

export interface OpponentMarginInfo {
  margin: string;
  requiredDeposit: string;
  liquidationStatus: string;
}

export interface OpponentData {
  [marketId: string]: {
    [opponentAddress: string]: OpponentMarginInfo;
  };
}

export function useOpponentsMargin(
  positions: PositionType[] | undefined,
  userAddress: string | null
) {
  const [, setOpponentsMargins] = useAtom(opponentsMarginsAtom);

  // Default positions to an empty array if it's undefined
  const safePositions = positions || [];

  const POLLING_INTERVAL = 3000; // Adjust this value as needed

  useEffect(() => {
    const fetchOpponentsMargins = async () => {
      // Only proceed if the user address is accessible and positions are initialized
      if (!userAddress || safePositions.length === 0) {
        // Optionally, clear the current margins here if the conditions are not met
        setOpponentsMargins({});
        return;
      }

      // Convert userAddress to SS58 format
      const userAddressSS58 = convertToSS58(userAddress);
      const marketOpponents: OpponentData = {};

      for (const position of safePositions) {
        // Determine the opponent's side for this position
        const isUserLong = position.long === userAddressSS58;
        const opponent = isUserLong ? position.short : position.long;
        const marketId = position.market.id;

        if (!marketOpponents[marketId]) {
          marketOpponents[marketId] = {};
        }

        // Check we don't already have the margin data for this opponent in this market
        if (!marketOpponents[marketId][opponent]) {
          try {
            const marginInfo = await fetchMarginInfo(opponent, marketId, true); // Assuming opponent addresses are already in the correct format
            marketOpponents[marketId][opponent] = marginInfo;
          } catch (error) {
            console.error(
              `Error fetching margin information for opponent ${opponent} in market ${marketId}:`,
              error
            );
            // Initialize with default values in case of error
            marketOpponents[marketId][opponent] = {
              margin: '',
              requiredDeposit: '',
              liquidationStatus: '',
            };
          }
        }
      }
      setOpponentsMargins(marketOpponents);
    };

    if (userAddress && safePositions.length > 0) {
      fetchOpponentsMargins();
      const intervalId = setInterval(fetchOpponentsMargins, POLLING_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [safePositions, userAddress, setOpponentsMargins]);
}
