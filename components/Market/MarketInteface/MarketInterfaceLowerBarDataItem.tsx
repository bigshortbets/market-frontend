import React, { useState, useEffect, ReactNode } from 'react';
import { Tooltip } from '@nextui-org/react';
import { useAccount } from 'wagmi';
import { useAtom } from 'jotai';
import { selectedMarketIdAtom } from '../Market';

interface MarketInterfaceLowerBarDataItemProps {
  label: string;
  value: string | number;
  tooltipHtml: ReactNode;
  marketRefresh?: boolean;
}

export const MarketInterfaceLowerBarDataItem = ({
  label,
  value,
  tooltipHtml,
  marketRefresh,
}: MarketInterfaceLowerBarDataItemProps) => {
  const { address } = useAccount();
  const [initialLoading, setInitialLoading] = useState(false);
  const [selectedMarketId] = useAtom(selectedMarketIdAtom);

  const handleLoading = () => {
    setInitialLoading(true);

    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  };

  // Nasłuchiwanie tylko na zmianę adresu
  useEffect(() => {
    if (address) {
      handleLoading();
    } else {
      setInitialLoading(false);
    }
  }, [address]);

  // Nasłuchiwanie na zmianę address oraz selectedMarketId, jeśli marketRefresh = true
  useEffect(() => {
    if (marketRefresh && address) {
      handleLoading();
    }
  }, [selectedMarketId, address, marketRefresh]);

  const displayValue = address ? value : '-';

  return (
    <div>
      <div className='text-[11px] sm:text-xs text-white flex flex-col gap-0.5 min-w-[100px]'>
        <Tooltip
          content={tooltipHtml}
          classNames={{
            base: ['before:bg-[#444650] dark:before:bg-[#444650]'],
            content: [
              'py-1.5 px-3 shadow-xl text-xs',
              'text-white  bg-[#444650] to-neutral-400',
            ],
          }}
        >
          <p className='text-tetriary decoration-dotted underline cursor-help'>
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
