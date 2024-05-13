export interface ILeaderboardUser {
  ntid: string;
  name: string;
  department: string;
  score: number;
  rank: number;
}

export default interface ILeaderboard {
  overall: ILeaderboardUser[];
  games: {
    [key: string]: ILeaderboardUser[];
  };
}
