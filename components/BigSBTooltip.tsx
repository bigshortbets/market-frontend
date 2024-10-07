import { Tooltip } from '@nextui-org/react';
import React, { ReactNode } from 'react';

interface BigSBTooltipProps {
  children: ReactNode;
  content: ReactNode;
}

export const BigSBTooltip = ({ children, content }: BigSBTooltipProps) => {
  return (
    <Tooltip
      content={content}
      classNames={{
        base: ['before:bg-[#444650] dark:before:bg-[#444650]'],
        content: [
          'py-1.5 px-3 shadow-xl text-xs',
          'text-white  bg-[#444650] to-neutral-400',
        ],
      }}
    >
      {children}
    </Tooltip>
  );
};
