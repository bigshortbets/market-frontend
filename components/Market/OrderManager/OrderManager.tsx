import { scaleNumber } from '@/utils/scaleNumber';
import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';

export const OrderManager = () => {
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <div className="w-[300px] h-[300px] bg-secondary-bg rounded p-3 flex flex-col justify-between">
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
            id={'quantityInput'}
            className="outline-none bg-[#23252E] border-none text-sm text-white py-3 rounded-lg px-3"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-sm">Order cost</p>
          <p className="text-sm">- USDC</p>
        </div>
        <div className="flex justify-between mb-3">
          <p className="text-sm">Order value</p>
          <p className="text-sm">- USDC</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex-1 bg-[#73D391] py-2 flex flex-col items-center rounded-lg">
          <p className="text-white text-sm font-bold">BUY</p>
          <p className="text-white text-xs font-bold">LONG</p>
        </button>
        <button className="flex-1 bg-[#D26D6C] py-2 flex flex-col items-center rounded-lg">
          <p className="text-white text-sm font-bold rounded-lg">SELL</p>
          <p className="text-wwhite text-xs font-bold">SHORT</p>
        </button>
      </div>
    </div>
  );
};
