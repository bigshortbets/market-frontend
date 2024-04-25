import { EnrichedMarketType } from '@/types/marketTypes';

export function getUniqueCategories(items: EnrichedMarketType[]): string[] {
  const uniqueCategories = new Set<string>();

  items.forEach((item) => {
    if (item.category) {
      uniqueCategories.add(item.category);
    }
  });

  return Array.from(uniqueCategories);
}
