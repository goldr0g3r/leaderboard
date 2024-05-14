import React from "react";
import { ILeaderboardUser } from "../interface/ILeaderboard";
import "./styles.css";

export interface ICardProps {
  title: string;
  rankings: ILeaderboardUser[];
  colors: string[];
}

const Card = (data: ICardProps) => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="leaders">
          <h2>{data.title}</h2>
          <div className="card board">
            {data.rankings.map((ranking, index) => (
              <li
                className="cat-item"
                key={`item-leader-rank${index}-${ranking.ntid}`}
              >
                <div
                  className="ranking"
                  style={{ backgroundColor: data.colors[index] }}
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
