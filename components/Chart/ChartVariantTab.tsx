import { Dispatch, SetStateAction } from 'react';

interface ChartVariantTabProps {
  value: 'oracle' | 'market';
  chosenChartVariant: 'oracle' | 'market';
  setChosenChartVariant: Dispatch<SetStateAction<'oracle' | 'market'>>;
}

export const ChartVariantTab = ({
  value,
  chosenChartVariant,
  setChosenChartVariant,
}: ChartVariantTabProps) => {
  const isActive = value === chosenChartVariant;
  return (
    <button
      className={` rounded-lg capitalize flex items-center justify-center text-[11px] font-semibold py-1 px-2 ${
        isActive ? 'bg-[#444650]' : 'bg-[#23252E] text-tetriary'
      }`}
      onClick={() => setChosenChartVariant(value)}
    >
      {value}
    </button>
  );
};
