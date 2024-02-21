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
    const symbol = marketInput.substr(0, symbolLength);
    let monthCode = "";
    let yearCode = "";
    for (let i = marketInput.length - 1; i >= 0; i--) {
      if (isNaN(Number(marketInput[i]))) {
        monthCode = marketInput[i];
        yearCode = marketInput.substring(i + 1);
        break;
      }
    }

    const month = monthMapping[monthCode];

    return {
      name: `${market.name} ${month} ${yearCode}`,
      path: market.path,
      symbol: market.symbol,
    };
  }

  return undefined;
};
