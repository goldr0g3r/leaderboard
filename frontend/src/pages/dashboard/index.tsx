import "./style.css";
import { mcqueen, mater, fransisco } from "../../assets";
import { useState, useEffect } from "react";
import Card from "../../components/Card";
import LoadingScreen from "../../components/loading";
import ILeaderboard, {
  ILeaderboardUser,
  ILeaderboardUserWithImage,
} from "../../interface/ILeaderboard";
import { api } from "../../api";
import IApiResponse from "../../interface/IApiResponse";

const colors = ["#d6a21e", "#d6cd1e", "#bbbbbb"];

const leaderboardColors = [
  "#d6cd1e",
  "#bbbbbb",
  "#d6a21e",
  "#cd1ed6",
  "#1ed6cd",
  "#1ebf1e",
  "#1e1ebf",
  "#bf1e1e",
  "#bf1e9e",
  "#9e1ebf",
  "#9e1e1e",
  "#9e1e9e",
  "#9e9e1e",
  "#9e9e9e",
  "#1e9e9e",
];

const CatListItem = ({
  user,
  color,
}: {
  user: ILeaderboardUser;
  color: string;
}) => {
  return (
    <li className="cat-item">
      {/* <div className="cat-item__photo"> */}
      <div className="ranking" style={{ backgroundColor: color }}>
        {user.rank}
      </div>
      {/* </div> */}
      <div className="cat-item__info">
        <h4>
          {user.name} ({user.department}){" "}
        </h4>
      </div>
      <div className="cat-item__points">
        <p>{user.score}</p>
      </div>
    </li>
  );
};

const Dashboard = () => {
  const [topThreeCats, setTopThreeCats] = useState<
    ILeaderboardUserWithImage[] | undefined
  >(undefined);
  const [allCats, setAllCats] = useState<ILeaderboardUser[] | undefined>(
    undefined
  );
  const [leaderboard, setLeaderboard] = useState<ILeaderboard | undefined>(
    undefined
  );

  async function findTopThreeCats(data: ILeaderboardUser[]) {
    const topThree = data.slice(0, 3);
    setTopThreeCats([
      { ...topThree[2], image: mater },
      { ...topThree[0], image: mcqueen },
      { ...topThree[1], image: fransisco },
    ]);
  }

  async function fetchLeaderBoard() {
    try {
      const response = await api.get<IApiResponse<ILeaderboard>>(
        "/leaderboard"
      );
      if (!response.data.data) {
        return;
      }

      console.log(response.data.data);

      setAllCats(response.data.data.overall.filter((user, index) => index > 2));
      findTopThreeCats(response.data.data?.overall || []);
      setLeaderboard(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchLeaderBoard();
    setInterval(() => {
      fetchLeaderBoard();
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return topThreeCats && allCats && leaderboard ? (
    <div className="leaderboard">
      <div className="container">
        <div className="leaders">
          <h2>Today's Top 15</h2>
          <ul>
            {topThreeCats.map((cat, i) => (
              <li key={cat.name}>
                <div className={`lead-cats`}>
                  <div className="photos">
                    <img
                      className="lead-cats__photo"
                      src={cat.image}
                      alt={cat.name}
                    />
                  </div>
                  <div className={`podium pod-${i + 1}`}>
                    <div
                      className="ranking-lead"
                      style={{ backgroundColor: colors[i] }}
                    >
                      {cat.rank}
                    </div>
                    <h4>
                      {cat.name} ({cat.department})
                    </h4>
                    <p>{cat.score} points</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="board">
          <ul>
            {allCats.map((cat, i) => (
              <CatListItem
                key={cat.name}
                user={cat}
                color={leaderboardColors[i + 3]}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="games">
        <Card title="mParivaahan" rankings={leaderboard.games[0] || []} />
        <Card title="Fun Games" rankings={leaderboard.games[1] || []} />
        <Card title="Guess that part" rankings={leaderboard.games[2] || []} />
        <Card
          title="Can you ID that car"
          rankings={leaderboard.games[3] || []}
        />
        <Card title="PictoGuess" rankings={leaderboard.games[4] || []} />
        <Card
          title="Two truths and a lie"
          rankings={leaderboard.games[5] || []}
        />
      </div>
    </div>
  ) : (
    <div>
      <LoadingScreen />
    </div>
  );
};
export default Dashboard;
