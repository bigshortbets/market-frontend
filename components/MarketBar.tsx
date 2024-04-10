import { MarketType } from '@/types/marketTypes';
import { useAtom } from 'jotai';
import { selectedMarketIdAtom } from './Market/Market';
import { findMarketById } from '@/utils/findMarketById';
import { useAccount } from 'wagmi';
import { useNativeCurrencyBalance } from '@/blockchain/hooks/useNativeCurrencyBalance';
import { getMarkeDetails } from '@/utils/getMarketDetails';
import Image from 'next/image';
import { formatDate } from '@/utils/formatDate';
import { addSeconds } from 'date-fns';

interface MarketBarProps {
  markets: MarketType[];
}

export const MarketBar = ({ markets }: MarketBarProps) => {
  const [selectedMarketId, setSelectedMarketId] = useAtom(selectedMarketIdAtom);
  const { address } = useAccount();
  const { data } = useNativeCurrencyBalance(address);

  const market = findMarketById(markets, selectedMarketId);
  const marketDetails = market && getMarkeDetails(market.ticker);

  const marketDurationRepresentation = `${formatDate(
    market?.timestamp as unknown as string /* Typing should be fixed on BE */
  )}-${formatDate(
    String(
      addSeconds(
        new Date(market?.timestamp as unknown as string),
        Number(market?.lifetime)
      )
    )
  )}`;

  const contractDetailsData = [
    { label: 'Contract name', value: market?.ticker },
    { label: 'Market duration', value: marketDurationRepresentation },
    {
      label: 'Tick size',
      value: `${market?.tickSize?.toString()!} USDC`,
    },
    {
      label: 'Initial margin',
      value: `${market?.initialMargin?.toString()!} %`,
    },
  ];
  return (
    <div className="h-[60px] w-full bg-secondary-bg  py-2 ">
      <div className="w-full mx-auto max-w-[1800px] flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-8 justify-between">
          <select
            name="markets"
            id="market-select"
            className="bg-gray-800 text-white border-none rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            onChange={(e) => setSelectedMarketId(e.target.value)}
            value={selectedMarketId}
          >
            {markets.map((market, index) => (
              <option
                key={index}
                className="bg-gray-700 text-white"
                value={market.id}
              >
                {market.ticker}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-lg">{marketDetails?.name}</div>
            {marketDetails && (
              <Image
                src={marketDetails?.path}
                width={22}
                height={22}
                alt="Market logo"
                className="rounded-full"
              />
            )}
          </div>

          <div className="flex flex-col gap-1 text-xs">
            <p>Oracle price:</p>
            {market?.oraclePrice ? (
              <p className="font-semibold text-[#4ECB7D]">
                {market?.oraclePrice.toString()}
              </p>
            ) : (
              <p className="font-semibold">Loading...</p>
            )}
          </div>
          <div className="flex gap-7 text-xs">
            {contractDetailsData.map((detail, key) => (
              <div key={key} className="flex flex-col gap-1">
                <p>{detail.label}:</p>
                <p className="font-semibold">{detail.value}</p>
              </div>
            ))}
          </div>
        </div>
        {address && (
          <div className="flex flex-col gap-1 items-end">
            <p className="text-sm">Wallet balance</p>
            <p className="text-xs">
              {Number(data?.formatted).toFixed(2).toString()} {data?.symbol}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
