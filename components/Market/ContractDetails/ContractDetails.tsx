import { MarketType } from "@/types/marketTypes";
import { useAtom } from "jotai";
import React, { useRef, useState } from "react";
import { selectedMarketIdAtom } from "../Market";
import { findMarketById } from "@/utils/findMarketById";
import { scaleNumber } from "@/utils/scaleNumber";
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidUpArrow } from "react-icons/bi";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { formatDate } from "@/utils/formatDate";
import { addSeconds } from "date-fns";
import { useAccount, useNetwork } from "wagmi";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

interface ContractDetailsProps {
  markets: MarketType[];
}
export const ContractDetails = ({ markets }: ContractDetailsProps) => {
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const selectedMarket = findMarketById(markets, selectedMarketId);
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const [animationParent] = useAutoAnimate();

  const { chain } = useNetwork();
  const { address } = useAccount();

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
