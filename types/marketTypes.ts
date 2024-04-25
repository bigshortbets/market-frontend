export interface BasicMarketType {
  id: string;
  ticker: string;
  tickSize: BigInt;
  lifetime: BigInt;
  initialMargin: BigInt;
  maintenanceMargin: BigInt;
  contractUnit: BigInt;
  blockHeight: BigInt;
  timestamp: Date;
  dailyVolume: BigInt;
  oraclePrice: BigInt;
}

export interface EnrichedMarketType extends BasicMarketType {
  name?: string;
  path?: string;
  symbol?: string;
  category?: string;
  newDate?: Date;
  isClosed?: boolean;
  timeDiff?: number;
  timeLeftMessage?: string;
  formattedDate?: string;
}

export type MarketsQueryResponse = {
  markets: BasicMarketType[];
};
