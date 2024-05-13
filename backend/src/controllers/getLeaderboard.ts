import ILeaderboard, { ILeaderboardUser } from "../interfaces/ILeaderboard";
import userModel from "../model/User";

export default async function getLeaderboard(): Promise<ILeaderboard | false> {
  try {
    const allUsers = await userModel.find().sort({ totalScore: -1 });

    const overallLeaderboard: ILeaderboardUser[] = allUsers.map(
      (user, index) => {
        return {
          ntid: user.ntid,
          name: user.name,
          department: user.department,
          score: user.totalScore,
          rank: index + 1,
        };
      }
    );

    let rank = 1;
    let prevScore = overallLeaderboard[0].score;
    overallLeaderboard[0].rank = 1;
    for (let i = 1; i < overallLeaderboard.length; i++) {
      if (overallLeaderboard[i].score === prevScore) {
        overallLeaderboard[i].rank = rank;
      } else {
        rank = i + 1;
        overallLeaderboard[i].rank = rank;
        prevScore = overallLeaderboard[i].score;
      }
    }

    const gamesLeaderboard: { [key: number]: ILeaderboardUser[] } = {};
    for (let i = 0; i < 6; i++) {
      const gameUsers = allUsers
        .sort((a, b) => b.individualScore[i] - a.individualScore[i])
        .map((user, index) => {
          return {
            ntid: user.ntid,
            name: user.name,
            department: user.department,
            score: user.individualScore[i],
            rank: index + 1,
          };
        });

      rank = 1;
      prevScore = gameUsers[0].score;
      gameUsers[0].rank = 1;
      for (let j = 1; j < gameUsers.length; j++) {
        if (gameUsers[j].score === prevScore) {
          gameUsers[j].rank = rank;
        } else {
          rank = j + 1;
          gameUsers[j].rank = rank;
          prevScore = gameUsers[j].score;
        }
      }

      gamesLeaderboard[i] = gameUsers.slice(0, 3);
    }

    return {
      overall: overallLeaderboard.slice(0, 15),
      games: gamesLeaderboard,
    };
  } catch (error) {
    return false;
  }
}
