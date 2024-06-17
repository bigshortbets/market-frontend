export interface LeaderboardType {
  id: string;
  balanceChange: number;
}

export interface LeaderboardResponse {
  generalLeaderboards: LeaderboardType[];
}
