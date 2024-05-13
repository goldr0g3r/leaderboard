export interface ILeaderboardUser {
  ntid: string;
  name: string;
  department: string;
  score: number;
  rank: number;
}

export interface ILeaderboardUserWithImage extends ILeaderboardUser {
  image: string;
}

export default interface ILeaderboard {
  overall: ILeaderboardUser[];
  games: {
    [key: string]: ILeaderboardUser[];
  };
}
