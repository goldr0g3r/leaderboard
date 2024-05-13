import { IScore } from "./IScore";

export interface IUser extends IScore {
  ntid: string;
  name: string;
  department: string;
}
