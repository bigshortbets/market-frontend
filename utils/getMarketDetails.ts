import { MarketsDataProps, marketsData } from "@/data/marketsData";

const monthMapping: { [key: string]: string } = {
  F: "January",
  G: "February",
  H: "March",
  J: "April",
  K: "May",
  M: "June",
  N: "July",
  Q: "August",
  U: "September",
  V: "October",
  X: "November",
  Z: "December",
};

export const getMarkeDetails = (
  marketInput: string
): MarketsDataProps | undefined => {
  const market = marketsData.find((market) =>
    marketInput.startsWith(market.symbol)
  );

  if (market) {
    const symbolLength = market.symbol.length;
    const symbol = marketInput.substr(0, symbolLength); // Extract symbol
    const month = monthMapping[marketInput.substr(-5, 1)]; // Extract month from second to last position
    const year = marketInput.substr(-4); // Extract year
    return {
      name: `${market.name} ${month} ${year}`,
      path: market.path,
      symbol: market.symbol,
    };
  }

  return undefined;
};
