export interface LeaderboardType {
  id: string;
  balanceChange: number;
}

export interface LeaderboardResponse {
  generalLeaderboards: LeaderboardType[];
}

export interface ElectionLeaderboardType {
  user: string;
  balanceChange: number;
}

export interface ElectionLeaderboardResponse {
  userBalances: ElectionLeaderboardType[];
}
