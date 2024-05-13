import { IUser } from "../interfaces/IUser";
import userModel from "../model/User";

export default async function createUser(
  ntid: string,
  name: string,
  department: string
): Promise<IUser | false> {
  try {
    const user = await userModel.create({
      ntid: ntid.toLowerCase(),
      name,
      department,
    });

    return user;
  } catch (error) {
    return false;
  }
}
