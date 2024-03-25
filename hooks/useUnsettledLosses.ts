import { useEffect } from 'react';
import { useAtom } from 'jotai';

import { convertToSS58 } from '@/utils/convertToSS58';
import { extendPositionsWithSide } from '@/utils/extendPositionsWithSide';
import { unsettledLossesAtom } from '@/components/Market/Market';
import { PositionType, PositionWithSide } from '@/types/positionTypes';

export interface UnsettledLosses {
  [marketId: string]: number;
}

export function useUnsettledLosses(
  positions: PositionType[] | undefined,
  address: string | null
) {
  const [, setUnsettledLosses] = useAtom(unsettledLossesAtom);

  useEffect(() => {
    const calculateUnsettledLosses = () => {
      if (!address || !positions || positions.length === 0) {
        setUnsettledLosses({});
        return;
      }

      const convertedAddress = convertToSS58(address);
      const positionsWithSide = extendPositionsWithSide(
        positions,
        convertedAddress
      );

      const marketLosses: UnsettledLosses = positionsWithSide.reduce(
        (acc: UnsettledLosses, position: PositionWithSide) => {
          const marketId = position.market.id;
          acc[marketId] = 0;
          return acc;
        },
        {}
      );

      positionsWithSide.forEach((position: PositionWithSide) => {
        const marketId = position.market.id;
        const oraclePrice = position.market.oraclePrice;
        const loss =
          position.side === 'LONG'
            ? Number(position.quantityLeft) *
              Number(position.market.contractUnit) *
              (Number(oraclePrice.toString()) -
                Number(position.price.toString()))
            : Number(position.quantityLeft) *
              Number(position.market.contractUnit) *
              (Number(position.price.toString()) -
                Number(oraclePrice.toString()));

        if (loss > 0) return;

        marketLosses[marketId] += Math.abs(loss);
      });

      setUnsettledLosses(marketLosses);
    };

    if (address && positions && positions.length > 0) {
      calculateUnsettledLosses();
    }
  }, [positions, address, setUnsettledLosses]);
}
