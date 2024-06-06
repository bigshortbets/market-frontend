export interface LeaderboardType {
  user: string;
  balanceChange: number;
}

export interface LeaderboardResponse {
  generalLeaderboards: LeaderboardType[];
}
