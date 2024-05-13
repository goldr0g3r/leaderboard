import "./data";
import "./style.css";
import { mcqueen, mater, fransisco } from "../../assets";

import React, { useState, useEffect } from "react";
import { Cat, CatWithImage } from "../../interface";
import Card from "../../components/Card";
import { sampleData } from "./data";

const mockCats = [
  { name: "Whiskers", department: "EHV", photo: mcqueen, points: 1000 },
  { name: "Furball", department: "EHV", points: 900 },
  { name: "Paws", department: "EHV", points: 800 },
  { name: "Paws2.0", department: "EHV", points: 855 },
  { name: "Whiskers", department: "EHV", photo: mcqueen, points: 100 },
  { name: "Furball", department: "EHV", points: 90 },
  { name: "Paws", department: "EHV", points: 80 },
  { name: "Paws3.0", department: "EHV", points: 85 },
  { name: "Whiskers", department: "EHV", photo: mcqueen, points: 50 },
  { name: "Furball", department: "EHV", points: 10 },
  { name: "Paws", department: "EHV", points: 0 },
  { name: "Paws2.0", department: "EHV", points: 15 },
  { name: "Whiskers", department: "EHV", photo: mcqueen, points: 25 },
  { name: "Furball", department: "EHV", points: 30 },
  { name: "Paws", department: "EHV", points: 40 },
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

  return (
    <li className="cat-item">
      {/* <div className="cat-item__photo"> */}
      <div className="ranking" style={{ backgroundColor: color }}>
        {rankOrder}
      </div>
      {/* </div> */}
      <div className="cat-item__info">
        <h4>
          {cat.name} ({cat.department}){" "}
        </h4>
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
    setAllCats(response.filter((cat, index) => index > 2));
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
                      <h4>
                        {cat.name} ({cat.department})
                      </h4>
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
          <ul>
            {allCats ? (
              allCats.map((cat, i) => (
                <CatListItem
                  key={cat.name}
                  cat={cat}
                  rank={i + 3}
                  color={leaderboardColors[i + 3]}
                />
              ))
            ) : (
              <div>Loading</div>
            )}
          </ul>
        </div>
      </div>
      <div className="games">
        <Card
          description="game1"
          title="main game"
          rankings={sampleData.rankings}
        />
        <Card description="game2" title="second game" rankings={[]} />
      </div>
    </div>
  );
};
export default Dashboard;
