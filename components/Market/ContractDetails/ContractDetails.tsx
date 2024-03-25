import { MarketType } from '@/types/marketTypes';
import { useAtom } from 'jotai';
import { currentBlockAtom, selectedMarketIdAtom } from '../Market';
import { findMarketById } from '@/utils/findMarketById';
import { formatDate } from '@/utils/formatDate';

import { calculateMarketClosing } from '@/utils/calculateMarketClosing';
import { scaleNumber } from '@/utils/scaleNumber';

interface ContractDetailsProps {
  markets: MarketType[];
}
export const ContractDetails = ({ markets }: ContractDetailsProps) => {
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const selectedMarket = findMarketById(markets, selectedMarketId);
  const [currentBlock] = useAtom(currentBlockAtom);
  const { formattedDate } = calculateMarketClosing(
    currentBlock!,
    Number(selectedMarket?.lifetime)
  );

  const marketDurationRepresentation = `${formatDate(
    selectedMarket?.timestamp as unknown as string
  )}-${formattedDate}`;

  const contractDetailsData = [
    { label: 'Contract name', value: selectedMarket?.ticker },
    { label: 'Market duration', value: marketDurationRepresentation },
    {
      label: 'Tick size',
      value: `${scaleNumber(selectedMarket?.tickSize?.toString()!)} USDC`,
    },
    {
      label: 'Initial margin',
      value: `${selectedMarket?.initialMargin?.toString()!} %`,
    },
    {
      label: 'Maintenance margin',
      value: `${selectedMarket?.maintenanceMargin?.toString()!} %`,
    },
    {
      label: 'Contract unit',
      value: `${selectedMarket?.contractUnit?.toString()!}`,
    },
  ];

  return (
    <div className={`w-full  bg-[#000211] rounded-lg font-semibold`}>
      <div className="justify-between items-center flex py-2  px-4">
        <h3 className="text-sm ">Contract details</h3>
      </div>

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
    </div>
  );
};
