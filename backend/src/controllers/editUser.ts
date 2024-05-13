import { IUser } from "../interfaces/IUser";
import userModel from "../model/User";

export default async function editUser(
  ntid: string,
  user: IUser
): Promise<IUser | false> {
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { ntid },
      {
        ...user,
        ntid: ntid ? ntid.toLowerCase() : undefined,
        totalScore: Object.values(user.individualScore).reduce(
          (acc, score) => acc + score,
          0
        ),
      },
      {
        new: true,
      }
    );
    if (!updatedUser) return false;

    return updatedUser;
  } catch (error) {
    return false;
  }
}
