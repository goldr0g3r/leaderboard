export interface IScore {
  totalScore: number;
  individualScore: {
    [key: number]: number;
  };
}
