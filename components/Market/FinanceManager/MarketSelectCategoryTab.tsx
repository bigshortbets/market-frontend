import { MarketDataCategories } from '@/data/marketsData';
import React from 'react';

interface MarketSelectCategoryTabProps {
  activeCategory: MarketDataCategories | undefined;
  value: MarketDataCategories | undefined;
  handleSetCategory: (value: MarketDataCategories | undefined) => void;
}

export const MarketSelectCategoryTab = ({
  value,
  activeCategory,
  handleSetCategory,
}: MarketSelectCategoryTabProps) => {
  const isActive = value === activeCategory;
  return (
    <button
      onClick={() => handleSetCategory(value)}
      className={`rounded-xl flex items-center justify-center text-[10px] font-semibold py-1 px-3 ${
        value === 'election'
          ? isActive
            ? 'bg-[#4ECB7D] text-black'
            : 'bg-[#67c88c] text-[#485286]'
          : isActive
          ? 'bg-[#444650]'
          : 'bg-[#191B24] text-tetriary'
      }`}
    >
      <span className="capitalize">{value ? value : 'All'}</span>
    </button>
  );
};
