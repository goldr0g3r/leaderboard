export default interface IApiResponse<Data> {
  status: boolean;
  message: string;
  data?: Data;
}
