export interface IIndividualScore {
  score: number;
  games: {
    [key: string]: number;
  };
}

export interface IScore {
  totalScore: number;
  individualScore: {
    [key: number]: IIndividualScore;
  };
}
