export interface MarketsDataProps {
  symbol: string;
  name: string;
  path: string;
}

export const marketsData: MarketsDataProps[] = [
  {
    symbol: "CL",
    name: "Crude Oil",
    path: "./market-logos/CL.svg",
  },
  {
    symbol: "E7",
    name: "Euro FX",
    path: "./market-logos/E7.svg",
  },
  {
    symbol: "NQ",
    name: "Nasdaq",
    path: "./market-logos/NQ.svg",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    path: "./market-logos/BTC.svg",
  },
  {
    symbol: "SI",
    name: "Silver",
    path: "./market-logos/SI.svg",
  },
];
