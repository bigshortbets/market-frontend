import { useCreateOrderWrite } from '@/blockchain/hooks/useCreateOrderWrite';
import { scaleNumber } from '@/utils/scaleNumber';
import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import ReactLoading from 'react-loading';
import toast from 'react-hot-toast';
import { useAccount } from 'wagmi';
import { useAtom } from 'jotai';
import { selectedMarketIdAtom } from '../Market';
import { findMarketById } from '@/utils/findMarketById';
import { MarketType } from '@/types/marketTypes';

export enum OrderSideEnum {
  LONG,
  SHORT,
}

interface OrderManagerProps {
  markets: MarketType[];
}

export const OrderManager = ({ markets }: OrderManagerProps) => {
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);
  const selectedMarket = findMarketById(markets, selectedMarketId);

  const { address } = useAccount();
  const [price, setPrice] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);

  const { write: writeShortOrder, isLoading: isShortLoading } =
    useCreateOrderWrite(price, quantity, OrderSideEnum.SHORT);
  const { write: writeLongOrder, isLoading: isLongLoading } =
    useCreateOrderWrite(price, quantity, OrderSideEnum.LONG);

  const loadingStateStyle = 'opacity-50 pointer-events-none';

  const disabledStyle = 'bg-gray-300 pointer-events-none';

  const loading = isShortLoading || isLongLoading;

  const isActionDisabled = price === 0;

  const orderCost =
    (Number(selectedMarket?.initialMargin) / 100) * (price * quantity * 1000);

  const orderValue = price * quantity * 1000;

  return (
    <div
      className={`w-[300px] h-[300px] bg-secondary-bg rounded p-3 flex flex-col justify-between transition ease-in-out ${
        loading || (!address && loadingStateStyle)
      } relative`}
    >
      {loading && (
        <ReactLoading
          type={'spin'}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          width={60}
        />
      )}

      <div>
        <div className="flex flex-col mb-3">
          <label
            htmlFor="orderPriceInput"
            className="leading-4 text-xs text-[#7F828F] font-semibold mb-1"
          >
            Order price
          </label>
          <div className="relative">
            <NumericFormat
              allowNegative={false}
              id={'orderPriceInput'}
              className="outline-none bg-[#23252E] border-none text-sm text-white py-3 rounded-lg px-3 w-full"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <span className="absolute right-3 bottom-[14px] text-xs opacity-50">
              USDC
            </span>
          </div>
        </div>
        <div className="flex flex-col mb-5">
          <label
            htmlFor="quantityInput"
            className="leading-4 text-xs text-[#7F828F] font-semibold mb-1"
          >
            Quantity
          </label>
          <NumericFormat
            allowNegative={false}
            id={'quantityInput'}
            className="outline-none bg-[#23252E] border-none text-sm text-white py-3 rounded-lg px-3"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-xs">Order cost</p>
          <p className="text-xs">{orderCost} USDC</p>
        </div>
        <div className="flex justify-between mb-3">
          <p className="text-xs">Order value</p>
          <p className="text-xs">{orderValue} USDC</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className={`flex-1  duration-300 transition ease-in-out py-2 flex flex-col items-center rounded-lg ${
            isActionDisabled ? disabledStyle : 'bg-[#73D391] hover:bg-[#61C27B]'
          }`}
          onClick={() => writeLongOrder?.()}
        >
          <p className="text-white text-sm font-bold">BUY</p>
          <p className="text-white text-xs font-bold">LONG</p>
        </button>
        <button
          className={`flex-1  duration-300 transition ease-in-out py-2 flex flex-col items-center rounded-lg ${
            isActionDisabled ? disabledStyle : 'bg-[#D26D6C] hover:bg-[#C53F3A]'
          }`}
          onClick={() => writeShortOrder?.()}
        >
          <p className="text-white text-sm font-bold rounded-lg">SELL</p>
          <p className="text-wwhite text-xs font-bold">SHORT</p>
        </button>
      </div>
    </div>
  );
};
