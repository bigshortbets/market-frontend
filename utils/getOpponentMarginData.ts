export interface OpponentMarginInfo {
  margin: string;
  requiredDeposit: string;
  liquidationStatus: string;
}

export interface OpponentData {
  [marketId: string]: {
    [opponentAddress: string]: OpponentMarginInfo;
  };
}

export function getOpponentMarginData(
  opponentData: OpponentData,
  address: string,
  marketId: string
): OpponentMarginInfo | null {
  if (!opponentData[marketId]) {
    console.warn(`Market ${marketId} not found in opponent data.`);
    return null;
  }

  if (!opponentData[marketId][address]) {
    console.warn(`Opponent ${address} not found in market ${marketId}.`);
    return null;
  }

  return opponentData[marketId][address];
}
