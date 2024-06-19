export type MarketDataCategories =
  | 'election'
  | 'currencies'
  | 'indices'
  | 'commodities'
  | 'stocks'
  | 'crypto'
  | 'others';

export interface MarketsDataProps {
  symbol: string;
  name: string;
  path: string;
  category: MarketDataCategories;
}

export const marketsData: MarketsDataProps[] = [
  {
    symbol: 'CL',
    name: 'Crude Oil',
    path: './market-logos/CL.svg',
    category: 'commodities',
  },
  {
    symbol: 'E7',
    name: 'Euro FX',
    path: './market-logos/E7.svg',
    category: 'currencies',
  },
  {
    symbol: 'NQ',
    name: 'Nasdaq',
    path: './market-logos/NQ.svg',
    category: 'indices',
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    path: './market-logos/BTC.svg',
    category: 'crypto',
  },
  {
    symbol: 'SI',
    name: 'Silver',
    path: './market-logos/SI.svg',
    category: 'commodities',
  },
  {
    symbol: '6B',
    name: 'British Pound',
    path: './market-logos/6B.svg',
    category: 'currencies',
  },
  {
    symbol: '6J',
    name: 'Japanese Yen',
    path: './market-logos/6J.svg',
    category: 'currencies',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    path: './market-logos/ETH.svg',
    category: 'crypto',
  },
  {
    symbol: 'TSLG',
    name: 'Tesla',
    path: './market-logos/TSLG.svg',
    category: 'stocks',
  },
  {
    symbol: 'NVDF',
    name: 'NVIDIA',
    path: './market-logos/NVDF.svg',
    category: 'stocks',
  },
  {
    symbol: 'AAPH',
    name: 'Apple',
    path: './market-logos/AAPH.svg',
    category: 'stocks',
  },

  /* MICRO */

  {
    symbol: 'MCL',
    name: 'Crude Oil',
    path: './market-logos/CL.svg',
    category: 'commodities',
  },
  {
    symbol: 'MGC',
    name: 'Gold',
    path: './market-logos/GOLD.svg',
    category: 'commodities',
  },
  {
    symbol: 'MBT',
    name: 'Bitcoin',
    path: './market-logos/BTC.svg',
    category: 'crypto',
  },
  {
    symbol: 'MET',
    name: 'Ethereum',
    path: './market-logos/ETH.svg',
    category: 'crypto',
  },
  {
    symbol: 'MNQ',
    name: 'Nasdaq',
    path: './market-logos/NQ.svg',
    category: 'indices',
  },
  {
    symbol: 'MES',
    name: 'S&P 500',
    path: './market-logos/SP500.svg',
    category: 'indices',
  },
  {
    symbol: 'M6E',
    name: 'EUR/USD',
    path: './market-logos/E7.svg',
    category: 'currencies',
  },
  {
    symbol: 'MYM',
    name: 'Dow Jones',
    path: './market-logos/DOWJONES.svg',
    category: 'indices',
  },
  {
    symbol: 'MSTF',
    name: 'Microsoft',
    path: './market-logos/MICROSOFT.svg',
    category: 'stocks',
  },
  {
    symbol: 'MSTF',
    name: 'Microsoft',
    path: './market-logos/MICROSOFT.svg',
    category: 'stocks',
  },
  {
    symbol: '10Y',
    name: '10-Year Yields',
    path: './market-logos/10YEAR.svg',
    category: 'indices',
  },

  /* ELECTIOn */

  {
    symbol: 'TRUMP',
    name: 'Trump Election',
    path: './market-logos/TRUMP.svg',
    category: 'election',
  },
  {
    symbol: 'BIDEN',
    name: 'Biden Election',
    path: './market-logos/BIDEN.svg',
    category: 'election',
  },
  {
    symbol: 'KENNEDY',
    name: 'Kennedy Election',
    path: './market-logos/BIDEN.svg',
    category: 'election',
  },
];
