import { MarketType } from "@/types/marketTypes";
import { useAtom } from "jotai";
import React, { useRef, useState } from "react";
import { currentBlockAtom, selectedMarketIdAtom } from "../Market";
import { findMarketById } from "@/utils/findMarketById";
import { scaleNumber } from "@/utils/scaleNumber";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { formatDate } from "@/utils/formatDate";

import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { calculateMarketClosing } from "@/utils/calculateMarketClosing";

interface ContractDetailsProps {
  markets: MarketType[];
}
export const ContractDetails = ({ markets }: ContractDetailsProps) => {
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const selectedMarket = findMarketById(markets, selectedMarketId);
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const [animationParent] = useAutoAnimate();
  const [currentBlock] = useAtom(currentBlockAtom);
  const { formattedDate } = calculateMarketClosing(
    currentBlock!,
    Number(selectedMarket?.lifetime)
  );

  const marketDurationRepresentation = `${formatDate(
    selectedMarket?.timestamp as unknown as string
  )}-${formattedDate}`;

  const contractDetailsData = [
    { label: "Contract name", value: selectedMarket?.ticker },
    { label: "Market duration", value: marketDurationRepresentation },
    {
      label: "Tick size",
      value: `${scaleNumber(selectedMarket?.tickSize?.toString()!)} USDC`,
    },
    {
      label: "Initial margin",
      value: `${selectedMarket?.initialMargin?.toString()!} %`,
    },
  ];

  const toggleIsOpened = () => {
    isOpened ? setIsOpened(false) : setIsOpened(true);
  };

  return (
    <div
      className={`w-full  bg-[#000211] rounded-lg font-semibold`}
      ref={animationParent}
    >
      <div className="justify-between items-center flex py-2  px-4">
        <h3 className="text-sm ">Contract details</h3>

        <button className="text-2xl" onClick={toggleIsOpened}>
          {isOpened ? (
            <MdOutlineKeyboardArrowUp />
          ) : (
            <MdOutlineKeyboardArrowDown />
          )}
        </button>
      </div>
      {isOpened && (
        <div className="flex flex-col font-normal text-xs">
          {contractDetailsData.map((data, key) => (
            <div
              className="px-4 py-2 text-tetriary flex justify-between items-center"
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
