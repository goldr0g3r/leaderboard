import React from "react";
import { ILeaderboardUser } from "../interface/ILeaderboard";
import "./styles.css";

export interface ICardProps {
  title: string;
  rankings: ILeaderboardUser[];
}

const Card = (data: ICardProps) => {
  const topThreeColors = ["#FFD700", "#C0C0C0", "#CD7F32"];

  return (
    <div className="card-container">
      <div className="card">
        <div className="leaders">
          <h2>{data.title}</h2>
          <div className="card board">
            {data.rankings.map((ranking, index) => (
              <li className="cat-item">
                <div
                  className="ranking"
                  style={{ backgroundColor: topThreeColors[index].toString() }}
                >
                  {ranking.rank}
                </div>
                <div className="cat-item__info">
                  <h4>{ranking.name}</h4>
                </div>
                <div className="cat-item__points">
                  <p>{ranking.score}</p>
                </div>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
