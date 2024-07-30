import React, { Dispatch, SetStateAction } from 'react';
import { Slider } from '@nextui-org/slider';

interface LeverageProps {
  margin: number;
  setMargin: Dispatch<SetStateAction<any>>;
  initial: number;
}

export const Leverage = ({ margin, setMargin, initial }: LeverageProps) => {
  return (
    <Slider
      label='Leverage'
      step={1}
      onChange={setMargin}
      maxValue={100}
      color='success'
      minValue={initial}
      value={margin}
      className='mt-1.5 px-1'
      getValue={(val) => `${(100 / Number(val)).toFixed(2)}x`}
      classNames={{
        filler: 'bg-[#4ECB7D]',
        track: 'bg-[#23252E]',
        label: 'text-xs font-semibold mb-1.5 text-secondary',
        value: 'text-xs mb-1.5 font-semibold text-secondary',
      }}
    />
  );
};
