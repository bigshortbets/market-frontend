import React from 'react';

interface AggregatedPositionsCheckboxProps {
  isMarketPrice: boolean;
  setIsMarketPrice: () => void;
}

export const MarketPriceCheckbox = ({
  isMarketPrice,
  setIsMarketPrice,
}: AggregatedPositionsCheckboxProps) => {
  return (
    <label className='flex flex-row-reverse items-center cursor-pointer'>
      <input
        type='checkbox'
        checked={isMarketPrice}
        className='sr-only peer'
        onChange={setIsMarketPrice}
      />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-[#385c44] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#73D391]"></div>
      <span className='me-3 text-xs font-medium text-tetriary'>
        Oracle Price
      </span>
    </label>
  );
};
