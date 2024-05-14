import { IUser } from "../interfaces/IUser";
import userModel from "../model/User";

export default async function editUser(
  ntid: string,
  user: IUser
): Promise<IUser | false> {
  try {
    const game2 = {
      score: Object.values(user.individualScore[1].games).reduce(
        (acc, score) => acc + score,
        0
      ),
      games: user.individualScore[1].games,
    };

    const individualScore = {
      ...user.individualScore,
      1: game2,
    };
    const totalScore = Object.values(individualScore).reduce(
      (acc, score) => acc + score.score,
      0
    );

    const updatedUser = await userModel.findOneAndUpdate(
      { ntid },
      {
        ...user,
        ntid: ntid ? ntid.toLowerCase() : undefined,
        totalScore: totalScore,
        individualScore,
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
