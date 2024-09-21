import React, { useState, useEffect } from 'react';
import { Tooltip } from '@nextui-org/react';
import { useAccount } from 'wagmi';

interface MarketInterfaceLowerBarDataItemProps {
  label: string;
  value: string | number;
  tooltipHtml: string;
  tooltipId: string;
}

export const MarketInterfaceLowerBarDataItem = ({
  label,
  value,
  tooltipHtml,
  tooltipId,
}: MarketInterfaceLowerBarDataItemProps) => {
  const { address } = useAccount();
  const [initialLoading, setInitialLoading] = useState(false);

  // Run loading state when address becomes defined
  useEffect(() => {
    if (address) {
      setInitialLoading(true);

      const timer = setTimeout(() => {
        setInitialLoading(false);
      }, 1000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount or address change
    }
  }, [address]);

  const displayValue = address ? value : '-';

  return (
    <div>
      <div className='text-[11px] sm:text-xs text-white flex flex-col gap-0.5 min-w-[100px]'>
        <Tooltip
          content='dadadasggasgsagassssdssssssssssssssssssssss'
          classNames={{
            base: [
              // arrow color
              'before:bg-[#444650] dark:before:bg-[#444650]',
            ],
            content: [
              'py-1.5 px-3 shadow-xl text-xs',
              'text-white  bg-[#444650] to-neutral-400',
            ],
          }}
        >
          <p
            data-tooltip-id={tooltipId}
            data-tooltip-html={tooltipHtml}
            className='text-tetriary decoration-dotted underline cursor-help'
          >
            {label}
          </p>
        </Tooltip>
        {initialLoading ? (
          <p className='animate-pulse w-[68px] h-[16px] bg-[#444650] rounded'></p>
        ) : (
          <p>{displayValue}</p>
        )}
      </div>
    </div>
  );
};
