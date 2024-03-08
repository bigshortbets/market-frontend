import { MarketsDataProps, marketsData } from '@/data/marketsData';

const monthMapping: { [key: string]: string } = {
  F: 'January',
  G: 'February',
  H: 'March',
  J: 'April',
  K: 'May',
  M: 'June',
  N: 'July',
  Q: 'August',
  U: 'September',
  V: 'October',
  X: 'November',
  Z: 'December',
};

export const getMarkeDetails = (
  marketInput: string
): MarketsDataProps | undefined => {
  const inputParts = marketInput.split(':');
  const actualInput = inputParts.length > 1 ? inputParts[1] : inputParts[0];
  const market = marketsData.find((market) =>
    actualInput.startsWith(market.symbol)
  );

  if (market) {
    const symbolLength = market.symbol.length;
    const symbol = actualInput.substr(0, symbolLength);
    let monthCode = '';
    let yearCode = '';
    for (let i = actualInput.length - 1; i >= 0; i--) {
      if (isNaN(Number(actualInput[i]))) {
        monthCode = actualInput[i];
        yearCode = actualInput.substring(i + 1);
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
