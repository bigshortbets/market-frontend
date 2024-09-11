import React from 'react';

interface AggregatedPositionsCheckboxProps {
  isVal: boolean;
  setVal: () => void;
  name: string;
}

export const ToggleChartDisplay = ({
  isVal,
  setVal,
  name,
}: AggregatedPositionsCheckboxProps) => {
  return (
    <label className='flex flex-row-reverse items-center cursor-pointer'>
      <input
        type='checkbox'
        checked={isVal}
        className='sr-only peer'
        onChange={setVal}
      />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-[#385c44] rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#73D391]"></div>
      <span className='me-3 text-xs font-medium text-tetriary'>{name}</span>
    </label>
  );
};
