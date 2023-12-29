export interface MarketType {
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
