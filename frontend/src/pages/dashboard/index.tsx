import "./data";
import "./style.css";
import {
  mcqueen,
  mater,
  fransisco,
  first_place_medal,
  second_place_medal,
  third_place_medal,
} from "../../assets";

import React, { useState, useEffect } from "react";
import { allCats, Cat, CatWithImage } from "../../interface";
import Card from "../../components/Card";

const mockCats = [
  { name: "Whiskers", photo: mcqueen, points: 1000 },
  { name: "Furball", points: 90 },
  { name: "Paws", points: 80 },
  { name: "Paws2.0", points: 855 },
];
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
  cat,
  rank,
  color,
  image,
}: {
  cat: Cat;
  rank: number;
  color: string;
  image?: string;
}) => {
  const rankOrder = rank + 1;
  const colorOrder = colors[rank];

  return (
    <li className="cat-item">
      <div className="cat-item__photo">
        <div className="ranking" style={{ backgroundColor: colorOrder }}>
          {rankOrder}
        </div>
        <div
          className="cat-item__photos"
          style={{
            backgroundColor: color,
          }}
        >
          {image && <img src={image} alt="medal" />}
        </div>
      </div>
      <div className="cat-item__info">
        <h4>{cat.name}</h4>
      </div>
      <div className="cat-item__points">
        <p>{cat.points}</p>
      </div>
    </li>
  );
};

const Dashboard = () => {
  const [topThreeCats, setTopThreeCats] = useState<CatWithImage[] | undefined>(
    undefined
  );
  const [allCats, setAllCats] = useState<Cat[] | undefined>(undefined);
  // const [newLeader, setNewLeader] = useState("");

  // Replace with actual logic to fetch cats data

  async function findTopThreeCats(data: Cat[]) {
    const sortedCats = data.sort((a, b) => b.points - a.points);
    const topThree = sortedCats.slice(0, 3);
    setTopThreeCats([
      { ...topThree[2], image: mater },
      { ...topThree[0], image: mcqueen },
      { ...topThree[1], image: fransisco },
    ]);
  }

  async function fetchLeaderBoard() {
    const response = mockCats;
    setAllCats(response);
    findTopThreeCats(response);
  }

  useEffect(() => {
    fetchLeaderBoard();
    setInterval(() => {
      fetchLeaderBoard();
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getNewLeader(rank: number, cat: Cat) {
    //select the cat with the highest points as the new leader
    if (rank === 0) {
      return cat.name;
    }
  }
  return (
    <div className="leaderboard">
      <div className="container">
        <div className="leaders">
          <h2>Today's Top 15</h2>
          <ul>
            {topThreeCats ? (
              topThreeCats.map((cat, i) => (
                <li key={cat.name}>
                  <div
                    className={`lead-cats ${
                      cat.name === getNewLeader(i, cat) ? "active" : ""
                    }`}
                  >
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
                        {i === 0 ? "3" : i === 1 ? "1" : "2"}
                      </div>
                      <h4>{cat.name}</h4>
                      <p>{cat.points} points</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div>Loading</div>
            )}
          </ul>
        </div>

        <div className="board">
          <h2>Leaderboard</h2>
          <ul>
            {allCats ? (
              allCats.map((cat, i) => (
                <CatListItem
                  key={cat.name}
                  cat={cat}
                  rank={i}
                  color={leaderboardColors[i]}
                  image={
                    i === 0
                      ? first_place_medal
                      : i === 1
                      ? second_place_medal
                      : i === 2
                      ? third_place_medal
                      : undefined
                  }
                />
              ))
            ) : (
              <div>Loading</div>
            )}
          </ul>
        </div>
      </div>
      <Card description="game1" title="main game" rankings={[]} />
    </div>
  );
};
export default Dashboard;
