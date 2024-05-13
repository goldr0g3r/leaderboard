export interface IScore {
  totalScore: number;
  individualScore: {
    [key: string]: number;
  };
}
