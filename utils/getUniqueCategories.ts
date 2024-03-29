import { ExtendedMarketType } from './enrichMarkets';

export function getUniqueCategories(items: ExtendedMarketType[]): string[] {
  const uniqueCategories = new Set<string>();

  items.forEach((item) => {
    if (item.category) {
      uniqueCategories.add(item.category);
    }
  });

  return Array.from(uniqueCategories);
}
