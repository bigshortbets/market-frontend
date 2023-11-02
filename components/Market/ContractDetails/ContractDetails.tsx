import { MarketType } from '@/types/marketTypes';
import { useAtom } from 'jotai';
import React, { useRef, useState } from 'react';
import { selectedMarketIdAtom } from '../Market';
import { findMarketById } from '@/utils/findMarketById';
import { scaleNumber } from '@/utils/scaleNumber';
import { BiSolidDownArrow } from 'react-icons/bi';
import { BiSolidUpArrow } from 'react-icons/bi';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { formatDate } from '@/utils/formatDate';
import { addSeconds } from 'date-fns';
import { useNetwork } from 'wagmi';

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
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const [animationParent] = useAutoAnimate();

  /* const lifetimeAndBlockHeightDistinction =
    Number(selectedMarket?.lifetime) - Number(selectedMarket?.blockHeight); */

  const { chain } = useNetwork();
  const marketDurationRepresentation = `${formatDate(
    selectedMarket?.timestamp as unknown as string /* Typing should be fixed on BE */
  )}-${formatDate(
    String(
      addSeconds(
        new Date(selectedMarket?.timestamp as unknown as string),
        Number(selectedMarket?.lifetime)
      )
    )
  )}`;

  const contractDetailsData = [
    { label: 'Contract name', value: selectedMarket?.ticker },
    { label: 'Market duration', value: marketDurationRepresentation },
    {
      label: 'Tick size',
      value: `${scaleNumber(selectedMarket?.tickSize?.toString()!)} ${
        chain?.nativeCurrency.symbol
      }`,
    },
    {
      label: 'Initial margin',
      value: `${selectedMarket?.initialMargin?.toString()!} %`,
    },
  ];

  const toggleIsOpened = () => {
    isOpened ? setIsOpened(false) : setIsOpened(true);
  };

  return (
    <div
      className="w-[300px] bg-secondary-bg rounded pt-4 font-semibold"
      ref={animationParent}
    >
      <div className="justify-between items-center flex  mb-3 px-4">
        <h3 className="text-sm ">CONTRACT DETAILS</h3>

        <button className="text-xs" onClick={toggleIsOpened}>
          {isOpened ? <BiSolidDownArrow /> : <BiSolidUpArrow />}
        </button>
      </div>
      {isOpened && (
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
      )}
    </div>
  );
};
