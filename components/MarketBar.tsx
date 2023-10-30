import { MarketType } from '@/types/marketTypes';
import { useAtom } from 'jotai';
import { selectedMarketIdAtom } from './Market/Market';
import { findMarketById } from '@/utils/findMarketById';
import { scaleNumber } from '@/utils/scaleNumber';
import { useAccount, useBalance } from 'wagmi';
import { bigshortbetsTokenAddress } from '@/blockchain/constants';

interface MarketBarProps {
  markets: MarketType[];
  oraclePrice?: BigInt;
}

export const MarketBar = ({ markets, oraclePrice }: MarketBarProps) => {
  const [selectedMarketId, setSelectedMarketId] = useAtom(selectedMarketIdAtom);

  const selectedMarket = findMarketById(markets, selectedMarketId);

  const { address } = useAccount();
  const { data } = useBalance({
    address: address,
    token: bigshortbetsTokenAddress,
    watch: true,
    chainId: 2137,
  });
  return (
    <div
      className="h-[60px] w-full bg-secondary-bg px-6 py-2 flex items-center justify-between"
      onClick={() => console.log(selectedMarketId)}
    >
      <div className="flex items-center gap-8 justify-between">
        <select
          name="markets"
          id="market-select"
          className="bg-gray-800 text-white border-none rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          onChange={(e) => setSelectedMarketId(e.target.value)}
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
        <div className="flex flex-col gap-1">
          <p>Block height</p>
          <p className="text-xs">{selectedMarket?.blockHeight.toString()}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p>Contract unit</p>
          <p className="text-xs">{selectedMarket?.contractUnit.toString()}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p>Daily volume</p>
          <p className="text-xs">{selectedMarket?.dailyVolume.toString()}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p>Initial margin</p>
          <p className="text-xs">{selectedMarket?.initialMargin.toString()}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p>Tick size</p>
          <p className="text-xs">{selectedMarket?.tickSize.toString()}</p>
        </div>

        <div className="flex flex-col gap-1">
          <p>Oracle price</p>
          {oraclePrice ? (
            <p className="text-xs">{scaleNumber(oraclePrice.toString())}</p>
          ) : (
            <p className="text-xs">Loading...</p>
          )}
        </div>
      </div>
      {address && (
        <div className="flex flex-col gap-1 items-end">
          <p className="text-sm">Balance</p>
          <p className="text-xs">
            {Number(data?.formatted).toFixed(2).toString()} {data?.symbol}
          </p>
        </div>
      )}
    </div>
  );
};
