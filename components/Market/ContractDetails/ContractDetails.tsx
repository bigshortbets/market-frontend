import { MarketType } from '@/types/marketTypes';
import { useAtom } from 'jotai';
import React from 'react';
import { selectedMarketIdAtom } from '../Market';
import { findMarketById } from '@/utils/findMarketById';
import { scaleNumber } from '@/utils/scaleNumber';

interface ContractDetailsProps {
  markets: MarketType[];
  oraclePrice?: BigInt;
}
export const ContractDetails = ({
  markets,
  oraclePrice,
}: ContractDetailsProps) => {
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const selectedMarket = findMarketById(markets, selectedMarketId);
  const contractDetailsData = [
    { label: 'Contract name', value: selectedMarket?.ticker },
    {
      label: 'Oracle price',
      value: oraclePrice && scaleNumber(oraclePrice.toString()),
    },
  ];
  return (
    <div className="w-[250px] h-[300px] bg-secondary-bg rounded pt-4 font-semibold">
      <h3 className="text-sm px-4 mb-2">CONTRACT DETAILS</h3>

      <div className="flex flex-col font-normal text-xs">
        {contractDetailsData.map((data, key) => (
          <div
            className="px-4 py-2 even:bg-[#2e303940] flex justify-between items-center"
            key={key}
          >
            <p>{data.label}</p>
            <p>{data.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
