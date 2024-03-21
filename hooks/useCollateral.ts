import { useEffect } from 'react';
import { useAtom } from 'jotai';

import { collateralAtom } from '@/components/Market/Market';
import { PositionType } from '@/types/positionTypes';
import { scaleNumber } from '@/utils/scaleNumber';

export interface Collateral {
  [marketId: string]: number;
}

export function useCollateral(
  positions: PositionType[] | undefined,
  userAddress: string | null
) {
  const [, setCollateral] = useAtom(collateralAtom);

  useEffect(() => {
    const calculateCollateral = () => {
      if (!userAddress || !positions || positions.length === 0) {
        setCollateral({});
        return;
      }

      const marketCollateral: Collateral = {};

      positions.forEach((position) => {
        const marketId = position.market.id;
        const oraclePrice = Number(
          scaleNumber(Number(position.market.oraclePrice.toString()))
        );
        /* const price = Number(scaleNumber(Number(position.price.toString()))); */
        const quantityLeft = Number(position.quantityLeft.toString());
        const contractUnit = Number(position.market.contractUnit.toString());

        const collateralForPosition = oraclePrice * quantityLeft * contractUnit;

        if (!marketCollateral[marketId]) {
          marketCollateral[marketId] = 0;
        }

        marketCollateral[marketId] += collateralForPosition;
      });

      setCollateral(marketCollateral);
    };

    if (userAddress && positions && positions.length > 0) {
      calculateCollateral();
    }
  }, [positions, userAddress, setCollateral]);
}
