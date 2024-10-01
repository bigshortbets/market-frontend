import { useQuery } from '@apollo/client';
import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import {
  PositionType,
  PositionsResponse,
  PositionWithSide,
} from '@/types/positionTypes';
import { userPositionsAtom } from '@/store/store';
import { USER_OPEN_POSITIONS_QUERY } from '@/requests/queries';
import { extendPositionsWithSide } from '@/utils/extendPositionsWithSide';

export const useUserPositions = (ss58address: string | undefined) => {
  const [positions, setPositions] = useAtom(userPositionsAtom);

  const {
    data: positionsRes,
    loading,
    error,
    refetch,
  } = useQuery<PositionsResponse>(USER_OPEN_POSITIONS_QUERY, {
    pollInterval: ss58address ? 5000 : 0,
    skip: !ss58address,
    variables: { userId: ss58address ? ss58address : '' },
  });

  useEffect(() => {
    if (positionsRes && positionsRes.positions) {
      setPositions(positionsRes.positions);
    } else if (!ss58address) {
      setPositions(undefined);
    }
  }, [positionsRes, setPositions, ss58address]);

  const aggregatePositionsByMarketTicker = (positions: PositionType[] = []) => {
    const aggregatedPositions: Record<string, PositionType[]> = {};
    positions.forEach((position) => {
      const ticker = position.market.ticker;
      if (aggregatedPositions[ticker]) {
        aggregatedPositions[ticker].push(position);
      } else {
        aggregatedPositions[ticker] = [position];
      }
    });
    return aggregatedPositions;
  };

  const aggregatedPositions = useMemo(() => {
    if (positions) {
      return aggregatePositionsByMarketTicker(positions);
    }
    return {};
  }, [positions]);

  const sumPnL = useMemo(() => {
    if (positions && ss58address) {
      const positionsWithSide: PositionWithSide[] = extendPositionsWithSide(
        positions,
        ss58address
      );
      const totalPnL = positionsWithSide.reduce((acc, position) => {
        const oraclePrice = position.market.oraclePrice;
        return position.side === 'LONG'
          ? acc +
              Number(position.quantityLeft) *
                Number(position.market.contractUnit) *
                (Number(oraclePrice) - Number(position.createPriceLong))
          : acc +
              Number(position.quantityLeft) *
                Number(position.market.contractUnit) *
                (Number(position.createPriceShort) - Number(oraclePrice));
      }, 0);
      return Number(totalPnL.toFixed(2));
    }
    return 0;
  }, [positions, ss58address]);

  const unsettledPnL = useMemo(() => {
    if (positions && ss58address) {
      const positionsWithSide: PositionWithSide[] = extendPositionsWithSide(
        positions,
        ss58address
      );
      const totalPnL = positionsWithSide.reduce((acc, position) => {
        const oraclePrice = position.market.oraclePrice;
        return position.side === 'LONG'
          ? acc +
              Number(position.quantityLeft) *
                Number(position.market.contractUnit) *
                (Number(oraclePrice) - Number(position.price))
          : acc +
              Number(position.quantityLeft) *
                Number(position.market.contractUnit) *
                (Number(position.price) - Number(oraclePrice));
      }, 0);
      return Number(totalPnL.toFixed(2));
    }
    return 0;
  }, [positions, ss58address]);

  return {
    loading,
    error,
    refetch,
    positions,
    aggregatedPositions,
    sumPnL,
    unsettledPnL,
  };
};
