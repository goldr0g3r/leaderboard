export interface Cat {
  name: string;
  points: number;
}

export interface CatWithImage extends Cat {
  image: string;
}

export interface LeaderBoard {
  topThreeCats: Cat[];
  allCats: Cat[];
}

export interface allCats {
  cat: Cat[];
}

export interface LeaderBoardResponse {
  data: LeaderBoard;
}
